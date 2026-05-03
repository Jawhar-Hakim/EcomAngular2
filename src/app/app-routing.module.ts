import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { ProductFormComponent } from './seller/product-form/product-form.component';
import {ProductListComponent} from "./seller/product-list/product-list.component";
import {ProductCatalogComponent} from "./customer/product-catalog/product-catalog.component";
import { CartComponent } from "./customer/cart/cart.component";
import { CustomerOrdersComponent } from "./customer/customer-orders/customer-orders.component";

import { HomeComponent } from './home/home.component';


import { UserManagementComponent } from './admin/user-management/user-management.component';
import { CategoryManagementComponent } from "./admin/category-management/category-management.component";
import { CouponManagementComponent } from "./admin/coupon-management/coupon-management.component";

import { SellerOrdersComponent } from './seller/seller-orders/seller-orders.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'admin/users',
    component: UserManagementComponent
  },
  {
    path: 'admin/categories',
    component: CategoryManagementComponent
  },
  {
    path: 'admin/coupons',
    component: CouponManagementComponent
  },
  {
    path: 'seller/orders',
    component: SellerOrdersComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'seller/add-product',
    component: ProductFormComponent
  },
  {
    path: 'seller/edit-product/:id',
    component: ProductFormComponent
  },
  {
    path: 'seller/products',
    component: ProductListComponent
  },
  {
    path: 'customer/catalog',
    component: ProductCatalogComponent
  },
  {
    path: 'customer/cart',
    component: CartComponent
  },
  {
    path: 'customer/orders',
    component: CustomerOrdersComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
