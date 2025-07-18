import { Player } from './player';
import { SFInstrument } from '../music-core/sfinstrument';
import { UNDEFINED } from '../../undefined';

export class Mapper {
  table: Array<number> = [];
  constructor(root: number, base: Array<number>) {
    for (let i = 0; i < 5; i++) {
      base.forEach((v) => {
        this.table.push(root + v + 12 * i);
      });
    }
  }
  map(i: number): number {
    return this.table[i];
  }
}

export class MappedPlayer {
  inst: SFInstrument;

  mapper: Mapper;

  state: Array<number>;

  constructor(inst: SFInstrument, mapper: Mapper) {
    this.inst = inst;
    this.mapper = mapper;
    this.state = [];
  }

  playNote(i: number, vel: number, when: number): void {
    const key = this.mapper.map(i);
    if (this.state[i] !== UNDEFINED) {
      const keyLast = this.state[i];
      if (vel === 0) {
        this.inst.playNote(keyLast, 0, when);
        delete this.state[i];
        this.state[i] = UNDEFINED;
      } else if (key === keyLast) {
        this.inst.playNote(keyLast, vel, when);
      } else {
        this.inst.playNote(keyLast, 0, when);
        this.inst.playNote(key, vel, when);
        this.state[i] = key;
      }
    } else {
      this.inst.playNote(key, vel, when);
      this.state[i] = key;
    }
  }
}
