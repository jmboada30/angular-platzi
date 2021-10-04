import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private _shoppingCart: Product[] = [];
  private myCart = new BehaviorSubject<Product[]>([]);
  myCart$ = this.myCart.asObservable();
  get shoppingCart(): Product[] {
    return this._shoppingCart;
  }

  constructor() {}

  onAddToShoppingCard(product: Product) {
    this._shoppingCart.push(product);
    this.myCart.next(this._shoppingCart);
  }

  getTotalShoppingCard(): number {
    return this._shoppingCart.reduce((sum, item) => sum + item.price, 0);
  }
}
