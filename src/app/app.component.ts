import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {ViewChild} from "@angular/core/src/metadata/di";
import {MdSidenav} from "@angular/material";

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  @ViewChild('sidenav') sidenav: MdSidenav;
  loading = false;
  userData = {username: 'not signed in'};
  appBar = {
    title: 'AppBar'
  }
  navButtons = [
    {
      icon: "home",
      text: "Home",
      location: "./"
    },
    {
      icon: "group",
      text: "Group",
      location: "./g"
    }
  ];

  constructor(private router: Router) {
  }

  toggleNavDrawer() {
    console.log('toggle nav');
    if (this.sidenav.opened) {
      this.sidenav.close();
    } else {
      this.sidenav.open();
    }
  }
}
