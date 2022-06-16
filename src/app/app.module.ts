import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddUserModule } from './components/add-user/add-user.module';
import { EditUserModule } from './components/edit-user/edit-user.module';
import { ChangeStatusModule } from './components/change-status/change-status.module';
import { DeleteUserModule } from './components/delete-user/delete-user.module';
import { ConfirmActionModule } from './components/confirm-action/confirm-action.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AddUserModule,
    EditUserModule,
    ChangeStatusModule,
    DeleteUserModule,
    ConfirmActionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
