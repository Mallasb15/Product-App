import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    //selector: "pm-products",
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit{

  pageTitle: string = " Product List";
  imageWidth: number = 25;
  imageMargin: number = 25;
  showImage: boolean = false;
  errorMessage = '';
  
  _listFilter: string;
  
  get listFilter():string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }
  
  filteredProducts: IProduct[];
  
  products: IProduct[] = [];

  /**
   * constructor
   */
  constructor (private productService: ProductService){

  }
  
  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      
      next: products =>{
        this.products = products
        this.filteredProducts = this.products
      },
      error: err => this.errorMessage = err
    });
  }
  
  /**
   * This message is the message that we get from clicking the stars.
   * @param message 
   */
  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }

  /**
   * Method to filer the name of product from array of product  object.
   * @param filterBy 
   */
  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
  /**
   * This method changes the state of the showImage property
   */    
  toggleImage(): void {
    this.showImage = !this.showImage
    console.log(this.showImage);
  }   
}