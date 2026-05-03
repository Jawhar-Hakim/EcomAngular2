import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/Services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css']
})
export class CategoryManagementComponent implements OnInit {
  categories: any[] = [];
  loading = true;
  categoryForm: FormGroup;
  isEditMode = false;
  selectedCategoryId?: number;
  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];

  constructor(
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.loading = true;
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.loading = false;
      },
      error: () => {
        this.snackBar.open('Error loading categories', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.categoryForm.invalid) return;

    const action = this.isEditMode 
      ? this.categoryService.updateCategory(this.selectedCategoryId!, this.categoryForm.value)
      : this.categoryService.createCategory(this.categoryForm.value);

    action.subscribe({
      next: () => {
        this.snackBar.open(`Category ${this.isEditMode ? 'updated' : 'created'} successfully`, 'Close', { duration: 2000 });
        this.resetForm();
        this.loadCategories();
      },
      error: (err) => {
        this.snackBar.open(err.error?.message || 'Error saving category', 'Close', { duration: 3000 });
      }
    });
  }

  editCategory(category: any): void {
    this.isEditMode = true;
    this.selectedCategoryId = category.id;
    this.categoryForm.patchValue({
      name: category.name,
      description: category.description
    });
  }

  deleteCategory(id: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => {
          this.snackBar.open('Category deleted', 'Close', { duration: 2000 });
          this.loadCategories();
        },
        error: (err) => {
          this.snackBar.open(err.error?.message || 'Error deleting category', 'Close', { duration: 3000 });
        }
      });
    }
  }

  resetForm(): void {
    this.isEditMode = false;
    this.selectedCategoryId = undefined;
    this.categoryForm.reset();
  }
}
