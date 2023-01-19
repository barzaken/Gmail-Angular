import { Observable, filter } from 'rxjs';
import { Component, Input, OnInit, Output } from '@angular/core';
import {EventEmitter} from '@angular/core';
import { Email } from 'src/app/models/email';
import { Store } from '@ngrx/store';
import { pluck, skip } from 'rxjs/operators';
import { State } from '../../store/store';
import {Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

import {LoadEmail, RemoveEmail,SaveEmail,SetModal,SetMsg} from '../../store/actions/email.actions';
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
  onSubmit(form: NgForm) {
    if(form.value.all){
      Object.keys(form.value).forEach((key, index) => {
          form.value[key] = !form.value[key];
      });
    }
}

drop(event: CdkDragDrop<string[]>) {
  moveItemInArray(this.emailsToShow, event.previousIndex, event.currentIndex);
}

markAll(form: NgForm){
  Object.keys(form.value).map((key, index) => {
    let email
    if(Object.values(form.value)[index]){
      email = this.getById(key)
      if(email) {
         this.toggleRead(email)
        form.value[key] = false
      }
    }
});
}


deleteAll(form: NgForm){
  Object.keys(form.value).map((key, index) => {
    let email
    if(Object.values(form.value)[index]){
      email = this.getById(key)
      if(email) {
        this.deleteEmail(email)
      }
    }
});
}
archiveAll(form: NgForm){
  Object.keys(form.value).map((key, index) => {
    let email
    if(Object.values(form.value)[index]){
      email = this.getById(key)
      if(email) {
        this.archiveEmail(email)
      }
    }
});
}


getById(emailId: string){
  return this.emailsToShow.find(email => email._id === emailId)
}

  filteredEmails(){
    if(this.currFilter.txt){
      let regex = new RegExp(this.currFilter.txt,'i')
      return this.emailsToShow.filter(email => regex.test(email.subject) || regex.test(email.body) || regex.test(email.from) )
    }
    if(this.currFilter.category === 'star') return this.emailsToShow.filter(email => email.isStar)
    if(this.currFilter.category === 'draft') return this.emailsToShow.filter(email => email.isDraft)
    if(this.currFilter.category === 'sent') return this.emailsToShow.filter(email => email.from === 'me')
    if(this.currFilter.category === 'trash') return this.emailsToShow.filter(email => email.removedAt)
    return this.emailsToShow.filter(email => !email.removedAt && !email.isDraft )
  }

  deleteEmail(email: Email) {
    console.log('emailApp: dispatching remove');
    let emailToSave =  JSON.parse(JSON.stringify(email));
    if(emailToSave.removedAt){
          this.store.dispatch(new RemoveEmail(emailToSave._id));
          this.store.dispatch(new SetMsg('Removed'));
          return
    }
    emailToSave.removedAt = Date.now()
    this.store.dispatch(new SaveEmail(emailToSave));
    this.store.dispatch(new SetMsg('Moved to trash'));

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
    console.log('heeyy !!!',email);
    let emailToSave =  JSON.parse(JSON.stringify(email));
    emailToSave.isRead = !emailToSave.isRead
    this.store.dispatch(new SaveEmail(emailToSave));
    this.store.dispatch(new SetMsg(emailToSave.isRead ?'Marked as read' : 'Marked as unread'));
  }

  archiveEmail(email: Email){
    let emailToSave =  JSON.parse(JSON.stringify(email));
    emailToSave.isDraft = !emailToSave.isDraft
    this.store.dispatch(new SaveEmail(emailToSave));
    this.store.dispatch(new SetMsg('Moved to archive'));
  }

}
