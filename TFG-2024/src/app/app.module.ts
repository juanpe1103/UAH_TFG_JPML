import { EditUserPageModule } from './edit-user/edit-user.module';
import { RegisterPageModule } from './register/register.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
/*import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';*/

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {AddRoutePageModule} from "./add-route/add-route.module";
import {DescModalComponent} from "./modal/desc.modal";
import {SearchRoutesModule} from "./search-routes/search-routes.module";
import {CommentaryModalComponent} from "./modal/commentary.modal";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RegisterPageModule,
    EditUserPageModule,
    AddRoutePageModule,
    DescModalComponent,
    CommentaryModalComponent,
    SearchRoutesModule,
    CommonModule
  ],
  providers: [
/*    StatusBar,
    SplashScreen,*/
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
