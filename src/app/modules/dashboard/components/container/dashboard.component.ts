import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../model/user/user.model';
import {
  getUsers,
  setDefaultPagination,
} from '../../store/action/dashboard.actions';
import { selectUsers } from '../../store/selector/dashboard.selector';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private store: Store) {}
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'location',
    'createdat',
    'actions',
  ];
  dataSource!: MatTableDataSource<any>;
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit(): void {
    console.log('running ng on init of dashboard ');
    this.store.dispatch(setDefaultPagination({ pagination: 1 }));
    this.fetchUsers();
    this.getUsers();
  }

  fetchUsers() {
    this.store.dispatch(getUsers());
  }
  getUsers() {
    this.store.select(selectUsers).subscribe((users) => {
      this.dataSource = new MatTableDataSource(users as any);
      // this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }
  editUser(x: any) {}

  deleteUser(x: any) {}
}
