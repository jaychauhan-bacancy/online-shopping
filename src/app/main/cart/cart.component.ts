import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { productDetails } from 'src/app/models/productDetails.model';
import { productListService } from 'src/app/services/productList.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public cartProducts:[{}];
  public productData: productDetails[] = [];
  public isError: boolean=false;
  public errorMsg:string=null;
  public isLoading:boolean=false;

  constructor(private dataService: productListService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.isLoading=true;
    this.getCartData(1);
    
  }

  public getCartData(id:number):void
  {
    this.dataService.getCartData(id).subscribe(response => {
      this.cartProducts = response['products'];
    }, error =>{
        this.isError=true;
        this.errorMsg=error.message;
    });

    this.dataService.getAllProducts().subscribe(response => {
      // console.log(response);
      for (let i = 0; i < Object.keys(response).length; i++) {
        this.productData.push({ 
          productId: response[i]['id'], 
          productName: response[i]['title'], 
          productPrice: response[i]['price'], 
          productCategory: response[i]['category'],
          productDescription : response[i]['description'],
          productImage : response[i]['image'] 
        });
      }
  }, error =>{
    this.isError=true;
    this.errorMsg=error.message;
  });  
      this.isLoading=false;
  }

  public deleteFromCart(id:number):void
  {
    // this.dataService.deleteFromCart();
    this.cartProducts.splice(id,1);
    this.toastr.error('Product deleted from Cart successfully');  
  }

  public decreaseQuantity(id:number):void
  {
    this.cartProducts[id]['quantity']--;
    this.toastr.info('One Item is decresed','Website Says:');
  
  }
  
  public increaseQuantity(id:number):void
  {
    this.cartProducts[id]['quantity']++;
    this.toastr.info('One Item is Incresed','Website Says:');
  }
}
