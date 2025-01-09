import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: LayoutComponent,
    children: [
      {
        path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      }
    ]
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Main route
  { path: '**', redirectTo: 'dashboard' } // Default redirect
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
