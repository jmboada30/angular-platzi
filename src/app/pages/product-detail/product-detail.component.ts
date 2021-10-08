import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { tap, switchMap } from 'rxjs/operators';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  productId: string | null = null;
  product: Product | null = null;
  constructor(
    private route: ActivatedRoute,
    private productsSvc: ProductsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getProductsByCatergory();
  }

  getProductsByCatergory() {
    this.route.params
      .pipe(
        tap((params) => (this.productId = params.id)),
        switchMap(() => {
          if (!this.productId) return [null];
          return this.productsSvc.getOne(this.productId);
        })
      )
      .subscribe((product) => (this.product = product));
  }

  goToBack() {
    this.location.back();
  }
}
