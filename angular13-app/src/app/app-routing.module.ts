import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { LoginComponent } from './login/components/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeViewComponent } from './home/components/home-view/home-view.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }, {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home', component: HomeViewComponent
      }, {
        path: '', redirectTo: '/home', pathMatch: 'full'
      }
    ]
  }, {
    path: '**', redirectTo: '/login'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
