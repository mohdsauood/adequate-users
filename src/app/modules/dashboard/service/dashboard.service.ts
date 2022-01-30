import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationService } from 'src/app/common/service/pagination/pagination.service';
import { environment } from 'src/environments/environment';
import {
  AddUserReq,
  editUserReq,
  User,
  UserRes,
} from '../model/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(
    private http: HttpClient,
    private paginationService: PaginationService
  ) {}

  getAllUsers(): Observable<UserRes> {
    return this.http.get<UserRes>(
      environment.apiUrl +
        `/users?page=${this.paginationService.getFromSessionStorage()}`
    );
  }

  addUser(user: AddUserReq): Observable<User> {
    return this.http.post<User>(environment.apiUrl + `/users`, user);
  }

  editUser(user: editUserReq): Observable<User> {
    return this.http.put<User>(environment.apiUrl + `/users/${user.id}`, user);
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(environment.apiUrl + `/users/${id}`);
  }
}
