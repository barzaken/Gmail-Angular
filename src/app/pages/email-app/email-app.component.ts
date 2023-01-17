import {  EmailState } from '../../store/reducers/email.reducer';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { State } from '../../store/store';
import {LoadEmail, LoadEmails, RemoveEmail,SaveEmail,SetFilter} from '../../store/actions/email.actions';
import { Email } from '../../models/email';
@Component({
  selector: 'email-app',
  templateUrl: './email-app.component.html',
  styleUrls: ['./email-app.component.scss'],
})
export class EmailAppComponent implements OnInit {
  emails$: Observable<Email[]>;
  email$: Observable<Email | null>;
  isLoading$: Observable<boolean>;
  error$: Observable<string>;
  addingNew = false;
  filterBy$: Observable<object>;
  // filterBy: string = '';

  constructor(private store: Store<State>) {
    this.emails$ = this.store.select('emailState').pipe(pluck('emails'));
    // this.emails$ =  this.store.select(emailState.emailsToShow)
    this.email$ = this.store.select('emailState').pipe(pluck('email'));
    this.isLoading$ = this.store.select('emailState').pipe(pluck('isLoading'));
    this.error$ = this.store.select('emailState').pipe(pluck('error'));
    this.filterBy$ = this.store.select('emailState').pipe(pluck('filterBy'));
  }
  onOutletLoaded(component:any) {
    console.log(component);
    component.emails = this.emails$
} 
  ngOnInit(): void {
    console.log('emailApp: dispatching LoadEmails => effects');
    this.store.dispatch(new LoadEmails(''));
  }
  deleteEmail(emailId :string) {
    console.log('emailApp: dispatching remove');
    this.store.dispatch(new RemoveEmail(emailId));
  }
  editEmail(emailId: string) {
    console.log('emailApp: dispatching load email (for edit)');
    this.store.dispatch(new LoadEmail(emailId));
  }  
  toggleStar(email: Email){
    let emailToSave =  JSON.parse(JSON.stringify(email));
    emailToSave.isStar = !emailToSave.isStar
    this.store.dispatch(new SaveEmail(emailToSave));
  }
  toggleRead(email: Email){
    let emailToSave =  JSON.parse(JSON.stringify(email));
    emailToSave.isRead = !emailToSave.isRead
    console.log(emailToSave.isRead);
    this.store.dispatch(new SaveEmail(emailToSave));
  }
  archiveEmail(email: Email){
    let emailToSave =  JSON.parse(JSON.stringify(email));
    emailToSave.isDraft = !emailToSave.isDraft
    this.store.dispatch(new SaveEmail(emailToSave));
  }
  setFilter(filterBy: object){
    console.log(filterBy);
    let newFilter = {txt:'',category:filterBy}
    this.store.dispatch(new SetFilter(newFilter));
  }

  
}
