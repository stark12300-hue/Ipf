import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { BrandLogo } from './BrandLogo';
import { Inquiry, InquiryStatus, LeadSource, AnalyticsSummary } from '../types';
import {
  Lock,
  Search,
  Filter,
  Download,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Users,
  Settings,
  Share2,
  RefreshCw,
  Edit3,
  Eye,
  LogOut,
  Calendar,
  MessageSquare,
  Instagram,
  Phone,
  Building,
  HelpCircle,
  Globe,
  Tag,
  Copy,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { config, showToast, adminToken, setAdminToken, reloadConfig } = useApp();

  // Auth state
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // Dashboard state
  const [activeTab, setActiveTab] = useState<'leads' | 'analytics' | 'settings' | 'campaigns'>('leads');
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [loadingLeads, setLoadingLeads] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sourceFilter, setSourceFilter] = useState('All');

  // Lead Details Modal / Edit
  const [selectedLead, setSelectedLead] = useState<Inquiry | null>(null);
  const [editStatus, setEditStatus] = useState<InquiryStatus>('New');
  const [editNotes, setEditNotes] = useState('');
  const [savingLead, setSavingLead] = useState(false);

  // Company Settings Form
  const [settingsForm, setSettingsForm] = useState({
    companyName: config.companyName,
    contactNumber: config.contactNumber,
    whatsappNumber: config.whatsappNumber,
    businessEmail: config.businessEmail,
    officeAddress: config.officeAddress,
    businessHours: config.businessHours,
    instagramHandle: config.instagramHandle,
    instagramUrl: config.instagramUrl,
    seoTitle: config.seoTitle,
    seoDescription: config.seoDescription,
    googleAdsId: config.googleAdsId || '',
    metaPixelId: config.metaPixelId || '',
  });

  // Campaign URL Builder State
  const [campSource, setCampSource] = useState('instagram');
  const [campMedium, setCampMedium] = useState('cpc');
  const [campName, setCampName] = useState('ipf_shares_recovery');
  const [campPage, setCampPage] = useState('/landing/ipf-assistance');

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setAdminToken(data.token);
        showToast({ type: 'success', title: 'Authenticated', message: 'Welcome to Veritas CRM Portal' });
      } else {
        setAuthError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setAuthError('Connection failed to authentication server');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      if (adminToken) {
        await fetch('/api/admin/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${adminToken}` },
        });
      }
    } catch (e) {
      // Continue
    }
    setAdminToken(null);
    showToast({ type: 'info', title: 'Logged Out', message: 'Admin session closed' });
  };

  // Fetch Inquiries
  const fetchInquiries = async () => {
    if (!adminToken) return;
    setLoadingLeads(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (statusFilter !== 'All') params.append('status', statusFilter);
      if (sourceFilter !== 'All') params.append('source', sourceFilter);

      const res = await fetch(`/api/admin/inquiries?${params.toString()}`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.status === 401) {
        setAdminToken(null);
        return;
      }
      const data = await res.json();
      if (data.success) {
        setInquiries(data.inquiries || []);
      }
    } catch (err) {
      showToast({ type: 'error', title: 'Error', message: 'Failed to fetch inquiries' });
    } finally {
      setLoadingLeads(false);
    }
  };

  // Fetch Analytics
  const fetchAnalytics = async () => {
    if (!adminToken) return;
    try {
      const res = await fetch('/api/admin/analytics', {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      const data = await res.json();
      if (data.success) {
        setAnalytics(data.analytics);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (adminToken) {
      fetchInquiries();
      fetchAnalytics();
    }
  }, [adminToken, statusFilter, sourceFilter]);

  // Update lead
  const handleSaveLead = async () => {
    if (!selectedLead || !adminToken) return;
    setSavingLead(true);
    try {
      const res = await fetch(`/api/admin/inquiries/${selectedLead.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          status: editStatus,
          internalNotes: editNotes,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast({ type: 'success', title: 'Lead Updated', message: `ID: ${selectedLead.id} updated` });
        setSelectedLead(null);
        fetchInquiries();
        fetchAnalytics();
      }
    } catch (e) {
      showToast({ type: 'error', title: 'Update Failed' });
    } finally {
      setSavingLead(false);
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    if (!adminToken) return;
    window.location.href = `/api/admin/export?token=${adminToken}`;
  };

  // Save Config
  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminToken) return;
    try {
      const res = await fetch('/api/admin/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(settingsForm),
      });
      const data = await res.json();
      if (data.success) {
        showToast({ type: 'success', title: 'Settings Saved', message: 'Company details updated on live website.' });
        reloadConfig();
      }
    } catch (e) {
      showToast({ type: 'error', title: 'Failed to update settings' });
    }
  };

  // Open lead modal
  const openLeadModal = (lead: Inquiry) => {
    setSelectedLead(lead);
    setEditStatus(lead.status);
    setEditNotes(lead.internalNotes || '');
  };

  // Generated Campaign URL
  const generatedUrl = `${window.location.origin}${campPage}?utm_source=${encodeURIComponent(
    campSource
  )}&utm_medium=${encodeURIComponent(campMedium)}&utm_campaign=${encodeURIComponent(campName)}`;

  // If not logged in, render Secure Login Form
  if (!adminToken) {
    return (
      <div className="min-h-screen bg-[#07111E] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#0B192C] border border-slate-800 rounded-2xl p-8 shadow-2xl text-white space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold font-display">Veritas Staff CRM & Admin Portal</h1>
            <p className="text-xs text-slate-400">
              Authorized administrative access only. All sessions are logged and encrypted.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Administrator Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password (default: admin123)"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              />
            </div>

            {authError && (
              <div className="p-3 rounded-lg bg-rose-950/80 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg cursor-pointer disabled:opacity-50"
            >
              {authLoading ? 'Verifying Session...' : 'Authenticate & Enter Portal'}
            </button>
          </form>

          <div className="pt-2 text-center text-[11px] text-slate-500">
            For local review, the default development password is <code className="text-slate-300 bg-slate-800 px-1.5 py-0.5 rounded">admin123</code>.
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard Main View
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      
      {/* Top Admin Bar */}
      <header className="bg-[#0B192C] text-white border-b border-slate-800 py-3.5 px-4 sm:px-8 shadow">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <BrandLogo variant="navbar" />

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-300 hidden sm:inline">
              Logged in as <strong className="text-white">Admin</strong>
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-400" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab('leads')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'leads'
                ? 'bg-[#0B192C] text-white shadow'
                : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Inquiries CRM</span>
            <span className="ml-1 text-[10px] px-1.5 py-0.2 rounded-full bg-blue-500 text-white">
              {inquiries.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'analytics'
                ? 'bg-[#0B192C] text-white shadow'
                : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Channel Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('campaigns')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'campaigns'
                ? 'bg-[#0B192C] text-white shadow'
                : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>Ad URL Builder (UTM)</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'settings'
                ? 'bg-[#0B192C] text-white shadow'
                : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Company & Website Settings</span>
          </button>
        </div>

        {/* TAB 1: LEADS CRM */}
        {activeTab === 'leads' && (
          <div className="space-y-4">
            
            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && fetchInquiries()}
                  placeholder="Search by name, phone, stock name, inquiry ID..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-medium focus:outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>

                <select
                  value={sourceFilter}
                  onChange={(e) => setSourceFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-medium focus:outline-none"
                >
                  <option value="All">All Sources</option>
                  <option value="Google">Google</option>
                  <option value="Instagram">Instagram</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Direct Visit">Direct Visit</option>
                  <option value="Campaign Ad">Campaign Ad</option>
                </select>

                <button
                  onClick={fetchInquiries}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700"
                  title="Refresh list"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>

                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Inquiries Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                      <th className="py-3.5 px-4">Inquiry ID</th>
                      <th className="py-3.5 px-4">Customer Details</th>
                      <th className="py-3.5 px-4">Stock / Issue</th>
                      <th className="py-3.5 px-4">Channel Source</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4">Date</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {loadingLeads ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-slate-400">
                          Loading leads data...
                        </td>
                      </tr>
                    ) : inquiries.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-slate-400">
                          No inquiries found matching your filters.
                        </td>
                      </tr>
                    ) : (
                      inquiries.map((inq) => {
                        return (
                          <tr key={inq.id} className="hover:bg-slate-50/80 transition">
                            <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                              {inq.id}
                            </td>

                            <td className="py-3.5 px-4">
                              <div className="font-bold text-slate-900">{inq.fullName}</div>
                              <div className="text-slate-500 font-mono text-[11px]">
                                {inq.contactNumber}
                              </div>
                              {inq.email && (
                                <div className="text-slate-400 text-[10px]">{inq.email}</div>
                              )}
                            </td>

                            <td className="py-3.5 px-4">
                              <div className="font-semibold text-slate-800">
                                {inq.companyStockName || 'Not specified'}
                              </div>
                              <div className="text-slate-500 text-[11px] truncate max-w-xs">
                                {inq.issueType || inq.message}
                              </div>
                            </td>

                            <td className="py-3.5 px-4">
                              <span
                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                  inq.source === 'Instagram'
                                    ? 'bg-pink-100 text-pink-800'
                                    : inq.source === 'Google'
                                    ? 'bg-blue-100 text-blue-800'
                                    : inq.source === 'WhatsApp'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-slate-100 text-slate-800'
                                }`}
                              >
                                {inq.source}
                              </span>
                              {inq.utm?.utm_campaign && (
                                <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                                  camp: {inq.utm.utm_campaign}
                                </div>
                              )}
                            </td>

                            <td className="py-3.5 px-4">
                              <span
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                  inq.status === 'New'
                                    ? 'bg-blue-100 text-blue-800'
                                    : inq.status === 'Contacted'
                                    ? 'bg-amber-100 text-amber-800'
                                    : inq.status === 'In Progress'
                                    ? 'bg-purple-100 text-purple-800'
                                    : inq.status === 'Resolved'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-slate-100 text-slate-700'
                                }`}
                              >
                                {inq.status}
                              </span>
                            </td>

                            <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                              {new Date(inq.createdAt).toLocaleDateString()}
                            </td>

                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={() => openLeadModal(inq)}
                                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-[#0B192C] hover:text-white text-slate-800 font-bold text-xs transition"
                              >
                                Manage
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: ANALYTICS & CHANNELS */}
        {activeTab === 'analytics' && analytics && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Total Inquiries</span>
                <div className="text-3xl font-extrabold text-slate-900 font-display">
                  {analytics.totalInquiries}
                </div>
                <div className="text-[11px] text-emerald-600 font-medium">All logged records</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase">New / Uncontacted</span>
                <div className="text-3xl font-extrabold text-blue-600 font-display">
                  {analytics.newLeadsCount}
                </div>
                <div className="text-[11px] text-blue-600 font-medium">Require initial review</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Active Cases</span>
                <div className="text-3xl font-extrabold text-purple-600 font-display">
                  {analytics.inProgressCount}
                </div>
                <div className="text-[11px] text-purple-600 font-medium">In documentation workflow</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Resolved Cases</span>
                <div className="text-3xl font-extrabold text-emerald-600 font-display">
                  {analytics.resolvedCount}
                </div>
                <div className="text-[11px] text-emerald-600 font-medium">Successfully completed</div>
              </div>
            </div>

            {/* Channel Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Channel Attribution */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Inquiries by Channel Source
                </h3>
                <div className="space-y-3">
                  {Object.entries(analytics.bySource).map(([src, count]) => {
                    const pct = analytics.totalInquiries > 0
                      ? Math.round((count / analytics.totalInquiries) * 100)
                      : 0;
                    return (
                      <div key={src} className="space-y-1">
                        <div className="flex justify-between text-xs font-bold text-slate-700">
                          <span>{src}</span>
                          <span>{count} ({pct}%)</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              src === 'Instagram'
                                ? 'bg-pink-500'
                                : src === 'Google'
                                ? 'bg-blue-600'
                                : src === 'WhatsApp'
                                ? 'bg-emerald-500'
                                : 'bg-slate-600'
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status Distribution */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Lead Status Distribution
                </h3>
                <div className="space-y-3">
                  {Object.entries(analytics.byStatus).map(([st, count]) => {
                    const pct = analytics.totalInquiries > 0
                      ? Math.round((count / analytics.totalInquiries) * 100)
                      : 0;
                    return (
                      <div key={st} className="space-y-1">
                        <div className="flex justify-between text-xs font-bold text-slate-700">
                          <span>{st}</span>
                          <span>{count} ({pct}%)</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              st === 'New'
                                ? 'bg-blue-500'
                                : st === 'Contacted'
                                ? 'bg-amber-500'
                                : st === 'In Progress'
                                ? 'bg-purple-500'
                                : st === 'Resolved'
                                ? 'bg-emerald-500'
                                : 'bg-slate-400'
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* 7-Day Trend Table */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Recent Daily Activity Trend
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-7 gap-2 text-center text-xs">
                {analytics.dailyTrend.map((d) => (
                  <div key={d.date} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="text-[10px] text-slate-500 font-mono">{d.date.slice(5)}</div>
                    <div className="font-bold text-slate-900 text-sm">{d.inquiries} leads</div>
                    <div className="text-[10px] text-emerald-600 font-semibold">{d.conversions} actions</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: CAMPAIGN URL BUILDER */}
        {activeTab === 'campaigns' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-lg font-bold text-slate-900 font-display">
                Campaign URL Builder (Google & Instagram Ads)
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Generate trackable URLs with UTM parameters to measure exact lead conversion across Instagram ads, Google search campaigns, and WhatsApp promos.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Target Landing Page</label>
                <select
                  value={campPage}
                  onChange={(e) => setCampPage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                >
                  <option value="/landing/ipf-assistance">Dedicated Ad Landing Page (/landing/ipf-assistance)</option>
                  <option value="/">Corporate Homepage (/)</option>
                  <option value="/services">Services Page (/services)</option>
                  <option value="/assessment">Case Assessment Page (/assessment)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Campaign Source (utm_source)</label>
                <input
                  type="text"
                  value={campSource}
                  onChange={(e) => setCampSource(e.target.value)}
                  placeholder="e.g. instagram, google, facebook"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Campaign Medium (utm_medium)</label>
                <input
                  type="text"
                  value={campMedium}
                  onChange={(e) => setCampMedium(e.target.value)}
                  placeholder="e.g. cpc, story_ad, bio, reel"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Campaign Name (utm_campaign)</label>
                <input
                  type="text"
                  value={campName}
                  onChange={(e) => setCampName(e.target.value)}
                  placeholder="e.g. ipf_shares_recovery, reliance_dividends"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
            </div>

            {/* Output URL Box */}
            <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Generated Trackable Campaign Link
              </span>
              <div className="p-3 rounded-lg bg-black/40 font-mono text-xs text-emerald-400 break-all select-all">
                {generatedUrl}
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedUrl);
                  showToast({ type: 'info', title: 'Campaign URL Copied' });
                }}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Campaign Link</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: COMPANY & WEBSITE SETTINGS */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveConfig} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-xs">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-lg font-bold text-slate-900 font-display">
                Company & Live Website Settings
              </h2>
              <p className="text-slate-600 mt-1">
                Update verified corporate details, phone numbers, WhatsApp numbers, Instagram profile, and SEO parameters.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Company Name</label>
                <input
                  type="text"
                  value={settingsForm.companyName}
                  onChange={(e) => setSettingsForm({ ...settingsForm, companyName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Corporate Email Address</label>
                <input
                  type="email"
                  value={settingsForm.businessEmail}
                  onChange={(e) => setSettingsForm({ ...settingsForm, businessEmail: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Direct Hotline Number</label>
                <input
                  type="text"
                  value={settingsForm.contactNumber}
                  onChange={(e) => setSettingsForm({ ...settingsForm, contactNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Configured WhatsApp Number</label>
                <input
                  type="text"
                  value={settingsForm.whatsappNumber}
                  onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Instagram Handle</label>
                <input
                  type="text"
                  value={settingsForm.instagramHandle}
                  onChange={(e) => setSettingsForm({ ...settingsForm, instagramHandle: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Instagram Profile URL</label>
                <input
                  type="url"
                  value={settingsForm.instagramUrl}
                  onChange={(e) => setSettingsForm({ ...settingsForm, instagramUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">Verified Office Address</label>
                <input
                  type="text"
                  value={settingsForm.officeAddress}
                  onChange={(e) => setSettingsForm({ ...settingsForm, officeAddress: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">Business & Consultation Hours</label>
                <input
                  type="text"
                  value={settingsForm.businessHours}
                  onChange={(e) => setSettingsForm({ ...settingsForm, businessHours: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Google Ads Conversion ID (AW-XXXX)</label>
                <input
                  type="text"
                  value={settingsForm.googleAdsId}
                  onChange={(e) => setSettingsForm({ ...settingsForm, googleAdsId: e.target.value })}
                  placeholder="AW-1122334455"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Meta Pixel ID (for Instagram Ads)</label>
                <input
                  type="text"
                  value={settingsForm.metaPixelId}
                  onChange={(e) => setSettingsForm({ ...settingsForm, metaPixelId: e.target.value })}
                  placeholder="998877665544332"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">Global SEO Title</label>
                <input
                  type="text"
                  value={settingsForm.seoTitle}
                  onChange={(e) => setSettingsForm({ ...settingsForm, seoTitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">Global SEO Meta Description</label>
                <textarea
                  rows={2}
                  value={settingsForm.seoDescription}
                  onChange={(e) => setSettingsForm({ ...settingsForm, seoDescription: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-md"
              >
                Save & Publish Settings
              </button>
            </div>
          </form>
        )}

      </div>

      {/* LEAD DETAILS & STATUS MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 text-xs animate-fadeIn max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-600 font-mono">
                  {selectedLead.id}
                </span>
                <h3 className="text-base font-bold text-slate-900">{selectedLead.fullName}</h3>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold">CONTACT NUMBER</span>
                  <a href={`tel:${selectedLead.contactNumber}`} className="font-mono text-blue-600 font-bold underline">
                    {selectedLead.contactNumber}
                  </a>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold">LEAD SOURCE</span>
                  <span className="font-bold text-slate-800">{selectedLead.source}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold">EMAIL ADDRESS</span>
                  <span className="text-slate-700">{selectedLead.email || 'None'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold">STOCK / COMPANY</span>
                  <span className="text-slate-800 font-bold">{selectedLead.companyStockName || 'None'}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 block font-bold mb-1">CUSTOMER MESSAGE / INQUIRY</span>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 leading-relaxed">
                  {selectedLead.message}
                </div>
              </div>

              {selectedLead.utm && Object.keys(selectedLead.utm).length > 0 && (
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold mb-1">CAMPAIGN TRACKING (UTM)</span>
                  <div className="p-2.5 rounded-xl bg-slate-100 font-mono text-[10px] text-slate-600 space-y-0.5">
                    {selectedLead.utm.utm_source && <div>source: {selectedLead.utm.utm_source}</div>}
                    {selectedLead.utm.utm_medium && <div>medium: {selectedLead.utm.utm_medium}</div>}
                    {selectedLead.utm.utm_campaign && <div>campaign: {selectedLead.utm.utm_campaign}</div>}
                    {selectedLead.utm.referrer && <div className="truncate">ref: {selectedLead.utm.referrer}</div>}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">
                  Update Lead Status
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as InquiryStatus)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold bg-white"
                >
                  <option value="New">New (Fresh Lead)</option>
                  <option value="Contacted">Contacted (Spoke / Messaged)</option>
                  <option value="In Progress">In Progress (Form/Doc Preparation)</option>
                  <option value="Resolved">Resolved (Shares Credited / Closed)</option>
                  <option value="Closed">Closed (Not Feasible / Ineligible)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">
                  Staff Internal Case Notes
                </label>
                <textarea
                  rows={3}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Record call summary, RTA response, missing documents, or next action step..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="pt-3 border-t flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={savingLead}
                onClick={handleSaveLead}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold"
              >
                {savingLead ? 'Saving...' : 'Save Case Updates'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
