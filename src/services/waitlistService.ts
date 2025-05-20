import { supabase } from '../config/supabase.js';
import { randomBytes } from 'crypto';

export interface WaitlistEntry {
  id?: string;
  email: string;
  name: string;
  company?: string;
  created_at?: Date;
}

export interface PendingWaitlistEntry extends WaitlistEntry {
  confirmation_token: string;
  expires_at: Date;
}

export class WaitlistService {
  private static instance: WaitlistService;

  private constructor() {}

  static getInstance(): WaitlistService {
    if (!WaitlistService.instance) {
      WaitlistService.instance = new WaitlistService();
    }
    return WaitlistService.instance;
  }

  private generateToken(): string {
    return randomBytes(32).toString('hex');
  }

  async createPendingEntry(entry: Omit<WaitlistEntry, 'id' | 'created_at'>): Promise<PendingWaitlistEntry> {
    const confirmation_token = this.generateToken();
    
    // First check if email exists in either pending or confirmed waitlist
    const [pendingEntry, confirmedEntry] = await Promise.all([
      supabase.from('pending_waitlist').select('id').eq('email', entry.email).maybeSingle(),
      supabase.from('waitlist').select('id').eq('email', entry.email).maybeSingle()
    ]);

    if (pendingEntry.data || confirmedEntry.data) {
      throw new Error('Email is already registered');
    }

    const { data, error } = await supabase
      .from('pending_waitlist')
      .insert([
        {
          email: entry.email,
          name: entry.name,
          company: entry.company,
          confirmation_token
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      throw error;
    }
    return data;
  }

  async confirmEntry(token: string): Promise<WaitlistEntry | null> {
    // Start a transaction
    const { data: pendingEntry, error: fetchError } = await supabase
      .from('pending_waitlist')
      .select('*')
      .eq('confirmation_token', token)
      .single();

    if (fetchError || !pendingEntry) {
      return null;
    }

    // Check if token is expired
    if (new Date(pendingEntry.expires_at) < new Date()) {
      await supabase
        .from('pending_waitlist')
        .delete()
        .eq('confirmation_token', token);
      return null;
    }

    // Move entry from pending to confirmed
    const { data: confirmedEntry, error: insertError } = await supabase
      .from('waitlist')
      .insert([{
        email: pendingEntry.email,
        name: pendingEntry.name,
        company: pendingEntry.company
      }])
      .select()
      .single();

    if (insertError) throw insertError;

    // Delete the pending entry
    await supabase
      .from('pending_waitlist')
      .delete()
      .eq('confirmation_token', token);

    return confirmedEntry;
  }

  async isEmailRegistered(email: string): Promise<boolean> {
    const [pendingEntry, confirmedEntry] = await Promise.all([
      supabase.from('pending_waitlist').select('id').eq('email', email).maybeSingle(),
      supabase.from('waitlist').select('id').eq('email', email).maybeSingle()
    ]);

    return !!(pendingEntry.data || confirmedEntry.data);
  }

  async getConfirmedEntries(): Promise<WaitlistEntry[]> {
    const { data, error } = await supabase
      .from('waitlist')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async cleanupExpiredEntries(): Promise<void> {
    await supabase
      .from('pending_waitlist')
      .delete()
      .lt('expires_at', new Date().toISOString());
  }
} 