import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './shared/material.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductFormComponent } from './seller/product-form/product-form.component';
import {ProductListComponent} from "./seller/product-list/product-list.component";
import {ProductCatalogComponent} from "./customer/product-catalog/product-catalog.component";
import {CartComponent} from "./customer/cart/cart.component";
import { HomeComponent } from './home/home.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { SellerOrdersComponent } from './seller/seller-orders/seller-orders.component';
import {MatTableModule} from '@angular/material/table';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    ProductFormComponent,
    ProductListComponent,
    ProductCatalogComponent,
    CartComponent,
    HomeComponent,
    UserManagementComponent,
    SellerOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatTableModule,
    MatChipsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
