import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    HeaderComponent,
    SidenavComponent
  ],
    imports: [
        CommonModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        RouterModule,
    ],
  exports: [
    HeaderComponent,
    SidenavComponent
  ]
})
export class NavigationModule { }
