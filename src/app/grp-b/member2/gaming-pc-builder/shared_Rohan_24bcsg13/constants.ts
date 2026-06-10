// ============================================================
// constants.ts
// Mock product data for Gaming PC Builder
// Images reference: src/assets/computer_parts/
// ============================================================

import { Product } from './product.model';

export const GST_RATE = 0.18; // 18% GST

export const CATEGORIES = [
  'All',
  'CPU',
  'Motherboard',
  'GPU',
  'RAM',
  'Storage',
  'Power Supply',
  'CPU Cooler',
  'Cabinet',
  'Monitor',
  'Keyboard',
  'Mouse',
  'Headset',
  'Webcam',
  'Microphone'
];

export const PRODUCTS: Product[] = [
  // === CPU ===
  {
    id: 1,
    name: 'Intel Core i9-14900K',
    category: 'CPU',
    price: 58999,
    image: 'assets/computer_parts/Intel Core i9-14900K.jpg',
    brand: 'Intel',
    specs: '24 Cores | 32 Threads | 6.0GHz Boost'
  },
  {
    id: 2,
    name: 'AMD Ryzen 9 9950X',
    category: 'CPU',
    price: 64999,
    image: 'assets/computer_parts/AMD Ryzen 9 9950X.jpg',
    brand: 'AMD',
    specs: '16 Cores | 32 Threads | 5.7GHz Boost'
  },

  // === Motherboard ===
  {
    id: 3,
    name: 'ASUS ROG Strix Z790-E',
    category: 'Motherboard',
    price: 47999,
    image: 'assets/computer_parts/ASUS ROG Strix Z790-E.jpg',
    brand: 'ASUS ROG',
    specs: 'LGA1700 | DDR5 | PCIe 5.0 | WiFi 6E'
  },
  {
    id: 4,
    name: 'MSI MAG X870 Tomahawk',
    category: 'Motherboard',
    price: 34999,
    image: 'assets/computer_parts/MSI MAG X870 Tomahawk.jpg',
    brand: 'MSI',
    specs: 'AM5 | DDR5 | PCIe 5.0 | WiFi 7'
  },

  // === GPU ===
  {
    id: 5,
    name: 'NVIDIA RTX 5090',
    category: 'GPU',
    price: 229999,
    image: 'assets/computer_parts/NVIDIA RTX 5090.jpg',
    brand: 'NVIDIA',
    specs: '32GB GDDR7 | 575W TDP | PCIe 5.0'
  },
  {
    id: 6,
    name: 'NVIDIA RTX 5080',
    category: 'GPU',
    price: 119999,
    image: 'assets/computer_parts/NVIDIA RTX 5080.jpg',
    brand: 'NVIDIA',
    specs: '16GB GDDR7 | 360W TDP | PCIe 5.0'
  },
  {
    id: 7,
    name: 'AMD Radeon RX 8900 XT',
    category: 'GPU',
    price: 89999,
    image: 'assets/computer_parts/AMD Radeon RX 8900 XT.jpg',
    brand: 'AMD',
    specs: '24GB GDDR6 | 330W TDP | PCIe 5.0'
  },

  // === RAM ===
  {
    id: 8,
    name: 'Corsair Vengeance DDR5 32GB',
    category: 'RAM',
    price: 12999,
    image: 'assets/computer_parts/Corsair Vengeance DDR5 32GB.jpg',
    brand: 'Corsair',
    specs: '32GB | DDR5-6000 | CL36 | RGB'
  },
  {
    id: 9,
    name: 'G.Skill Trident Z5 RGB 32GB',
    category: 'RAM',
    price: 14999,
    image: 'assets/computer_parts/G.Skill Trident Z5 RGB 32GB.jpg',
    brand: 'G.Skill',
    specs: '32GB | DDR5-6400 | CL32 | RGB'
  },

  // === Storage ===
  {
    id: 10,
    name: 'Samsung 990 Pro 2TB NVMe SSD',
    category: 'Storage',
    price: 16999,
    image: 'assets/computer_parts/Samsung 990 Pro 2TB NVMe SSD.jpg',
    brand: 'Samsung',
    specs: '2TB | PCIe 4.0 | 7450MB/s Read'
  },
  {
    id: 11,
    name: 'WD Black SN850X 2TB',
    category: 'Storage',
    price: 14999,
    image: 'assets/computer_parts/WD Black SN850X 2TB.jpg',
    brand: 'WD',
    specs: '2TB | PCIe 4.0 | 7300MB/s Read'
  },

  // === Power Supply ===
  {
    id: 12,
    name: 'Corsair RM1000x',
    category: 'Power Supply',
    price: 15999,
    image: 'assets/computer_parts/Corsair RM1000x.jpg',
    brand: 'Corsair',
    specs: '1000W | 80+ Gold | Fully Modular'
  },
  {
    id: 13,
    name: 'MSI MPG A1000G',
    category: 'Power Supply',
    price: 13999,
    image: 'assets/computer_parts/MSI MPG A1000G.jpg',
    brand: 'MSI',
    specs: '1000W | 80+ Gold | Fully Modular'
  },

  // === CPU Cooler ===
  {
    id: 14,
    name: 'DeepCool LT720',
    category: 'CPU Cooler',
    price: 9999,
    image: 'assets/computer_parts/DeepCool LT720.jpg',
    brand: 'DeepCool',
    specs: '360mm AIO | ARGB | LGA1700/AM5'
  },
  {
    id: 15,
    name: 'Corsair iCUE H150i Elite',
    category: 'CPU Cooler',
    price: 12999,
    image: 'assets/computer_parts/Corsair iCUE H150i Elite.jpg',
    brand: 'Corsair',
    specs: '360mm AIO | ARGB | LGA1700/AM5'
  },

  // === Cabinet ===
  {
    id: 16,
    name: 'Lian Li O11 Dynamic EVO',
    category: 'Cabinet',
    price: 13999,
    image: 'assets/computer_parts/Lian Li O11 Dynamic EVO.jpg',
    brand: 'Lian Li',
    specs: 'Mid Tower | Dual Chamber | Tempered Glass'
  },
  {
    id: 17,
    name: 'NZXT H9 Flow',
    category: 'Cabinet',
    price: 14999,
    image: 'assets/computer_parts/NZXT H9 Flow.jpg',
    brand: 'NZXT',
    specs: 'Mid Tower | Panoramic Glass | High Airflow'
  },

  // === Monitor ===
  {
    id: 18,
    name: 'Samsung Odyssey G8',
    category: 'Monitor',
    price: 74999,
    image: 'assets/computer_parts/Samsung Odyssey G8.jpg',
    brand: 'Samsung',
    specs: '32" | 4K | 240Hz | OLED | 0.03ms GTG'
  },
  {
    id: 19,
    name: 'LG UltraGear 27GR95QE',
    category: 'Monitor',
    price: 49999,
    image: 'assets/computer_parts/LG UltraGear 27GR95QE.jpg',
    brand: 'LG',
    specs: '27" | QHD | 240Hz | OLED | 0.03ms GTG'
  },

  // === Keyboard ===
  {
    id: 20,
    name: 'Keychron K8 Pro',
    category: 'Keyboard',
    price: 9999,
    image: 'assets/computer_parts/Keychron K8 Pro.jpg',
    brand: 'Keychron',
    specs: 'TKL | Wireless | RGB | Hot-swappable'
  },
  {
    id: 21,
    name: 'Logitech G Pro X Keyboard',
    category: 'Keyboard',
    price: 12999,
    image: 'assets/computer_parts/Logitech G Pro X Keyboard.jpg',
    brand: 'Logitech',
    specs: 'TKL | Wired | RGB | Pro Linear Switches'
  },

  // === Mouse ===
  {
    id: 22,
    name: 'Logitech G502 X Plus',
    category: 'Mouse',
    price: 10999,
    image: 'assets/computer_parts/Logitech G502 X Plus.jpg',
    brand: 'Logitech',
    specs: 'Wireless | 25600 DPI | 13 Buttons | HERO 25K'
  },
  {
    id: 23,
    name: 'Razer DeathAdder V3 Pro',
    category: 'Mouse',
    price: 12999,
    image: 'assets/computer_parts/Razer DeathAdder V3 Pro.jpg',
    brand: 'Razer',
    specs: 'Wireless | 30000 DPI | Focus Pro Sensor'
  },

  // === Headset ===
  {
    id: 24,
    name: 'HyperX Cloud III',
    category: 'Headset',
    price: 8999,
    image: 'assets/computer_parts/HyperX Cloud III.jpg',
    brand: 'HyperX',
    specs: 'Wired | 53mm Drivers | 7.1 Surround | USB-C'
  },
  {
    id: 25,
    name: 'SteelSeries Arctis Nova 7',
    category: 'Headset',
    price: 14999,
    image: 'assets/computer_parts/SteelSeries Arctis Nova 7.jpg',
    brand: 'SteelSeries',
    specs: 'Wireless | 40mm Drivers | 38Hr Battery'
  },

  // === Webcam ===
  {
    id: 26,
    name: 'Logitech Brio 4K',
    category: 'Webcam',
    price: 19999,
    image: 'assets/computer_parts/Logitech Brio 4K.jpg',
    brand: 'Logitech',
    specs: '4K 30fps | HDR | AI Autofocus | USB-C'
  },

  // === Microphone ===
  {
    id: 27,
    name: 'Blue Yeti',
    category: 'Microphone',
    price: 11999,
    image: 'assets/computer_parts/Blue Yeti.jpg',
    brand: 'Blue',
    specs: 'USB | 4 Pickup Patterns | 48kHz/16-bit'
  }
];
