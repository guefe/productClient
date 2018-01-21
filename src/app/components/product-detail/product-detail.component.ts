import { Component, OnInit, Input} from '@angular/core';
import { Product } from '../../product';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService} from '../../services/product/product.service';
import { SessionService} from '../../services/session/session.service';
import { MessageService} from '../../services/message/message.service';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @Input() product: Product;
  action: string;
  canWrite: Boolean;

  constructor(
    private productService: ProductService,
    private sessionService: SessionService,
    private route: ActivatedRoute,
    private location: Location,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.sessionService.adminLogged$
      .subscribe(newValue => {
          this.canWrite = newValue;
        });

    if(this.location.path().includes("detail")){
      this.action = "edit";
      this.loadProduct();
    } else {
      this.action = "create";
      this.product = new Product();
    }
  }

  loadProduct(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(id)
      .subscribe(product => this.product = product);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.product.name  && this.product.price ){
      if(this.canWrite){
        if ("edit" === this.action){
          this.productService.updateProduct(this.product)
            .subscribe(() => this.goBack());
        } else{
          this.productService.addProduct(this.product)
            .subscribe(() => this.goBack());
        }

      } else {
        alert("NOT ALLOWED");
      }
    } else {
      this.messageService.add("Name and price are required.")
    }
 }

 delete(): void {
   this.productService.deleteProduct(this.product)
    .subscribe(() => {
      this.messageService.add("Deleted product "+ this.product.name )
      this.location.back()
    });

 }
}
