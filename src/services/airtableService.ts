import base, { TABLES } from '../config/airtable.js';

// Contact operations
export const contactService = {
  async getAll(): Promise<any[]> {
    const records = await base(TABLES.CONTACTS).select().all();
    return records.map(record => ({
      id: (record as any).id,
      ...(record as any).fields
    }));
  },

  async create(data: Partial<any>): Promise<any> {
    const record = await base(TABLES.CONTACTS).create(data);
    return {
      id: (record as any).id,
      ...(record as any).fields
    } as any;
  },

  async update(id: string, data: Partial<any>): Promise<any> {
    const record = await base(TABLES.CONTACTS).update(id, data);
    return {
      id: (record as any).id,
      ...(record as any).fields
    } as any;
  },

  async delete(id: string): Promise<void> {
    await base(TABLES.CONTACTS).destroy(id);
  }
};

// Deal operations
export const dealService = {
  async getAll(): Promise<any[]> {
    const records = await base(TABLES.DEALS).select().all();
    return records.map(record => ({
      id: (record as any).id,
      ...(record as any).fields
    }));
  },

  async create(data: Partial<any>): Promise<any> {
    const record = await base(TABLES.DEALS).create(data);
    return {
      id: (record as any).id,
      ...(record as any).fields
    } as any;
  },

  async update(id: string, data: Partial<any>): Promise<any> {
    const record = await base(TABLES.DEALS).update(id, data);
    return {
      id: (record as any).id,
      ...(record as any).fields
    } as any;
  },

  async delete(id: string): Promise<void> {
    await base(TABLES.DEALS).destroy(id);
  }
};

// Activity operations
export const activityService = {
  async getAll() {
    const records = await base(TABLES.ACTIVITIES).select().all();
    return records.map(record => ({
      id: (record as any).id,
      ...(record as any).fields
    }));
  },

  async create(data: any) {
    return await base(TABLES.ACTIVITIES).create(data);
  },

  async update(id: string, data: any) {
    return await base(TABLES.ACTIVITIES).update(id, data);
  },

  async delete(id: string) {
    return await base(TABLES.ACTIVITIES).destroy(id);
  }
}; 