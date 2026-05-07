import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/Services/dashboard.service';
import { Chart, ChartConfiguration, ChartData, ChartType, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  loading = true;
  stats: any;

  // User Distribution Pie Chart
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Customers', 'Sellers'],
    datasets: [ {
      data: [ 0, 0 ],
      backgroundColor: ['#ff4081', '#3f51b5'],
      hoverBackgroundColor: ['#ff80ab', '#5c6bc0'],
    } ]
  };
  public pieChartType: ChartType = 'pie';

  // Revenue Line Chart
  public lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Daily Revenue',
        backgroundColor: 'rgba(63, 81, 181, 0.2)',
        borderColor: '#3f51b5',
        pointBackgroundColor: '#3f51b5',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(63, 81, 181, 0.8)',
        fill: 'origin',
      }
    ]
  };
  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
  public lineChartType: ChartType = 'line';

  // Product Sales Polar Area Chart
  public polarAreaChartLabels: string[] = [];
  public polarAreaChartData: ChartData<'polarArea'> = {
    labels: [],
    datasets: [ {
      data: [],
      backgroundColor: [
        '#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED', '#36A2EB'
      ]
    } ]
  };
  public polarAreaLegend = true;
  public polarAreaChartType: ChartType = 'polarArea';
  public polarAreaChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    }
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.loading = true;
    this.dashboardService.getAdminStats().subscribe({
      next: (data) => {
        console.log('Admin Stats Data received:', data);
        this.stats = data;
        this.updateCharts(data);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching admin stats', err);
        this.loading = false;
      }
    });
  }

  updateCharts(data: any): void {
    console.log('--- Chart Update Start ---');
    console.log('Raw data:', data);

    // Pie Chart
    if (data.totalCustomers !== undefined && data.totalSellers !== undefined) {
      this.pieChartData.datasets[0].data = [Number(data.totalCustomers), Number(data.totalSellers)];
      console.log('Pie Chart -> Customers:', data.totalCustomers, 'Sellers:', data.totalSellers);
    } else {
      console.error('Pie Chart data missing role counts!');
    }
    this.pieChartData = { ...this.pieChartData };

    // Line Chart
    if (data.revenueByDate && Object.keys(data.revenueByDate).length > 0) {
      const sortedDates = Object.keys(data.revenueByDate).sort();
      this.lineChartData.labels = sortedDates;
      this.lineChartData.datasets[0].data = sortedDates.map(date => data.revenueByDate[date]);
      console.log('Line Chart -> Dates:', sortedDates, 'Values:', this.lineChartData.datasets[0].data);
    } else {
      console.warn('Line Chart -> No revenue data available for plotting.');
      this.lineChartData.labels = [];
      this.lineChartData.datasets[0].data = [];
    }
    this.lineChartData = { ...this.lineChartData };

    // Polar Area Chart
    if (data.productSales && Object.keys(data.productSales).length > 0) {
      const products = Object.keys(data.productSales);
      this.polarAreaChartData.labels = products;
      this.polarAreaChartData.datasets[0].data = products.map(p => data.productSales[p]);
      console.log('Polar Area -> Products:', products, 'Sales:', this.polarAreaChartData.datasets[0].data);
    } else {
      console.warn('Polar Area -> No product sales data available.');
      this.polarAreaChartData.labels = [];
      this.polarAreaChartData.datasets[0].data = [];
    }
    this.polarAreaChartData = { ...this.polarAreaChartData };
    
    console.log('--- Chart Update End ---');
  }
}
