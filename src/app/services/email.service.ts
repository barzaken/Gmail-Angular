import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, from } from 'rxjs';
import { Email } from '../models/email';
import { LoadingEmails } from '../store/actions/email.actions';
import { EmailState } from '../store/reducers/email.reducer';

import { storageService } from './async-storage.service'

const ENTITY = 'email'
@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private store: Store<EmailState>, private http: HttpClient) {

    // http.get('http://www.filltext.com/?rows=10&id={index}&name={username}')
    // .subscribe(res => {
    //   console.log('RES', res);
    // })

    // If empty - load test data to storage
    const emails = JSON.parse(localStorage.getItem(ENTITY) || 'null');
    if (!emails || emails.length === 0) {
      console.log('BUU');
      localStorage.setItem(ENTITY, JSON.stringify(this.createEmails()))
    }
  }
  query(filterBy = ''): Observable<Email[]> {
    console.log('from service',filterBy);
    this.store.dispatch(new LoadingEmails());
    console.log('EmailService: Return Emails ===> effect');
    return from(storageService.query(ENTITY) as Promise<Email[]>)
    // return new Observable((observer) => observer.next(emails));
  }

  getById(emailId: string): Observable<Email> {
    console.log('EmailService: Return!!!!!!!!!!!!!!! Email ===> effect');
    return from(storageService.get(ENTITY, emailId) as Promise<Email>)
    // return from(axios.get(URL + emailId) as Promise<Email>)
  }
  
  remove(emailId: string): Observable<boolean> {
    
    // throw new Error('Baba Ji')
    console.log('EmailService: Removing Emails ===> effect');
    return from(storageService.remove(ENTITY, emailId))
  }

  save(email: Email): Observable<Email> {
    const method = (email._id) ? 'put' : 'post'
    const prmSavedEmail = storageService[method](ENTITY, email)
    console.log('EmailService: Saving Email ===> effect');
    return from(prmSavedEmail) as Observable<Email>
  }

  private createEmails(): Email[] {
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
          subject: 'Take 15% off on top seller emails, Bar',
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
          subject: 'Take 15% off on top seller emails, Bar',
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
          _id: 'e111',
          subject: 'Take 15% off on top seller emails, Bar',
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
          _id: 'e112',
          subject: 'Take 15% off on top seller emails, Bar',
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
          _id: 'e113',
          subject: 'Take 15% off on top seller emails, Bar',
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
          _id: 'e114',
          subject: 'Take 15% off on top seller emails, Bar',
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
          _id: 'e115',
          subject: 'Take 15% off on top seller emails, Bar',
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
          _id: 'e116',
          subject: 'Take 15% off on top seller emails, Bar',
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
          _id: 'e117',
          subject: 'Take 15% off on top seller emails, Bar',
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
          _id: 'e118',
          subject: 'Take 15% off on top seller emails, Bar',
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
          _id: 'e119',
          subject: 'Take 15% off on top seller emails, Bar',
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
  get emptyEmail(): Email {
    return {
      _id: 'e110',
      subject: 'Take 15% off on top seller emails, Bar',
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
