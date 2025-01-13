import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeViewComponent } from './components/home-view/home-view.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    HomeViewComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatButtonModule
  ]
})
export class HomeModule { }
