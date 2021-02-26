import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { authGuard } from './guards/auth.guard';
import { LoggedInGuard } from './guards/loggedin.guard';

const routes: Routes = [
  {
    path:'',redirectTo:'/auth',pathMatch:'full'
  },
  {
    path:'auth',
    canActivate:[LoggedInGuard],
    loadChildren:()=>
      import(
        './auth/auth.module'
      ).then((m)=>m.AuthModule),
  },
  {
    path:'cart',
    canActivate:[authGuard],
    loadChildren:()=>
      import(
        './main/cart/cart.module'
      ).then((m)=>m.CartModule),
  },
  {
    path:'products',
    canActivate:[authGuard],
    loadChildren:()=>
      import(
        './main/product/product.module'
      ).then((m)=>m.ProductModule),
  },
  {
    path:'**',
    component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
