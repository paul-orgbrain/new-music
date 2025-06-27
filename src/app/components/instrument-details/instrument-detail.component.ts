import { map, startWith } from 'rxjs/operators';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SFService } from '../../services/sf.service';
import { SFInstrument } from '../../music-core/sfinstrument';
import { FormControl } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Instrument } from '../../music-core/instrument';

// import 'rxjs/add/operator/startWith';

@Component({
  selector: 'instrument-detail',
  templateUrl: 'instrument-detail.html',
  standalone: false,
})
export class InstrumentDetailComponent implements OnInit {
  @Input() inst: Instrument;
  @ViewChild(MatAutocompleteTrigger) auto: MatAutocomplete;
  sfInstrument: SFInstrument;
  nameCtrl: FormControl;
  name: string;
  filteredNames: any;
  displayName: string;
  val: string;

  constructor(private sfService: SFService) {
    this.nameCtrl = new FormControl();
    this.filteredNames = this.nameCtrl.valueChanges.pipe(
      startWith(null),
      map((name) => this.filterNames(name))
    );

    //    console.log(name)
    this.nameCtrl.valueChanges.subscribe((val) => {
      console.log(val);

      if (this.sfService.names.indexOf(val) >= 0) {
        this.sfInstrument.setInst(val);
      }
    });
  }

  ngOnInit() {
    this.sfInstrument = this.inst as SFInstrument;
    this.nameCtrl.setValue(this.inst.name);
  }

  filterNames(val: string) {
    return val
      ? this.sfService.names.filter((s) => new RegExp(val, 'gi').test(s))
      : this.sfService.names;
  }
}
