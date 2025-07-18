import { Component, Input } from '@angular/core';
import { Monitor } from '../../music/monitor';
@Component({
  selector: 'monitor',
  standalone: false,
  template: `<div
      *ngIf="monitor.underruns"
      (click)="monitor.reset()"
      style="background:red"
    >
      {{ monitor.underruns }} {{ monitor.maxUnder }}
    </div>

    <div *ngIf="!monitor.underruns" (click)="monitor.reset()">
      {{ monitor.underruns }} {{ monitor.maxUnder }}
    </div> `,
})
export class MonitorComponent {
  @Input() monitor: Monitor;

  constructor() {}
}
