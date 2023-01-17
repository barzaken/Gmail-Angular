import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SetFilter } from '../../store/actions/item.actions';
import { pluck } from 'rxjs/operators';
import { State } from '../../store/store';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit { 
  filterBy= {txt:''}
  constructor(private store: Store<State>,private router: Router,private route: ActivatedRoute) {
    // this.filterBy$ = this.store.select('itemState').pipe(pluck('filterBy'));
  }
  setFilter(){
    let newFilter = {txt:this.filterBy.txt ,category:''}
    this.store.dispatch(new SetFilter(newFilter));
  }
  ngOnInit(): void {

  }

}
