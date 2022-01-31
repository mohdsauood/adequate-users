import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/modules/authentication/service/authentication.service';
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFormComponent } from 'src/app/modules/dashboard/components/user-form/user-form.component';
import { selectDashboardisLoading } from 'src/app/modules/dashboard/store/selector/dashboard.selector';
import { selectAuthenticationIsLoading } from 'src/app/modules/authentication/store/selector/authentication.selector';
import { setUserFormType } from 'src/app/modules/dashboard/store/action/dashboard.actions';
import { UserFormType } from 'src/app/modules/dashboard/enums/formTypeEnum';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLoginPage = false;
  isDashBoardPage = false;
  isLoading: boolean = true;
  constructor(
    public router: Router,
    private authenticationService: AuthenticationService,
    private store: Store,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((r) => r instanceof NavigationEnd))
      .subscribe((route) => {
        this.isLoginPage = (route as NavigationEnd).url.includes('login');
        this.isDashBoardPage = (route as NavigationEnd).url.includes(
          'dashboard'
        );
      });
    this.listenToLoaders();
  }
  listenToLoaders() {
    this.store.select(selectDashboardisLoading).subscribe((showLoader) => {
      this.isLoading = showLoader;
    });
    this.store.select(selectAuthenticationIsLoading).subscribe((showLoader) => {
      this.isLoading = showLoader;
    });
  }
  logout(): void {
    this.authenticationService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  addUser(): void {
    this.store.dispatch(setUserFormType({ formType: UserFormType.ADD }));
    const modalRef = this.modalService.open(UserFormComponent, {
      centered: true,
    });
  }
}
