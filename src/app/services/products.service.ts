import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
} from '../models/product.model';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { checkTime } from '../interceptors/time.interceptor';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private url = `${environment.API_URL}/api/products`;
  readonly productInit = {
    id: '',
    title: '',
    price: 0,
    description: '',
    category: { id: '', name: '', typeImg: '' },
    images: [],
  };

  constructor(private http: HttpClient) {}

  getAll(limit: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset != undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http
      .get<Product[]>(this.url, { params })
      .pipe(
        map((products) =>
          products.map((item) => ({ ...item, taxes: item.price * 0.19 }))
        )
      );
  }

  getById(id: string) {
    return this.http.get<Product>(`${this.url}/${id}`, {
      context: checkTime(), // <- a la peticion le decimos que si queremos medirla con el interceptor de tiempo
    });
  }

  create(dto: CreateProductDTO) {
    return this.http.post<Product>(this.url, dto);
  }

  update(id: string, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${this.url}/${id}`, dto);
  }

  delete(id: string) {
    return this.http.delete<boolean>(`${this.url}/${id}`);
  }
}
