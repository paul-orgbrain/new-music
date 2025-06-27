import { Component } from '@angular/core';

import { DBService } from '../../services/db.service';
import { NetService } from '../../services/net.service';
import { SettingsService } from '../../music-core/settings.service';
import { SamplesService } from '../../music-core/samples.service';
import { Music } from '../../music/music';

import { Monitor } from '../../music/monitor';

declare var audioContext: any;

@Component({
  selector: 'musicApp',
  templateUrl: './music-app.html',
  standalone: false,
})
export class MusicAppComponent {
  music: Music;
  startTime: number;
  lastTime: any;
  dMin: any;
  dMax: any;
  playing = false;
  DELTA_T = 0.005;
  slidershow = false;
  playstopTip = 'PLAY';
  play_stop_icon = 'play_arrow';
  pauseable = false;
  pause_text = '';
  recStyle = 'color:#FF0000;';
  recording = false;
  recordColor = '';
  monitor: Monitor;

  constructor(
    private dbService: DBService,
    private samplesService: SamplesService,
    private netService: NetService,
    private settings: SettingsService
  ) {
    this.monitor = new Monitor();

    this.music = new Music(
      dbService,
      samplesService,
      netService,
      this.monitor,
      this.settings
    );
  }

  newMusic() {
    this.music = new Music(
      this.dbService,
      this.samplesService,
      this.netService,
      this.monitor,
      this.settings
    );
  }

  tick() {
    setTimeout(this.playLoop, this.DELTA_T, this);
  }

  /*
        slide(value:any):void {
            console.log(value)
            this.music.pulse.bpm = value
        }
    */

  playLoop(self: any) {
    const time = audioContext.currentTime;

    if (self.lastTime !== undefined) {
      const delta = time - self.lastTime;
      if (self.dMin !== undefined) self.dMin = Math.min(self.dMin, delta);
      else self.dMin = delta;
      if (self.dMax !== undefined) self.dMax = Math.max(self.dMax, delta);
      else self.dMax = delta;
    }

    self.lastTime = time;

    if (self.playing) {
      self.music.tick();
      self.tick();
    }
  }

  record() {
    this.recording = !this.recording;
    if (this.recording) this.recordColor = 'accent';
    else this.recordColor = '';
    this.music.record(this.recording);
  }

  play() {
    if (!this.playing) {
      this.playing = true;
      this.play_stop_icon = 'stop';
      this.playstopTip = 'STOP';
      this.dMin = undefined;
      this.dMax = undefined;
      this.lastTime = undefined;
      this.startTime = audioContext.currentTime;
      this.music.start();
      this.tick();
      this.pauseable = true;
    } else {
      this.pauseable = false;
      this.play_stop_icon = 'play_arrow';
      this.playstopTip = 'PLAY';
      this.playing = false;
      this.music.stop();
      if (this.recording) this.record();
    }
  }

  pause() {
    this.music.pause();
    if (this.music.isRunning()) {
      this.pause_text = '';
    } else {
      this.pause_text = 'accent';
    }
  }
}
