import {Component, OnInit} from '@angular/core';
import {ToolbarService} from "../services/toolbar.service";
import SpotifyService from "../services/spotify.service";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private ToolbarService: ToolbarService, private SpotifyService: SpotifyService, private AuthService: AuthService) {
  }

  ngOnInit() {
    this.ToolbarService.setTitle('Login');
  }

  loginSpotify() {
    this.SpotifyService.login().subscribe(
      token => {
        console.log(token);
        this.SpotifyService.getCurrentUser()
          .subscribe(data=> {
              console.log("getCurrentUser: ", data);
              this.AuthService.authWithWorker(data.id + '_spotify', token)
                .subscribe(res => {
                  console.log(res);
                });
            },
            err=> console.error(err));

      },
      err => console.error(err),
      () => {
      });
  }

  loginAnonymous() {

  }

  waitSpotify() {
    setTimeout(function () {
      console.log(localStorage.getItem('spotify-token'));
      var spotToke = localStorage.getItem('spotify-token');
      if (spotToke === 'null') {
        this.waitSpotify();
      } else {
        this.SpotifyService.setAuthToken(spotToke);
        this.SpotifyService.getCurrentUser().subscribe(data => {
          console.log(data);
        });
        // Spotify.setAuthToken(spotToke);
        // Spotify.getCurrentUser().then(function (data) {
        //   console.log(data);
        //   var uid = data.id + '_spotify';
        //   $http({
        //     url: 'https://api.echelonapp.io:8081/spotify-auth/',
        //     method: 'POST',
        //     data: {
        //       'uid': uid,
        //       'access_token': spotToke
        //     },
        //     headers: {
        //       'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        //     }
        //   }).success(function (response) {
        //     console.log(response);
        //     Auth.$authWithCustomToken(response).then(redirect(data), showError);
        //   });

        // $http.post("https://api.echelonapp.io:8081/spotify-auth/", {
        //     'uid': data['id'],
        //     'access_token': spotToke
        //   })
        //   .success(function(response) {
        //     Auth.$authAnonymously({
        //       rememberMe: true
        //     }).then(redirect, showError);
        //   });
        //     });
      }
    }, 1500);

  }
}
