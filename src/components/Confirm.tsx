import { useEffect, useState } from 'react';

export function Confirm() {
  const [status, setStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (!token) {
      setStatus('error');
      setMessage('Invalid or missing confirmation token.');
      return;
    }

    fetch(`/api/waitlist/confirm?token=${token}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStatus('success');
          setMessage(data.message || 'Email confirmed successfully!');
        } else {
          setStatus('error');
          setMessage(data.message || 'Invalid or expired confirmation token.');
        }
      })
      .catch(() => {
        setStatus('error');
        setMessage('An error occurred. Please try again later.');
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow text-center">
        {status === 'pending' && <p>Confirming your email...</p>}
        {status === 'success' && <p className="text-green-600">{message}</p>}
        {status === 'error' && <p className="text-red-600">{message}</p>}
      </div>
    </div>
  );
} 