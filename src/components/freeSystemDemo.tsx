import React, { useState } from 'react';
import { Check, Users, Phone, MessageCircle, Calendar, TrendingUp, AlertTriangle, PieChart } from 'lucide-react';

// Placeholder components for each SaaS module
const DemoHome = () => <div className="mt-24 pt-8 p-8">
  <h1 className="text-2xl font-bold text-red-600">Welcome to the Real Estate Lead Automation SaaS Demo.</h1>
  <p className="mt-4 text-lg font-semibold text-red-500">Use the menu to explore features.</p>
</div>;

// --- Dashboard Component ---
const mockDashboard = {
  metrics: [
    { label: 'New Leads (Today)', value: 12, icon: <Users className="h-6 w-6 text-red-500" /> },
    { label: 'AI Calls (Today)', value: 34, icon: <Phone className="h-6 w-6 text-green-500" /> },
    { label: 'AI Texts (Today)', value: 58, icon: <MessageCircle className="h-6 w-6 text-blue-500" /> },
    { label: 'Appointments Set', value: 7, icon: <Calendar className="h-6 w-6 text-red-500" /> },
  ],
  funnel: [
    { stage: 'Contacted', value: 120 },
    { stage: 'Qualified', value: 60 },
    { stage: 'Appointments', value: 25 },
    { stage: 'Closed', value: 8 },
  ],
  appointments: [
    { name: 'Jane Doe', type: 'Home Tour', time: 'Today, 2:00pm' },
    { name: 'John Smith', type: 'Consultation', time: 'Tomorrow, 11:00am' },
  ],
  tasks: [
    { text: 'Review 5 new qualified leads', urgent: false },
    { text: 'Call lead Sarah Lee (requested live agent)', urgent: true },
    { text: 'Resolve CRM sync error', urgent: true },
  ],
  highlights: [
    { label: 'AI Call Answer Rate', value: '32%' },
    { label: 'Text Response Rate', value: '61%' },
    { label: 'Email Open Rate', value: '44%' },
  ],
  sources: [
    { label: 'Google Ads', value: 40 },
    { label: 'Facebook', value: 25 },
    { label: 'Website', value: 20 },
    { label: 'Referral', value: 15 },
  ],
};

const Dashboard = () => (
  <div className="space-y-8">
    {/* Metrics */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {mockDashboard.metrics.map((m, i) => (
        <div key={i} className="bg-white rounded-xl shadow p-4 flex items-center space-x-4">
          <div className="bg-red-50 rounded-full p-2">{m.icon}</div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{m.value}</div>
            <div className="text-gray-500 text-sm">{m.label}</div>
          </div>
        </div>
      ))}
    </div>
    {/* Conversion Funnel */}
    <div className="bg-white rounded-xl shadow p-6">
      <div className="font-semibold text-gray-800 mb-2 flex items-center"><TrendingUp className="h-5 w-5 mr-2 text-red-500" />Conversion Funnel</div>
      <div className="flex items-end space-x-6 mt-4">
        {mockDashboard.funnel.map((f, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="h-20 w-8 bg-red-200 rounded-t-lg" style={{ height: `${40 + f.value}px` }}></div>
            <div className="text-xs text-gray-600 mt-1">{f.stage}</div>
            <div className="text-sm font-semibold text-gray-800">{f.value}</div>
          </div>
        ))}
      </div>
    </div>
    {/* Upcoming Appointments */}
    <div className="bg-white rounded-xl shadow p-6">
      <div className="font-semibold text-gray-800 mb-2 flex items-center"><Calendar className="h-5 w-5 mr-2 text-red-500" />Upcoming Appointments</div>
      <ul className="divide-y divide-gray-100">
        {mockDashboard.appointments.map((a, i) => (
          <li key={i} className="py-2 flex justify-between items-center">
            <span className="font-medium text-gray-700">{a.name}</span>
            <span className="text-gray-500 text-sm">{a.type} – {a.time}</span>
          </li>
        ))}
      </ul>
    </div>
    {/* Tasks & Alerts */}
    <div className="bg-white rounded-xl shadow p-6">
      <div className="font-semibold text-gray-800 mb-2 flex items-center"><AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />Tasks & Alerts</div>
      <ul className="space-y-2">
        {mockDashboard.tasks.map((t, i) => (
          <li key={i} className={`flex items-center ${t.urgent ? 'text-red-600 font-semibold' : 'text-gray-700'}`}>{t.text}</li>
        ))}
      </ul>
    </div>
    {/* Performance Highlights */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {mockDashboard.highlights.map((h, i) => (
        <div key={i} className="bg-red-50 rounded-xl p-4 flex flex-col items-center">
          <div className="text-2xl font-bold text-red-700">{h.value}</div>
          <div className="text-gray-600 text-sm mt-1">{h.label}</div>
        </div>
      ))}
    </div>
    {/* Lead Source Breakdown (Pie Chart) */}
    <div className="bg-white rounded-xl shadow p-6">
      <div className="font-semibold text-gray-800 mb-2 flex items-center"><PieChart className="h-5 w-5 mr-2 text-pink-500" />Lead Source Breakdown</div>
      <div className="flex items-center space-x-8">
        <div className="relative w-32 h-32">
          {/* Simple SVG Pie Chart */}
          <svg viewBox="0 0 32 32" className="w-full h-full">
            {(() => {
              let total = mockDashboard.sources.reduce((sum, s) => sum + s.value, 0);
              let acc = 0;
              return mockDashboard.sources.map((s, i) => {
                const start = acc / total * 100;
                acc += s.value;
                const end = acc / total * 100;
                const large = end - start > 50 ? 1 : 0;
                const r = 16, cx = 16, cy = 16;
                const startAngle = (start / 100) * 2 * Math.PI - Math.PI / 2;
                const endAngle = (end / 100) * 2 * Math.PI - Math.PI / 2;
                const x1 = cx + r * Math.cos(startAngle);
                const y1 = cy + r * Math.sin(startAngle);
                const x2 = cx + r * Math.cos(endAngle);
                const y2 = cy + r * Math.sin(endAngle);
                const colors = ['#6366f1', '#06b6d4', '#f59e42', '#f43f5e'];
                return (
                  <path
                    key={i}
                    d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} Z`}
                    fill={colors[i % colors.length]}
                  />
                );
              });
            })()}
          </svg>
        </div>
        <ul className="space-y-1">
          {mockDashboard.sources.map((s, i) => (
            <li key={i} className="flex items-center space-x-2">
              <span className={`inline-block w-3 h-3 rounded-full`} style={{ background: ['#6366f1', '#06b6d4', '#f59e42', '#f43f5e'][i % 4] }}></span>
              <span className="text-gray-700 font-medium">{s.label}</span>
              <span className="text-gray-500 text-sm">{s.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

// --- Leads Module ---
type Lead = {
  id: number;
  name: string;
  type: string;
  status: string;
  source: string;
  phone: string;
  email: string;
  lastContact: string;
  assigned: string;
};

const mockLeads = [
  { id: 1, name: 'Jane Doe', type: 'Buyer', status: 'New', source: 'Google Ads', phone: '555-1234', email: 'jane@example.com', lastContact: '2024-06-01', assigned: 'Agent A' },
  { id: 2, name: 'John Smith', type: 'Seller', status: 'Qualified', source: 'Facebook', phone: '555-5678', email: 'john@example.com', lastContact: '2024-06-02', assigned: 'Agent B' },
  { id: 3, name: 'Sarah Lee', type: 'Renter', status: 'In Progress', source: 'Website', phone: '555-8765', email: 'sarah@example.com', lastContact: '2024-06-03', assigned: 'Agent A' },
  { id: 4, name: 'Mike Brown', type: 'Buyer', status: 'Closed', source: 'Referral', phone: '555-4321', email: 'mike@example.com', lastContact: '2024-05-30', assigned: 'Agent C' },
] as Lead[];

const leadStatuses = ['New', 'Qualified', 'In Progress', 'Closed'];
const leadTypes = ['Buyer', 'Seller', 'Renter'];
const leadSources = ['Google Ads', 'Facebook', 'Website', 'Referral'];

const DemoForm = ({ formState, handleChange, handleSubmit }: any) => (
  <form onSubmit={handleSubmit} className="space-y-6 mt-24 pt-8">
    {/* Full Name and Email fields side-by-side */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <input id="name" name="name" type="text" required value={formState.name} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 focus:scale-[1.03]" placeholder="John Smith" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input id="email" name="email" type="email" required value={formState.email} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 focus:scale-[1.03]" placeholder="john@company.com" />
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company name</label>
        <input id="company" name="company" type="text" required value={formState.company} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 focus:scale-[1.03]" placeholder="Company Inc." />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone number</label>
        <input id="phone" name="phone" type="text" required value={formState.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 focus:scale-[1.03]" placeholder="123-456-7890" />
      </div>
    </div>
    <div>
      <label htmlFor="mostImportantQuestion" className="block text-sm font-medium text-gray-700 mb-1">What is your most important question?</label>
      <input id="mostImportantQuestion" name="mostImportantQuestion" type="text" value={formState.mostImportantQuestion} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 focus:scale-[1.03]" placeholder="e.g., How long until I see results?" />
    </div>
    <div>
      <label htmlFor="howDidYouFindUs" className="block text-sm font-medium text-gray-700 mb-1">How did you find us?</label>
      <input id="howDidYouFindUs" name="howDidYouFindUs" type="text" value={formState.howDidYouFindUs} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 focus:scale-[1.03]" placeholder="e.g., Google search, social media, referral" />
    </div>
    <div>
      <label htmlFor="estimatedMonthlyLeadVolume" className="block text-sm font-medium text-gray-700 mb-1">What is your estimated monthly lead volume?</label>
      <select id="leadVolume" name="leadVolume" value={formState.leadType} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 focus:scale-[1.03]">
        <option value="">Select an option</option>
        <option value="Less than hundred">Less than 100</option>
        <option value="hundred to five hundred">100-500</option>
        <option value="five hundred to thousand">500-1000</option>
        <option value="thousand to two thousand five hundred">1000-2500</option>
        <option value="two thousand five hundred to five thousand">2500-5000</option>
        <option value="five thousand plus">5000+</option>
      </select>
    </div>
    <div>
      <label htmlFor="leadType" className="block text-sm font-medium text-gray-700 mb-1">Which CRM system do you use?</label>
      <select id="crmSystem" name="crmSystem" value={formState.leadType} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 focus:scale-[1.03]">
        <option value="">Select an option</option>
        <option value="Real estate buyer">Real estate buyer</option>
        <option value="Real estate seller">Real estate seller</option>
        <option value="Real estate renter">Real estate renter</option>
        <option value="Mortgage home refinance">Mortgage home refinance</option>
      </select>
    </div>
    <button type="submit" disabled={formState.loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
      {formState.loading ? 'Submitting...' : 'Request Demo'}
    </button>
  </form>
);

const Leads = () => {
  const [leads, setLeads] = useState(mockLeads);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone.includes(search);
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddLead = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const newLead: Lead = {
      id: leads.length + 1,
      name: formData.get('name') as string,
      type: formData.get('type') as string,
      status: 'New',
      source: formData.get('source') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      lastContact: new Date().toISOString().split('T')[0],
      assigned: 'Unassigned',
    };
    setLeads([...leads, newLead]);
    setShowAdd(false);
  };

  return (
    <div className="space-y-6 mt-24 pt-8">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-400"
          />
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 border rounded-lg">
            <option value="All">All Statuses</option>
            {leadStatuses.map(s => <option key={s}>{s}</option>)}
          </select>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 border rounded-lg">
            <option value="All">All Types</option>
            {leadTypes.map(t => <option key={t}>{t}</option>)}
          </select>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 border rounded-lg">
            <option value="All">All Sources</option>
            {leadSources.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <button onClick={() => setShowAdd(true)} className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700">+ Add Lead</button>
      </div>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-red-50 text-red-900">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Source</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Last Contact</th>
              <th className="px-4 py-2 text-left">Assigned</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map(lead => (
              <tr key={lead.id} className="hover:bg-red-50 cursor-pointer" onClick={() => setSelectedLead(lead)}>
                <td className="px-4 py-2 font-medium text-red-700">{lead.name}</td>
                <td className="px-4 py-2">{lead.type}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${lead.status === 'New' ? 'bg-green-100 text-green-700' : lead.status === 'Qualified' ? 'bg-blue-100 text-blue-700' : lead.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-200 text-gray-700'}`}>{lead.status}</span>
                </td>
                <td className="px-4 py-2">{lead.source}</td>
                <td className="px-4 py-2">{lead.phone}</td>
                <td className="px-4 py-2">{lead.email}</td>
                <td className="px-4 py-2">{lead.lastContact}</td>
                <td className="px-4 py-2">{lead.assigned}</td>
              </tr>
            ))}
            {filteredLeads.length === 0 && (
              <tr><td colSpan={8} className="text-center text-gray-400 py-8">No leads found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative animate-fadein">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={() => setSelectedLead(null)}>&times;</button>
            <h3 className="text-xl font-bold mb-2 text-red-700">{selectedLead.name}</h3>
            <div className="mb-2 text-gray-600">{selectedLead.type} Lead &bull; {selectedLead.status}</div>
            <div className="mb-2"><span className="font-semibold">Source:</span> {selectedLead.source}</div>
            <div className="mb-2"><span className="font-semibold">Phone:</span> {selectedLead.phone}</div>
            <div className="mb-2"><span className="font-semibold">Email:</span> {selectedLead.email}</div>
            <div className="mb-2"><span className="font-semibold">Last Contact:</span> {selectedLead.lastContact}</div>
            <div className="mb-2"><span className="font-semibold">Assigned:</span> {selectedLead.assigned}</div>
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Update Status</label>
              <select value={selectedLead.status} onChange={e => setSelectedLead({ ...selectedLead, status: e.target.value })} className="px-3 py-2 border rounded-lg">
                {leadStatuses.map(s => <option key={s}>{s}</option>)}
              </select>
              <button className="ml-2 bg-red-600 text-white px-3 py-2 rounded-lg" onClick={() => {
                setLeads(leads.map(l => l.id === selectedLead.id ? { ...l, status: selectedLead.status } : l));
                setSelectedLead(null);
              }}>Save</button>
            </div>
          </div>
        </div>
      )}
      {/* Add Lead Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <form className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative animate-fadein" onSubmit={handleAddLead}>
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={() => setShowAdd(false)} type="button">&times;</button>
            <h3 className="text-xl font-bold mb-4 text-red-700">Add New Lead</h3>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input name="name" required className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Type</label>
              <select name="type" required className="w-full px-3 py-2 border rounded-lg">
                {leadTypes.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Source</label>
              <select name="source" required className="w-full px-3 py-2 border rounded-lg">
                {leadSources.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input name="phone" required className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input name="email" type="email" required className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium w-full mt-2">Add Lead</button>
          </form>
        </div>
      )}
    </div>
  );
};

// --- AI Calling Module ---
const mockAICallMetrics = [
  { label: 'Calls Made (Today)', value: 28 },
  { label: 'Answered', value: 12 },
  { label: 'Appointments Set', value: 3 },
  { label: 'Transfers to Agent', value: 2 },
];

const mockAICalls = [
  { id: 1, lead: 'Jane Doe', time: 'Today, 10:15am', status: 'Answered', outcome: 'Qualified', transcript: 'AI: Hello Jane, this is Alex from RealtyBot...\nJane: Hi!\nAI: Are you looking to buy or sell?\nJane: Buy.\nAI: Great! Can I ask a few questions?' },
  { id: 2, lead: 'John Smith', time: 'Today, 9:50am', status: 'No Answer', outcome: 'Retry Scheduled', transcript: 'AI: Hello John, this is Alex from RealtyBot...\n(No answer)' },
  { id: 3, lead: 'Sarah Lee', time: 'Yesterday, 4:30pm', status: 'Answered', outcome: 'Appointment Set', transcript: 'AI: Hello Sarah, this is Alex from RealtyBot...\nSarah: I want to see the house.\nAI: I can schedule a tour for you. Does tomorrow at 2pm work?' },
  { id: 4, lead: 'Mike Brown', time: 'Yesterday, 3:10pm', status: 'Answered', outcome: 'Transferred', transcript: 'AI: Hello Mike, this is Alex from RealtyBot...\nMike: Can I talk to an agent?\nAI: Connecting you now.' },
];

const AICalling = () => {
  const [showTranscript, setShowTranscript] = useState<{lead: string, transcript: string} | null>(null);
  const [script, setScript] = useState('Hi, this is Alex, an assistant calling on behalf of XYZ Realty. Are you looking to buy, sell, or rent a property?');
  const [callWindow, setCallWindow] = useState({ start: '09:00', end: '18:00' });
  const [transferNumber, setTransferNumber] = useState('555-0000');

  return (
    <div className="space-y-8 mt-24 pt-8">
      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {mockAICallMetrics.map((m, i) => (
          <div key={i} className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
            <div className="text-2xl font-bold text-red-700">{m.value}</div>
            <div className="text-gray-500 text-sm mt-1">{m.label}</div>
          </div>
        ))}
      </div>
      {/* Recent/Scheduled Calls Table */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="font-semibold text-gray-800 mb-2">Recent & Scheduled AI Calls</div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-red-50 text-red-900">
                <th className="px-4 py-2 text-left">Lead</th>
                <th className="px-4 py-2 text-left">Time</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Outcome</th>
                <th className="px-4 py-2 text-left">Transcript</th>
              </tr>
            </thead>
            <tbody>
              {mockAICalls.map(call => (
                <tr key={call.id} className="hover:bg-red-50">
                  <td className="px-4 py-2 font-medium text-red-700">{call.lead}</td>
                  <td className="px-4 py-2">{call.time}</td>
                  <td className="px-4 py-2">{call.status}</td>
                  <td className="px-4 py-2">{call.outcome}</td>
                  <td className="px-4 py-2">
                    <button className="text-red-600 underline" onClick={() => setShowTranscript({lead: call.lead, transcript: call.transcript})}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Call Settings */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="font-semibold text-gray-800 mb-2">AI Call Settings</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">AI Script</label>
            <textarea value={script} onChange={e => setScript(e.target.value)} className="w-full px-3 py-2 border rounded-lg min-h-[80px]" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Call Window</label>
            <div className="flex gap-2 items-center">
              <input type="time" value={callWindow.start} onChange={e => setCallWindow(w => ({...w, start: e.target.value}))} className="px-2 py-1 border rounded-lg" />
              <span>to</span>
              <input type="time" value={callWindow.end} onChange={e => setCallWindow(w => ({...w, end: e.target.value}))} className="px-2 py-1 border rounded-lg" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Transfer to Agent Number</label>
            <input type="text" value={transferNumber} onChange={e => setTransferNumber(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
          </div>
        </div>
      </div>
      {/* Transcript Modal */}
      {showTranscript && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative animate-fadein">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={() => setShowTranscript(null)}>&times;</button>
            <h3 className="text-xl font-bold mb-2 text-red-700">Call Transcript: {showTranscript.lead}</h3>
            <pre className="bg-gray-50 rounded p-4 text-sm text-gray-800 whitespace-pre-wrap">{showTranscript.transcript}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

// --- AI Texting Module ---
const mockTextConversations = [
  {
    id: 1,
    lead: 'Jane Doe',
    phone: '555-1234',
    messages: [
      { type: 'user', content: 'Hi Jane, thanks for your inquiry!', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) },
      { type: 'lead', content: 'Hi! Is the house at 123 Maple still available?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 60000) },
      { type: 'user', content: 'Yes, it is! Would you like to schedule a tour?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 120000) },
      { type: 'lead', content: 'Yes, please. Tomorrow works.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 180000) },
    ],
  },
  {
    id: 2,
    lead: 'John Smith',
    phone: '555-5678',
    messages: [
      { type: 'user', content: 'Hi John, are you still interested in selling your home?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3) },
      { type: 'lead', content: 'Yes, but I have some questions.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3 + 60000) },
      { type: 'user', content: 'Happy to help! What would you like to know?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3 + 120000) },
    ],
  },
  {
    id: 3,
    lead: 'Sarah Lee',
    phone: '555-8765',
    messages: [
      { type: 'user', content: 'Hi Sarah, are you looking to rent or buy?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4) },
      { type: 'lead', content: 'Rent for now.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4 + 60000) },
    ],
  },
];

const AITexting = () => {
  const [conversations, setConversations] = useState(mockTextConversations);
  const [selectedId, setSelectedId] = useState<number | null>(conversations[0]?.id || null);
  const [input, setInput] = useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const selectedConv = conversations.find(c => c.id === selectedId);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedConv?.messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !selectedConv) return;
    const newMsg = { type: 'user', content: input, timestamp: new Date() };
    setConversations(conversations.map(c =>
      c.id === selectedConv.id
        ? { ...c, messages: [...c.messages, newMsg] }
        : c
    ));
    setInput('');
  };

  return (
    <div className="mt-16 pt-8">
      <div className="flex h-[600px] bg-white rounded-xl shadow overflow-hidden">
        {/* Conversation List */}
        <aside className="w-64 border-r bg-gray-50 flex flex-col">
          <div className="p-4 font-semibold text-red-700 border-b">Conversations</div>
          <ul className="flex-1 overflow-y-auto">
            {conversations.map(conv => (
              <li
                key={conv.id}
                className={`px-4 py-3 cursor-pointer border-b hover:bg-red-50 ${selectedId === conv.id ? 'bg-red-100' : ''}`}
                onClick={() => setSelectedId(conv.id)}
              >
                <div className="font-medium text-gray-800">{conv.lead}</div>
                <div className="text-xs text-gray-500">{conv.phone}</div>
                <div className="text-xs text-gray-400 truncate mt-1">
                  {conv.messages[conv.messages.length - 1]?.content}
                </div>
              </li>
            ))}
          </ul>
        </aside>
        {/* Chat Window */}
        <section className="flex-1 flex flex-col">
          <div className="p-4 border-b bg-red-50 flex items-center">
            <div className="font-semibold text-red-700 text-lg">{selectedConv?.lead || 'Select a conversation'}</div>
            <div className="ml-4 text-xs text-gray-500">{selectedConv?.phone}</div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
            {selectedConv?.messages.length === 0 && (
              <div className="text-center text-gray-400 mt-8">No messages yet.</div>
            )}
            {selectedConv?.messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] rounded-lg p-3 ${msg.type === 'user' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  <p className="text-xs mt-1 opacity-70">{msg.timestamp.toLocaleTimeString()}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSend} className="p-4 border-t bg-gray-50 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

// --- Email Follow-Up Module ---
const mockEmailSequences = [
  {
    id: 1,
    name: 'New Buyer Welcome',
    steps: [
      { day: 0, subject: 'Welcome to XYZ Realty!', preview: 'Thanks for reaching out...' },
      { day: 2, subject: 'Are you still interested?', preview: 'Just checking in...' },
      { day: 7, subject: 'Let us know your preferences', preview: 'Tell us what you are looking for...' },
    ],
  },
  {
    id: 2,
    name: 'Seller Nurture',
    steps: [
      { day: 0, subject: 'Ready to sell your home?', preview: 'We can help you get top dollar...' },
      { day: 3, subject: 'Free Home Valuation', preview: 'Find out what your home is worth...' },
    ],
  },
];

const mockSentEmails = [
  { id: 1, to: 'jane@example.com', subject: 'Welcome to XYZ Realty!', status: 'Sent', sentAt: '2024-06-10 09:00', opened: true, clicked: false, content: 'Hi Jane,\nThanks for reaching out to XYZ Realty! We look forward to helping you find your dream home.' },
  { id: 2, to: 'john@example.com', subject: 'Are you still interested?', status: 'Opened', sentAt: '2024-06-09 10:30', opened: true, clicked: true, content: 'Hi John,\nJust checking in to see if you are still interested in selling your home.' },
  { id: 3, to: 'sarah@example.com', subject: 'Let us know your preferences', status: 'Scheduled', sentAt: '2024-06-12 08:00', opened: false, clicked: false, content: 'Hi Sarah,\nTell us what you are looking for in your next home.' },
];

const EmailFollowUp = () => {
  const [showEmail, setShowEmail] = useState<{subject: string, content: string} | null>(null);
  const [template, setTemplate] = useState('Hi {{name}},\n\nThanks for reaching out to XYZ Realty!\n\nLet us know how we can help.');

  return (
    <div className="mt-16 pt-8">
      <div className="space-y-8">
        {/* Email Sequences */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="font-semibold text-gray-800 mb-2">Automated Email Sequences</div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-red-50 text-red-900">
                  <th className="px-4 py-2 text-left">Sequence Name</th>
                  <th className="px-4 py-2 text-left">Step</th>
                  <th className="px-4 py-2 text-left">Day</th>
                  <th className="px-4 py-2 text-left">Subject</th>
                  <th className="px-4 py-2 text-left">Preview</th>
                </tr>
              </thead>
              <tbody>
                {mockEmailSequences.flatMap(seq =>
                  seq.steps.map((step, idx) => (
                    <tr key={seq.id + '-' + idx}>
                      <td className="px-4 py-2 font-medium text-red-700">{seq.name}</td>
                      <td className="px-4 py-2">{idx + 1}</td>
                      <td className="px-4 py-2">Day {step.day}</td>
                      <td className="px-4 py-2">{step.subject}</td>
                      <td className="px-4 py-2 text-gray-500">{step.preview}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* Sent/Scheduled Emails */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="font-semibold text-gray-800 mb-2">Sent & Scheduled Emails</div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-red-50 text-red-900">
                  <th className="px-4 py-2 text-left">To</th>
                  <th className="px-4 py-2 text-left">Subject</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Sent At</th>
                  <th className="px-4 py-2 text-left">Opened</th>
                  <th className="px-4 py-2 text-left">Clicked</th>
                  <th className="px-4 py-2 text-left">View</th>
                </tr>
              </thead>
              <tbody>
                {mockSentEmails.map(email => (
                  <tr key={email.id}>
                    <td className="px-4 py-2">{email.to}</td>
                    <td className="px-4 py-2">{email.subject}</td>
                    <td className="px-4 py-2">{email.status}</td>
                    <td className="px-4 py-2">{email.sentAt}</td>
                    <td className="px-4 py-2">{email.opened ? '✔️' : ''}</td>
                    <td className="px-4 py-2">{email.clicked ? '✔️' : ''}</td>
                    <td className="px-4 py-2">
                      <button className="text-red-600 underline" onClick={() => setShowEmail({subject: email.subject, content: email.content})}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Template Designer */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="font-semibold text-gray-800 mb-2">Email Template Designer</div>
          <textarea
            value={template}
            onChange={e => setTemplate(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg min-h-[120px] font-mono"
          />
          <div className="text-xs text-gray-500 mt-2">Use <code>{'{{name}}'}</code> for personalization.</div>
        </div>
        {/* Email Content Modal */}
        {showEmail && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative animate-fadein">
              <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={() => setShowEmail(null)}>&times;</button>
              <h3 className="text-xl font-bold mb-2 text-red-700">{showEmail.subject}</h3>
              <pre className="bg-gray-50 rounded p-4 text-sm text-gray-800 whitespace-pre-wrap">{showEmail.content}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Appointments Module ---
const mockAppointments = [
  { id: 1, lead: 'Jane Doe', type: 'Home Tour', date: '2024-06-13', time: '14:00', status: 'Scheduled', notes: '123 Maple St.' },
  { id: 2, lead: 'John Smith', type: 'Consultation', date: '2024-06-14', time: '11:00', status: 'Scheduled', notes: 'Phone call' },
  { id: 3, lead: 'Sarah Lee', type: 'Showing', date: '2024-06-10', time: '16:00', status: 'Completed', notes: '456 Oak Ave.' },
  { id: 4, lead: 'Mike Brown', type: 'Home Tour', date: '2024-06-09', time: '10:00', status: 'Cancelled', notes: '789 Pine Rd.' },
];

const Appointments = () => {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ lead: '', type: 'Home Tour', date: '', time: '', notes: '' });

  const upcoming = appointments.filter(a => a.status === 'Scheduled');
  const past = appointments.filter(a => a.status !== 'Scheduled');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setAppointments([
      { id: appointments.length + 1, ...form, status: 'Scheduled' },
      ...appointments,
    ]);
    setShowAdd(false);
    setForm({ lead: '', type: 'Home Tour', date: '', time: '', notes: '' });
  };

  const handleCancel = (id: number) => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, status: 'Cancelled' } : a));
  };

  return (
    <div className="space-y-8 mt-24 pt-8">
      {/* Calendar View (simple table for demo) */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-2">
          <div className="font-semibold text-gray-800">Upcoming Appointments</div>
          <button onClick={() => setShowAdd(true)} className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700">+ Schedule Appointment</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-red-50 text-red-900">
                <th className="px-4 py-2 text-left">Lead</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Time</th>
                <th className="px-4 py-2 text-left">Notes</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {upcoming.length === 0 && (
                <tr><td colSpan={7} className="text-center text-gray-400 py-8">No upcoming appointments.</td></tr>
              )}
              {upcoming.map(a => (
                <tr key={a.id}>
                  <td className="px-4 py-2 font-medium text-red-700">{a.lead}</td>
                  <td className="px-4 py-2">{a.type}</td>
                  <td className="px-4 py-2">{a.date}</td>
                  <td className="px-4 py-2">{a.time}</td>
                  <td className="px-4 py-2">{a.notes}</td>
                  <td className="px-4 py-2">{a.status}</td>
                  <td className="px-4 py-2">
                    <button className="text-red-600 underline" onClick={() => handleCancel(a.id)}>Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Past Appointments */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="font-semibold text-gray-800 mb-2">Past Appointments</div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-red-50 text-red-900">
                <th className="px-4 py-2 text-left">Lead</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Time</th>
                <th className="px-4 py-2 text-left">Notes</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {past.length === 0 && (
                <tr><td colSpan={6} className="text-center text-gray-400 py-8">No past appointments.</td></tr>
              )}
              {past.map(a => (
                <tr key={a.id}>
                  <td className="px-4 py-2 font-medium text-red-700">{a.lead}</td>
                  <td className="px-4 py-2">{a.type}</td>
                  <td className="px-4 py-2">{a.date}</td>
                  <td className="px-4 py-2">{a.time}</td>
                  <td className="px-4 py-2">{a.notes}</td>
                  <td className="px-4 py-2">{a.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Add Appointment Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <form className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative animate-fadein" onSubmit={handleAdd}>
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={() => setShowAdd(false)} type="button">&times;</button>
            <h3 className="text-xl font-bold mb-4 text-red-700">Schedule Appointment</h3>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Lead</label>
              <input name="lead" required className="w-full px-3 py-2 border rounded-lg" value={form.lead} onChange={e => setForm(f => ({ ...f, lead: e.target.value }))} />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Type</label>
              <select name="type" required className="w-full px-3 py-2 border rounded-lg" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                <option>Home Tour</option>
                <option>Consultation</option>
                <option>Showing</option>
                <option>Other</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Date</label>
              <input name="date" type="date" required className="w-full px-3 py-2 border rounded-lg" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Time</label>
              <input name="time" type="time" required className="w-full px-3 py-2 border rounded-lg" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Notes</label>
              <input name="notes" className="w-full px-3 py-2 border rounded-lg" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
            </div>
            <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium w-full mt-2">Schedule</button>
          </form>
        </div>
      )}
    </div>
  );
};

// --- Live Call Transfers Module ---
const mockTransferLogs = [
  { id: 1, lead: 'Jane Doe', agent: 'Agent A', time: '2024-06-10 14:05', status: 'Completed', duration: '6:12', outcome: 'Qualified' },
  { id: 2, lead: 'John Smith', agent: 'Agent B', time: '2024-06-09 11:20', status: 'Missed', duration: '-', outcome: 'No Answer' },
  { id: 3, lead: 'Sarah Lee', agent: 'Agent A', time: '2024-06-08 16:45', status: 'Completed', duration: '4:33', outcome: 'Appointment Set' },
];

const LiveCallTransfers = () => {
  const [agentAvailable, setAgentAvailable] = useState(true);
  const [transferNumber, setTransferNumber] = useState('555-0000');
  const [criteria, setCriteria] = useState('Lead requests agent OR AI qualifies as hot lead');

  return (
    <div className="space-y-8 mt-24 pt-8">
      {/* Transfer Config Panel */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="font-semibold text-gray-800 mb-2">Live Transfer Settings</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Agent Transfer Number</label>
            <input type="text" value={transferNumber} onChange={e => setTransferNumber(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Transfer Criteria</label>
            <input type="text" value={criteria} onChange={e => setCriteria(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            <div className="text-xs text-gray-500 mt-1">E.g., "Lead requests agent" or "AI qualifies as hot lead"</div>
          </div>
          <div className="flex flex-col justify-center items-start">
            <label className="block text-sm font-medium mb-1">Agent Availability</label>
            <button
              onClick={() => setAgentAvailable(a => !a)}
              className={`px-4 py-2 rounded-lg font-medium ${agentAvailable ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-700'}`}
            >
              {agentAvailable ? 'Available for Transfers' : 'Unavailable'}
            </button>
            <div className="text-xs text-gray-500 mt-1">Toggle to receive live transfers.</div>
          </div>
        </div>
      </div>
      {/* Transfer Logs */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="font-semibold text-gray-800 mb-2">Recent Live Transfer Logs</div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-red-50 text-red-900">
                <th className="px-4 py-2 text-left">Lead</th>
                <th className="px-4 py-2 text-left">Agent</th>
                <th className="px-4 py-2 text-left">Time</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Duration</th>
                <th className="px-4 py-2 text-left">Outcome</th>
              </tr>
            </thead>
            <tbody>
              {mockTransferLogs.length === 0 && (
                <tr><td colSpan={6} className="text-center text-gray-400 py-8">No transfer logs.</td></tr>
              )}
              {mockTransferLogs.map(log => (
                <tr key={log.id}>
                  <td className="px-4 py-2 font-medium text-red-700">{log.lead}</td>
                  <td className="px-4 py-2">{log.agent}</td>
                  <td className="px-4 py-2">{log.time}</td>
                  <td className="px-4 py-2">{log.status}</td>
                  <td className="px-4 py-2">{log.duration}</td>
                  <td className="px-4 py-2">{log.outcome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- Compliance Tools Module ---
const mockOptOuts = [
  { id: 1, type: 'SMS', value: '555-1234', date: '2024-06-10' },
  { id: 2, type: 'Email', value: 'john@example.com', date: '2024-06-09' },
];
const mockAuditLog = [
  { id: 1, event: 'Lead opted out via SMS', detail: '555-1234', date: '2024-06-10' },
  { id: 2, event: 'DNC list uploaded', detail: 'dnc_list.csv', date: '2024-06-08' },
  { id: 3, event: '10DLC registration completed', detail: 'Brand: XYZ Realty', date: '2024-06-05' },
];

const ComplianceTools = () => {
  const [callWindow, setCallWindow] = useState({ start: '09:00', end: '20:00' });
  const [recordingDisclosure, setRecordingDisclosure] = useState(true);
  const [emailFooter, setEmailFooter] = useState('XYZ Realty, 123 Main St, City, State');
  const [dncStatus, setDncStatus] = useState('No file uploaded');
  const [d10dlcStatus] = useState('Registered');

  const handleDncUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDncStatus(`Uploaded: ${e.target.files[0].name}`);
    }
  };

  return (
    <div className="space-y-8 mt-24 pt-8">
      {/* Consent Management */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="font-semibold text-gray-800 mb-2">Consent & Opt-Out Management</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="font-medium mb-1">Opt-Out List</div>
            <ul className="divide-y divide-gray-100">
              {mockOptOuts.map(o => (
                <li key={o.id} className="py-2 flex justify-between text-sm">
                  <span>{o.type}: {o.value}</span>
                  <span className="text-gray-400">{o.date}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-medium mb-1">Upload DNC List</div>
            <input type="file" accept=".csv" onChange={handleDncUpload} className="mb-2" />
            <div className="text-xs text-gray-500">{dncStatus}</div>
          </div>
        </div>
      </div>
      {/* 10DLC Registration Status */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="font-semibold text-gray-800 mb-2">10DLC Registration</div>
        <div className="flex items-center gap-4">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${d10dlcStatus === 'Registered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{d10dlcStatus}</span>
          <span className="text-gray-500 text-sm">(Brand: XYZ Realty)</span>
        </div>
      </div>
      {/* Call & Email Compliance Settings */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="font-semibold text-gray-800 mb-2">Call & Email Compliance Settings</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Permissible Call Window</label>
            <div className="flex gap-2 items-center">
              <input type="time" value={callWindow.start} onChange={e => setCallWindow(w => ({...w, start: e.target.value}))} className="px-2 py-1 border rounded-lg" />
              <span>to</span>
              <input type="time" value={callWindow.end} onChange={e => setCallWindow(w => ({...w, end: e.target.value}))} className="px-2 py-1 border rounded-lg" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Call Recording Disclosure</label>
            <div className="flex items-center gap-2 mt-1">
              <input type="checkbox" checked={recordingDisclosure} onChange={e => setRecordingDisclosure(e.target.checked)} />
              <span className="text-sm">Play disclosure at call start</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email Footer (CAN-SPAM)</label>
            <input type="text" value={emailFooter} onChange={e => setEmailFooter(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
            <div className="text-xs text-gray-500 mt-1">Business address for all emails</div>
          </div>
        </div>
      </div>
      {/* Audit Log */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="font-semibold text-gray-800 mb-2">Compliance Audit Log</div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-red-50 text-red-900">
                <th className="px-4 py-2 text-left">Event</th>
                <th className="px-4 py-2 text-left">Detail</th>
                <th className="px-4 py-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {mockAuditLog.length === 0 && (
                <tr><td colSpan={3} className="text-center text-gray-400 py-8">No audit events.</td></tr>
              )}
              {mockAuditLog.map(log => (
                <tr key={log.id}>
                  <td className="px-4 py-2 font-medium text-red-700">{log.event}</td>
                  <td className="px-4 py-2">{log.detail}</td>
                  <td className="px-4 py-2">{log.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- Settings & Admin Module ---
const mockUsers = [
  { id: 1, name: 'Alice Agent', email: 'alice@xyzrealty.com', role: 'Agent', lastLogin: '2024-06-10' },
  { id: 2, name: 'Bob Manager', email: 'bob@xyzrealty.com', role: 'Manager', lastLogin: '2024-06-09' },
];
const mockInvoices = [
  { id: 1, date: '2024-06-01', amount: '$99', status: 'Paid' },
  { id: 2, date: '2024-05-01', amount: '$99', status: 'Paid' },
];

const SettingsAdmin = () => {
  const [users, setUsers] = useState(mockUsers);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Agent' });
  const [companyName, setCompanyName] = useState('XYZ Realty');
  const [logoStatus, setLogoStatus] = useState('No logo uploaded');
  const [plan] = useState('Pro');
  const [notifications, setNotifications] = useState({ leadReply: true, appointment: true, dailySummary: false });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    setUsers([...users, { ...newUser, id: users.length + 1, lastLogin: '-' }]);
    setNewUser({ name: '', email: '', role: 'Agent' });
  };
  const handleRemoveUser = (id: number) => {
    setUsers(users.filter(u => u.id !== id));
  };
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoStatus(`Uploaded: ${e.target.files[0].name}`);
    }
  };

  return (
    <div className="space-y-8 mt-24 pt-8">
      {/* User/Team Management */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="font-semibold text-gray-800 mb-2">User & Team Management</div>
        <form className="flex flex-wrap gap-2 mb-4" onSubmit={handleAddUser}>
          <input type="text" required placeholder="Name" value={newUser.name} onChange={e => setNewUser(u => ({ ...u, name: e.target.value }))} className="px-3 py-2 border rounded-lg" />
          <input type="email" required placeholder="Email" value={newUser.email} onChange={e => setNewUser(u => ({ ...u, email: e.target.value }))} className="px-3 py-2 border rounded-lg" />
          <select value={newUser.role} onChange={e => setNewUser(u => ({ ...u, role: e.target.value }))} className="px-3 py-2 border rounded-lg">
            <option>Agent</option>
            <option>Manager</option>
          </select>
          <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700">Add User</button>
        </form>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-red-50 text-red-900">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Last Login</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td className="px-4 py-2 font-medium text-red-700">{u.name}</td>
                  <td className="px-4 py-2">{u.email}</td>
                  <td className="px-4 py-2">{u.role}</td>
                  <td className="px-4 py-2">{u.lastLogin}</td>
                  <td className="px-4 py-2">
                    <button className="text-red-600 underline" onClick={() => handleRemoveUser(u.id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Branding Settings */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="font-semibold text-gray-800 mb-2">Branding Settings</div>
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div>
            <label className="block text-sm font-medium mb-1">Company Name</label>
            <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} className="px-3 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Logo Upload</label>
            <input type="file" accept="image/*" onChange={handleLogoUpload} />
            <div className="text-xs text-gray-500 mt-1">{logoStatus}</div>
          </div>
        </div>
      </div>
      {/* Billing Info */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="font-semibold text-gray-800 mb-2">Billing & Plan</div>
        <div className="mb-2">Current Plan: <span className="font-semibold text-red-700">{plan}</span></div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-red-50 text-red-900">
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockInvoices.map(inv => (
                <tr key={inv.id}>
                  <td className="px-4 py-2">{inv.date}</td>
                  <td className="px-4 py-2">{inv.amount}</td>
                  <td className="px-4 py-2">{inv.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Notification Preferences */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="font-semibold text-gray-800 mb-2">Notification Preferences</div>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={notifications.leadReply} onChange={e => setNotifications(n => ({ ...n, leadReply: e.target.checked }))} />
            Lead replies
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={notifications.appointment} onChange={e => setNotifications(n => ({ ...n, appointment: e.target.checked }))} />
            Appointment scheduled
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={notifications.dailySummary} onChange={e => setNotifications(n => ({ ...n, dailySummary: e.target.checked }))} />
            Daily summary email
          </label>
        </div>
      </div>
      {/* Support/Help */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="font-semibold text-gray-800 mb-2">Support & Help</div>
        <ul className="list-disc pl-6 text-red-700">
          <li><a href="#" className="underline">Knowledge Base</a></li>
          <li><a href="#" className="underline">Contact Support</a></li>
          <li><a href="#" className="underline">User Guide</a></li>
        </ul>
      </div>
    </div>
  );
};

const menuItems = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'leads', label: 'Leads' },
  { key: 'home', label: 'Demo Home' },
  { key: 'ai-calling', label: 'AI Calling' },
  { key: 'ai-texting', label: 'AI Texting' },
  { key: 'email-followup', label: 'Email Follow-Up' },
  { key: 'appointments', label: 'Appointments' },
  { key: 'live-call-transfers', label: 'Live Call Transfers' },
  { key: 'compliance', label: 'Compliance Tools' },
  { key: 'settings', label: 'Settings & Admin' },
  { key: 'demo-form', label: 'Request Demo Form' },
];

export const FreeSystemDemo: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    mostImportantQuestion: '',
    howDidYouFindUs: '',
    estimatedMonthlyLeadVolume: '',
    crmSystem: '',
    leadType: '',
    submitted: false,
    loading: false
  });
  const [activeSection, setActiveSection] = useState('home');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, loading: true }));
    setTimeout(() => {
      setFormState(prev => ({
        ...prev,
        loading: false,
        submitted: true,
        name: '',
        email: '',
        company: '',
        phone: '',
        mostImportantQuestion: '',
        howDidYouFindUs: '',
        estimatedMonthlyLeadVolume: '',
        crmSystem: '',
        leadType: '',
      }));
    }, 1500);
  };

  let content;
  switch (activeSection) {
    case 'dashboard':
      content = <Dashboard />;
      break;
    case 'leads':
      content = <Leads />;
      break;
    case 'ai-calling':
      content = <AICalling />;
      break;
    case 'ai-texting':
      content = <AITexting />;
      break;
    case 'email-followup':
      content = <EmailFollowUp />;
      break;
    case 'appointments':
      content = <Appointments />;
      break;
    case 'live-call-transfers':
      content = <LiveCallTransfers />;
      break;
    case 'compliance':
      content = <ComplianceTools />;
      break;
    case 'settings':
      content = <SettingsAdmin />;
      break;
    case 'demo-form':
      content = formState.submitted ? (
              <div className="text-center py-10 animate-fadein">
                <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-6 animate-pop">
                  <Check className="h-8 w-8 text-teal-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Thank you!</h4>
          <p className="text-gray-600">We've received your request and will be in touch shortly.</p>
              </div>
            ) : (
        <DemoForm formState={formState} handleChange={handleChange} handleSubmit={handleSubmit} />
      );
      break;
    default:
      content = <DemoHome />;
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-white via-red-50 to-rose-50">
      {/* Left-side menu */}
      <nav className="w-64 bg-white/90 border-r border-gray-200 p-6 flex flex-col space-y-2 shadow-lg">
        {menuItems.map(item => (
          <button
            key={item.key}
            className={`text-left px-4 py-2 rounded-lg transition-colors ${
              item.key === 'dashboard'
                ? 'italic underline text-xl font-bold text-red-900'
                : activeSection === item.key 
                  ? 'bg-red-100 text-red-700 font-medium' 
                  : 'hover:bg-red-50 text-gray-700 font-medium'
            }`}
            onClick={() => setActiveSection(item.key)}
          >
            {item.label}
          </button>
        ))}
      </nav>
      {/* Main content area */}
      <main className="flex-1 p-8 overflow-y-auto">
        {content}
      </main>
    </div>
  );
};