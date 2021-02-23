import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { productDetails } from 'src/app/models/productDetails.model';
import { productListService } from 'src/app/services/productList.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public data: productDetails[] = [];
  stringifiedData: any;
  public searchString: string;
  public isError: boolean = false;
  public errorMsg: string = null;
  public isLoading: boolean = true;
  filterTerm: string;
  public pageNumber: number = 1;

  constructor(private http: HttpClient, 
              private dataService: productListService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.dataService.getAllProducts().subscribe(response => {

      for (let i = 0; i < Object.keys(response).length; i++) {
        this.data.push({
          productId: response[i]['id'],
          productName: response[i]['title'],
          productPrice: response[i]['price'],
          productCategory: response[i]['category'],
          productDescription: response[i]['description'],
          productImage: response[i]['image']
        });
      }
      this.dataService.data = this.data;
      // console.log("service data :::"+ this.data);
    }, error => {
      this.isError = true;
      this.errorMsg = error.message;
    });
    this.toastr.success("Let's Crash the Market","Login Success:")
    this.isLoading = false;
  }

  public addToCart(id: number): void {
    this.dataService.addToCart(id).subscribe(response => {
      this.toastr.success('Product Added to cart successfully');  
    }, error => {
      this.isError = true;
      this.errorMsg = error.message;
    });
  }

  public deleteProduct(id: number): void {
    if (confirm("Delete this Product?")) {
      this.dataService.deleteProduct(id).subscribe(response => {
        //this.data.splice(id, 1);
        this.data=this.data.filter(
          (value)=>value.productId!==id
        );
        this.toastr.success('Product deleted from Cart successfully');   
      });
    }
  }

  resetPage(){
    this.pageNumber=1;
  }

  ngOnDestroy() {
    //this.dataService.unsubscribe();
  }
}
