import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PaginationService } from 'src/app/common/service/pagination/pagination.service';
import { UserFormType } from '../../enums/formTypeEnum';
import { User } from '../../model/user/user.model';
import {
  getUsers,
  setDefaultPagination,
  setSelectedUser,
  setUserFormType,
} from '../../store/action/dashboard.actions';
import {
  selectTotalUsersPages,
  selectUsers,
} from '../../store/selector/dashboard.selector';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private store: Store,
    private paginationService: PaginationService,
    private modalService: NgbModal
  ) {}
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'location',
    'createdat',
    'actions',
  ];
  dataSource!: MatTableDataSource<any>;
  usersLength!: number;
  page = 1;
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {
    console.log('running ng on init of dashboard ');
    this.store.dispatch(setDefaultPagination({ pagination: 1 }));
    this.getUsers();
    this.selectUsers();
    this.selectTotalUsersPages();
  }

  getUsers() {
    this.store.dispatch(getUsers());
  }
  selectUsers() {
    this.store.select(selectUsers).subscribe((users) => {
      this.dataSource = new MatTableDataSource(users as any);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  selectTotalUsersPages() {
    this.store.select(selectTotalUsersPages).subscribe((userPages) => {
      this.usersLength = userPages as number;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  updatePagination() {
    this.paginationService.setToSessionStorage({
      pagination: this.page,
    });
    this.getUsers();
  }

  editUser(user: User) {
    this.store.dispatch(setSelectedUser({ user }));
    this.store.dispatch(setUserFormType({ formType: UserFormType.EDIT }));
    const modalRef = this.modalService.open(UserFormComponent, {
      centered: true,
    });
  }

  deleteUser(x: any) {}
}
