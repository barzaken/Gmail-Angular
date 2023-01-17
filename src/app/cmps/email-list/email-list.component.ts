import { Observable, filter } from 'rxjs';
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
  emailsToShow:Email[] = []
  currFilter:any = {}
  constructor(private store: Store<State>,private router: Router) {
    this.emails$ = this.store.select('emailState').pipe(pluck('emails'));
    // this.emails$ =  this.store.select(emailState.emailsToShow)
    this.email$ = this.store.select('emailState').pipe(pluck('email'));
    this.isLoading$ = this.store.select('emailState').pipe(pluck('isLoading'));
    this.error$ = this.store.select('emailState').pipe(pluck('error'));
    this.filterBy$ = this.store.select('emailState').pipe(pluck('filterBy'));
  }


  ngOnInit(): void {
    this.emails$.pipe().subscribe(emails => this.emailsToShow = JSON.parse(JSON.stringify(emails)) )
    this.filterBy$.pipe().subscribe(filter => this.currFilter = JSON.parse(JSON.stringify(filter)) )
  }

  filteredEmails(){
    console.log('working',this.emailsToShow,this.currFilter);
    if(this.currFilter.txt){
      let regex = new RegExp(this.currFilter.txt,'i')
      return this.emailsToShow.filter(email => regex.test(email.subject) || regex.test(email.body) )
    }
    if(this.currFilter.category === 'star') return this.emailsToShow.filter(email => email.isStar)
    if(this.currFilter.category === 'draft') return this.emailsToShow.filter(email => email.isDraft)
    if(this.currFilter.category === 'sent') return this.emailsToShow.filter(email => email.from === 'me')
    return this.emailsToShow
  }

  deleteEmail(emailId: string) {
    console.log('emailApp: dispatching remove');
    this.store.dispatch(new RemoveEmail(emailId));
  }
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
