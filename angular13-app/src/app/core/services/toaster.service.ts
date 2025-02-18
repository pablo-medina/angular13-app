import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

const TOASTER_TIMEOUT_MS = 3500;
const TOASTER_ERROR_TIMEOUT_MS = 5000;
type ToasterTitleType = string | undefined;
type ToasterMessageType = string;

enum ToasterTypeEnum {
  Success = 'success',
  Information = 'info',
  Warning = 'warning',
  Error = 'error'
}

interface IToasterParams {
  type: ToasterTypeEnum,
  title: ToasterTitleType,
  message: ToasterMessageType
}

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  
  constructor(
    private snackBar: MatSnackBar
  ) { }

  private show(params: IToasterParams) {
    switch(params.type) {
      case ToasterTypeEnum.Success:
        this.snackBar.open(params.message, 'OK', {duration: TOASTER_TIMEOUT_MS, panelClass: 'app-toast-success'});
        break;
      case ToasterTypeEnum.Information:
        this.snackBar.open(params.message, 'OK', {duration: TOASTER_TIMEOUT_MS, panelClass: 'app-toast-information'});
        break;
      case ToasterTypeEnum.Warning:
        this.snackBar.open(params.message, 'OK', {duration: TOASTER_TIMEOUT_MS, panelClass: 'app-toast-warning'});
        break;
      case ToasterTypeEnum.Error:
        this.snackBar.open(params.message, 'OK', {duration: TOASTER_ERROR_TIMEOUT_MS, panelClass: 'app-toast-error'});
        break;
      default:
        this.snackBar.open(params.message, 'OK', {duration: TOASTER_TIMEOUT_MS, panelClass: 'app-toast'});
    }
  }

  success(message: ToasterMessageType, title: ToasterTitleType = '') {
    this.show({type: ToasterTypeEnum.Success, title, message});
  }

  info(message: ToasterMessageType, title: ToasterTitleType = '') {
    this.show({type: ToasterTypeEnum.Information, title, message});
  }

  warn(message: ToasterMessageType, title: ToasterTitleType = '') {
    this.show({type: ToasterTypeEnum.Warning, title, message});
  }

  error(message: ToasterMessageType, title: ToasterTitleType = '') {
    this.show({type: ToasterTypeEnum.Error, title, message});
  }
}
