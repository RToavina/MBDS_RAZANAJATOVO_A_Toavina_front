import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../../../shared/auth.service";
import {User} from "../../../shared/model/user";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  titre = 'Assignments Management';
  name?: string;
  user?: User| null;

  @Output()
  sideNavToggle = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUser();
    this.authService.userSubject.subscribe(u=> this.user = u);
  }

  onToggleSidenav() {
    this.sideNavToggle.emit();
  }
}
