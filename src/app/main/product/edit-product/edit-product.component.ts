import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { productDetails } from 'src/app/models/productDetails.model';
import { productListService } from 'src/app/services/productList.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  public pageTitle:string = "Add Product";
  public productDetails: productDetails;
  constructor(private route: ActivatedRoute,
              private router:Router,
              private dataService: productListService, 
              private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.route.snapshot.params.id !== "new") {
      this.productDetails = this.dataService.data[this.route.snapshot.params.id];
      this.pageTitle = "Edit Product";
    } else {
      this.productDetails = { productId: null, productName: "", productPrice: null, productCategory:"", productDescription:"",productImage:"" };
    }
  }

  public onSubmit(){
    if (this.route.snapshot.params.id !== "new") {
      this.dataService.updateProduct(this.route.snapshot.params.id,this.productDetails).subscribe(response=>
      {
        // console.log(response);  
        this.toastr.success('Product Updated Successfully'); 
        this.router.navigateByUrl('/products');
      });
    } else {
      this.dataService.addProduct(this.productDetails).subscribe(response=>
        {
          // console.log(response);
          this.toastr.success('New Product Added Successfully');           
          this.router.navigateByUrl('/products');
        });
    }
  }

}
