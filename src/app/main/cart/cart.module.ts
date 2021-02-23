import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/core/loading-spinner/shared.module';
import { FormsModule } from '@angular/forms';
import { authGuard } from 'src/app/guards/auth.guard';



@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:'',component:CartComponent, canActivate:[authGuard]
      }
    ]),
    SharedModule,
    FormsModule
  ]
})
export class CartModule { }
