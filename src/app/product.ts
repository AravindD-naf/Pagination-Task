import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  getProducts(limit: number, skip: number): Observable<any> {
    const url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}&select=title,price`;
    return this.http.get<any>(url);
  }
}