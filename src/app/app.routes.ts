import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./other/auth.gaurd";
const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  // {path: 'models/users', component: UserHome, canActivate: [AuthGuard]}
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(appRoutes);
