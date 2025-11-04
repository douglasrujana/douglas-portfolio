// src/core/ports/crm.port.ts
export interface ICRMProvider {
  createLead(data: LeadData): Promise<void>;
}

export interface LeadData {
  name: string;
  email: string;
  company?: string;
  message: string;
  source: string;
  score?: number;
}
