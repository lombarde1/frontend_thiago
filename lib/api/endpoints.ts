// Remove leading slashes from endpoints since they're added in the client
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: 'auth/login',
    REGISTER: 'auth/register',
  },
  USER: {
    PROFILE: 'users/profile/{userId}',
    BALANCE: 'users/balance/{userId}',
    TRANSACTIONS: 'users/transactions/{userId}',
  },
  WALLET: {
    DEPOSIT: 'wallet/deposit/{userId}',
    WITHDRAW: 'wallet/withdraw/{userId}',
    PORTFOLIO: 'wallet/portfolio/{userId}',
  },
  REFERRAL: {
    INFO: 'referral/info/{userId}',
    GENERATE: 'referral/generate-code/{userId}',
    VALIDATE: 'referral/validate/{code}',
    PROCESS: 'referral/process',
  },
} as const;