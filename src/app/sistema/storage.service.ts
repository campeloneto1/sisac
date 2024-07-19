import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SharedService } from './shared/shared.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage: Storage | null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private sharedService: SharedService
  ) {
    this.storage = isPlatformBrowser(this.platformId) ? localStorage : null;
  }

  getItem(key: string): any {
    try{
      if(this.storage && this.storage.getItem(key)){
        return this.sharedService.decodeId(this.storage.getItem(key));
      }
    }catch(e:any){
      return null;
    }
    
  }

  setItem(key: string, value: string): void {
    if (this.storage) {
      this.storage.setItem(key, this.sharedService.encodeId(value));
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