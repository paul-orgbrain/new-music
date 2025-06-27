import { DBService } from '../services/db.service';

export class Savable {
  id: string | null = null;

  isSaved(): boolean {
    return this.id !== null;
  }

  /* any change will void the identity so we will need to save again */
  change(): void {
    this.id = null;
  }

  saveDB(saver: DBService): String {
    console.log(' NO SAVER ' + this);
    throw Error(' mist over me');
  }

  setID(id: string): void {
    this.id = id;
  }
}
