import { filter, map } from 'rxjs/operators';
import {
  Component,
  Input,
  ViewChild,
  OnInit,
  AfterViewInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { Observable, Subscriber, Subject } from 'rxjs';

@Component({
  selector: 'metro-slide',
  standalone: false,
  templateUrl: './metro-slide.component.html',
  styleUrls: ['./metro-slide.component.scss'],
})
export class MetroSlideComponent implements AfterViewInit, OnInit {
  @Input() value: number;
  @Output() change = new EventEmitter();
  @ViewChild('svgelement') svgElm: any;

  mouseMoveSubject: Subject<any> = new Subject();
  mouseUpSubject: Subject<any> = new Subject();
  viewChangeSubject: Subject<any> = new Subject();

  padX = 10;
  width: number;
  height: number;

  minVal = 10;
  maxVal = 300;

  constructor() {}

  public recalculateBounds() {
    const bounds: any = this.svgElm.nativeElement.getBoundingClientRect();
    this.width = bounds.width;
    this.height = bounds.height;
  }

  ngOnInit() {
    this.recalculateBounds();
  }

  ngAfterViewInit() {
    new Observable<any>((observer: Subscriber<void>) =>
      window.addEventListener('resize', () => observer.next())
    ).subscribe(() => this.recalculateBounds());

    new Observable<any>((observer: Subscriber<any>) => {
      this.svgElm.nativeElement.addEventListener('mousemove', (evt: any) => {
        evt.preventDefault();
        observer.next({ clientX: evt.clientX, clientY: evt.clientY });
      });
      this.svgElm.nativeElement.addEventListener('touchmove', (evt: any) => {
        evt.preventDefault();
        observer.next({
          clientX: evt.targetTouches[0].clientX,
          clientY: evt.targetTouches[0].clientY,
        });
      });
    }).subscribe(this.mouseMoveSubject);

    new Observable<any>((observer: Subscriber<any>) => {
      this.svgElm.nativeElement.addEventListener('mouseup', (evt: any) => {
        evt.preventDefault();
        observer.next(evt);
      });
      this.svgElm.nativeElement.addEventListener('touchend', (evt: any) => {
        evt.preventDefault();
        observer.next(evt);
      });
    }).subscribe(this.mouseUpSubject);
  }

  /**
   * Get viewbox based on element width / height
   */
  public getViewbox(): string {
    return '0 0 ' + this.width + ' ' + this.height;
  }

  public valueToX(): number {
    return (
      this.padX +
      ((this.width - 2 * this.padX) * (this.value - this.minVal)) /
        (this.maxVal - this.minVal)
    );
  }

  public dragValue(evt1: Event) {
    evt1.preventDefault();
    const width = this.width - 2 * this.padX;

    const movesubscription = this.mouseMoveSubject
      .pipe(
        map((evt) => evt.clientX - this.padX),
        filter((clientx) => clientx > 0),
        filter((clientx) => clientx < width),
        map(
          (clientx: number) =>
            this.minVal + (clientx / width) * (this.maxVal - this.minVal)
        )
      )
      .subscribe((d: number) => {
        this.value = Math.floor(d);
        this.change.emit(this.value);
      });

    const upsubscription = this.mouseUpSubject.subscribe((evt: any) => {
      movesubscription.unsubscribe();
      upsubscription.unsubscribe();
    });
  }
}
