import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { State } from '../../store/store';
import { LoadEmails, SetFilter,SetModal } from '../../store/actions/email.actions';
import { Email } from '../../models/email';
import {Router} from '@angular/router';

@Component({
  selector: 'email-app',
  templateUrl: './email-app.component.html',
  styleUrls: ['./email-app.component.scss'],
})
export class EmailAppComponent implements OnInit {
  email$: Observable<Email | null>;
  addingNew = false;
  isAdding$:Observable<boolean>;
  filterBy$: Observable<object>;

  constructor(private store: Store<State> ,private router: Router) {
    this.email$ = this.store.select('emailState').pipe(pluck('email'));
    this.filterBy$ = this.store.select('emailState').pipe(pluck('filterBy'));
    this.isAdding$ = this.store.select('emailState').pipe(pluck('isAdding'));
  }
  //   onOutletLoaded(component:any) {
  //     console.log(component);
  //     // component.emails = this.emails$
  // } 
  ngOnInit(): void {
    console.log('emailApp: dispatching LoadEmails => effects');
    this.store.dispatch(new LoadEmails(''));
  }

  setFilter(filterBy: object) {
    console.log(filterBy);
    let newFilter = { txt: '', category: filterBy }
    this.store.dispatch(new SetFilter(newFilter));
    this.router.navigate(['email']);
  }

  toggleModal(mode: boolean){
    this.store.dispatch(new SetModal(mode));
  }
}
