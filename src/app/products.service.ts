import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  title: string;
  price: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly baseUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  getProducts(page: number, pageSize: number): Observable<ProductsResponse> {
    const skip = (page - 1) * pageSize;
    const params = new HttpParams()
      .set('limit', pageSize)
      .set('skip', skip)
      .set('select', 'title,price'); 

    return this.http.get<ProductsResponse>(this.baseUrl, { params });
  }
}