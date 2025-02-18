import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';
import { LocalStorageConfig } from '../models/storage.model';
import { ToasterService } from './toaster.service';

const PWA_MESSAGE_DURATION_MS = environment.pwaMessageDuration * 1000;
const SKIP_PWA_TIMEOUT = environment.pwaMessageRejectTimeout;

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  private installPromptEvent!: Event;
  public installable$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public showInstallBanner$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public hasPendingUpdate$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private localStorageService: LocalStorageService,
    private swUpdate: SwUpdate,
    private toasterService: ToasterService
  ) {
    window.addEventListener('beforeinstallprompt', (event: any) => {
      event.preventDefault();
      this.installPromptEvent = event;
      if (event) {
        this.installable$.next(true);
      }
    });

    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe(evt => {
        switch(evt.type) {
          case 'VERSION_DETECTED':
            console.log(`Downloading new version (${evt.version.hash})`);            
            break;
          case 'VERSION_READY':
            console.log(`Current version: ${evt.currentVersion.hash}`);
            console.log(`New version ready to use: ${evt.latestVersion.hash}`);
            this.hasPendingUpdate$.next(true);
            break;
          case 'VERSION_INSTALLATION_FAILED':
            console.error(`Couldn't install update '${evt.version.hash}': ${evt.error}`);
            this.toasterService.error("Couldn't install update.");
            break;
        }        
      });
    }
  }

  mustShowPWAMessage(): boolean {
    const skipPWAValue = this.localStorageService.get(LocalStorageConfig.pwaSkip);
    let dtime;

    if (skipPWAValue) {
      try {
        dtime = moment(parseInt(skipPWAValue));
      } catch {
        dtime = undefined;
      }
    }

    const now = moment();
    return (!dtime) || (!dtime.isValid() || (dtime.add(SKIP_PWA_TIMEOUT, 'seconds').isBefore(now)));
  }

  isAppInstalled(): boolean {
    return window.matchMedia('(display-mode: standalone').matches || (navigator as any).standalone === true;
  }

  installPWA(): void {
    if (this.installPromptEvent) {
      const ev = this.installPromptEvent as any;
      ev.prompt();
      ev.userChoice.then((choiceResult: any) => {
        console.log(choiceResult);
        if (choiceResult.outcome === 'accepted') {
          console.debug('User accepted PWA application installation.');
          this.installable$.next(false);
          this.dismissPWAMessage();
        } else {
          console.debug('User rejected PWA application installation.');
        }
      })
    }
  }

  updateApplication(): void {
    console.debug('Updating PWA application...');
    window.location.reload();
    console.debug('The PWA Application has been updated.');
  }

  resetPWAMessage(): void {
    this.localStorageService.remove(LocalStorageConfig.pwaSkip);
    this.showInstallBanner$.next(true);

    setTimeout(() => {
      this.showInstallBanner$.next(false);
    }, PWA_MESSAGE_DURATION_MS);
  }

  dismissPWAMessage(): void {
    const dismissTime = moment().valueOf();
    this.localStorageService.set(LocalStorageConfig.pwaSkip, `${dismissTime}`);
    this.showInstallBanner$.next(false);
  }
}
