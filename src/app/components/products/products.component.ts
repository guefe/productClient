import { Component, OnInit } from '@angular/core';
import { Product } from '../../product';
import { ProductService } from '../../services/product/product.service'
import { MessageService } from '../../services/message/message.service'
import { Router } from '@angular/router';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe(products => {
        this.products = products;
        this.products.push({id:-1, name:"+", description: "", creationDate: new Date(), available: false, price: 1});
      });

  }

  showProduct(product: Product): void {
    console.log("Showing product "+product.id)
    if(product.id == -1){
      this.router.navigate([`/new`]);
    } else {
      this.router.navigate([`/detail/${product.id}`]);
    }
  }

  // onSelect(product: Product): void {
  //   this.selectedProduct = product
  //   this.messageService.add("Selected "+product.name)
  // }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.productService.addProduct({ name } as Product)
      .subscribe(product => {
        this.products.push(product);
      });
  }

  delete(product: Product): void {

    this.productService.deleteProduct(product).subscribe(
      ()=>this.products = this.products.filter(p => p !== product)
    );
  }

  onMouseOver(product: Product): void{
    console.log(product.name);
  }

}
