import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PRODUCTS } from '../data/products';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {
  allProducts = PRODUCTS;
  selectedProducts: any[] = [];
  
  // Comprehensive User Verification Information Map Data Structure
  customerInfo: any = { 
    name: '', 
    mobile: '', 
    address: '' 
  };
  
  // Real-time Analytics Tracker Registry Mock Data
  systemGlobalUserMetrics: any = {
    activeConnections: 142,
    totalOrdersProcessed: 1849,
    currentHubRegion: 'IN-EAST-NODE'
  };
  
  isUserLoggedIn: boolean = false;
  isBillingOpen: boolean = false;
  isLightMode: boolean = false;
  showAuthInterceptModal: boolean = false;
  activeModalTab: 'home' | 'brands' | 'about' | null = null;
  
  loginData = { email: '', passphrase: '' };
  activeBannerProduct: any = this.allProducts[0];
  selectedBannerSize: number = 8;
  
  toastQueue: Array<{ id: number, message: string }> = [];
  private toastCounter = 0;

  subTotal: number = 0;
  gstAmount: number = 0;
  grandTotal: number = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    this.calculateBill();
    this.triggerCustomToast('⚡ MATRIX ENGINE LOGISTICS ONLINE // 2026');
  }

  toggleThemeStyleMode() {
    this.isLightMode = !this.isLightMode;
    this.triggerCustomToast(`Theme configuration updated: ${this.isLightMode ? 'LIGHT' : 'DARK'}`);
  }

  openModalTab(tabName: 'brands' | 'about') {
    this.activeModalTab = tabName;
  }

  closeModals() {
    this.activeModalTab = null;
  }

  triggerCustomToast(msg: string) {
    const id = ++this.toastCounter;
    this.toastQueue.push({ id, message: msg });
    setTimeout(() => {
      this.toastQueue = this.toastQueue.filter(t => t.id !== id);
    }, 3000);
  }

  toggleAuthenticationGateway() {
    if (this.loginData.email === 'chandan@nike.com' && this.loginData.passphrase === 'jordan2026') {
      this.executeSuccessfulLoginActions();
    } else if (this.isUserLoggedIn) {
      this.isUserLoggedIn = false;
      this.customerInfo = { name: '', mobile: '', address: '' };
      this.selectedProducts = [];
      this.calculateBill();
      this.triggerCustomToast('🔒 Secured operator session dropped.');
    } else {
      this.triggerCustomToast('⚠️ Access denied.');
    }
  }

  submitModalAuthGateway() {
    if (this.loginData.email === 'chandan@nike.com' && this.loginData.passphrase === 'jordan2026') {
      this.executeSuccessfulLoginActions();
      this.showAuthInterceptModal = false;
      // Re-trigger allocation action safely now that login conditions match
      this.handleProductAdded(this.activeBannerProduct);
    } else {
      this.triggerCustomToast('⚠️ Credentials Refused.');
    }
  }

  private executeSuccessfulLoginActions() {
    this.isUserLoggedIn = true;
    this.customerInfo.name = 'CHANDAN';
    this.customerInfo.mobile = '+91 98765 43210';
    this.customerInfo.address = 'Plot 42, Infocity Tech Sector, Block C, Bhubaneswar, OD';
    this.systemGlobalUserMetrics.activeConnections += 1;
    this.triggerCustomToast('🔓 Profile connection fully authenticated.');
  }

  handleFeaturedProductChange(product: any) {
    this.activeBannerProduct = product;
    this.selectedBannerSize = product.sizes[0] || 8;
  }

  goBackToProfile() {
    this.router.navigate(['/grp-d/member1']);
  }

  handleProductAdded(product: any) {
    // SECURITY AUTH INTERCEPT GATEWAY
    if (!this.isUserLoggedIn) {
      this.triggerCustomToast('🛡️ Identification key required to append data lines.');
      this.showAuthInterceptModal = true;
      return;
    }

    const chosenSize = this.selectedBannerSize;
    const itemKey = `${product.id}_sz_${chosenSize}`;
    
    const existing = this.selectedProducts.find(p => p.cartUid === itemKey);
    if (existing) {
      existing.qty += 1;
    } else {
      this.selectedProducts.push({ 
        ...product, 
        cartUid: itemKey,
        displaySize: chosenSize,
        qty: 1 
      });
    }
    this.calculateBill();
    this.triggerCustomToast(`✓ Added ${product.name} [Size ${chosenSize}] to rack allocation.`);
  }

  handleProductRemoved(cartUid: string) {
    const targetIdx = this.selectedProducts.findIndex(p => p.cartUid === cartUid);
    if (targetIdx !== -1) {
      if (this.selectedProducts[targetIdx].qty > 1) {
        this.selectedProducts[targetIdx].qty -= 1;
      } else {
        this.selectedProducts.splice(targetIdx, 1);
      }
      this.calculateBill();
      this.triggerCustomToast('🗑️ Adjusted allocation maps.');
    }
  }

  calculateBill() {
    this.subTotal = this.selectedProducts.reduce((acc, item) => acc + (item.price * item.qty), 0);
    this.gstAmount = parseFloat((this.subTotal * 0.18).toFixed(2));
    this.grandTotal = parseFloat((this.subTotal + this.gstAmount).toFixed(2));
  }

  // Pure Printable Document Generator & Exporter File Action
  generateAndDownloadInvoiceReportFile() {
    this.systemGlobalUserMetrics.totalOrdersProcessed += 1;
    
    let itemsTableRowsHtml = '';
    this.selectedProducts.forEach((p, index) => {
      itemsTableRowsHtml += `
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px; font-size: 13px; color: #1e293b;">0${index + 1}</td>
          <td style="padding: 12px; font-size: 13px; font-weight: bold; color: #1e293b;">${p.name} <br><span style="font-size: 11px; color:#64748b; font-weight:normal;">Brand: ${p.brand}</span></td>
          <td style="padding: 12px; font-size: 13px; color: #64748b; text-align: center;">${p.displaySize}</td>
          <td style="padding: 12px; font-size: 13px; color: #64748b; text-align: center;">${p.qty}</td>
          <td style="padding: 12px; font-size: 13px; font-weight: bold; color: #1e293b; text-align: right;">₹${(p.price * p.qty).toLocaleString()}</td>
        </tr>
      `;
    });

    const detailedInvoiceDocumentWindow = window.open('', '_blank');
    if (!detailedInvoiceDocumentWindow) {
      this.triggerCustomToast('⚠️ Pop-up blocker intercepted invoice deployment.');
      return;
    }

    detailedInvoiceDocumentWindow.document.write(`
      <html>
        <head>
          <title>HYPECORE_INVOICE_LEDGER_${Date.now()}</title>
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; padding: 40px; background-color: #ffffff; color: #0f172a; }
            .invoice-wrapper { max-width: 800px; margin: 0 auto; border: 1px solid #e2e8f0; padding: 40px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.02); }
            .invoice-header { display: flex; justify-content: space-between; border-bottom: 2px solid #0f172a; padding-bottom: 20px; margin-bottom: 30px; }
            .meta-column { text-align: right; }
            .table-sheet { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            .table-sheet th { background: #f8fafc; padding: 12px; text-align: left; font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; }
            .summary-block { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; border-top: 1px solid #e2e8f0; padding-top: 20px; }
            .summary-row { display: flex; justify-content: space-between; width: 300px; font-size: 13px; color: #475569; }
            .grand-total { font-size: 16px; font-weight: 900; color: #0f172a; margin-top: 6px; border-top: 2px dashed #cbd5e1; padding-top: 6px; }
            .print-trigger-overlay-btn { background: #0f172a; color: #ffffff; border: none; padding: 12px 30px; border-radius: 6px; font-weight: bold; cursor: pointer; margin-top: 30px; display: inline-block; text-decoration: none; font-size: 13px; }
            @media print { .print-trigger-overlay-btn { display: none; } }
          </style>
        </head>
        <body>
          <div class="invoice-wrapper">
            <div class="invoice-header">
              <div>
                <h1 style="margin:0; font-size:28px; font-weight:900; letter-spacing:1px;">HYPECORE DIRECT</h1>
                <p style="margin:4px 0 0 0; color:#64748b; font-size:12px;">Premium Inventory Distribution Ledger Core</p>
              </div>
              <div class="meta-column">
                <h3 style="margin:0; font-size:14px; font-weight:800; color:#64748b;">INVOICE RECORD</h3>
                <p style="margin:4px 0 0 0; font-size:12px; font-weight:bold;">REF_ID: #HC-${Math.floor(100000 + Math.random() * 900000)}</p>
                <p style="margin:2px 0 0 0; font-size:11px; color:#64748b;">Generated Stamp: 2026-06-11</p>
              </div>
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin-bottom:4px; font-size:13px; background:#f8fafc; padding:20px; border-radius:8px;">
              <div>
                <strong style="text-transform:uppercase; font-size:10px; color:#64748b; display:block; margin-bottom:4px;">Operator Account Profile:</strong>
                <span style="font-size:15px; font-weight:900;">${this.customerInfo.name || 'GUEST ACC'}</span><br>
                <span style="color:#475569;">Contact Secure Key: ${this.customerInfo.mobile || '---'}</span>
              </div>
              <div>
                <strong style="text-transform:uppercase; font-size:10px; color:#64748b; display:block; margin-bottom:4px;">Physical Shipping Destination Location:</strong>
                <span style="color:#1e293b; font-weight:600; line-height:1.4;">${this.customerInfo.address || 'No Address Declared'}</span>
              </div>
            </div>

            <table class="table-sheet">
              <thead>
                <tr>
                  <th style="width:50px;">LN</th>
                  <th>Product Asset Model</th>
                  <th style="text-align:center; width:80px;">Size</th>
                  <th style="text-align:center; width:80px;">Units</th>
                  <th style="text-align:right; width:120px;">Net Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsTableRowsHtml}
              </tbody>
            </table>

            <div class="summary-block">
              <div class="summary-row"><span>Logistics Subtotal:</span><span>₹${this.subTotal.toLocaleString()}</span></div>
              <div class="summary-row"><span>Central Tax Index (18% GST):</span><span>₹${this.gstAmount.toLocaleString()}</span></div>
              <div class="summary-row grand-total"><span>GRAND TOTAL LIABILITY:</span><span>₹${this.grandTotal.toLocaleString()}</span></div>
            </div>

            <center>
              <button class="print-trigger-overlay-btn" onclick="window.print()">EXECUTE PRINT / SAVE DOCUMENT</button>
            </center>
          </div>
        </body>
      </html>
    `);
    detailedInvoiceDocumentWindow.document.close();
    this.triggerCustomToast('📄 Printable invoice canvas rendered in split window tab.');
  }
}