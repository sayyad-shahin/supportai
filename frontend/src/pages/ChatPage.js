import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import API_BASE from '../config';

const IconBot = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/>
    <path d="M12 7v4"/>
  </svg>
);

const IconSend = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9"/>
  </svg>
);

const IconPlus = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const IconLogout = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

const IconTrash = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3,6 5,6 21,6"/><path d="M19,6l-1,14a2,2,0,0,1-2,2H8a2,2,0,0,1-2-2L5,6"/><path d="M10,11v6"/><path d="M14,11v6"/><path d="M9,6V4a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1V6"/>
  </svg>
);

const IconPackage = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27,6.96 12,12.01 20.73,6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);

const IconRefund = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1,4 1,10 7,10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/>
  </svg>
);

const IconKey = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
  </svg>
);

const IconBilling = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
);

const IconHeadset = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
  </svg>
);

const SUGGESTIONS = [
  { text: "Track my order status", icon: <IconPackage /> },
  { text: "Request a refund", icon: <IconRefund /> },
  { text: "Reset my password", icon: <IconKey /> },
  { text: "Billing question", icon: <IconBilling /> },
];

const fmt = iso => {
  try { return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); }
  catch { return ''; }
};

export default function ChatPage({ user, onLogout }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    axios.get(`${API_BASE}/history/${user.id}`)
      .then(({ data }) => {
        const hist = data.history.flatMap(h => [
          { role: 'user', text: h.message, ts: h.timestamp },
          { role: 'bot', text: h.reply, ts: h.timestamp },
        ]);
        setMessages(hist);
      }).catch(() => {});
  }, [user.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const send = async (text) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;
    setInput('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    const ts = new Date().toISOString();
    setMessages(m => [...m, { role: 'user', text: msg, ts }]);
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_BASE}/chat`, { message: msg, user_id: user.id });
      setMessages(m => [...m, { role: 'bot', text: data.reply, ts: data.timestamp }]);
    } catch (err) {
      const errMsg = err.response?.data?.error || 'Could not connect. Please try again.';
      setMessages(m => [...m, { role: 'bot', text: errMsg, ts: new Date().toISOString() }]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = async () => {
    if (!window.confirm('Clear all chat history?')) return;
    try { await axios.delete(`${API_BASE}/history/${user.id}`); setMessages([]); } catch {}
  };

  const onKey = e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } };

  const handleTextarea = e => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  return (
    <div className="chat-shell">
      <aside className="chat-sidebar">
        <div className="sidebar-top">
          <div className="sidebar-logo"><IconBot /></div>
          <span className="sidebar-brand">SupportAI</span>
        </div>

        <p className="sidebar-label">Actions</p>
        <button className="sidebar-btn" onClick={clearChat}>
          <IconPlus /><span>New Conversation</span>
        </button>

        <p className="sidebar-label">Quick Help</p>
        {SUGGESTIONS.map(s => (
          <button key={s.text} className="sidebar-btn solid" onClick={() => send(s.text)}>
            {s.icon}<span>{s.text}</span>
          </button>
        ))}

        <div className="sidebar-footer">
          <div className="user-chip">
            <div className="user-avatar">{user.username[0].toUpperCase()}</div>
            <div className="user-info">
              <div className="user-name">{user.username}</div>
              <div className="user-role">Customer</div>
            </div>
            <button className="logout-btn" onClick={onLogout} title="Sign out"><IconLogout /></button>
          </div>
        </div>
      </aside>

      <div className="chat-main">
        <div className="chat-header">
          <div className="chat-header-left">
            <div className="header-icon"><IconHeadset /></div>
            <div>
              <div className="chat-header-title">
                <span className="status-dot" />AI Support Agent
              </div>
              <div className="chat-header-sub">Always online · Powered by Gemini</div>
            </div>
          </div>
          <button className="clear-btn" onClick={clearChat}>
            <IconTrash /><span>Clear chat</span>
          </button>
        </div>

        <div className="msg-area">
          {messages.length === 0 && !loading && (
            <div className="welcome">
              <div className="welcome-icon"><IconHeadset /></div>
              <h2>How can I help you?</h2>
              <p>Ask me anything about orders, billing, returns, or account issues.</p>
              <div className="suggestions">
                {SUGGESTIONS.map(s => (
                  <button key={s.text} className="chip" onClick={() => send(s.text)}>
                    {s.icon}<span>{s.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} className={`msg-row ${m.role}`}>
              <div className={`msg-avatar ${m.role}`}>
                {m.role === 'user' ? user.username[0].toUpperCase() : <IconBot />}
              </div>
              <div className={`bubble ${m.role}`}>{m.text}</div>
              <span className="msg-ts">{fmt(m.ts)}</span>
            </div>
          ))}

          {loading && (
            <div className="msg-row bot">
              <div className="msg-avatar bot"><IconBot /></div>
              <div className="bubble bot">
                <div className="typing-dots"><span /><span /><span /></div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="input-bar">
          <div className="input-wrap">
            <textarea ref={textareaRef} className="chat-textarea" rows={1}
              placeholder="Type your message... (Shift+Enter for new line)"
              value={input} onChange={handleTextarea} onKeyDown={onKey} />
            <button className="send-btn" disabled={!input.trim() || loading} onClick={() => send()}>
              <IconSend />
            </button>
          </div>
          <p className="input-hint">SupportAI may make mistakes. Verify important information.</p>
        </div>
      </div>
    </div>
  );
}