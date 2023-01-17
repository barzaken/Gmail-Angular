import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Item } from '../../models/item';
import { SaveItem } from '../../store/actions/item.actions';
import { State } from '../../store/store';

@Component({
  selector: 'item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss']
})
export class ItemEditComponent implements OnInit {
  item$: Observable<Item | null>;
  item = { _id: '', subject: '',body:'',isDraft:false,isRead:false,isStar:false,removedAt:null,sentAt:0,from:'',to:'' }
  @Output() saved = new EventEmitter();
  @Output() close = new EventEmitter();
  sub: Subscription | null = null;

  constructor(private store: Store<State>) {
    this.item$ = this.store.select('itemState').pipe(pluck('item'));
  }
  get itemEditState() {
    // return (this.item._id)? 'Update' : 'Add'
    return (this.item._id)? 'Reply' : 'New'
  }

  ngOnInit(): void {
    this.sub = this.item$.subscribe(item => {
      if (item){
        this.item = JSON.parse(JSON.stringify(item))
        this.item.subject = 'Reply: ' +  this.item.subject
        this.item.to = this.item.from
      } 
    })

  }
  saveItem() {
    this.item.sentAt = Date.now()
    this.item.from = 'me'
    this.item._id = ''
    // this.item.isStar = true
    this.store.dispatch(new SaveItem(this.item));
    console.log('Saving: ', this.item);
    this.saved.emit();
  }
  ngOnDestroy() {
    this.sub?.unsubscribe()
  }
}
