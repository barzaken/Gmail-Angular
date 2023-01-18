import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { State } from '../../store/store';

@Component({
  selector: 'user-msg',
  templateUrl: './user-msg.component.html',
  styleUrls: ['./user-msg.component.scss']
})
export class UserMsgComponent implements OnInit {

  msg$: Observable<string>;
  msg: string = ''

  ngOnInit() {
    this.msg$.pipe().subscribe(msg => msg.length ? this.openSnackBar(msg) : '')
  }

  constructor(private store: Store<State>, private _snackBar: MatSnackBar) {
    this.msg$ = this.store.select('emailState').pipe(pluck('msg'));
  }

  openSnackBar(msg: string) {
    console.log('new msg', msg);
    this._snackBar.open(msg, '', {
      duration: 3000,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }
}
