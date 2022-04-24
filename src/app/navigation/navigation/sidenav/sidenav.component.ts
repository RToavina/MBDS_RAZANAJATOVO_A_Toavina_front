import {Component, OnInit, ViewChild,} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {AuthService} from "../../../shared/auth.service";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  toggleSidenav() {
    this.sidenav.toggle();
  }

  logout() {
    this.authService.logout();
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
