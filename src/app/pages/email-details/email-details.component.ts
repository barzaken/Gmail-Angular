import { SetModal, SaveEmail,RemoveEmail } from '../../store/actions/email.actions';
import { Component,OnInit,OnDestroy } from '@angular/core';
import { Email } from 'src/app/models/email';
import { Store } from '@ngrx/store';
import { pluck } from 'rxjs/operators';
import { State } from '../../store/store';
import {LoadEmail} from '../../store/actions/email.actions';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-email-details',
  templateUrl: './email-details.component.html',
  styleUrls: ['./email-details.component.scss']
})
export class EmailDetailsComponent implements OnInit,OnDestroy{
  email$: Observable<Email | null>;
  email: any
  id: any
  constructor(private store: Store<State>, private route: ActivatedRoute,private router: Router) {
    this.email$ = this.store.select('emailState').pipe(pluck('email'));
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new LoadEmail(this.id));
    this.email$.pipe().subscribe(email => this.email = JSON.parse(JSON.stringify(email))) 
  }
  ngOnDestroy(): void {
    this.email.isRead = true
    this.store.dispatch(new SaveEmail(this.email));
  }

  deleteEmail() {
    console.log('emailApp: dispatching remove');
    if(this.email.removedAt){
      this.store.dispatch(new RemoveEmail(this.email._id));
      return
    }
    this.email.removedAt = Date.now()
    this.store.dispatch(new SaveEmail(this.email));
  }
  toggleRead(){
    this.email.isRead = !this.email.isRead
    this.store.dispatch(new SaveEmail(this.email))
  }
  archiveEmail(){
    this.email.isDraft = !this.email.isDraft
    this.store.dispatch(new SaveEmail(this.email))
  }
  replyEmail(emailId: string) {
    console.log('emailApp: dispatching remove');
    this.store.dispatch(new LoadEmail(emailId));
    this.store.dispatch(new SetModal(true));
  }


  goBack(){
    this.router.navigate([`email`])
  }
}
