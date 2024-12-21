export interface Activity {
  id: string;
  type: 'transaction' | 'withdraw';
  category: 'deposit' | 'withdraw' | 'crypto_purchase' | 'crypto_sale' | 'referral_bonus' | 'admin_adjustment';
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'rejected';
  date: string;
  description: string;
  expiresAt?: string;
  data?: any;
}