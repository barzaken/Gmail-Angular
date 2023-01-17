import { Observable } from 'rxjs';
import { Component, Input, OnInit, Output } from '@angular/core';
import {EventEmitter} from '@angular/core';
import { Item } from 'src/app/models/item';
import { Store } from '@ngrx/store';
import { pluck } from 'rxjs/operators';
import { State } from '../../store/store';
import {Router} from '@angular/router';

import {LoadItem, LoadItems, RemoveItem,SaveItem,SetFilter} from '../../store/actions/item.actions';
@Component({
  selector: 'item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {
  @Input() items: Item[] | null = [];
  // @Output() removed = new EventEmitter<string>()
  @Output() edited = new EventEmitter<string>()
  @Output() archived = new EventEmitter<Item>()
  @Output() deleted = new EventEmitter<string>()
  @Output() toggledRead = new EventEmitter<Item>()
  @Output() toggledStar = new EventEmitter<Item>()
  // constructor() {}
  items$: Observable<Item[]>;
  item$: Observable<Item | null>;
  isLoading$: Observable<boolean>;
  error$: Observable<string>;
  addingNew = false;
  filterBy$: Observable<object>;

  constructor(private store: Store<State>,private router: Router) {
    this.items$ = this.store.select('itemState').pipe(pluck('items'));
    // this.items$ =  this.store.select(itemState.itemsToShow)
    this.item$ = this.store.select('itemState').pipe(pluck('item'));
    this.isLoading$ = this.store.select('itemState').pipe(pluck('isLoading'));
    this.error$ = this.store.select('itemState').pipe(pluck('error'));
    this.filterBy$ = this.store.select('itemState').pipe(pluck('filterBy'));
  }


  ngOnInit(): void {}
  // removeItem(itemId: string) {
  //   console.log('ItemList Emitting removed to Parent');
  //   this.removed.emit(itemId)
  // }
  // editItem(itemId: string) {
  //   console.log('ItemList Emitting edited to Parent');
  //   this.edited.emit(itemId)
  // }
  archiveEmail(item: Item) {
    console.log('ItemList Emitting edited to Parent');
    console.log(item);
    // this.archived.emit(itemId)
  }
  deleteEmail(itemId: string) {
    console.log('itemApp: dispatching remove');
    this.store.dispatch(new RemoveItem(itemId));
  }
  // toggleRead(item: Item) {
  //   console.log('ItemList Emitting edited to Parent');
  //   this.toggledRead.emit(item)
  // }
  // toggleStar(item: Item) {
  //   console.log('ItemList Emitting edited to Parent');
  //   this.toggledStar.emit(item)
  // }


  editItem(itemId: string) {
    console.log('itemApp: dispatching load item (for edit)');
    this.store.dispatch(new LoadItem(itemId));
    this.router.navigate([`item/${itemId}`]);
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
