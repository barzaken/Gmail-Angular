import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { SetFilter } from '../../store/actions/email.actions';
import { State } from '../../store/store';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})

export class AppHeaderComponent  {
  filterBy = { txt: '' }
  isHome = false
  isMenuOpen: boolean = false 
  constructor(private store: Store<State>, public router: Router, public location: Location) {
    router.events.subscribe(val => {
      if (location.path() === "/home") {
        this.isHome = true
      }
      else{
        this.isHome = false
      }
    });
  }

  setFilter() {
    let newFilter = { txt: this.filterBy.txt, category: '' }
    this.store.dispatch(new SetFilter(newFilter));
  }

}
