import { SamplesService } from './samples.service';

declare var audioContext: any;

// export class Sample {

//     static cache = {}
//     buffer;

//     constructor(buff,) {
//         if (Sample.cache[file]) {
//             this.buffer = Sample.cache[file]
//         } else {
//             samplesService.load(file).then((buff: any) => {
//                 this.buffer = buff
//                 Sample.cache[file] = buff;
//             })
//         }
//     }
// }

export class SamplePlayer {
  role: any;
  setBuffer(_t22: string) {
    throw new Error('Method not implemented.');
  }

  _gain: any;
  name: any;
  constructor(public buffer: any) {
    this._gain = audioContext.createGain();
    this._gain.gain.value = 0.1;
    this._gain.connect(audioContext.destination);
  }

  play(when: number): void {
    const source: any = audioContext.createBufferSource();
    source.buffer = this.buffer;
    source.connect(this._gain);
    source.start(when);
  }

  set gain(val: number) {
    this._gain.gain.value = val;
  }
}
