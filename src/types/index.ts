// TypeScript type definitions for the DEVO-S app

// ─── Common ────────────────────────────────────────────────────────────────

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatarUrl?: string;
};

export type UserRole = 'admin' | 'support' | 'customer' | 'rider' | 'restaurant';

// ─── Orders ────────────────────────────────────────────────────────────────

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'picked_up'
  | 'on_the_way'
  | 'delivered'
  | 'cancelled';

export type Order = {
  id: string;
  customerId: string;
  restaurantId: string;
  riderId?: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  address: string;
};

export type OrderItem = {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
};

// ─── Products / Menu ───────────────────────────────────────────────────────

export type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  imageUrl?: string;
  available: boolean;
};

// ─── Restaurant / Market ───────────────────────────────────────────────────

export type Restaurant = {
  id: string;
  name: string;
  ownerId: string;
  address: string;
  category: 'restaurant' | 'market';
  rating: number;
  isOpen: boolean;
  imageUrl?: string;
};

// ─── Rider ─────────────────────────────────────────────────────────────────

export type RiderStatus = 'available' | 'busy' | 'offline';

export type Rider = {
  id: string;
  userId: string;
  name: string;
  status: RiderStatus;
  currentLocation?: { latitude: number; longitude: number };
  totalDeliveries: number;
  rating: number;
};

// ─── Support ───────────────────────────────────────────────────────────────

export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';

export type SupportTicket = {
  id: string;
  userId: string;
  subject: string;
  message: string;
  status: TicketStatus;
  createdAt: string;
  assignedTo?: string;
};

// ─── Admin ─────────────────────────────────────────────────────────────────

export type AdminStats = {
  totalOrders: number;
  activeRiders: number;
  registeredUsers: number;
  totalRestaurants: number;
  revenueToday: number;
};
