import {Component, ViewEncapsulation, NgZone} from '@angular/core';
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
  window = {
    width: 0,
    height: 0
  }
  navButtons = [
    {
      icon: "home",
      text: "Home",
      location: "/"
    },
    {
      icon: "group",
      text: "Group",
      location: "/g"
    },
    {
      icon: "account",
      text: "Account",
      location: "/account"
    }
  ];

  constructor(private router: Router, private ngZone: NgZone) {
    window.onresize = (e) => {
      this.setWindowSize();
    };
    this.setWindowSize();
  }

  setWindowSize() {
    this.ngZone.run(() => {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    });
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
