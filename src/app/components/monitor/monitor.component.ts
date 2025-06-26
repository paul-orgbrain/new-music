import { Component, Input } from '@angular/core';
import { Monitor } from '../../music/monitor';
@Component({
  selector: 'music-monitor',
  standalone: false,
  templateUrl: './monitor.html',
})
export class MonitorComponent {
  @Input() monitor: Monitor;

  constructor() {}
}
