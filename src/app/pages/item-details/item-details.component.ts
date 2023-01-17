import { LoadedItem, SaveItem,RemoveItem } from './../../store/actions/item.actions';
import { Component,OnInit,OnDestroy } from '@angular/core';
import { Item } from 'src/app/models/item';
import { Store } from '@ngrx/store';
import { pluck } from 'rxjs/operators';
import { State } from '../../store/store';
import {LoadItem} from '../../store/actions/item.actions';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit,OnDestroy{
  item$: Observable<Item | null>;
  item: any
  id: any
  constructor(private store: Store<State>, private route: ActivatedRoute,private router: Router) {
    this.item$ = this.store.select('itemState').pipe(pluck('item'));
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new LoadItem(this.id));
    this.item$.pipe().subscribe(item => this.item = JSON.parse(JSON.stringify(item)) )
  }
  ngOnDestroy(): void {
    this.item.isRead = true
    this.store.dispatch(new SaveItem(this.item));
  }

  deleteEmail() {
    console.log('itemApp: dispatching remove');
    this.store.dispatch(new RemoveItem(this.item._id))
    this.goBack()

  }
  toggleRead(){
    this.item.isRead = !this.item.isRead
    this.store.dispatch(new SaveItem(this.item))
  }
  archiveEmail(){
    this.item.isDraft = !this.item.isDraft
    this.store.dispatch(new SaveItem(this.item))
  }

  goBack(){
    this.router.navigate([`item`])
  }
}
