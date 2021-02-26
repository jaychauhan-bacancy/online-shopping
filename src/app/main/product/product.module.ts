import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { RouterModule } from '@angular/router';
import { EditProductComponent } from './edit-product/edit-product.component';
import { SharedModule } from 'src/app/core/loading-spinner/shared.module';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { authGuard } from 'src/app/guards/auth.guard';

@NgModule({
  declarations: [ProductComponent,EditProductComponent],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: ProductComponent
      },
      {
        path: 'edit/:id', component: EditProductComponent, canActivate:[authGuard]
      }
    ]),
    SharedModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ]
})
export class ProductModule { }
