import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MusicAppComponent } from '../components/music-app/music-app.component';
import { DBService } from '../services/db.service';

declare var firebase: any;

@Component({
  selector: 'load-dialog',
  standalone: false,
  template: `
    <mat-list>
      <mat-list-item *ngFor="let item of list" (click)="doLoad(item)">
        <div style="width:100%">
          <strong>{{ item.title }}</strong>
        </div>
      </mat-list-item>
    </mat-list>
  `,
})
export class LoadDialog {
  db: DBService;
  list: Array<any> = [];
  musicApp: MusicAppComponent;

  constructor(public dialogRef: MatDialogRef<LoadDialog>) {}

  setUp(db: DBService, musicApp: MusicAppComponent) {
    this.db = db;
    this.musicApp = musicApp;
    const ref = firebase.database().ref('songinfo');

    ref.once('value').then((snapshot: any) => {
      snapshot.forEach((usersongs: any) => {
        const userkey = usersongs.key;
        const userNameRef = firebase
          .database()
          .ref('users/' + userkey + '/username');
        userNameRef.once('value').then((name: any) => {
          console.log(' USER:  ' + name.val());
          usersongs.forEach((song: any) => {
            console.log('    SONGS:  ' + song.child('title').val());
            var title = song.child('title').val();
            var user = name.val();
            var key = song.key;
            this.list.push({ title: title, user: user, key: key });
          });
        });
      });
    });
  }

  doLoad(item: any) {
    var songref = firebase.database().ref('songs').child(item.key);
    this.musicApp.newMusic();
    var music = this.musicApp.music;

    music.loadDB(songref);
    music.title = item.title;
    this.done();
  }

  done() {
    this.dialogRef.close('LOADED');
  }
}
