import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { productToBuy } from '../../Dtos/productToBuy.dto';
import { cartService } from '../../Services/cartService.service';
import { OrderedProductDto } from '../../Dtos/orderedProduct.dto';
import { OrderDto } from '../../Dtos/order.dto';
import { AuthServiceService } from '../../Services/auth-service.service';
import { OrderService } from '../../Services/order.service';
import { ProductService } from '../../Services/product.service';

enum DashboardTab {
  Orders = 'Orders',
  Wishlist = 'Wishlist',
  AccountDetails = 'Account Details',
  Settings = 'Settings'
}

@Component({
  selector: 'user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
  imports: [CommonModule]
})

export class UserDashboardComponent implements OnInit {
  
 
  DashboardTab = DashboardTab; // Expose enum to template
  activeTab: DashboardTab = DashboardTab.Orders;

  // Track which order's products are visible
  expandedOrderIds: Set<string> = new Set();

  constructor(public cartService: cartService, 
    public authService:AuthServiceService,
    public orderService:OrderService,
    public productService:ProductService) {}

  ngOnInit(): void {

    this.cartService.copyProductsCartsFromLocalStorageToCartItems();
    this.cartService.loadProductImagesOfCartItemsFromDbByThierIDS();
   
    // Extract user info including unserame and id from token on initialization
    this.authService.extractUserInfoFromToken();
    
    this.orderService.loaddAllOrdersFrDb()
  }

  

  setActiveTab(tabName: DashboardTab) {
    this.activeTab = tabName;
    //this.goToPage(tabName);
     
  }

 

  // Toggle product visibility for an order
  toggleOrderProducts(orderId: string) {

    //if (this.expandedOrderIds.has(orderId)) {
    if (this.isOrderExpanded(orderId)) {

      this.expandedOrderIds.delete(orderId);

    } 
    else {

      this.expandedOrderIds.add(orderId);
      this.orderService.loadProductsForOrderIfNeeded(orderId);
    }

  }

  isOrderExpanded(orderId: string): boolean {
    return this.expandedOrderIds.has(orderId);
  }
}


