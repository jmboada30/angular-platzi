import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() product: Product = this.productSvc.productInit;
  @Output() addedProduct = new EventEmitter<Product>();
  @Output() showDetail = new EventEmitter<string>();

  constructor(private productSvc: ProductsService) {}

  onAddToCart() {
    this.addedProduct.emit(this.product);
  }

  onShowDetail() {
    this.showDetail.emit(this.product.id);
  }
}
