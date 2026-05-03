import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../Services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  isEditMode = false;
  productId?: number;
  loading = false;

  constructor(
    private fb: FormBuilder,
    public productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      active: [true],
      images: [[]]
    });
  }

  imageUrl: string = '';

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.loading = true;
      this.productService.uploadImage(file).subscribe({
        next: (response) => {
          const currentImages = this.productForm.get('images')?.value || [];
          this.productForm.get('images')?.setValue([...currentImages, response.url]);
          this.loading = false;
          this.snackBar.open('Image uploaded', 'Close', { duration: 2000 });
        },
        error: () => {
          this.snackBar.open('Error uploading image', 'Close', { duration: 3000 });
          this.loading = false;
        }
      });
    }
  }

  addImage() {
    if (this.imageUrl) {
      const currentImages = this.productForm.get('images')?.value || [];
      this.productForm.get('images')?.setValue([...currentImages, this.imageUrl]);
      this.imageUrl = '';
    }
  }

  removeImage(index: number) {
    const currentImages = this.productForm.get('images')?.value || [];
    currentImages.splice(index, 1);
    this.productForm.get('images')?.setValue([...currentImages]);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.productId = id;
      this.loadProduct(id);
    }
  }

  loadProduct(id: number) {
    this.productService.getProductById(id).subscribe({
      next: (product) => this.productForm.patchValue(product),
      error: () => this.snackBar.open('Error loading product', 'Close', { duration: 3000 })
    });
  }

  onSubmit() {
    if (this.productForm.invalid) return;

    this.loading = true;
    const request = this.isEditMode 
      ? this.productService.updateProduct(this.productId!, this.productForm.value)
      : this.productService.createProduct(this.productForm.value);

    request.subscribe({
      next: () => {
        this.snackBar.open(`Product ${this.isEditMode ? 'updated' : 'created'}`, 'Close', { duration: 3000 });
        this.router.navigate(['/seller/products']);
      },
      error: () => {
        this.snackBar.open('Error saving product', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }
}
