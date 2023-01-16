import { LoadedItem } from './../../store/actions/item.actions';
import { Component,OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';
import { Store } from '@ngrx/store';
import { pluck } from 'rxjs/operators';
import { State } from '../../store/store';
import {LoadItem} from '../../store/actions/item.actions';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit{
  item$: Observable<Item | null>;
  constructor(private store: Store<State>) {
    this.item$ = this.store.select('itemState').pipe(pluck('item'));
  }

  
  ngOnInit(): void {
    console.log('itemApp: dispatching LoadItems => effects');
    this.store.dispatch(new LoadItem('e106'));
    console.log(this.item$);
    // this.item$.pipe().subscribe(item => console.log(item))
  }

}
