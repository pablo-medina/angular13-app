import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AutoFocusDirective } from './directives/auto-focus.directive';

@NgModule({
  declarations: [
    LayoutComponent,
    AutoFocusDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatInputModule
  ],
  exports: [
    LayoutComponent,
    AutoFocusDirective
  ]
})
export class SharedModule { }
