import { Component, OnInit } from '@angular/core';
import { CouponService } from 'src/Services/coupon.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-coupon-management',
  templateUrl: './coupon-management.component.html',
  styleUrls: ['./coupon-management.component.css']
})
export class CouponManagementComponent implements OnInit {
  coupons: any[] = [];
  loading = true;
  couponForm: FormGroup;
  isEditMode = false;
  selectedCouponId?: number;
  displayedColumns: string[] = ['code', 'type', 'value', 'validUntil', 'usages', 'actions'];

  constructor(
    private couponService: CouponService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.couponForm = this.fb.group({
      code: ['', Validators.required],
      type: ['PERCENT', Validators.required],
      value: [0, [Validators.required, Validators.min(0)]],
      maxUsages: [100],
      expirationDate: ['', Validators.required],
      active: [true]
    });
  }

  ngOnInit(): void {
    this.loadCoupons();
  }

  loadCoupons(): void {
    this.loading = true;
    this.couponService.getAllCoupons().subscribe({
      next: (data) => {
        this.coupons = data;
        this.loading = false;
      },
      error: () => {
        this.snackBar.open('Error loading coupons', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.couponForm.invalid) return;

    const action = this.isEditMode 
      ? this.couponService.updateCoupon(this.selectedCouponId!, this.couponForm.value)
      : this.couponService.createCoupon(this.couponForm.value);

    action.subscribe({
      next: () => {
        this.snackBar.open(`Coupon ${this.isEditMode ? 'updated' : 'created'} successfully`, 'Close', { duration: 2000 });
        this.resetForm();
        this.loadCoupons();
      },
      error: (err) => {
        this.snackBar.open(err.error?.message || 'Error saving coupon', 'Close', { duration: 3000 });
      }
    });
  }

  editCoupon(coupon: any): void {
    this.isEditMode = true;
    this.selectedCouponId = coupon.id;
    this.couponForm.patchValue({
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      maxUsages: coupon.maxUsages,
      expirationDate: coupon.expirationDate ? new Date(coupon.expirationDate).toISOString().split('T')[0] : '',
      active: coupon.active
    });
  }

  deleteCoupon(id: number): void {
    if (confirm('Are you sure you want to delete this coupon?')) {
      this.couponService.deleteCoupon(id).subscribe({
        next: () => {
          this.snackBar.open('Coupon deleted', 'Close', { duration: 2000 });
          this.loadCoupons();
        },
        error: (err) => {
          this.snackBar.open(err.error?.message || 'Error deleting coupon', 'Close', { duration: 3000 });
        }
      });
    }
  }

  resetForm(): void {
    this.isEditMode = false;
    this.selectedCouponId = undefined;
    this.couponForm.reset({ type: 'PERCENT', active: true, maxUsages: 100 });
  }
}
