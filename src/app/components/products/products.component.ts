import { Component, OnInit } from '@angular/core';
import {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
} from '../../models/product.model';
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
  showProductDetail = false;
  productChosen: Product = this.productsSvc.productInit;
  limit = 10;
  offset = 0;

  constructor(
    public storeSvc: StoreService,
    private productsSvc: ProductsService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  onAddToShoppingCard(product: Product) {
    this.storeSvc.onAddToShoppingCard(product);
    this.total = this.storeSvc.getTotalShoppingCard();
  }

  toggleDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  getProducts() {
    this.productsSvc.getAll(this.limit, this.offset).subscribe((products) => {
      this.products = this.products.concat(products);
      this.offset += this.limit;
    });
  }

  loadMoreProducts() {
    this.getProducts();
  }

  loadPrevProducts() {
    this.offset = this.limit - this.offset;
    this.getProducts();
  }

  showDetail(id: string) {
    this.productsSvc.getById(id).subscribe((product) => {
      this.toggleDetail();
      this.productChosen = product;
    });
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'Title',
      description: 'Description',
      categoryId: 1,
      images: [''],
      price: 1000,
    };

    this.productsSvc.create(product).subscribe((product) => {
      console.log(product);
      this.products.unshift(product);
    });
  }

  updateProduct() {
    const change: UpdateProductDTO = {
      title: 'Other Title',
    };

    const id = this.productChosen.id;

    this.productsSvc.update(id, change).subscribe((product) => {
      const productIdx = this.products.findIndex((item) => item.id === id);
      this.products[productIdx] = product;
      this.productChosen = product;
    });
  }

  deleteProduct() {
    const id = this.productChosen.id;

    this.productsSvc.delete(id).subscribe(() => {
      const productIdx = this.products.findIndex((item) => item.id === id);
      this.products.splice(productIdx, 1);
      this.showProductDetail = false;
    });
  }
}
