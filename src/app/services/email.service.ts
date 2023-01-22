import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, from } from 'rxjs';
import { Email } from '../models/email';
import { LoadingEmails } from '../store/actions/email.actions';
import { EmailState } from '../store/reducers/email.reducer';
const emails = require("../../../emails.json");

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
    return emails
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
