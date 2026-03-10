import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from './products.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html'
})
export class App implements OnInit {

  products: any[] = [];
  page = 1;
  limit = 10;
  totalProducts = 0;

  constructor(
    private productService: ProductService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {

    const skip = (this.page - 1) * this.limit;

    this.productService.getProducts(this.limit, skip)
      .subscribe((res:any) => {

        this.products = res.products;
        this.totalProducts = res.total;

        this.cd.detectChanges();

      });

  }

  nextPage() {

    if (this.page * this.limit < this.totalProducts) {
      this.page++;
      this.loadProducts();
    }

  }

  previousPage() {

    if (this.page > 1) {
      this.page--;
      this.loadProducts();
    }

  }

}