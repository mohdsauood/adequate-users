import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getUsers,
  setDefaultPagination,
} from '../../store/action/dashboard.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    console.log('running ng on init of dashboard ');
    this.store.dispatch(setDefaultPagination({ pagination: 1 }));
    this.store.dispatch(getUsers());
  }
}
