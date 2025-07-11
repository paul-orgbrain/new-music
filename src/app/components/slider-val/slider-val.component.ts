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
  selector: 'slider-val',
  templateUrl: './slider-val.html',
  standalone: false,
})
export class SliderValComponent implements AfterViewInit, OnInit {
  @Input() value: number = 0.1;
  @Input() minVal: number = 0;
  @Input() maxVal: number = 1;
  @Input() fixed: number = 2;
  @Input() title: string;
  @Input() unit: string;
  @Output() change = new EventEmitter();

  @ViewChild('svgelement', { static: true }) svgElm: any;

  mouseMoveSubject: Subject<any> = new Subject();
  mouseUpSubject: Subject<any> = new Subject();
  viewChangeSubject: Subject<any> = new Subject();

  inited: boolean = false;

  padLeft: number = 15;
  padRight: number = 15;
  width: number = 15;
  height: number = 15;
  textX: number;
  textY: number;
  bounds: any;
  heightSlide: number;
  heightLabel: number;

  constructor() {}

  public recalculateBounds() {
    this.bounds = this.svgElm.nativeElement.getBoundingClientRect();
    this.width = this.bounds.width;
    this.height = this.bounds.height;

    this.textX = 20;
    this.textY = this.height / 2;
    this.heightSlide = (2 * this.height) / 3;
    this.heightLabel = this.height / 3;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.recalculateBounds();
    console.log(this.value);
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
    //   console.log(this.value)
    var val =
      this.padLeft +
      ((this.width - this.padLeft - this.padRight) *
        (this.value - this.minVal)) /
        (this.maxVal - this.minVal) -
      10;
    return val;
  }

  public dragValue(evt: Event) {
    evt.preventDefault();
    let width = this.width - this.padLeft - this.padRight;

    this.bounds = this.svgElm.nativeElement.getBoundingClientRect();
    console.log(this.bounds.left);

    let movesubscription = this.mouseMoveSubject
      .pipe(
        map((evt) => {
          return evt.clientX - this.padLeft - this.bounds.left;
        }),
        filter((clientx) => {
          return clientx > 0;
        }),
        filter((clientx) => {
          return clientx < width;
        }),
        map((clientx: number) => {
          return this.minVal + (clientx / width) * (this.maxVal - this.minVal);
        })
      )
      .subscribe((d: number) => {
        var newVal = +d.toFixed(this.fixed);
        if (this.value != newVal) {
          this.value = newVal;
          this.change.emit(this.value);
        }
      });

    let upsubscription = this.mouseUpSubject.subscribe((evt: any) => {
      movesubscription.unsubscribe();
      upsubscription.unsubscribe();
    });
  }
}
