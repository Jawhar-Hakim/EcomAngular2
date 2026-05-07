export interface AdminDashboardStats {
  totalUsers: number;
  totalSellers: number;
  totalCustomers: number;
  totalAdmins: number;
  totalOrders: number;
  totalRevenue: number;
  revenueByDate: { [key: string]: number };
  productSales: { [key: string]: number };
}

export interface SellerDashboardStats {
  myProductsCount: number;
  pendingOrdersCount: number;
  totalSales: number;
}

export interface CustomerDashboardStats {
  myOrdersCount: number;
  cartItemsCount: number;
  totalSpent: number;
}
