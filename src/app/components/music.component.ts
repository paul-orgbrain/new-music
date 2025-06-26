import { Component, Input } from '@angular/core';
import { Music } from '../../app/music/music';
import { Thing } from '../../music/thing';
import { Player } from '../music/player';

@Component({
  selector: 'music-comp',
  template: `
    <mat-card>
      <div style="width: 100%">
        <input mdInput [(ngModel)]="music.title" />

        <button mat-mini-fab [matMenuTriggerFor]="menu" style="float:right;">
          <mat-icon>add</mat-icon></button
        ><br />
        <mat-menu #menu="matMenu">
          <button
            mat-menu-item
            *ngFor="let t of music.playerTypes"
            [value]="t"
            (click)="addPlayerType(t)"
          >
            {{ t }}
          </button>
        </mat-menu>

        <br /><br />
        <div *ngFor="let p of playersIn(music.things)">
          <player-detail
            *ngIf="p.viewMe"
            [player]="p"
            (playerSelected)="selectedPlayer = p"
          >
          </player-detail>
        </div>
      </div>
    </mat-card>
  `,
  standalone: false,
})
export class MusicComponent {
  @Input() music: Music;
  selectedPlayer: Player;

  constructor() {}

  addPlayerType(t: string) {
    switch (t) {
      case 'AI':
        this.music.addAIPlayer('marimba', null, -1);
        break;
      case 'midi':
        this.music.addMidiPlayer('marimba', null);
        break;
      case 'kit':
        this.music.addDrumPlayer('kit', null);
        break;
    }
  }

  playersIn(things: Thing[]): Player[] {
    return things.filter((x) => x instanceof Player);
  }
}
