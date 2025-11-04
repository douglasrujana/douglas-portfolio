// src/infrastructure/adapters/crm/hubspot-adapter.ts
import type { ICRMProvider, LeadData } from '@core/ports/crm.port';

export class HubSpotAdapter implements ICRMProvider {
  constructor(private apiKey: string) {}

  async createLead(data: LeadData): Promise<void> {
    const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: {
          email: data.email,
          firstname: data.name.split(' ')[0],
          lastname: data.name.split(' ').slice(1).join(' '),
          company: data.company,
          message: data.message,
          hs_lead_status: 'NEW',
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`CRM failed: ${response.statusText}`);
    }
  }
}
