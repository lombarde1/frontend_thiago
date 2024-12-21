export interface ReferredUser {
  user: {
    name: string;
    email: string;
  };
  registeredAt: string;
  hasDeposited: boolean;
  firstDepositAt?: string;
  commissionPaid: boolean;
  commissionPaidAt?: string;
  totalDeposits: number;
  lastDeposit?: string;
}

export interface ReferralStats {
  referralCode: string;
  totalEarnings: number;
  totalReferrals: number;
  referredUsers: ReferredUser[];
}

export interface GenerateCodeResponse {
  referralCode: string;
  userId: string;
  totalEarnings: number;
  totalReferrals: number;
}

export interface ProcessReferralRequest {
  newUserId: string;
  referralCode: string;
}