import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/modules/authentication/service/authentication.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLoginPage = false;
  isDashBoardPage = false;
  constructor(
    public router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((r) => r instanceof NavigationEnd))
      .subscribe((route) => {
        this.isLoginPage = (route as NavigationEnd).url.includes('login');
        this.isDashBoardPage = (route as NavigationEnd).url.includes('login');
      });
  }
  logout(): void {
    this.authenticationService.logout();
  }
}
