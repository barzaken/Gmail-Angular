import { itemsToShow, ItemState } from './../../store/reducers/item.reducer';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { State } from '../../store/store';
import {LoadItem, LoadItems, RemoveItem,SaveItem,SetFilter} from '../../store/actions/item.actions';
import { Item } from '../../models/item';
@Component({
  selector: 'item-app',
  templateUrl: './item-app.component.html',
  styleUrls: ['./item-app.component.scss'],
})
export class ItemAppComponent implements OnInit {
  items$: Observable<Item[]>;
  item$: Observable<Item | null>;
  isLoading$: Observable<boolean>;
  error$: Observable<string>;
  addingNew = false;
  filterBy$: Observable<object>;
  // filterBy: string = '';

  constructor(private store: Store<State>) {
    this.items$ = this.store.select('itemState').pipe(pluck('items'));
    // this.items$ =  this.store.select(itemState.itemsToShow)
    this.item$ = this.store.select('itemState').pipe(pluck('item'));
    this.isLoading$ = this.store.select('itemState').pipe(pluck('isLoading'));
    this.error$ = this.store.select('itemState').pipe(pluck('error'));
    this.filterBy$ = this.store.select('itemState').pipe(pluck('filterBy'));
  }
  onOutletLoaded(component:any) {
    console.log(component);
    component.items = this.items$
} 
  ngOnInit(): void {
    console.log('itemApp: dispatching LoadItems => effects');
    this.store.dispatch(new LoadItems(''));
  }
  deleteItem(itemId :string) {
    console.log('itemApp: dispatching remove');
    this.store.dispatch(new RemoveItem(itemId));
  }
  editItem(itemId: string) {
    console.log('itemApp: dispatching load item (for edit)');
    this.store.dispatch(new LoadItem(itemId));
  }  
  toggleStar(item: Item){
    let itemToSave =  JSON.parse(JSON.stringify(item));
    itemToSave.isStar = !itemToSave.isStar
    this.store.dispatch(new SaveItem(itemToSave));
  }
  toggleRead(item: Item){
    let itemToSave =  JSON.parse(JSON.stringify(item));
    itemToSave.isRead = !itemToSave.isRead
    console.log(itemToSave.isRead);
    this.store.dispatch(new SaveItem(itemToSave));
  }
  archiveItem(item: Item){
    let itemToSave =  JSON.parse(JSON.stringify(item));
    itemToSave.isDraft = !itemToSave.isDraft
    this.store.dispatch(new SaveItem(itemToSave));
  }
  setFilter(filterBy: object){
    console.log(filterBy);
    let newFilter = {txt:'',category:filterBy}
    this.store.dispatch(new SetFilter(newFilter));
  }
  
}
