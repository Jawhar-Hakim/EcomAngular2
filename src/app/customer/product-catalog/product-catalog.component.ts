import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../Services/product.service';
import { CartService } from '../../../Services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.css']
})
export class ProductCatalogComponent implements OnInit {
  products: any[] = [];
  loading = false;

  constructor(
    public productService: ProductService, 
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        // Backend returns Page object
        this.products = data.content || data;
        this.loading = false;
      },
      error: () => {
        this.snackBar.open('Error loading products', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
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
