import React, { useState } from 'react';
import { Users } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: string;
  source: string;
  lastContact: string;
}

export const CRM: React.FC = () => {
  const [leads] = useState<Lead[]>([]);

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold">Lead Management</h2>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        <div className="grid gap-4">
          {leads.map(lead => (
            <div
              key={lead.id}
              className="p-4 bg-white rounded-lg border hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{lead.name}</h3>
                  <p className="text-sm text-gray-600">{lead.email}</p>
                  {lead.phone && (
                    <p className="text-sm text-gray-600">{lead.phone}</p>
                  )}
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  lead.status === 'active' ? 'bg-green-100 text-green-800' :
                  lead.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {lead.status}
                </span>
              </div>
              
              <div className="mt-2 flex justify-between text-sm text-gray-600">
                <span>Source: {lead.source}</span>
                <span>Last Contact: {lead.lastContact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};