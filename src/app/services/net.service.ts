import { Injectable } from '@angular/core';
import { Perceptron, Elman, Jordan, Net } from '../music/net';

@Injectable()
export class NetService {
  types: { [key: string]: any } = {};
  names: Array<string> = [];

  constructor() {
    this.types['Perceptron'] = Perceptron;
    this.types['Elman'] = Elman;
    this.types['Jordan'] = Jordan;

    for (let n in this.types) {
      this.names.push(n);
    }
  }

  /*

type
nIn
nOut
nHidden[]



*/
  createFromConfig(config: any) {
    switch (config.type) {
    }
  }
}
