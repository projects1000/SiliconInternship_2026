// src/app/grp-f/member4/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../shared/customer.service';
import { ToastService } from '../shared/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Form credentials
  credentials = {
    email: '',
    password: ''
  };

  // UI State
  showPassword: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    // Check if already logged in
    const customer = this.customerService.getCurrentCustomer();
    if (customer) {
      this.goHome();
    }
  }

  // Toggle password visibility
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  // Handle login
  onLogin(): void {
    this.errorMessage = '';

    // Validation
    if (!this.credentials.email.trim()) {
      this.errorMessage = 'Enter your email or phone number';
      this.shakeCard();
      return;
    }

    if (!this.credentials.password.trim()) {
      this.errorMessage = 'Enter your password';
      this.shakeCard();
      return;
    }

    if (this.credentials.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters';
      this.shakeCard();
      return;
    }

    // Simulate login
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;

      // Mock login - accept any credentials for demo
      const isValid = this.validateCredentials(this.credentials.email, this.credentials.password);

      if (isValid) {
        // Save customer
        const customer = {
          name: this.credentials.email.split('@')[0] || 'User',
          email: this.credentials.email,
          phone: ''
        };
        
        this.customerService.loginCustomer(this.credentials.email, this.credentials.password);
        this.toastService.show('Welcome back!', 'success');
        
        // Navigate to home
        this.goHome();
      } else {
        this.errorMessage = 'Incorrect email or password';
        this.shakeCard();
      }
    }, 1000);
  }

  // Validate credentials (mock)
  validateCredentials(email: string, password: string): boolean {
    // Demo: accept any valid combination
    return email.length > 0 && password.length >= 6;
  }

  // Forgot password
  forgotPassword(): void {
    this.toastService.show('Redirecting to password reset...', 'info');
  }

  // Sign up
  signUp(): void {
    this.router.navigate(['/grp-f/member4/customer']);
  }

  // Need help
  needHelp(): void {
    alert('Contact support@shopeasy.com for help');
  }

  // Go home
  goHome(): void {
    this.router.navigate(['/grp-f/member4/product-list']);
  }

  // Shake animation
  shakeCard(): void {
    const card = document.querySelector('.login-card');
    if (card) {
      card.classList.add('shake');
      setTimeout(() => card.classList.remove('shake'), 500);
    }
  }
}