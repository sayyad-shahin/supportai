import React, { useState } from 'react';
import axios from 'axios';
import API_BASE from '../config';

const IconBot = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/>
    <path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/>
  </svg>
);

const IconUser = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

const IconLock = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
  </svg>
);

export default function AuthPage({ onLogin }) {
  const [tab, setTab] = useState('login');
  const [form, setForm] = useState({ username: '', password: '' });
  const [status, setStatus] = useState({ loading: false, error: '', success: '' });

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const switchTab = t => { setTab(t); setStatus({ loading: false, error: '', success: '' }); };

  const submit = async () => {
    if (!form.username.trim() || !form.password.trim()) {
      setStatus({ loading: false, error: 'Please fill in all fields', success: '' }); return;
    }
    setStatus({ loading: true, error: '', success: '' });
    try {
      const { data } = await axios.post(`${API_BASE}/${tab}`, form);
      if (tab === 'register') {
        setStatus({ loading: false, error: '', success: 'Account created! Please sign in.' });
        setTab('login');
        setForm({ username: form.username, password: '' });
      } else {
        onLogin({ id: data.user_id, username: data.username });
      }
    } catch (err) {
      setStatus({ loading: false, error: err.response?.data?.error || 'Cannot connect. Is Flask running?', success: '' });
    }
  };

  const onKey = e => { if (e.key === 'Enter') submit(); };

  return (
    <div className="auth-wrap">
      <div className="auth-orb1" /><div className="auth-orb2" />
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-icon"><IconBot /></div>
          <div>
            <div className="auth-brand">SupportAI</div>
            <div className="auth-tagline">Intelligent customer support</div>
          </div>
        </div>

        <div className="auth-tabs">
          <button className={`auth-tab ${tab === 'login' ? 'active' : ''}`} onClick={() => switchTab('login')}>Sign In</button>
          <button className={`auth-tab ${tab === 'register' ? 'active' : ''}`} onClick={() => switchTab('register')}>Register</button>
        </div>

        <div className="auth-field">
          <label className="auth-label">Username</label>
          <div className="auth-input-wrap">
            <span className="auth-input-icon"><IconUser /></span>
            <input className="auth-input" name="username" placeholder="Enter your username"
              value={form.username} onChange={handle} onKeyDown={onKey} autoFocus autoComplete="username" />
          </div>
        </div>

        <div className="auth-field">
          <label className="auth-label">Password</label>
          <div className="auth-input-wrap">
            <span className="auth-input-icon"><IconLock /></span>
            <input className="auth-input" name="password" type="password" placeholder="Enter your password"
              value={form.password} onChange={handle} onKeyDown={onKey}
              autoComplete={tab === 'login' ? 'current-password' : 'new-password'} />
          </div>
        </div>

        <button className="auth-btn" onClick={submit} disabled={status.loading}>
          <span>{status.loading ? 'Please wait...' : tab === 'login' ? 'Sign In' : 'Create Account'}</span>
          {!status.loading && <IconArrow />}
        </button>

        {status.error && <div className="auth-error"><span>!</span> {status.error}</div>}
        {status.success && <div className="auth-success"><span>✓</span> {status.success}</div>}
      </div>
    </div>
  );
}