import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NewsListComponent } from './news-list/news-list.component';
import { ModalComponent, ModalContentComponent } from './modal/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsListComponent,
    ModalComponent,
    ModalContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [],
  entryComponents: [ModalContentComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
