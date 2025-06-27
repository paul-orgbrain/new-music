import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { Player } from '../../music/player';
import { AI } from '../../music/ai';
import { MatCard } from '@angular/material/card';
import { DrumPlayer } from '../../music-core/drumplayer';

@Component({
  selector: 'player-detail',
  templateUrl: 'player-detail.html',
  standalone: false,
})
export class PlayerDetailComponent {
  @ViewChild(MatCard) card: MatCard;
  @Input() player: Player;
  @Output() playerSelected = new EventEmitter();

  soloed = false;
  muted = false;

  constructor() {}

  getAI(): AI {
    return this.player.ai;
  }

  solo() {
    this.player.solo();
  }

  mute() {
    this.player.mute();
  }

  toggleRecord() {
    const player = this.player;
    player.recording = !player.recording;
  }

  removeMe() {
    this.player.removeMe();
  }

  get drumPlayer(): DrumPlayer {
    if (this.player instanceof DrumPlayer) return this.player as DrumPlayer;
    throw Error(' Should be a drummer');
  }
}
