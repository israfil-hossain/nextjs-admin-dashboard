export interface Purchase {
  _id?: string;
  templateId: string;
  customerEmail: string;
  stripeSessionId: string;
  stripePaymentIntentId?: string;
  amount: number;
  currency: string;
  downloadToken: string;
  licenseKey: string;
  expiresAt: number;
  purchaseDate: Date;
  status: 'completed' | 'pending' | 'refunded';
  createdAt?: Date;
  updatedAt?: Date;
}
