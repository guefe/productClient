import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductService } from './services/product/product.service';
import { MessagesComponent } from './components/messages/messages.component';
import { MessageService } from './services/message/message.service';
import { AppRoutingModule } from './app-routing.module';
import { TokenService } from './services/token/token.service';
import { SessionService } from './services/session/session.service';

import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [ //Components
    AppComponent,
    ProductsComponent,
    ProductDetailComponent,
    MessagesComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ModalModule.forRoot()
  ],
  providers: [ProductService, MessageService, TokenService, SessionService], // Services
  bootstrap: [AppComponent]
})
export class AppModule { }
