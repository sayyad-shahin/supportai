import { useState, useEffect, useRef, useCallback } from "react";

// ── ICONS ──────────────────────────────────────────────────────────────────
const BotIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/>
    <path d="M12 7v4"/>
  </svg>
);
const UserIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const LockIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const SendIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9"/>
  </svg>
);
const TrashIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3,6 5,6 21,6"/><path d="M19,6l-1,14a2,2,0,0,1-2,2H8a2,2,0,0,1-2-2L5,6"/>
    <path d="M10,11v6"/><path d="M14,11v6"/>
  </svg>
);
const LogoutIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);
const HeadsetIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/>
    <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
  </svg>
);
const PackageIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27,6.96 12,12.01 20.73,6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);
const RefundIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1,4 1,10 7,10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/>
  </svg>
);
const KeyIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
  </svg>
);
const BillingIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
);
const PlusIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20,6 9,17 4,12"/>
  </svg>
);
const BoxIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
  </svg>
);
const ReceiptIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);
const RefreshIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1,4 1,10 7,10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/>
  </svg>
);
const PhoneIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.5 2 2 0 0 1 3.6 1.32h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/>
  </svg>
);
const MailIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const TruckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13"/><polygon points="16,8 20,8 23,11 23,16 16,16 16,8"/>
    <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);
const AlertIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
const TagIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);
const UserSettingsIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>
  </svg>
);

// ── STYLES ─────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:           #07080d;
    --surface:      #0d0e16;
    --surface2:     #13151f;
    --surface3:     #1c1f2e;
    --border:       rgba(255,255,255,0.06);
    --border2:      rgba(255,255,255,0.10);
    --accent:       #5b6ef5;
    --accent-light: #818cf8;
    --accent-glow:  rgba(91,110,245,0.18);
    --text:         #eef0f8;
    --text-muted:   #6b7280;
    --text-dim:     #404459;
    --danger:       #ef4444;
    --success:      #10b981;
    --grad:         linear-gradient(135deg,#5b6ef5 0%,#7c3aed 100%);
    --radius:       14px;
    --radius-sm:    9px;
    --shadow:       0 8px 32px rgba(0,0,0,0.6);
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg); color: var(--text);
    min-height: 100vh; -webkit-font-smoothing: antialiased; overflow: hidden;
  }

  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--surface3); border-radius: 99px; }

  /* AUTH */
  .auth-wrap {
    min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px;
    background:
      radial-gradient(ellipse 60% 40% at 70% 20%, rgba(91,110,245,0.12) 0%, transparent 60%),
      radial-gradient(ellipse 40% 30% at 20% 80%, rgba(124,58,237,0.08) 0%, transparent 60%),
      var(--bg);
    animation: authIn 0.4s ease;
  }
  @keyframes authIn { from{opacity:0;} to{opacity:1;} }

  .auth-card {
    width: 100%; max-width: 390px;
    background: var(--surface); border: 1px solid var(--border2);
    border-radius: 20px; padding: 36px 32px;
    box-shadow: var(--shadow), 0 0 0 1px rgba(91,110,245,0.08);
    animation: cardUp 0.45s cubic-bezier(0.16,1,0.3,1) forwards;
  }
  @keyframes cardUp { from{opacity:0;transform:translateY(24px);} to{opacity:1;transform:translateY(0);} }

  .auth-logo { display: flex; align-items: center; gap: 12px; margin-bottom: 28px; }
  .auth-logo-icon {
    width: 44px; height: 44px; border-radius: 12px;
    background: var(--grad); display: grid; place-items: center; color: white;
    box-shadow: 0 4px 16px rgba(91,110,245,0.4); flex-shrink: 0;
  }
  .auth-logo-text { font-size: 19px; font-weight: 700; letter-spacing: -0.5px; }
  .auth-logo-sub  { font-size: 12px; color: var(--text-muted); margin-top: 2px; }

  .auth-tabs {
    display: flex; background: var(--surface2); border: 1px solid var(--border);
    border-radius: 10px; padding: 3px; margin-bottom: 22px; gap: 3px;
  }
  .auth-tab {
    flex: 1; padding: 9px 12px; border: none; border-radius: 8px;
    font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s;
  }
  .auth-tab.active { background: var(--accent); color: white; box-shadow: 0 2px 8px rgba(91,110,245,0.45); }
  .auth-tab:not(.active) { background: transparent; color: var(--text-muted); }
  .auth-tab:not(.active):hover { color: var(--text); }

  .auth-field { margin-bottom: 14px; }
  .auth-label {
    display: block; font-size: 11px; font-weight: 600; color: var(--text-muted);
    text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 7px;
  }
  .auth-input-wrap { position: relative; display: flex; align-items: center; }
  .auth-input-icon { position: absolute; left: 12px; color: var(--text-dim); pointer-events: none; display: flex; }
  .auth-input {
    width: 100%; padding: 11px 13px 11px 36px;
    background: var(--surface2); border: 1px solid var(--border2);
    border-radius: var(--radius-sm); color: var(--text);
    font-family: 'DM Sans', sans-serif; font-size: 14px;
    transition: border-color 0.2s, box-shadow 0.2s; outline: none;
  }
  .auth-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-glow); }
  .auth-input::placeholder { color: var(--text-dim); }

  .auth-btn {
    width: 100%; padding: 12px; border: none; border-radius: var(--radius-sm);
    background: var(--grad); color: white;
    font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600;
    cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 8px;
    margin-top: 6px; box-shadow: 0 4px 16px rgba(91,110,245,0.35);
  }
  .auth-btn:hover { opacity: 0.88; transform: translateY(-1px); }

  .auth-msg {
    display: flex; align-items: flex-start; gap: 8px;
    font-size: 13px; padding: 10px 13px; border-radius: var(--radius-sm); margin-top: 12px; line-height: 1.5;
  }
  .auth-msg.error   { background: rgba(239,68,68,0.08);  border: 1px solid rgba(239,68,68,0.2);  color: #fca5a5; }
  .auth-msg.success { background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.2); color: #6ee7b7; }

  /* SHELL */
  .shell { display: flex; height: 100vh; overflow: hidden; }

  /* SIDEBAR */
  .sidebar {
    width: 248px; flex-shrink: 0; background: var(--surface);
    border-right: 1px solid var(--border); display: flex; flex-direction: column; padding: 16px 10px;
  }
  @media(max-width:720px){ .sidebar { display: none; } }

  .sidebar-brand {
    display: flex; align-items: center; gap: 9px;
    padding: 4px 8px 16px; border-bottom: 1px solid var(--border); margin-bottom: 8px;
  }
  .sidebar-brand-icon {
    width: 30px; height: 30px; border-radius: 8px;
    background: var(--grad); display: grid; place-items: center; color: white; flex-shrink: 0;
  }
  .sidebar-brand-name { font-weight: 700; font-size: 14px; letter-spacing: -0.3px; }

  .sidebar-label {
    font-size: 9.5px; font-weight: 700; text-transform: uppercase;
    letter-spacing: 1.2px; color: var(--text-dim); padding: 14px 8px 6px;
  }
  .sidebar-item {
    width: 100%; padding: 9px 11px; border-radius: 8px;
    border: 1px solid transparent; background: transparent; color: var(--text-muted);
    font-family: 'DM Sans', sans-serif; font-size: 13px; cursor: pointer;
    display: flex; align-items: center; gap: 9px;
    transition: all 0.15s; margin-bottom: 2px; text-align: left;
  }
  .sidebar-item:hover { background: var(--surface2); border-color: var(--border); color: var(--text); }
  .sidebar-item svg { flex-shrink: 0; opacity: 0.65; }
  .sidebar-item.outlined { border-color: var(--border); }

  .sidebar-footer { margin-top: auto; padding-top: 10px; border-top: 1px solid var(--border); }
  .user-row { display: flex; align-items: center; gap: 9px; padding: 9px 8px; }
  .user-avatar {
    width: 28px; height: 28px; border-radius: 50%; background: var(--grad);
    display: grid; place-items: center; font-size: 11px; font-weight: 700; color: white; flex-shrink: 0;
  }
  .user-info { flex: 1; min-width: 0; }
  .user-name { font-size: 13px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .user-role { font-size: 10.5px; color: var(--text-muted); }
  .logout-btn {
    width: 26px; height: 26px; border: 1px solid var(--border); border-radius: 6px;
    background: transparent; color: var(--text-muted); cursor: pointer;
    display: grid; place-items: center; transition: all 0.2s; flex-shrink: 0;
  }
  .logout-btn:hover { border-color: var(--danger); color: var(--danger); background: rgba(239,68,68,0.08); }

  /* MAIN */
  .chat-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }

  .chat-header {
    padding: 14px 22px; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
    background: rgba(7,8,13,0.85); backdrop-filter: blur(12px); flex-shrink: 0;
  }
  .chat-header-left { display: flex; align-items: center; gap: 11px; }
  .header-icon {
    width: 34px; height: 34px; border-radius: 9px;
    background: var(--surface2); border: 1px solid var(--border2);
    display: grid; place-items: center; color: var(--accent-light);
  }
  .chat-title { font-size: 14px; font-weight: 600; display: flex; align-items: center; gap: 6px; }
  .status-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--success); box-shadow: 0 0 8px var(--success); flex-shrink: 0; }
  .chat-sub   { font-size: 11px; color: var(--text-muted); margin-top: 1px; }

  .header-btn {
    padding: 6px 12px; border: 1px solid var(--border); border-radius: 8px;
    background: transparent; color: var(--text-muted);
    font-family: 'DM Sans', sans-serif; font-size: 12px; cursor: pointer; transition: all 0.2s;
    display: flex; align-items: center; gap: 6px;
  }
  .header-btn:hover { border-color: var(--danger); color: var(--danger); background: rgba(239,68,68,0.06); }

  /* MESSAGES */
  .msg-area {
    flex: 1; overflow-y: auto; padding: 24px 22px;
    display: flex; flex-direction: column; gap: 16px;
  }

  .welcome {
    text-align: center; padding: 48px 20px; margin: auto; max-width: 380px;
    animation: fadeUp 0.4s ease;
  }
  .welcome-icon {
    width: 52px; height: 52px; border-radius: 14px;
    background: var(--surface2); border: 1px solid var(--border2);
    display: grid; place-items: center; color: var(--accent-light); margin: 0 auto 18px;
  }
  .welcome h2 { font-size: 21px; font-weight: 700; margin-bottom: 8px; letter-spacing: -0.4px; }
  .welcome p  { color: var(--text-muted); font-size: 14px; line-height: 1.6; margin-bottom: 24px; }
  .chips { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
  .chip {
    padding: 8px 14px; border: 1px solid var(--border2); border-radius: 99px;
    background: var(--surface); color: var(--text-muted);
    font-family: 'DM Sans', sans-serif; font-size: 13px; cursor: pointer;
    display: flex; align-items: center; gap: 7px; transition: all 0.15s;
  }
  .chip:hover { border-color: var(--accent); color: var(--text); background: var(--surface2); }

  .msg-row { display: flex; gap: 9px; align-items: flex-end; animation: fadeUp 0.22s ease; }
  .msg-row.user { flex-direction: row-reverse; }
  @keyframes fadeUp { from{opacity:0;transform:translateY(7px);} to{opacity:1;transform:translateY(0);} }

  .msg-avatar {
    width: 27px; height: 27px; border-radius: 50%; flex-shrink: 0;
    display: grid; place-items: center; font-size: 11px; font-weight: 700;
  }
  .msg-avatar.bot  { background: var(--surface2); border: 1px solid var(--border2); color: var(--accent-light); }
  .msg-avatar.user { background: var(--grad); color: white; }

  .bubble {
    max-width: 68%; padding: 12px 16px;
    font-size: 14px; line-height: 1.65; word-break: break-word;
  }
  .bubble.user {
    background: var(--grad); color: white;
    border-radius: 14px 14px 4px 14px;
    box-shadow: 0 2px 12px rgba(91,110,245,0.3);
    white-space: pre-wrap;
  }
  .bubble.bot {
    background: var(--surface2); border: 1px solid var(--border);
    color: var(--text); border-radius: 14px 14px 14px 4px;
  }

  /* rich bot message */
  .bot-msg p   { margin: 0 0 6px; }
  .bot-msg p:last-child { margin-bottom: 0; }
  .bot-msg strong { font-weight: 700; color: #c7d0ff; }
  .bot-msg ul  { list-style: none; margin: 8px 0; padding: 0; display: flex; flex-direction: column; gap: 5px; }
  .bot-msg li  { display: flex; align-items: flex-start; gap: 8px; font-size: 13.5px; line-height: 1.5; }
  .bot-msg li .li-icon { flex-shrink: 0; margin-top: 2px; color: var(--accent-light); }
  .bot-msg ol  { list-style: none; margin: 8px 0; padding: 0; display: flex; flex-direction: column; gap: 5px; counter-reset: step; }
  .bot-msg ol li { counter-increment: step; display: flex; align-items: flex-start; gap: 8px; font-size: 13.5px; line-height: 1.5; }
  .bot-msg ol li::before {
    content: counter(step);
    min-width: 18px; height: 18px; border-radius: 50%;
    background: var(--surface3); border: 1px solid var(--border2);
    display: inline-flex; align-items: center; justify-content: center;
    font-size: 10px; font-weight: 700; color: var(--accent-light); flex-shrink: 0; margin-top: 1px;
  }
  .bot-msg .info-row { display: flex; align-items: center; gap: 7px; color: var(--text-muted); font-size: 13px; }
  .bot-msg .info-row svg { flex-shrink: 0; color: var(--accent-light); }
  .bot-msg hr  { border: none; border-top: 1px solid var(--border2); margin: 8px 0; }

  .msg-ts { font-size: 10px; color: var(--text-dim); padding-bottom: 2px; white-space: nowrap; align-self: flex-end; }

  .typing-dots { display: flex; gap: 4px; align-items: center; padding: 2px 0; }
  .typing-dots span { width: 5px; height: 5px; border-radius: 50%; background: var(--text-muted); }
  .typing-dots span:nth-child(1) { animation: blink 1.2s 0s infinite; }
  .typing-dots span:nth-child(2) { animation: blink 1.2s 0.2s infinite; }
  .typing-dots span:nth-child(3) { animation: blink 1.2s 0.4s infinite; }
  @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0.15;} }

  /* INPUT */
  .input-bar {
    padding: 12px 18px 16px; border-top: 1px solid var(--border);
    background: rgba(7,8,13,0.95); backdrop-filter: blur(12px); flex-shrink: 0;
  }
  .input-wrap {
    display: flex; align-items: flex-end; gap: 9px;
    background: var(--surface2); border: 1px solid var(--border2);
    border-radius: var(--radius); padding: 9px 11px;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .input-wrap:focus-within { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-glow); }
  .chat-textarea {
    flex: 1; background: transparent; border: none; outline: none; resize: none;
    color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 14px;
    line-height: 1.5; max-height: 120px; overflow-y: auto;
  }
  .chat-textarea::placeholder { color: var(--text-dim); }
  .send-btn {
    width: 32px; height: 32px; border-radius: 8px; border: none;
    display: grid; place-items: center; flex-shrink: 0; cursor: pointer; transition: all 0.2s;
  }
  .send-btn:not(:disabled) { background: var(--grad); color: white; box-shadow: 0 2px 10px rgba(91,110,245,0.4); }
  .send-btn:not(:disabled):hover { opacity: 0.85; transform: scale(1.06); }
  .send-btn:disabled { background: var(--surface3); color: var(--text-dim); cursor: not-allowed; }
  .input-hint { text-align: center; font-size: 11px; color: var(--text-dim); margin-top: 9px; }
`;

// ── RICH MESSAGE RENDERER ──────────────────────────────────────────────────
function BotMessage({ data }) {
  if (typeof data === "string") return <span>{data}</span>;
  return (
    <div className="bot-msg">
      {data.map((block, i) => {
        switch (block.type) {
          case "p":
            return <p key={i} dangerouslySetInnerHTML={{ __html: block.text }} />;
          case "ul":
            return (
              <ul key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>
                    <span className="li-icon">{item.icon}</span>
                    <span dangerouslySetInnerHTML={{ __html: item.text }} />
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i}>
                {block.items.map((item, j) => (
                  <li key={j}><span dangerouslySetInnerHTML={{ __html: item }} /></li>
                ))}
              </ol>
            );
          case "info":
            return (
              <p key={i} className="info-row">
                {block.icon}
                <span dangerouslySetInnerHTML={{ __html: block.text }} />
              </p>
            );
          case "hr":
            return <hr key={i} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

// ── BOT RULES ──────────────────────────────────────────────────────────────
const RULES = [
  {
    patterns: ["track", "order status", "where is my order", "where's my order", "my order", "delivery status", "shipped", "shipping status", "order number", "track my"],
    responses: [
      [
        { type: "p", text: "To track your order, please share your <strong>order number</strong> (e.g. ORD-12345) and I'll look it up right away." },
        { type: "hr" },
        { type: "info", icon: <PackageIcon />, text: "You can also track directly via: <strong>My Orders → Track Shipment</strong>" },
      ],
      [
        { type: "p", text: "I'd be happy to help track your order. Could you provide your <strong>order ID</strong>?" },
        { type: "p", text: "It was sent to your email when you placed the order and usually starts with ORD-." },
      ],
    ],
  },
  {
    patterns: ["refund", "money back", "return", "get my money", "reimburse", "reimbursement", "cancel order", "want to return"],
    responses: [
      [
        { type: "p", text: "I can help you with a refund. Here is our return policy:" },
        {
          type: "ul", items: [
            { icon: <CheckIcon />, text: "Items returned within <strong>30 days</strong> of delivery are eligible for a full refund" },
            { icon: <CheckIcon />, text: "Item must be unused and in its <strong>original packaging</strong>" },
            { icon: <ClockIcon />, text: "Refunds are processed within <strong>5–7 business days</strong>" },
          ]
        },
        { type: "hr" },
        { type: "p", text: "Please share your <strong>order number</strong> and I'll initiate the return request." },
      ],
      [
        { type: "p", text: "To process your refund, I'll need the following:" },
        { type: "ol", items: ["Your order number", "The item(s) you wish to return", "Reason for the return"] },
        { type: "p", text: "Refunds are processed within 5–7 business days after confirmation." },
      ],
    ],
  },
  {
    patterns: ["password", "reset password", "forgot password", "can't login", "cannot login", "locked out", "change password", "reset my"],
    responses: [
      [
        { type: "p", text: "Here is how to reset your password:" },
        {
          type: "ol", items: [
            "Go to the <strong>Login page</strong>",
            "Click <strong>Forgot Password</strong>",
            "Enter your registered email address",
            "Open the reset link in your inbox — valid for <strong>15 minutes</strong>",
          ]
        },
        { type: "hr" },
        { type: "info", icon: <MailIcon />, text: "Check your spam folder if the email does not arrive within 2 minutes." },
      ],
      [
        { type: "p", text: "Password resets are quick. Click <strong>Forgot Password</strong> on the login screen, enter your email, and follow the link sent to your inbox." },
        { type: "info", icon: <ClockIcon />, text: "Reset links expire after <strong>15 minutes</strong>. Request a new one if needed." },
      ],
    ],
  },
  {
    patterns: ["billing", "payment", "charge", "invoice", "receipt", "paid", "credit card", "subscription", "bill", "fee"],
    responses: [
      [
        { type: "p", text: "For billing inquiries, I can assist with the following:" },
        {
          type: "ul", items: [
            { icon: <AlertIcon />,   text: "<strong>Unexpected charges</strong> — I'll review and explain" },
            { icon: <ReceiptIcon />, text: "<strong>Invoices and receipts</strong> — available under Account → Billing History" },
            { icon: <RefreshIcon />, text: "<strong>Subscription changes</strong> — upgrades, downgrades, or cancellations" },
          ]
        },
        { type: "p", text: "What specifically can I help you with?" },
      ],
    ],
  },
  {
    patterns: ["cancel", "cancel my order", "stop order", "don't want", "didn't want"],
    responses: [
      [
        { type: "p", text: "I can help you cancel your order. Please note:" },
        {
          type: "ul", items: [
            { icon: <ClockIcon />, text: "Orders can be cancelled <strong>within 1 hour</strong> of placement at no charge" },
            { icon: <TruckIcon />, text: "If already shipped, a <strong>free return</strong> can be arranged instead" },
          ]
        },
        { type: "hr" },
        { type: "p", text: "Please share your <strong>order number</strong> and I'll check the status right away." },
      ],
    ],
  },
  {
    patterns: ["delivery", "deliver", "arrive", "when will", "estimated", "eta", "dispatch", "late", "delayed", "not arrived", "hasn't arrived"],
    responses: [
      [
        { type: "p", text: "Estimated delivery times are as follows:" },
        {
          type: "ul", items: [
            { icon: <TruckIcon />,   text: "<strong>Express:</strong> 1–2 business days" },
            { icon: <BoxIcon />,     text: "<strong>Standard:</strong> 3–5 business days" },
            { icon: <PackageIcon />, text: "<strong>International:</strong> 7–14 business days" },
          ]
        },
        { type: "hr" },
        { type: "p", text: "If your order is past the estimated date, share your <strong>order number</strong> and I'll investigate." },
      ],
    ],
  },
  {
    patterns: ["damaged", "broken", "wrong item", "wrong product", "defective", "not working", "faulty", "received wrong"],
    responses: [
      [
        { type: "p", text: "I sincerely apologize — this is our top priority to resolve." },
        { type: "p", text: "For a damaged or incorrect item, we offer:" },
        {
          type: "ul", items: [
            { icon: <TruckIcon />,  text: "<strong>Free replacement</strong> shipped within 24 hours" },
            { icon: <RefundIcon />, text: "<strong>Full refund</strong> with no return required" },
          ]
        },
        { type: "hr" },
        { type: "p", text: "Please share your <strong>order number</strong> and a brief description of the issue to proceed." },
      ],
    ],
  },
  {
    patterns: ["account", "profile", "update email", "change email", "delete account", "close account"],
    responses: [
      [
        { type: "p", text: "Account changes can be made under <strong>Account → Settings</strong>. Available options include:" },
        {
          type: "ul", items: [
            { icon: <UserSettingsIcon />, text: "Update your name and email address" },
            { icon: <LockIcon />,         text: "Change your password" },
            { icon: <BillingIcon />,      text: "Manage billing and payment methods" },
            { icon: <AlertIcon />,        text: "Request account deletion" },
          ]
        },
        { type: "p", text: "Is there a specific setting I can guide you to?" },
      ],
    ],
  },
  {
    patterns: ["discount", "coupon", "promo", "voucher", "offer", "deal", "sale"],
    responses: [
      [
        { type: "p", text: "Here are the current ways to receive a discount:" },
        {
          type: "ul", items: [
            { icon: <MailIcon />, text: "<strong>Newsletter signup:</strong> 10% off your first order" },
            { icon: <UserSettingsIcon />, text: "<strong>Referral program:</strong> Give $10, get $10 credit" },
            { icon: <TagIcon />,  text: "<strong>Seasonal promotions:</strong> Check the homepage banner" },
          ]
        },
        { type: "hr" },
        { type: "p", text: "If a promo code is not working, share it here and I'll validate it." },
      ],
    ],
  },
  {
    patterns: ["human", "agent", "real person", "speak to someone", "talk to someone", "customer service", "support team", "contact", "phone number", "email support"],
    responses: [
      [
        { type: "p", text: "You can reach our support team through the following channels:" },
        {
          type: "ul", items: [
            { icon: <MailIcon />,    text: "<strong>Email:</strong> support@company.com" },
            { icon: <PhoneIcon />,   text: "<strong>Phone:</strong> 1-800-SUPPORT &nbsp;(Mon–Fri, 9AM–6PM)" },
            { icon: <HeadsetIcon />, text: "<strong>Live chat:</strong> Available on the main website" },
          ]
        },
        { type: "info", icon: <ClockIcon />, text: "Average response time is <strong>under 2 hours</strong> via email." },
      ],
    ],
  },
  {
    patterns: ["product", "item", "size", "color", "specification", "specs", "material", "in stock", "available"],
    responses: [
      [
        { type: "p", text: "Product details, size guides, materials, and stock levels are all listed on the <strong>product page</strong>." },
        { type: "p", text: "If you cannot find what you're looking for, tell me the product name and I'll assist you directly." },
      ],
    ],
  },
  {
    patterns: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "greetings"],
    responses: [
      [
        { type: "p", text: "Welcome to SupportAI. I'm here to help with orders, billing, returns, account issues, and more." },
        { type: "p", text: "What can I assist you with today?" },
      ],
      [
        { type: "p", text: "Hello — great to have you here. Feel free to ask about your orders, account, or any product questions." },
      ],
    ],
  },
  {
    patterns: ["thank", "thanks", "thank you", "thx", "appreciate", "helpful"],
    responses: [
      [{ type: "p", text: "You're very welcome. Is there anything else I can assist you with?" }],
      [{ type: "p", text: "Happy to help. Don't hesitate to reach out if you need anything else." }],
    ],
  },
  {
    patterns: ["bye", "goodbye", "see you", "that's all", "nothing else", "done", "good night"],
    responses: [
      [{ type: "p", text: "Goodbye — thanks for reaching out. Have a great day." }],
      [{ type: "p", text: "Take care. Feel free to come back anytime you need assistance." }],
    ],
  },
];

const FALLBACK = [
  [
    { type: "p", text: "I want to make sure I give you the right answer. Could you provide a bit more detail?" },
    { type: "p", text: "I can assist with: order tracking, refunds, returns, billing, passwords, and account issues." },
  ],
  [
    { type: "p", text: "That falls outside what I can currently address. For complex issues, please contact our team at <strong>support@company.com</strong>." },
    { type: "p", text: "Otherwise, I'm happy to help with orders, returns, billing, or account questions." },
  ],
];

let replyIdx = {};
function getBotReply(input) {
  const text = input.toLowerCase().trim();
  for (const rule of RULES) {
    if (rule.patterns.some(p => text.includes(p))) {
      const key = rule.patterns[0];
      const idx = (replyIdx[key] || 0) % rule.responses.length;
      replyIdx[key] = idx + 1;
      return rule.responses[idx];
    }
  }
  return FALLBACK[Math.floor(Math.random() * FALLBACK.length)];
}

// ── STORAGE ────────────────────────────────────────────────────────────────
const USERS_KEY  = "supportai_users";
const CHAT_KEY   = u => `supportai_chat_${u}`;
const SESS_KEY   = "supportai_session";
const getUsers   = () => { try { return JSON.parse(localStorage.getItem(USERS_KEY) || "{}"); } catch { return {}; } };
const saveUsers  = u => localStorage.setItem(USERS_KEY, JSON.stringify(u));
const getChat    = u => { try { return JSON.parse(localStorage.getItem(CHAT_KEY(u)) || "[]"); } catch { return []; } };
const saveChat   = (u, m) => localStorage.setItem(CHAT_KEY(u), JSON.stringify(m));
const getSession = () => { try { return JSON.parse(localStorage.getItem(SESS_KEY)); } catch { return null; } };
const saveSession= u => u ? localStorage.setItem(SESS_KEY, JSON.stringify(u)) : localStorage.removeItem(SESS_KEY);
const fmt = iso => { try { return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); } catch { return ""; } };

const SUGGESTIONS = [
  { text: "Track my order status", icon: <PackageIcon /> },
  { text: "Request a refund",      icon: <RefundIcon /> },
  { text: "Reset my password",     icon: <KeyIcon /> },
  { text: "Billing question",      icon: <BillingIcon /> },
];

// ── AUTH PAGE ──────────────────────────────────────────────────────────────
function AuthPage({ onLogin }) {
  const [tab, setTab]       = useState("login");
  const [form, setForm]     = useState({ username: "", password: "" });
  const [status, setStatus] = useState({ error: "", success: "" });

  const handle    = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const switchTab = t => { setTab(t); setStatus({ error: "", success: "" }); };

  const submit = () => {
    const { username, password } = form;
    if (!username.trim() || !password.trim()) { setStatus({ error: "Please fill in both fields.", success: "" }); return; }
    const users = getUsers();
    if (tab === "register") {
      if (users[username]) { setStatus({ error: "Username already taken.", success: "" }); return; }
      users[username] = { password };
      saveUsers(users);
      setStatus({ error: "", success: "Account created. You can now sign in." });
      switchTab("login");
      setForm(f => ({ ...f, password: "" }));
    } else {
      const user = users[username];
      if (!user || user.password !== password) { setStatus({ error: "Invalid username or password.", success: "" }); return; }
      const userData = { username };
      saveSession(userData);
      onLogin(userData);
    }
  };

  const onKey = e => { if (e.key === "Enter") submit(); };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-icon"><BotIcon size={22} /></div>
          <div>
            <div className="auth-logo-text">SupportAI</div>
            <div className="auth-logo-sub">Intelligent customer support</div>
          </div>
        </div>

        <div className="auth-tabs">
          <button className={`auth-tab ${tab === "login" ? "active" : ""}`} onClick={() => switchTab("login")}>Sign In</button>
          <button className={`auth-tab ${tab === "register" ? "active" : ""}`} onClick={() => switchTab("register")}>Register</button>
        </div>

        <div className="auth-field">
          <label className="auth-label">Username</label>
          <div className="auth-input-wrap">
            <span className="auth-input-icon"><UserIcon /></span>
            <input className="auth-input" name="username" placeholder="Enter your username"
              value={form.username} onChange={handle} onKeyDown={onKey} autoFocus autoComplete="username" />
          </div>
        </div>

        <div className="auth-field">
          <label className="auth-label">Password</label>
          <div className="auth-input-wrap">
            <span className="auth-input-icon"><LockIcon /></span>
            <input className="auth-input" name="password" type="password" placeholder="Enter your password"
              value={form.password} onChange={handle} onKeyDown={onKey}
              autoComplete={tab === "login" ? "current-password" : "new-password"} />
          </div>
        </div>

        <button className="auth-btn" onClick={submit}>
          {tab === "login" ? "Sign In" : "Create Account"}
        </button>

        {status.error   && <div className="auth-msg error">  <span>⚠</span><span>{status.error}</span></div>}
        {status.success && <div className="auth-msg success"><span>✓</span><span>{status.success}</span></div>}
      </div>
    </div>
  );
}

// ── CHAT PAGE ──────────────────────────────────────────────────────────────
function ChatPage({ user, onLogout }) {
  const [messages, setMessages] = useState(() => getChat(user.username));
  const [input, setInput]       = useState("");
  const [loading, setLoading]   = useState(false);
  const bottomRef   = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);
  useEffect(() => { saveChat(user.username, messages); }, [messages, user.username]);

  const send = useCallback(async (text) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    const ts = new Date().toISOString();
    setMessages(m => [...m, { role: "user", text: msg, ts }]);
    setLoading(true);
    await new Promise(r => setTimeout(r, 600 + Math.random() * 500));
    const reply = getBotReply(msg);
    setMessages(m => [...m, { role: "bot", data: reply, ts: new Date().toISOString() }]);
    setLoading(false);
  }, [input, loading]);

  const clearChat = () => {
    if (!window.confirm("Clear all chat history?")) return;
    setMessages([]); saveChat(user.username, []);
  };

  const onKey    = e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } };
  const handleTA = e => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  };

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon"><BotIcon size={14} /></div>
          <span className="sidebar-brand-name">SupportAI</span>
        </div>

        <p className="sidebar-label">Actions</p>
        <button className="sidebar-item" onClick={clearChat}><PlusIcon /><span>New Conversation</span></button>

        <p className="sidebar-label">Quick Help</p>
        {SUGGESTIONS.map(s => (
          <button key={s.text} className="sidebar-item outlined" onClick={() => send(s.text)}>
            {s.icon}<span>{s.text}</span>
          </button>
        ))}

        <div className="sidebar-footer">
          <div className="user-row">
            <div className="user-avatar">{user.username[0].toUpperCase()}</div>
            <div className="user-info">
              <div className="user-name">{user.username}</div>
              <div className="user-role">Customer</div>
            </div>
            <button className="logout-btn" onClick={onLogout} title="Sign out"><LogoutIcon /></button>
          </div>
        </div>
      </aside>

      <div className="chat-main">
        <div className="chat-header">
          <div className="chat-header-left">
            <div className="header-icon"><HeadsetIcon size={15} /></div>
            <div>
              <div className="chat-title"><span className="status-dot" />AI Support Agent</div>
              <div className="chat-sub">Always online · Instant responses</div>
            </div>
          </div>
          <button className="header-btn" onClick={clearChat}><TrashIcon /><span>Clear chat</span></button>
        </div>

        <div className="msg-area">
          {messages.length === 0 && !loading && (
            <div className="welcome">
              <div className="welcome-icon"><HeadsetIcon size={22} /></div>
              <h2>How can I help you?</h2>
              <p>Ask me about orders, billing, returns, passwords, or any account issue.</p>
              <div className="chips">
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
                {m.role === "user" ? user.username[0].toUpperCase() : <BotIcon />}
              </div>
              <div className={`bubble ${m.role}`}>
                {m.role === "user"
                  ? m.text
                  : <BotMessage data={m.data || m.text} />
                }
              </div>
              <span className="msg-ts">{fmt(m.ts)}</span>
            </div>
          ))}

          {loading && (
            <div className="msg-row bot">
              <div className="msg-avatar bot"><BotIcon /></div>
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
              placeholder="Type your message… (Shift+Enter for new line)"
              value={input} onChange={handleTA} onKeyDown={onKey} />
            <button className="send-btn" disabled={!input.trim() || loading} onClick={() => send()}>
              <SendIcon />
            </button>
          </div>
          <p className="input-hint">SupportAI may make mistakes — verify important information with our team.</p>
        </div>
      </div>
    </div>
  );
}

// ── ROOT ───────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(() => getSession());
  const login  = u => { saveSession(u); setUser(u); };
  const logout = () => { saveSession(null); setUser(null); };
  return (
    <>
      <style>{css}</style>
      {user ? <ChatPage user={user} onLogout={logout} /> : <AuthPage onLogin={login} />}
    </>
  );
}