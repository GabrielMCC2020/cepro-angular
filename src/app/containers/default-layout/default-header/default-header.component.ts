import {Component, Input, OnInit} from '@angular/core';

import {ClassToggleService, HeaderComponent} from '@coreui/angular';
import {Router} from "@angular/router";
import {LogoutService} from "../../../providers/services";
import {UserService} from "../../../providers/services/oauth/user.service";
import {User} from "./model/user";

@Component({
  selector: 'app-default-header',
  styleUrls: ['./default-header.component.scss'],
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {

  @Input() sidebarId: string = "sidebar";
  public hour = new Date().getHours();

  public user = new User();

  constructor(private classToggler: ClassToggleService, private roter: Router, private logoutService: LogoutService, private userService: UserService) {
    super();
  }

  ngOnInit() {
    this.getUser();
  }

  public getUser(): void {
    this.userService.getAll$().subscribe(response => {
      this.user = response.data || {};
    });
  }

  public logout(): void {
    this.logoutService.getAll$().subscribe(response => {
      console.log(response);
    });
    localStorage.clear();
    this.roter.navigate(['login']);
  }
}
