import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage: Storage | null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.storage = isPlatformBrowser(this.platformId) ? localStorage : null;
  }

  getItem(key: string): string | null {
    return this.storage ? this.storage.getItem(key) : null;
  }

  setItem(key: string, value: string): void {
    if (this.storage) {
      this.storage.setItem(key, value);
    }
  }

  removeItem(key: string){
    this.storage?.removeItem(key);
  }

  clearStorage(){
    var url:any = '';
    if (this.storage) {
      url = this.storage.getItem('url')
    }
    this.storage?.clear();
    if (this.storage) {
      this.storage.setItem('url', url);
    }
  }

}