import { SetModal, SaveEmail, RemoveEmail, SetMsg } from '../../store/actions/email.actions';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Email } from 'src/app/models/email';
import { Store } from '@ngrx/store';
import { pluck } from 'rxjs/operators';
import { State } from '../../store/store';
import { LoadEmail } from '../../store/actions/email.actions';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

@Component({
  selector: 'email-details',
  templateUrl: './email-details.component.html',
  styleUrls: ['./email-details.component.scss']
})

export class EmailDetailsComponent implements OnInit, OnDestroy {
  email$: Observable<Email | null>;
  email: any
  id: any
  constructor(private store: Store<State>, private route: ActivatedRoute, private router: Router) {
    this.email$ = this.store.select('emailState').pipe(pluck('email'));
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new LoadEmail(this.id));
    this.email$.pipe().subscribe(email => this.email = JSON.parse(JSON.stringify(email)))
  }
  ngOnDestroy(): void {
    this.email.isRead = true
    this.store.dispatch(new SaveEmail({ ...this.email, isRead: true }));
  }

  deleteEmail() {
    if (this.email.removedAt) {
      this.store.dispatch(new RemoveEmail(this.email._id));
      this.store.dispatch(new SetMsg('Removed'));
      return
    }
    this.email.removedAt = Date.now()
    this.store.dispatch(new SaveEmail(this.email));
    this.store.dispatch(new SetMsg('Moved to trash'));

  }
  toggleRead() {
    this.email.isRead = !this.email.isRead
    this.store.dispatch(new SaveEmail(this.email))
    this.store.dispatch(new SetMsg(this.email.isRead ? 'Marked as read' : 'Marked as unread'));

  }
  archiveEmail() {
    this.email.isDraft = !this.email.isDraft
    this.store.dispatch(new SaveEmail(this.email))
    this.store.dispatch(new SetMsg('Moved to archive'));

  }
  replyEmail(emailId: string) {
    this.store.dispatch(new LoadEmail(emailId));
    this.store.dispatch(new SetModal(true));
  }

  goBack() {
    this.router.navigate([`email`])
  }
}
