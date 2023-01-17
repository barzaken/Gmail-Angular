import { Observable } from 'rxjs';
import { Component, Input, OnInit, Output } from '@angular/core';
import {EventEmitter} from '@angular/core';
import { Email } from 'src/app/models/email';
import { Store } from '@ngrx/store';
import { pluck } from 'rxjs/operators';
import { State } from '../../store/store';
import {Router} from '@angular/router';

import {LoadEmail, LoadEmails, RemoveEmail,SaveEmail,SetFilter} from '../../store/actions/email.actions';
@Component({
  selector: 'email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.scss'],
})
export class EmailListComponent implements OnInit {
  @Input() emails: Email[] | null = [];
  // @Output() removed = new EventEmitter<string>()
  @Output() edited = new EventEmitter<string>()
  @Output() archived = new EventEmitter<Email>()
  @Output() deleted = new EventEmitter<string>()
  @Output() toggledRead = new EventEmitter<Email>()
  @Output() toggledStar = new EventEmitter<Email>()
  // constructor() {}
  emails$: Observable<Email[]>;
  email$: Observable<Email | null>;
  isLoading$: Observable<boolean>;
  error$: Observable<string>;
  addingNew = false;
  filterBy$: Observable<object>;

  constructor(private store: Store<State>,private router: Router) {
    this.emails$ = this.store.select('emailState').pipe(pluck('emails'));
    // this.emails$ =  this.store.select(emailState.emailsToShow)
    this.email$ = this.store.select('emailState').pipe(pluck('email'));
    this.isLoading$ = this.store.select('emailState').pipe(pluck('isLoading'));
    this.error$ = this.store.select('emailState').pipe(pluck('error'));
    this.filterBy$ = this.store.select('emailState').pipe(pluck('filterBy'));
  }


  ngOnInit(): void {}
  // removeEmail(emailId: string) {
  //   console.log('EmailList Emitting removed to Parent');
  //   this.removed.emit(emailId)
  // }
  // editEmail(emailId: string) {
  //   console.log('EmailList Emitting edited to Parent');
  //   this.edited.emit(emailId)
  // }
  deleteEmail(emailId: string) {
    console.log('emailApp: dispatching remove');
    this.store.dispatch(new RemoveEmail(emailId));
  }
  // toggleRead(email: Email) {
  //   console.log('EmailList Emitting edited to Parent');
  //   this.toggledRead.emit(email)
  // }
  // toggleStar(email: Email) {
  //   console.log('EmailList Emitting edited to Parent');
  //   this.toggledStar.emit(email)
  // }
  replyEmail(emailId: string) {
    console.log('emailApp: dispatching remove');
    this.store.dispatch(new LoadEmail(emailId));
  }

  editEmail(emailId: string) {
    console.log('emailApp: dispatching load email (for edit)');
    this.store.dispatch(new LoadEmail(emailId));
    this.router.navigate([`email/${emailId}`]);
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
