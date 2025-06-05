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
    <div className="space-y-8">
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
            <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Logo Upload</label>
            <input type="file" accept="image/*" onChange={handleLogoUpload} className="focus:outline-none focus:ring-2 focus:ring-red-500" />
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
            <input type="checkbox" checked={notifications.leadReply} onChange={e => setNotifications(n => ({ ...n, leadReply: e.target.checked }))} className="text-red-600 focus:ring-red-500" />
            Lead replies
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={notifications.appointment} onChange={e => setNotifications(n => ({ ...n, appointment: e.target.checked }))} className="text-red-600 focus:ring-red-500" />
            Appointment scheduled
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={notifications.dailySummary} onChange={e => setNotifications(n => ({ ...n, dailySummary: e.target.checked }))} className="text-red-600 focus:ring-red-500" />
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