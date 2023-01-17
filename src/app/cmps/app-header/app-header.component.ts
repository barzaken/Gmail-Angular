import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SetFilter } from '../../store/actions/email.actions';
import { State } from '../../store/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})

export class AppHeaderComponent implements OnInit { 
  filterBy = {txt:''}
  constructor(private store: Store<State>,public router: Router) {}

  setFilter(){
    let newFilter = {txt:this.filterBy.txt ,category:''}
    this.store.dispatch(new SetFilter(newFilter));
  }
  ngOnInit(): void {

  }

}
