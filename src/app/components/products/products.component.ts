import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  total: number = 0;
  products: Product[] = [];
  today = new Date();

  constructor(
    public storeSvc: StoreService,
    private productsSvc: ProductsService
  ) {}

  ngOnInit(): void {
    this.productsSvc.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }

  onAddToShoppingCard(product: Product) {
    this.storeSvc.onAddToShoppingCard(product);
    this.total = this.storeSvc.getTotalShoppingCard();
  }
}
