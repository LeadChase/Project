import React, { useState } from 'react';
import {
  Phone,
  Mail,
  User,
  Clock,
  Filter,
  Search,
  Plus,
  Edit2,
  Trash2,
  Save,
  X
} from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'closed';
  source: 'website' | 'chatbot' | 'voicebot' | 'referral' | 'other';
  lastContact: Date;
  interactions: Interaction[];
  notes: string;
}

interface Interaction {
  type: 'chat' | 'call' | 'email' | 'viewing';
  date: Date;
  notes?: string;
}

export const LeadManager: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || lead.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddLead = () => {
    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      name: '',
      email: '',
      phone: '',
      status: 'new',
      source: 'website',
      lastContact: new Date(),
      interactions: [],
      notes: ''
    };
    setLeads([...leads, newLead]);
    setSelectedLead(newLead);
    setIsEditing(true);
  };

  const handleSaveLead = (updatedLead: Lead) => {
    if (selectedLead) {
      setLeads(leads.map(lead => lead.id === selectedLead.id ? updatedLead : lead));
      setSelectedLead(updatedLead);
      setIsEditing(false);
    }
  };

  const handleDeleteLead = (leadId: string) => {
    setLeads(leads.filter(lead => lead.id !== leadId));
    if (selectedLead?.id === leadId) {
      setSelectedLead(null);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex h-full">
      {/* Leads List */}
      <div className="w-1/3 border-r p-4">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Leads</h2>
          <button
            onClick={handleAddLead}
            className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-4 space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full p-2 border rounded-lg"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="text-gray-400 w-5 h-5" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="p-2 border rounded-lg flex-grow"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="proposal">Proposal</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          {filteredLeads.map(lead => (
            <div
              key={lead.id}
              className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                selectedLead?.id === lead.id ? 'border-indigo-500 bg-indigo-50' : ''
              }`}
              onClick={() => {
                setSelectedLead(lead);
                setIsEditing(false);
              }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{lead.name}</h3>
                  <p className="text-sm text-gray-600">{lead.email}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  lead.status === 'new' ? 'bg-blue-100 text-blue-800' :
                  lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' :
                  lead.status === 'qualified' ? 'bg-green-100 text-green-800' :
                  lead.status === 'proposal' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {lead.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lead Details */}
      <div className="flex-1 p-4">
        {selectedLead ? (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Lead Details</h2>
              <div className="space-x-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => handleSaveLead(selectedLead)}
                      className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      <Save className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteLead(selectedLead.id)}
                      className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <User className="text-gray-400 w-5 h-5" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={selectedLead.name}
                      onChange={(e) => setSelectedLead({ ...selectedLead, name: e.target.value })}
                      className="p-2 border rounded-lg flex-grow"
                    />
                  ) : (
                    <span>{selectedLead.name}</span>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Mail className="text-gray-400 w-5 h-5" />
                  {isEditing ? (
                    <input
                      type="email"
                      value={selectedLead.email}
                      onChange={(e) => setSelectedLead({ ...selectedLead, email: e.target.value })}
                      className="p-2 border rounded-lg flex-grow"
                    />
                  ) : (
                    <span>{selectedLead.email}</span>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Phone className="text-gray-400 w-5 h-5" />
                  {isEditing ? (
                    <input
                      type="tel"
                      value={selectedLead.phone}
                      onChange={(e) => setSelectedLead({ ...selectedLead, phone: e.target.value })}
                      className="p-2 border rounded-lg flex-grow"
                    />
                  ) : (
                    <span>{selectedLead.phone}</span>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Clock className="text-gray-400 w-5 h-5" />
                  <span>Last Contact: {selectedLead.lastContact.toLocaleDateString()}</span>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Status</h3>
                {isEditing ? (
                  <select
                    value={selectedLead.status}
                    onChange={(e) => setSelectedLead({ ...selectedLead, status: e.target.value as Lead['status'] })}
                    className="p-2 border rounded-lg w-full"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="proposal">Proposal</option>
                    <option value="closed">Closed</option>
                  </select>
                ) : (
                  <span className={`px-3 py-1 rounded-full ${
                    selectedLead.status === 'new' ? 'bg-blue-100 text-blue-800' :
                    selectedLead.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' :
                    selectedLead.status === 'qualified' ? 'bg-green-100 text-green-800' :
                    selectedLead.status === 'proposal' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedLead.status}
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-medium mb-2">Notes</h3>
                {isEditing ? (
                  <textarea
                    value={selectedLead.notes}
                    onChange={(e) => setSelectedLead({ ...selectedLead, notes: e.target.value })}
                    className="p-2 border rounded-lg w-full h-32"
                  />
                ) : (
                  <p className="text-gray-600">{selectedLead.notes}</p>
                )}
              </div>

              <div>
                <h3 className="font-medium mb-2">Interactions</h3>
                {selectedLead.interactions.map((interaction, index) => (
                  <div key={index} className="mb-2 p-2 bg-gray-50 rounded-lg">
                    <div className="flex justify-between">
                      <span className="font-medium">{interaction.type}</span>
                      <span className="text-gray-600">{interaction.date.toLocaleDateString()}</span>
                    </div>
                    {interaction.notes && (
                      <p className="text-sm text-gray-600 mt-1">{interaction.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a lead to view details
          </div>
        )}
      </div>
    </div>
  );
}; 