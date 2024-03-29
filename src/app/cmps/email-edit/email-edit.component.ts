import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Email } from '../../models/email';
import { SaveEmail, SetMsg } from '../../store/actions/email.actions';
import { State } from '../../store/store';

@Component({
  selector: 'email-edit',
  templateUrl: './email-edit.component.html',
  styleUrls: ['./email-edit.component.scss']
})

export class EmailEditComponent implements OnInit {
  email$: Observable<Email | null>;
  email = { _id: '', subject: '', body: '', isDraft: false, isRead: false, isStar: false, removedAt: null, sentAt: 0, from: '', to: '' }
  @Output() saved = new EventEmitter();
  @Output() close = new EventEmitter();
  sub: Subscription | null = null;

  constructor(private store: Store<State>) {
    this.email$ = this.store.select('emailState').pipe(pluck('email'));
  }

  get emailEditState() {
    return (this.email._id) ? 'Reply' : 'Send'
  }

  ngOnInit(): void {
    this.sub = this.email$.subscribe(email => {
      if (email) {
        this.email = JSON.parse(JSON.stringify(email))
        this.email.subject = 'Reply: ' + this.email.subject
        this.email.to = this.email.from
      }
    })
  }

  saveEmail() {
    const regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'g')
    if (!regex.test(this.email.to)) {
      this.store.dispatch(new SetMsg('Please enter valid Email'));
      return
    }
    this.email.sentAt = Date.now()
    this.email.from = 'me'
    this.email._id = ''
    this.store.dispatch(new SaveEmail(this.email));
    this.store.dispatch(new SetMsg('Email sent'));
    this.saved.emit();
  }

  closeModal() {
    this.close.emit()
  }

  ngOnDestroy() {
    this.sub?.unsubscribe()
  }
}
