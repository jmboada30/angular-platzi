import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../core/services/products.service';
import { switchMap, tap } from 'rxjs/operators';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  productId: string | null = null;
  categoryId: string = '';
  products: Product[] = [];
  limit = 3;
  offset = 0;

  constructor(
    private route: ActivatedRoute,
    private productsSvc: ProductsService
  ) {}

  ngOnInit(): void {
    this.getProductsByCatergory();
    this.route.queryParams.subscribe(
      (params) => (this.productId = params.product)
    );
  }

  getProductsByCatergory() {
    this.route.params
      .pipe(
        tap((params) => (this.categoryId = params.id)),
        switchMap(() => {
          if (!this.categoryId) return [];
          return this.productsSvc.getByCategoryID(
            this.categoryId,
            this.limit,
            this.offset
          );
        })
      )
      .subscribe((products) => (this.products = products));
  }

  loadMore() {
    this.productsSvc.getAll(this.limit, this.offset).subscribe((data) => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }
}
