import { Component, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DBService } from '../../services/db.service';
import { MusicAppComponent } from '../music-app/music-app.component';

import { LoadDialog } from '../../dialogs/load.dialog';
import { MetroDialog } from '../../dialogs/metro/metro.dialog';

import { SettingsService } from '../../music-core/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
})
export class AppComponent {
  @ViewChild(MusicAppComponent) musicApp: MusicAppComponent;

  user: any = null;

  constructor(
    private dbService: DBService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public settings: SettingsService
  ) {
    dbService.register((user: any) => {
      this.user = user;
    });

    //  this.visibility()
  }

  signIn() {
    this.dbService.signIn();
    console.log('signing in');
  }

  signOut() {
    this.dbService.signOut();
    console.log('signing out');
  }

  save() {
    if (this.musicApp.music.id !== null) {
      this.snackBar.open(' Already saved', this.musicApp.music.id, {
        duration: 2000,
      });
    } else {
      this.musicApp.music.saveDB(this.dbService);
      this.snackBar.open(' Saved ', this.musicApp.music.id || 'Yikes', {
        duration: 2000,
      });
    }
  }

  load() {
    const config = new MatDialogConfig();

    const dialogRef: MatDialogRef<LoadDialog> = this.dialog.open(
      LoadDialog,
      config
    );
    dialogRef.componentInstance.setUp(this.dbService, this.musicApp);
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
    });
  }

  metroSetup() {
    const config = new MatDialogConfig();

    const dialogRef: MatDialogRef<MetroDialog> = this.dialog.open(
      MetroDialog,
      config
    );
    dialogRef.componentInstance.metro = this.musicApp.music.metro;

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
    });
  }

  clean() {
    this.dbService.clean();
    this.snackBar.open('Argghhhhhhh  ', 'OH NO!', {
      duration: 4000,
    });
  }

  newMusic() {
    this.musicApp.newMusic();
  }

  /*
      visibility() {


        // Set the name of the hidden property and the change event for visibility
        var hidden, visibilityChange;
        if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
          hidden = "hidden";
          visibilityChange = "visibilitychange";
        } else if (typeof document.msHidden !== "undefined") {
          hidden = "msHidden";
          visibilityChange = "msvisibilitychange";
        } else if (typeof document.webkitHidden !== "undefined") {
          hidden = "webkitHidden";
          visibilityChange = "webkitvisibilitychange";
        }


        // If the page is hidden, pause the video;
        // if the page is shown, play the video
        function handleVisibilityChange() {
          if (document[hidden]) {
            console.log("HID")
          } else {
            console.log("SHOW")
          }
        }

        // Warn if the browser doesn't support addEventListener or the Page Visibility API
        if (typeof document.addEventListener === "undefined" || typeof document[hidden] === "undefined") {
          console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
        } else {
          // Handle page visibility change
          document.addEventListener(visibilityChange, handleVisibilityChange, false);


        }
      }
      */
}
