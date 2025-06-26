import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // updated import

@Injectable()
export class SFService {
  names: Array<string> = [];

  constructor(private http: HttpClient) {
    // updated type
    this.getJSON();
  }

  public getNames(): Array<string> {
    return this.names;
  }

  public getJSON() {
    this.http
      .get<Array<string>>('./sfnames.json') // updated to use HttpClient, typed response
      .subscribe(
        (data) => (this.names = data),
        (err) => console.log(err),
        () => console.log('LOad names Completed')
      );
  }
}
