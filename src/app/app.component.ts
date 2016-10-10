import {Component, ViewEncapsulation, NgZone, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ViewChild} from "@angular/core/src/metadata/di";
import {MdSidenav} from "@angular/material";
import {ToolbarService} from "./services/toolbar.service";
import {AuthService} from "./services/auth.service";
import SpotifyService from "./services/spotify.service";

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MdSidenav;
  loading = false;
  userData = {username: 'not signed in'};
  window = {
    width: 0,
    height: 0
  };
  toolbar = {
    title: 'Echelon'
  };
  state = {
    loggedIn: false
  };
  navButtons = [
    {
      icon: "home",
      text: "Home",
      location: "/"
    },
    {
      icon: "queue_music",
      text: "Group",
      location: "/g"
    },
    {
      icon: "person",
      text: "Account",
      location: "/account"
    }
  ];

  constructor(private router: Router, private ngZone: NgZone, private ToolbarService: ToolbarService, private AuthService: AuthService, private SpotifyService: SpotifyService) {
    window.onresize = (e) => {
      this.setWindowSize();
    };
    this.setWindowSize();
    AuthService.af.auth.subscribe(user => {
      this.state.loggedIn = user != undefined;
      console.log('user logged in', user != undefined);
    });
    ToolbarService.title$.subscribe(
      api => {
        console.log(api);
        this.toolbar.title = api;
      });
  }

  ngOnInit() {
    let origin = document.location.origin;
    let redirectUri;
    if (origin.indexOf(atob('bG9jYWxob3N0')) > -1) {
      redirectUri = origin + atob('L3Nwb3RpZnktY2FsbGJhY2suaHRtbA==');
    } else {
      redirectUri = atob('aHR0cHM6Ly9lY2hlbG9uYXBwLmlvL3Nwb3RpZnktY2FsbGJhY2suaHRtbA==');
    }
    let spotifyConfig = {
      clientId: atob('OGI4MWUzZGVkZGNlNDJjNGIwZjI5NzJlMTgxYjhhM2E='),
      scope: 'user-read-private user-read-email playlist-read-private playlist-read-collaborative',
      redirectUri: redirectUri,
      apiBase: 'https://api.spotify.com/v1'
    }
    this.SpotifyService.setConfig(spotifyConfig);
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
