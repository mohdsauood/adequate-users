import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationService } from 'src/app/common/service/pagination/pagination.service';
import { environment } from 'src/environments/environment';
import { UserRes } from '../model/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(
    private http: HttpClient,
    private paginationService: PaginationService
  ) {}

  getAllUsers(): Observable<UserRes> {
    console.log(
      'logging default session from storage',
      this.paginationService.getFromSessionStorage()
    );
    return this.http.get<UserRes>(
      environment.apiUrl +
        `/users?page=${this.paginationService.getFromSessionStorage()}`
    );
  }
}
