import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path:'',redirectTo:'/auth',pathMatch:'full'
  },
  {
    path:'auth',
    loadChildren:()=>
      import(
        './auth/auth.module'
      ).then((m)=>m.AuthModule),
  },
  {
    path:'cart',
    loadChildren:()=>
      import(
        './main/cart/cart.module'
      ).then((m)=>m.CartModule),
  },
  {
    path:'products',
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
