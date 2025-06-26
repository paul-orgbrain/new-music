// https://www.npmjs.com/package/angular-2-local-storage
// https://github.com/grevory/angular-local-storage#set

import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {
  // @LocalStorageModule()

  playahead = 0.1;

  constructor() {
    const x = localStorage.getItem('playahead');
    console.log(' playhead loaded =', x);
    if (x !== null) this.playahead = +x;
  }

  setPlayahead(x: number) {
    this.playahead = x;
    localStorage.setItem('playahead', '' + this.playahead);
  }
}
