import { Savable } from '../music-core/savable';

export class MidiBuffer extends Savable {
  constructor(public buff: Array<any>, id: any) {
    super();
    if (id !== undefined) this.setID(id);
  }

  override saveDB(saver: any): any {
    if (this.isSaved()) return this.id;

    const postItems = JSON.stringify(this.buff);

    const id = saver.newIDItem('midi', postItems);

    this.setID(id);
    return id;
  }
}
