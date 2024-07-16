import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { AddRoutePage } from './add-route.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {RouterModule} from "@angular/router";
import {AddRoutePageRoutingModule} from "./add-route-routing.module";

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddRoutePageRoutingModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: AddRoutePage
      }
    ])
  ],
  declarations: [AddRoutePage]
})
export class AddRoutePageModule {}
