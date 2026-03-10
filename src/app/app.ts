import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductsService, Product } from './products.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './app.html',
})
export class AppComponent implements OnInit {
  private readonly productsService = inject(ProductsService);

  products: Product[] = [];
  page = 1;
  pageSize = 10;
  total = 0;

  loading = false;
  error: string | null = null;

  
  get totalPages(): number {
      return this.pageSize > 0 ? Math.ceil(this.total / this.pageSize) : 0;
    }


  ngOnInit(): void {
    this.loadPage(this.page);
  }

  loadPage(page: number): void {
    this.loading = true;
    this.error = null;

    this.productsService.getProducts(page, this.pageSize).subscribe({
      next: (res) => {
        this.products = res.products;
        this.total = res.total;
        this.page = page;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load products. Please try again.';
        this.loading = false;
      },
    });
  }

  onPageChange(newPage: number): void {
    this.loadPage(newPage);
  }
}
