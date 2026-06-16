import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BillingService } from '../../services/billing.service';

@Component({
  selector: 'app-product-login',
  templateUrl: './product-login.component.html',
  styleUrls: ['./product-login.component.css']
})
export class ProductLoginComponent implements OnInit {
  activeTab: 'login' | 'signup' = 'login';

  // Login inputs
  username = '';
  password = '';

  // Sign up inputs
  signupName = '';
  signupMobile = '';
  signupPassword = '';

  showPassword = false;
  isDarkMode = false;

  constructor(
    private router: Router,
    private billingService: BillingService
  ) {}

  ngOnInit() {
    this.isDarkMode = this.billingService.isDarkMode;
  }

  get cartItemsCount(): number {
    return this.billingService.selectedItems.reduce((sum, item) => sum + item.qty, 0);
  }

  get cartSubtotal(): number {
    return this.billingService.selectedItems.reduce((sum, item) => sum + item.total, 0);
  }

  login() {
    if (!this.username.trim() || !this.password.trim()) {
      this.billingService.sendNotification('Please enter both username/mobile and password!', 'bill');
      return;
    }

    const u = this.username.trim().toLowerCase();
    const p = this.password.trim();

    // Check in registered users
    const matchedUser = this.billingService.registeredUsers.find(
      user => user.mobile === u || user.name.toLowerCase() === u
    );

    if (matchedUser && matchedUser.password === p) {
      const role = matchedUser.role || 'customer';
      this.billingService.isLoggedIn = true;
      this.billingService.customerName = matchedUser.name;
      this.billingService.mobileNumber = matchedUser.mobile;
      this.billingService.currentUserRole = role;
      this.billingService.isRegistered = true;
      
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('customerName', matchedUser.name);
      sessionStorage.setItem('mobileNumber', matchedUser.mobile);
      sessionStorage.setItem('role', role);
      
      this.billingService.sendNotification(`Logged in successfully! Welcome, ${matchedUser.name}.`, 'bill');
      this.router.navigate(['/grp-a/member6/attendance/product-management']);
    } else {
      this.billingService.sendNotification('Invalid credentials! Please try again.', 'bill');
    }
  }

  signUp() {
    if (!this.signupName.trim() || !this.signupMobile.trim() || !this.signupPassword.trim()) {
      this.billingService.sendNotification('All fields are required for Sign Up!', 'bill');
      return;
    }

    // Validate 10-digit mobile number
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(this.signupMobile.trim())) {
      this.billingService.sendNotification('Please enter a valid 10-digit mobile number!', 'bill');
      return;
    }

    const name = this.signupName.trim();
    const mobile = this.signupMobile.trim();
    const pwd = this.signupPassword.trim();

    // Check if mobile number is already registered
    const exists = this.billingService.registeredUsers.some(user => user.mobile === mobile);
    if (exists) {
      this.billingService.sendNotification('This mobile number is already registered! Please sign in.', 'bill');
      this.activeTab = 'login';
      this.username = mobile;
      return;
    }

    // Save user
    const newUser = { name, mobile, password: pwd, role: 'customer' };
    this.billingService.registeredUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(this.billingService.registeredUsers));

    // Log in automatically
    this.billingService.isLoggedIn = true;
    this.billingService.customerName = name;
    this.billingService.mobileNumber = mobile;
    this.billingService.currentUserRole = 'customer';
    this.billingService.isRegistered = true;
    
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('customerName', name);
    sessionStorage.setItem('mobileNumber', mobile);
    sessionStorage.setItem('role', 'customer');

    this.billingService.sendNotification(`Account created successfully! Welcome, ${name}.`, 'bill');
    this.router.navigate(['/grp-a/member6/attendance/product-management']);
  }

  backToCatalog() {
    this.router.navigate(['/grp-a/member6/attendance/product-management']);
  }
}
