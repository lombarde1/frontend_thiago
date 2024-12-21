// Add these types to the existing types.ts file

export interface BSPayCredentials {
  name: string;
  clientId: string;
  clientSecret: string;
  baseUrl: string;
  updatedAt: string;
}

export interface UpdateBSPayCredentialsRequest {
  clientId: string;
  clientSecret: string;
  baseUrl: string;
}