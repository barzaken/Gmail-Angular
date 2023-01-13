import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, from } from 'rxjs';
import { Item } from '../models/item';
import { LoadingItems } from '../store/actions/item.actions';
import { ItemState } from '../store/reducers/item.reducer';

import { storageService } from './async-storage.service'

const ENTITY = 'item'
@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private store: Store<ItemState>, private http: HttpClient) {

    // http.get('http://www.filltext.com/?rows=10&id={index}&name={username}')
    // .subscribe(res => {
    //   console.log('RES', res);
    // })

    // If empty - load test data to storage
    const items = JSON.parse(localStorage.getItem(ENTITY) || 'null');
    if (!items || items.length === 0) {
      console.log('BUU');
      localStorage.setItem(ENTITY, JSON.stringify(this.createItems()))
    }
  }
  query(filterBy = ''): Observable<Item[]> {
    
    this.store.dispatch(new LoadingItems());
    console.log('ItemService: Return Items ===> effect');
    return from(storageService.query(ENTITY) as Promise<Item[]>)
    // return new Observable((observer) => observer.next(items));
  }

  getById(itemId: string): Observable<Item> {
    console.log('ItemService: Return Item ===> effect');
    return from(storageService.get(ENTITY, itemId) as Promise<Item>)
    // return from(axios.get(URL + itemId) as Promise<Item>)
  }
  
  remove(itemId: string): Observable<boolean> {
    
    // throw new Error('Baba Ji')
    console.log('ItemService: Removing Items ===> effect');
    return from(storageService.remove(ENTITY, itemId))
  }

  save(item: Item): Observable<Item> {
    const method = (item._id) ? 'put' : 'post'
    const prmSavedItem = storageService[method](ENTITY, item)
    console.log('ItemService: Saving Item ===> effect');
    return from(prmSavedItem) as Observable<Item>
  }

  private createItems(): Item[] {
    // return ['Vue', 'Angular', 'React', 'Redux', 'NGRX', 'Vuex']
    //   .map(txt => ({id: storageService.makeId(), txt}))
    return   [
      {
          _id: 'e101',
          subject: 'Awesome Deals!',
          body: 'Check out the latest deals! Up to 80% discount on everything',
          isRead: false,
          isStar: false,
          isDraft: false,
          removedAt: null,
          sentAt: 1551133930594,
          from: 'amazon@deals.com',
          to: 'bar@appsus.com'
      },
      {
          _id: 'e102',
          subject: 'Your Subscription is about to end!',
          body: 'Hello Bar, your spotify subscription is over at 28/09/2022. Check out our deals,Up to 80% discount on everything ',
          isRead: false,
          isStar: false,
          isDraft: false,
          removedAt: null,
          sentAt: 1551133930594,
          from: 'spotify@support.com',
          to: 'bar@appsus.com'
      },
      {
          _id: 'e103',
          subject: 'You have 1 new invitation!',
          body: 'You have 1 new invitation waiting from ',
          isRead: false,
          isStar: false,
          isDraft: false,
          removedAt: null,
          sentAt: 1551133930594,
          from: 'linkdin@support.com',
          to: 'bar@appsus.com'
      },
      {
          _id: 'e104',
          subject: 'Check out new APIs on RapidAPI',
          body: 'Were constantly adding new APIs to the RapidAPI Hub. Search the Hub and',
          isRead: false,
          isStar: false,
          isDraft: false,
          removedAt: null,
          sentAt: 1551133930594,
          from: 'support@rapidapi.com',
          to: 'bar@appsus.com'
      },
      {
          _id: 'e105',
          subject: 'Take 15% off on top seller items, Bar',
          body: 'Take 15% off Use the coupon code SHOPNOV22for a deal of your choice',
          isRead: false,
          isStar: false,
          isDraft: false,
          removedAt: null,
          sentAt: 1668024020406,
          from: 'ebay@reply.ebay.com',
          to: 'bar@appsus.com'
      },
      {
          _id: 'e106',
          subject: 'Awesome Deals!',
          body: 'Check out the latest deals! Up to 80% discount on everything',
          isRead: false,
          isStar: false,
          isDraft: false,
          removedAt: null,
          sentAt: 1551133930594,
          from: 'amazon@deals.com',
          to: 'bar@appsus.com'
      },
      {
          _id: 'e107',
          subject: 'Your Subscription is about to end!',
          body: 'Hello Bar, your spotify subscription is over at 28/09/2022. Check out our deals ',
          isRead: false,
          isStar: false,
          isDraft: false,
          removedAt: null,
          sentAt: 1551133930594,
          from: 'spotify@support.com',
          to: 'bar@appsus.com'
      },
      {
          _id: 'e108',
          subject: 'You have 1 new invitation!',
          body: 'You have 1 new invitation waiting from ',
          isRead: false,
          isStar: false,
          isDraft: false,
          removedAt: null,
          sentAt: 1551133930594,
          from: 'linkdin@support.com',
          to: 'bar@appsus.com'
      },
      {
          _id: 'e109',
          subject: 'Check out new APIs on RapidAPI',
          body: 'Were constantly adding new APIs to the RapidAPI Hub. Search the Hub and',
          isRead: false,
          isStar: false,
          isDraft: false,
          removedAt: null,
          sentAt: 1551133930594,
          from: 'support@rapidapi.com',
          to: 'bar@appsus.com'
      },
      {
          _id: 'e110',
          subject: 'Take 15% off on top seller items, Bar',
          body: 'Take 15% off Use the coupon code SHOPNOV22for a deal of your choice',
          isRead: false,
          isStar: false,
          isDraft: false,
          removedAt: null,
          sentAt: 1668024020406,
          from: 'ebay@reply.ebay.com',
          to: 'bar@appsus.com'
      },
  ]
  }
  get emptyItem(): Item {
    return {
      _id: 'e110',
      subject: 'Take 15% off on top seller items, Bar',
      body: 'Take 15% off Use the coupon code SHOPNOV22for a deal of your choice',
      isRead: false,
      isStar: false,
      isDraft: false,
      removedAt: null,
      sentAt: 1668024020406,
      from: 'ebay@reply.ebay.com',
      to: 'bar@appsus.com'
    }
  }
}
