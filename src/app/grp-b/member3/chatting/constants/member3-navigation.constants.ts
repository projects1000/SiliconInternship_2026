export interface Member3NavItem {
  label: string;
  icon: string;
  route: string;
  badge?: string;
}

export const MEMBER3_NAV_ITEMS: Member3NavItem[] = [
  { label: 'Profile', icon: 'person', route: '/grp-b/member3' },
  { label: 'Attendance', icon: 'fact_check', route: '/grp-b/member3/attendance' },
  { label: 'Product Management', icon: 'inventory_2', route: '/grp-b/product-management' },
  { label: 'Chat', icon: 'chat', route: '/grp-b/member3/chatting', badge: 'New' },
  { label: 'Reports', icon: 'bar_chart', route: '/grp-b/product-management' },
  { label: 'Notifications', icon: 'notifications', route: '/grp-b/product-management' },
  { label: 'Settings', icon: 'settings', route: '/grp-b/product-management' }
];
