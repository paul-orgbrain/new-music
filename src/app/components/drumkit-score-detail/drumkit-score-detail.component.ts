import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DrumPlayer } from '../../music-core/drumplayer';

@Component({
  selector: 'app-drumkit-score-detail',
  templateUrl: './drumkit-score-detail.component.html',
  styleUrls: ['./drumkit-score-detail.component.css'],
  standalone: false,
})
export class DrumkitScoreDetailComponent implements OnInit {
  @Input('player') player: DrumPlayer;

  constructor() {}

  ngOnInit() {}

  update() {
    if (this.player) {
      console.log(this.player.scoreText);
      this.player.update();
    }
  }
}
