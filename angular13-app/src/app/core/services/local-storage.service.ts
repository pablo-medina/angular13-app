import { Injectable } from '@angular/core';
import { StorageService, StorageValueType } from '../models/storage.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements StorageService {
  localStorage: Storage;

  constructor() { 
    this.localStorage = window.localStorage;
  }

  get(key: string): StorageValueType {
    if (this.isLocalStorageSupported) {
      return this.localStorage.getItem(key);
    }

    return null;
  }

  set(key: string, value: StorageValueType): boolean {
    if (this.isLocalStorageSupported) {
      if (value != null) {
        this.localStorage.setItem(key, value);
      } else {
        this.localStorage.removeItem(key);
      }
      return true;
    }
    return false;
  }

  remove(key: string): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.removeItem(key);
      return true;
    }
    return false;
  }

  get isLocalStorageSupported(): boolean {
    return !!this.localStorage;
  }

  clear(): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.clear();
      return true;
    }
    return false;
  }
}
