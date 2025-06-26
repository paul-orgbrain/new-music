import { NgModule } from '@angular/core';
// import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

// import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { AIDetailComponent } from './components/ai-detail.component';
import { PlayerDetailComponent } from './components/player-detail.component';
import { InstrumentDetailComponent } from './components/instrument-detail.component';
import { MusicComponent } from './components/music.component';
import { MusicAppComponent } from './music-app.component';

import { DBService } from './services/db.service';
import { FirebaseDBService } from './services/firebasedb.service';
import { SFService } from './services/sf.service';
import { SettingsService } from '../music/settings.service';
import { NetService } from './services/net.service';
import { SamplesService } from '../music/samples.service';

import { LoadDialog } from './dialogs/load.dialog';
import { MetroDialog } from './dialogs/metro.dialog';
import { MetroSlideComponent } from './components/metro-slide/metro-slide.component';
import { MonitorComponent } from './components/monitor.component';
import { SliderValComponent } from './slider-val.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DrumkitScoreDetailComponent } from './drumkit-score-detail/drumkit-score-detail.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    // JsonpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    MatSelectModule,
    MatListModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatMenuModule,
  ],
  declarations: [
    AppComponent,
    AIDetailComponent,
    InstrumentDetailComponent,
    PlayerDetailComponent,
    MusicComponent,
    MusicAppComponent,
    LoadDialog,
    MetroDialog,
    MetroSlideComponent,
    MonitorComponent,
    SliderValComponent,
    DrumkitScoreDetailComponent,
  ],
  providers: [
    { provide: DBService, useClass: FirebaseDBService },
    SFService,
    SamplesService,
    NetService,
    SettingsService,
  ],
  bootstrap: [AppComponent],
  // entryComponents: [LoadDialog, MetroDialog],
})
export class AppModule {}
