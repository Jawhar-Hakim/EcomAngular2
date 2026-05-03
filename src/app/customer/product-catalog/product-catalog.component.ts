import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../Services/product.service';
import { CategoryService } from '../../../Services/category.service';
import { CartService } from '../../../Services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.css']
})
export class ProductCatalogComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  loading = false;

  filters = {
    keyword: '',
    categoryId: null,
    minPrice: null,
    maxPrice: null
  };

  constructor(
    public productService: ProductService, 
    private categoryService: CategoryService,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe(data => this.categories = data);
  }

  loadProducts() {
    this.loading = true;
    const params: any = {};
    if (this.filters.keyword) params.keyword = this.filters.keyword;
    if (this.filters.categoryId) params.categoryId = this.filters.categoryId;
    if (this.filters.minPrice) params.minPrice = this.filters.minPrice;
    if (this.filters.maxPrice) params.maxPrice = this.filters.maxPrice;

    this.productService.getAllProducts(params).subscribe({
      next: (data) => {
        this.products = data.content || data;
        this.loading = false;
      },
      error: () => {
        this.snackBar.open('Error loading products', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  onFilterChange() {
    this.loadProducts();
  }

  addToCart(product: any) {
    this.cartService.addToCart(product.id, 1).subscribe({
      next: () => {
        this.snackBar.open('Added to cart', 'Close', { duration: 2000 });
      },
      error: (err) => {
        this.snackBar.open(err.error?.message || 'Error adding to cart', 'Close', { duration: 3000 });
      }
    });
  }
}
