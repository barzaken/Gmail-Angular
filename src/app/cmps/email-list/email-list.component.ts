import { Observable, filter } from 'rxjs';
import { Component, Input, OnInit, Output } from '@angular/core';
import {EventEmitter} from '@angular/core';
import { Email } from 'src/app/models/email';
import { Store } from '@ngrx/store';
import { pluck } from 'rxjs/operators';
import { State } from '../../store/store';
import {Router} from '@angular/router';

import {LoadEmail, RemoveEmail,SaveEmail,SetModal} from '../../store/actions/email.actions';
@Component({
  selector: 'email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.scss'],
})
export class EmailListComponent implements OnInit {
  @Input() emails: Email[] | null = [];
  @Output() edited = new EventEmitter<string>()
  @Output() archived = new EventEmitter<Email>()
  @Output() deleted = new EventEmitter<string>()
  @Output() toggledRead = new EventEmitter<Email>()
  @Output() toggledStar = new EventEmitter<Email>()

  emails$: Observable<Email[]>;
  filterBy$: Observable<object>;
  emailsToShow:Email[] = []
  currFilter:any = {}

  constructor(private store: Store<State>,private router: Router) {
    this.emails$ = this.store.select('emailState').pipe(pluck('emails'));
    this.filterBy$ = this.store.select('emailState').pipe(pluck('filterBy'));
  }


  ngOnInit(): void {
    this.emails$.pipe().subscribe(emails => this.emailsToShow = JSON.parse(JSON.stringify(emails)) )
    this.filterBy$.pipe().subscribe(filter => this.currFilter = JSON.parse(JSON.stringify(filter)) )
  }

  filteredEmails(){
    if(this.currFilter.txt){
      let regex = new RegExp(this.currFilter.txt,'i')
      return this.emailsToShow.filter(email => regex.test(email.subject) || regex.test(email.body) )
    }
    if(this.currFilter.category === 'star') return this.emailsToShow.filter(email => email.isStar)
    if(this.currFilter.category === 'draft') return this.emailsToShow.filter(email => email.isDraft)
    if(this.currFilter.category === 'sent') return this.emailsToShow.filter(email => email.from === 'me')
    if(this.currFilter.category === 'trash') return this.emailsToShow.filter(email => email.removedAt)
    return this.emailsToShow.filter(email => !email.removedAt)
  }

  deleteEmail(email: Email) {
    console.log('emailApp: dispatching remove');
    let emailToSave =  JSON.parse(JSON.stringify(email));
    if(emailToSave.removedAt){
          this.store.dispatch(new RemoveEmail(emailToSave._id));
          return
    }
    emailToSave.removedAt = Date.now()
    this.store.dispatch(new SaveEmail(emailToSave));
  }

  replyEmail(emailId: string) {
    console.log('emailApp: dispatching remove');
    this.store.dispatch(new LoadEmail(emailId));
    this.store.dispatch(new SetModal(true));
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

}
