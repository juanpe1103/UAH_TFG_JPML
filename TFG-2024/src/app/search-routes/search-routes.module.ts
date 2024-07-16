import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {SearchRoutesComponent} from "./search-routes.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: SearchRoutesComponent
      }
    ])
  ],
  declarations: [SearchRoutesComponent]
})
export class SearchRoutesModule {}
