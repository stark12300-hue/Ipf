import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  PhoneCall,
  Mail,
  MapPin,
  QrCode,
  ShieldCheck,
  Building2,
  Users,
  FileText,
  FileCheck2,
  CheckCircle2,
  Banknote,
  HelpCircle,
  RotateCw,
  Clock,
  Award,
  HeadphonesIcon,
  TrendingUp,
  Lock,
  ExternalLink,
  MessageCircle,
  Eye,
  X,
  Send,
  Sparkles,
  Copy,
  Check,
  ArrowRight,
  Download,
  Info,
  ChevronRight,
  AlertTriangle,
  FileSpreadsheet,
} from 'lucide-react';

interface StepDetail {
  number: number;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  requiredDocuments: string[];
  proceduralNotes: string;
  ctaText: string;
}

interface ServiceDetail {
  id: string;
  title: string;
  category: string;
  description: string;
  timeline: string;
  mandatoryDocs: string[];
  howWeHelp: string;
}

interface FormDetail {
  code: string;
  title: string;
  legalRule: string;
  bgGrad: string;
  badgeColor: string;
  description: string;
  whoSigns: string;
  stampDuty: string;
  mandatoryAttachments: string[];
}

interface DocDetail {
  title: string;
  iconName: string;
  description: string;
  commonIssues: string[];
  solution: string;
}

interface PillarDetail {
  title: string;
  subtitle: string;
  color: string;
  iconName: string;
  details: string;
  pledge: string;
}

export const IEPFPosterShowcase: React.FC = () => {
  const { config, whatsAppChatUrl, trackConversion, showToast } = useApp();

  // Modals state
  const [showPosterModal, setShowPosterModal] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [activeStep, setActiveStep] = useState<StepDetail | null>(null);
  const [activeService, setActiveService] = useState<ServiceDetail | null>(null);
  const [activeForm, setActiveForm] = useState<FormDetail | null>(null);
  const [activeDoc, setActiveDoc] = useState<DocDetail | null>(null);
  const [activePillar, setActivePillar] = useState<PillarDetail | null>(null);

  // Instant Inquiry Form State
  const [fullName, setFullName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [caseType, setCaseType] = useState('The claim of unclaimed shares from IEPF');
  const [folioNumber, setFolioNumber] = useState('');
  const [sharesCount, setSharesCount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<{
    id: string;
    name: string;
    phone: string;
    company: string;
    service: string;
  } | null>(null);

  // Copy feedback state
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    showToast({ title: `${label} copied to clipboard!`, type: 'success' });
    setTimeout(() => setCopiedItem(null), 2500);
  };

  const handleWhatsApp = (customMessage?: string) => {
    trackConversion('whatsapp_click', 'Poster_Showcase');
    const cleanNumber = config.contactNumber.replace(/[^0-9]/g, '');
    const defaultMsg = `Hello Gopal Singh Parihar Sir, I am contacting you regarding IEPF stock recovery and share assistance. Please advise procedural steps.`;
    const targetMsg = customMessage || defaultMsg;
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(targetMsg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCall = () => {
    trackConversion('phone_click', 'Poster_Showcase');
    window.location.href = `tel:${config.contactNumber.replace(/\s+/g, '')}`;
  };

  const handleSelectService = (serviceTitle: string) => {
    setCaseType(serviceTitle);
    showToast({ title: `Selected: ${serviceTitle}`, type: 'info' });
    // Scroll smoothly to inquiry desk
    const desk = document.getElementById('poster-inquiry');
    if (desk) {
      desk.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Download Contact Card (vCard)
  const downloadVCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Gopal Singh Parihar - IEPF Expert
ORG:Stockholding Business Associate (Central Govt Company)
TITLE:IEPF Recovery & Share Advisory Expert
TEL;TYPE=CELL,VOICE:${config.contactNumber.replace(/\s+/g, '')}
EMAIL;TYPE=WORK,INTERNET:${config.businessEmail}
ADR;TYPE=WORK:;;Arail-82 New Nankari;IIT Kalyanpur;Kanpur;Uttar Pradesh;208016;India
NOTE:IEPF Recovery Expert & Business Associate of Stockholding. 100% Legal Claims & Transmission.
URL:https://www.iepf.gov.in
END:VCARD`;

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Gopal_Singh_Parihar_IEPF_Expert.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast({ title: 'Contact vCard downloaded to your phone/PC!', type: 'success' });
  };

  // Handle Form Submit
  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientPhone.trim() || clientPhone.replace(/\D/g, '').length < 10) {
      showToast({ title: 'Please enter a valid 10-digit mobile number', type: 'error' });
      return;
    }

    const clientName = fullName.trim() || 'Investor';
    setIsSubmitting(true);

    const messageDetails = `Inquiry via IEPF Poster Desk:
Company: ${companyName || 'Not specified'}
Service: ${caseType}
Folio/Certificate: ${folioNumber || 'Will provide on call'}
Shares Count: ${sharesCount || 'Not specified'}`;

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: clientName,
          contactNumber: clientPhone.trim(),
          companyStockName: companyName.trim() || undefined,
          approxSharesCount: sharesCount.trim() || undefined,
          issueType: caseType,
          message: messageDetails,
          source: 'Direct Visit',
        }),
      });

      const data = await res.json();
      const generatedId = data?.inquiryId || `GSP-${Math.floor(100000 + Math.random() * 900000)}`;

      trackConversion('inquiry_submitted', 'Poster_Inquiry_Desk');
      setSubmissionSuccess({
        id: generatedId,
        name: clientName,
        phone: clientPhone,
        company: companyName,
        service: caseType,
      });
      showToast({ title: 'Case Inquiry registered successfully!', type: 'success' });
    } catch {
      // Offline fallback
      const fallbackId = `GSP-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmissionSuccess({
        id: fallbackId,
        name: clientName,
        phone: clientPhone,
        company: companyName,
        service: caseType,
      });
      showToast({ title: 'Inquiry noted! Please continue on WhatsApp.', type: 'info' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Detailed Data Structures for interactive clicks
  const stepDetails: StepDetail[] = [
    {
      number: 1,
      title: 'SHARES / DIVIDEND REMAIN UNCLAIMED FOR 7 YEARS',
      subtitle: 'Mandatory statutory period under Section 124(5) of the Companies Act, 2013',
      description: 'Under Indian company law, when a declared dividend remains unpaid or unclaimed for 7 consecutive years, the company must mandatorily transfer both the unpaid dividend and the corresponding shares to the Investor Education and Protection Fund (IEPF).',
      duration: '7 Consecutive Financial Years',
      requiredDocuments: [
        'Physical Share Certificate (or Folio details)',
        'Dividend warrants / Counterfoils / Past bank credits',
        'Company intimation notice / Annual Report mention',
      ],
      proceduralNotes: 'Many shareholders lose track due to change of address, old physical certificates, lost demat details, or original shareholder passing away.',
      ctaText: 'Check If Your Shares Are In IEPF',
    },
    {
      number: 2,
      title: 'TRANSFERRED BY COMPANY TO IEPF AUTHORITY',
      subtitle: 'Corporate action via NSDL/CDSL to IEPF Suspense Account',
      description: 'The company files Form IEPF-2 and deposits the shares into the IEPF Demat Account maintained with NSDL / CDSL. The cash dividends are credited directly to the Consolidated Fund of India under IEPF Authority supervision.',
      duration: 'Annual compliance cycle by companies',
      requiredDocuments: [
        'Company CIN / Name',
        'Shareholder Name & Folio Number',
        'Official IEPF-2 statement search match',
      ],
      proceduralNotes: 'We locate your exact transfer records from the MCA database and verify the exact quantity of shares and accrued dividends held in your name.',
      ctaText: 'Locate Your Transferred Shares',
    },
    {
      number: 3,
      title: 'INVESTOR / LEGAL HEIR FILES CLAIM WITH IEPF AUTHORITY',
      subtitle: 'Online submission on Ministry of Corporate Affairs (MCA V3) Portal',
      description: 'The rightful owner or legal heir files web Form IEPF-5 on the official MCA portal. A unique Service Request Number (SRN) and physical verification kit are generated which must be submitted to the company’s Nodal Officer within 30 days.',
      duration: '3 to 7 working days to prepare & file',
      requiredDocuments: [
        'Form IEPF-5 SRN acknowledgement receipt',
        'Form IEPF-5A (Declaration by Claimant)',
        'Form IEPF-5B (Indemnity Bond on Non-Judicial Stamp Paper)',
        'Form IEPF-5C (Original Share Certificate surrender)',
        'Form IEPF-5D (Banker attestation with cancelled cheque)',
        'Client Master List (CML) of active Demat account',
      ],
      proceduralNotes: 'Any mistake in the online form or documentation causes rejection. We ensure error-free drafting and submission.',
      ctaText: 'File Form IEPF-5 With Us',
    },
    {
      number: 4,
      title: 'IEPF AUTHORITY & COMPANY VERIFIES DOCUMENTS',
      subtitle: 'Company Nodal Officer & Registrar and Transfer Agent (RTA) scrutiny',
      description: 'The physical documents are dispatched to the company’s RTA (e.g. KFintech, Link Intime, Bigshare). The company’s Nodal Officer verifies signatures, title, and demat details, and uploads an e-Verification Report to the IEPF Authority.',
      duration: '30 to 60 days statutory verification window',
      requiredDocuments: [
        'Self-attested PAN and Aadhaar copies',
        'Original share certificates or Form ISR-4 (if duplicate)',
        'Succession Certificate / Legal Heir Certificate (if deceased)',
        'Signature verification in Form ISR-2 (from bank manager)',
      ],
      proceduralNotes: 'We actively follow up with RTAs across India to ensure your verification report is uploaded without delay.',
      ctaText: 'Track Your Verification Kit',
    },
    {
      number: 5,
      title: 'CLAIM APPROVED BY IEPF AUTHORITY',
      subtitle: 'Sanction order issued by MCA IEPF Authority',
      description: 'The IEPF Authority examines the company’s e-verification report and supporting documents. If completely verified, a Sanction Order is issued. In case of minor discrepancy, a Resubmission Notice is given (which must be answered within 15 days).',
      duration: '60 to 90 days after e-verification report',
      requiredDocuments: [
        'SRN Tracking Status',
        'Resubmission response letter (if requisition raised)',
        'Supplementary affidavits or clarifications',
      ],
      proceduralNotes: 'Gopal Singh Parihar handles all resubmission notices directly with the authorities to avoid claim rejection.',
      ctaText: 'Resolve Pending Approval',
    },
    {
      number: 6,
      title: 'REFUND / SHARES / DIVIDEND RELEASED TO CLAIMANT',
      subtitle: 'Direct Demat credit + Bank credit via PFMS',
      description: 'The IEPF Authority issues instructions to NSDL / CDSL to transfer the recovered shares directly into the claimant’s active Demat account. Accrued accumulated cash dividends are credited directly to your bank account via PFMS.',
      duration: '10 to 15 days from sanction order',
      requiredDocuments: [
        'Active Demat Account (NSDL / CDSL)',
        'Pre-validated Bank Account with IFSC match',
        'Sanction advice letter from IEPF',
      ],
      proceduralNotes: 'Your full rightful ownership is legally restored, allowing you to sell, hold, or transfer the shares freely.',
      ctaText: 'Claim Your Shares Today',
    },
  ];

  const servicesList: ServiceDetail[] = [
    {
      id: 'death-transmission',
      title: 'Transfer of shares after death of an original shareholder',
      category: 'Transmission & Legal Heir Claim',
      description: 'Full legal transmission of shares from a deceased parent, spouse, or relative to the surviving heirs, joint holders, or nominees. We handle transmission both before and after IEPF transfer.',
      timeline: '60 - 120 Days',
      mandatoryDocs: [
        'Original Death Certificate (issued by municipal authority)',
        'Legal Heir Certificate / Succession Certificate / Court Will / Family Settlement Deed',
        'NOC and Affidavits from all other surviving legal heirs',
        'Claimant KYC (PAN, Aadhaar, Demat CML, Cancelled Cheque)',
      ],
      howWeHelp: 'We draft all stamp paper affidavits, indemnities, and NOCs conforming strictly to SEBI and RTA circulars.',
    },
    {
      id: 'physical-transfer',
      title: 'Transfer of Physical shares',
      category: 'Demat & Name Rectification',
      description: 'SEBI no longer allows physical share trading. All physical paper share certificates must be converted into digital Demat form via Form ISR-1, ISR-2, and SH-13.',
      timeline: '45 - 90 Days',
      mandatoryDocs: [
        'Original Physical Share Certificate',
        'Form ISR-1 (KYC Registration of PAN, Bank, Nominee)',
        'Form ISR-2 (Signature Attestation from Banker)',
        'Form SH-13 (Nomination Form)',
        'Active Demat Account Client Master List (CML) with seal',
      ],
      howWeHelp: 'We prepare the complete Demat request packet (DRF) and coordinate with your Depository Participant (DP) and RTA.',
    },
    {
      id: 'lost-shares',
      title: 'A Recovery of lost shares',
      category: 'Lost / Untraceable Securities',
      description: 'Comprehensive recovery assistance when paper share certificates have been misplaced during shifting, fire, natural damage, or forgotten in bank lockers.',
      timeline: '90 - 120 Days',
      mandatoryDocs: [
        'Police Complaint / FIR / Non-Cognizable Report (NCR) for lost certificates',
        'Public Notice in 1 English & 1 Vernacular newspaper (if market value exceeds ₹5 Lakhs)',
        'Affidavit of Loss on non-judicial stamp paper',
        'Form ISR-4 (Application for Issue of Duplicate / Letter of Confirmation)',
      ],
      howWeHelp: 'We publish the required newspaper advertisements and draft legally watertight affidavits for the company.',
    },
    {
      id: 'duplicate-shares',
      title: 'Issue of duplicate shares',
      category: 'SEBI Duplicate Procedure',
      description: 'Under SEBI circulars, companies no longer issue paper duplicate certificates; instead, they issue a formal "Letter of Confirmation (LOC)" which is directly credited to your Demat account.',
      timeline: '60 - 90 Days',
      mandatoryDocs: [
        'Form ISR-4 for Letter of Confirmation',
        'Indemnity Bond on Stamp Paper with two independent sureties',
        'Proof of identity and address of both sureties',
        'Client Master List of active Demat account',
      ],
      howWeHelp: 'We guide you through surety documentation and ensure the Letter of Confirmation is processed within SEBI timeframes.',
    },
    {
      id: 'iepf-shares',
      title: 'The claim of unclaimed shares from IEPF',
      category: 'IEPF-5 Recovery',
      description: 'Complete end-to-end recovery of shares transferred to the Investor Education and Protection Fund under Section 124(6) of the Companies Act.',
      timeline: '3 - 6 Months',
      mandatoryDocs: [
        'Form IEPF-5 Filing on MCA V3 portal',
        'Form IEPF-5A (Declaration), 5B (Indemnity), 5C (Surrender), 5D (Banker Proof)',
        'Client Master List (CML) with DP seal and signature',
        'Cancelled Cheque with printed claimant name',
      ],
      howWeHelp: 'As an authorized Stockholding associate, we follow up with RTA nodal officers and IEPF directors in New Delhi.',
    },
    {
      id: 'iepf-dividend',
      title: 'The claim of dividend from IEPF',
      category: 'Unpaid / Transferred Cash Recovery',
      description: 'Retrieve all accumulated, unpaid dividend payouts transferred over the years into the government fund, credited directly to your bank account via PFMS.',
      timeline: '60 - 90 Days',
      mandatoryDocs: [
        'Bank Account pre-validated with PFMS',
        'Cancelled Cheque with name printed',
        'Bank Passbook copy with manager seal',
        'Proof of shareholding for the dividend years',
      ],
      howWeHelp: 'We reconcile 7 to 15+ years of accumulated dividends, stock splits, and bonus shares so no amount is left unclaimed.',
    },
    {
      id: 'rta-followup',
      title: 'Following up with Register and Transfer Agent (RTA)',
      category: 'Liaison & Speedup',
      description: 'Direct liaison with all major registrar agencies across India: KFintech, Link Intime, Bigshare, Cameo, Integrated, MCS, Skyline, and Alankit.',
      timeline: 'Ongoing Case Acceleration',
      mandatoryDocs: [
        'Previous inward letters / dispatch tracking numbers',
        'Folio number and company name',
        'Objection letters / Rejection memos received from RTA',
      ],
      howWeHelp: 'We resolve signature mismatch objections, address changes, PAN-Aadhaar linking errors, and speed up pending inward files.',
    },
    {
      id: 'transfer-shares',
      title: 'For transfer of shares',
      category: 'General Share Transfer',
      description: 'General share transfers, name corrections, deletion of deceased joint holder name (Form ISR-5), consolidation of multiple folios, and updating KYC.',
      timeline: '30 - 60 Days',
      mandatoryDocs: [
        'Share Certificates / Folio details',
        'KYC documents of both transferor and transferee',
        'Affidavit for minor name change / spelling mismatch',
        'Demat Account CML',
      ],
      howWeHelp: 'We handle everything from name mismatch in Aadhaar vs share certificate to merging multiple small folios into one Demat.',
    },
  ];

  const formsList: FormDetail[] = [
    {
      code: 'FORM IEPF-5',
      title: 'Application to Authority for Claiming Unpaid Amounts and Shares',
      legalRule: 'Rule 7(1) of the Investor Education and Protection Fund Authority Rules, 2016',
      bgGrad: 'bg-[#0A2540]',
      badgeColor: 'text-amber-300',
      description: 'The primary master web form filed online on the MCA portal by an investor or legal heir to claim shares or unpaid dividend transferred to the IEPF.',
      whoSigns: 'Individual Claimant / Legal Heir / Authorized Signatory',
      stampDuty: 'Filing fees as applicable under MCA Rules',
      mandatoryAttachments: [
        'Printout of MCA Form IEPF-5 with original claimant signature',
        'Copy of MCA Acknowledgement Challan with Service Request Number (SRN)',
        'Copy of Client Master List (CML) of Demat Account',
        'Self-attested copy of Aadhaar and PAN Card',
        'Original Share Certificate (or Form ISR-4 if lost)',
        'Form IEPF-5A, 5B, 5C, and 5D verified copies',
      ],
    },
    {
      code: 'FORM IEPF-5A',
      title: 'Declaration by Claimant / Legal Heir',
      legalRule: 'Mandatory Declaration Schedule under IEPF Rules',
      bgGrad: 'bg-[#0F5132]',
      badgeColor: 'text-emerald-300',
      description: 'Formal legal declaration made by the claimant affirming that they are the genuine and lawful owner or legal heir entitled to the shares and dividend.',
      whoSigns: 'Claimant(s) and surviving legal heirs',
      stampDuty: 'Affidavit format; notarization recommended',
      mandatoryAttachments: [
        'Affidavit confirming relationship with original shareholder',
        'Genealogical Family Tree / Parivar Register copy (for legal heirs)',
        'Declaration confirming no rival claim or pending court suit',
      ],
    },
    {
      code: 'FORM IEPF-5B',
      title: 'Indemnity Bond by Claimant and Sureties',
      legalRule: 'Section 125 & IEPF Authority Indemnity Regulations',
      bgGrad: 'bg-[#9A3412]',
      badgeColor: 'text-amber-200',
      description: 'A formal undertaking indemnifying the IEPF Authority and the company against any future third-party claims or damages arising from the release of shares/dividends.',
      whoSigns: 'Claimant and two independent solvent Sureties / Witnesses',
      stampDuty: 'On Non-Judicial Stamp Paper (state stamp duty as per local laws)',
      mandatoryAttachments: [
        'Non-judicial stamp paper of prescribed state value',
        'Signatures and thumb impressions of two independent witnesses',
        'PAN & Aadhaar copies of both sureties',
        'Notary seal and advocate verification',
      ],
    },
    {
      code: 'FORM IEPF-5C',
      title: 'Advance Receipt & Surrender of Original Share Certificate',
      legalRule: 'Document Surrender Protocol under MCA IEPF Norms',
      bgGrad: 'bg-[#581C87]',
      badgeColor: 'text-purple-200',
      description: 'Advance receipt acknowledging surrender of original physical share certificates to the company/IEPF Authority for cancellation upon electronic demat credit.',
      whoSigns: 'Registered Holder / Transferee / Claimant',
      stampDuty: 'Revenue Stamp of ₹1 attached with cross-signature',
      mandatoryAttachments: [
        'Original Physical Share Certificate(s) with revenue stamp',
        'Folio numbers and distinctive numbers checklist',
        'Letter of transmittal to Nodal Officer',
      ],
    },
    {
      code: 'FORM IEPF-5D',
      title: 'Verification of Bank Account Details & Cancelled Cheque',
      legalRule: 'PFMS Electronic Payment Verification Standard',
      bgGrad: 'bg-[#0E7490]',
      badgeColor: 'text-cyan-200',
      description: 'Mandatory bank verification proving that the bank account belongs to the claimant, enabling the Public Financial Management System (PFMS) to credit dividends.',
      whoSigns: 'Claimant & Authorized Bank Manager with Branch Seal',
      stampDuty: 'Not applicable; Branch Manager attestation required',
      mandatoryAttachments: [
        'Original Cancelled Cheque with claimant name pre-printed',
        'Self-attested bank passbook / 3-month statement showing IFSC and MICR',
        'Banker verification letter with bank employee code and rubber stamp',
      ],
    },
  ];

  const docsList: DocDetail[] = [
    {
      title: 'Physical Share Certificate',
      iconName: 'FileText',
      description: 'Paper certificates issued prior to mandatory dematerialization. Often found in old godrej cupboards or lockers.',
      commonIssues: [
        'Certificate torn or soiled',
        'Company changed its name (e.g. TISCO to Tata Steel)',
        'Face value split or bonus shares not accounted for',
      ],
      solution: 'We reconcile historical corporate actions and submit for direct Demat conversion via Form ISR-1 & ISR-2.',
    },
    {
      title: 'Duplicate Share Certificate',
      iconName: 'FileCheck2',
      description: 'Required when the original certificates cannot be found or have been destroyed in fire/flood/theft.',
      commonIssues: [
        'Loss of Folio / Certificate numbers',
        'Police FIR requirements',
        'High newspaper advertisement costs',
      ],
      solution: 'We obtain folio data from the RTA, draft police affidavits, manage cost-effective newspaper ads, and secure Letter of Confirmation (LOC).',
    },
    {
      title: 'Dividend Warrant',
      iconName: 'Banknote',
      description: 'Uncashed dividend cheques or warrants that expired past their 90-day validity and accumulated over 7+ years.',
      commonIssues: [
        'Warrant expired or returned undelivered',
        'Old bank account closed or merged',
        'Address mismatch with company records',
      ],
      solution: 'We reconcile all past unpaid dividend years directly from company IEPF registers and link your active bank account for PFMS release.',
    },
    {
      title: 'Cancelled Cheque',
      iconName: 'CheckCircle2',
      description: 'Cheque leaf with name printed, used by MCA and RTA to verify account ownership.',
      commonIssues: [
        'Name missing on cheque leaf',
        'Joint account order inverted',
        'IFSC code changed due to bank mergers (e.g. Syndicate into Canara)',
      ],
      solution: 'We ensure updated IFSC alignment and obtain authorized branch manager seals to prevent PFMS transfer rejection.',
    },
    {
      title: 'Passbook',
      iconName: 'Award',
      description: 'Bank passbook first page showing account number, IFSC, name, address, and official bank seal.',
      commonIssues: [
        'Missing photograph or manager stamp',
        'Address differing from Aadhaar card',
      ],
      solution: 'We provide bank-approved verification format (Form ISR-2) for swift manager attestation.',
    },
  ];

  const pillarsList: PillarDetail[] = [
    {
      title: 'SAFE & SECURE',
      subtitle: 'Your information is always protected',
      color: 'bg-[#0A2540]',
      iconName: 'Lock',
      details: 'All physical certificates, KYC records, and folio information are handled under strict non-disclosure security standards.',
      pledge: 'No shared third-party brokers. We maintain authorized custody and deliver trackable postal dispatches with government registered post.',
    },
    {
      title: 'EXPERT GUIDANCE',
      subtitle: 'In-depth knowledge & proven experience',
      color: 'bg-[#0F5132]',
      iconName: 'Award',
      details: 'Over 15+ years of specialized proficiency in Company Law, SEBI circulars, and IEPF Authority procedures.',
      pledge: 'Authorized Business Associate of Stockholding (A Central Government Company) providing authoritative procedural insight.',
    },
    {
      title: 'DEDICATED SUPPORT',
      subtitle: 'One-to-one assistance at every step',
      color: 'bg-[#9A3412]',
      iconName: 'HeadphonesIcon',
      details: 'Direct mobile access to Gopal Singh Parihar. You never speak to automated bots or untrained call center staff.',
      pledge: 'Continuous updates via WhatsApp, phone, and email until your shares are credited into your Demat account.',
    },
    {
      title: 'TIMELY FOLLOW-UP',
      subtitle: 'Regular follow-up with Company & RTA',
      color: 'bg-[#581C87]',
      iconName: 'Clock',
      details: 'Active fortnightly tracking with company Nodal Officers, RTAs (KFintech, Link Intime), and the IEPF Authority.',
      pledge: 'Immediate response to all MCA resubmission notices within the 15-day statutory window so your case is never struck off.',
    },
    {
      title: 'RESULT ORIENTED',
      subtitle: 'Focused on delivering successful outcomes',
      color: 'bg-[#0E7490]',
      iconName: 'TrendingUp',
      details: 'Complete end-to-end follow-through until physical shares become tradable Demat units and dividend cash is credited.',
      pledge: 'Transparent fee structure with milestone-based commitment to recovering your rightful family wealth.',
    },
  ];

  return (
    <section id="iepf-poster" className="w-full bg-[#F4F6F9] text-slate-800 py-6 sm:py-10">
      <div className="max-w-6xl mx-auto px-3 sm:px-6">

        {/* Main Poster Canvas with Gold Border */}
        <div className="bg-white rounded-3xl border-4 border-[#C5A059] shadow-2xl overflow-hidden relative">

          {/* ========================================================
              TOP HEADER: ROYAL NAVY BANNER WITH GOPAL SINGH PARIHAR
             ======================================================== */}
          <div className="bg-gradient-to-r from-[#041122] via-[#081E3B] to-[#041122] text-white p-6 sm:p-8 relative overflow-hidden border-b-2 border-[#C5A059]">
            {/* Ambient gold glow */}
            <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
              
              {/* Left: Authentic Circular IEPF Authority Logo Seal */}
              <div className="flex items-center gap-4">
                <div
                  className="relative group cursor-pointer"
                  onClick={() => setShowPosterModal(true)}
                  title="Click to view original brochure poster"
                >
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white p-1 shadow-2xl border-2 border-[#C5A059] flex items-center justify-center shrink-0 hover:scale-105 transition-transform duration-300">
                    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="50" cy="50" r="46" stroke="#0A2240" strokeWidth="4" fill="#FFFFFF" />
                      <circle cx="50" cy="50" r="41" stroke="#C5A059" strokeWidth="1" strokeDasharray="2 2" fill="none" />
                      
                      <path id="posterIepfTop" d="M 18,50 A 32,32 0 1,1 82,50" fill="none" />
                      <text fill="#0A2240" fontSize="7" fontWeight="900" letterSpacing="0.8">
                        <textPath href="#posterIepfTop" startOffset="50%" textAnchor="middle">
                          INVESTOR EDUCATION & PROTECTION
                        </textPath>
                      </text>

                      <path id="posterIepfBottom" d="M 81,53 A 32,32 0 0,1 19,53" fill="none" />
                      <text fill="#0A2240" fontSize="6.5" fontWeight="900" letterSpacing="0.6">
                        <textPath href="#posterIepfBottom" startOffset="50%" textAnchor="middle">
                          FUND AUTHORITY
                        </textPath>
                      </text>

                      <circle cx="50" cy="50" r="23" fill="#0A2240" />

                      <circle cx="50" cy="37" r="3.2" fill="#FFC107" />
                      <circle cx="43" cy="39" r="2.6" fill="#FFFFFF" />
                      <circle cx="57" cy="39" r="2.6" fill="#FFFFFF" />

                      <path d="M 45 44 C 45 41.5, 55 41.5, 55 44 Z" fill="#FFC107" />
                      <path d="M 39 46 C 39 43.5, 47 43.5, 47 46 Z" fill="#FFFFFF" opacity="0.85" />
                      <path d="M 53 46 C 53 43.5, 61 43.5, 61 46 Z" fill="#FFFFFF" opacity="0.85" />

                      <circle cx="50" cy="49" r="4" fill="#C5A059" />
                      <text x="50" y="51.8" fill="#0A2240" fontSize="4.8" fontWeight="900" textAnchor="middle">₹</text>

                      <path d="M 36 53 C 39 58, 47 62, 50 62 C 53 62, 61 58, 64 53 C 60 56, 54 58, 50 58 C 46 58, 40 56, 36 53 Z" fill="#FFC107" />

                      <rect x="33" y="66" width="34" height="9" rx="2" fill="#8B0000" />
                      <text x="50" y="73" fill="#FFFFFF" fontSize="6.5" fontWeight="900" letterSpacing="1.2" textAnchor="middle">
                        IEPF
                      </text>
                    </svg>
                  </div>
                </div>

                {/* Mobile view badge */}
                <div className="lg:hidden text-left">
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
                    Government Of India Regulated
                  </span>
                  <span className="text-xs font-semibold text-slate-300">
                    IEPF Authority Procedural Desk
                  </span>
                </div>
              </div>

              {/* Center: Large Gopal Singh Parihar & Stockholding Associate Banners */}
              <div className="text-center space-y-2.5 max-w-2xl flex-1">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight font-display leading-tight">
                  <span className="text-white">GOPAL </span>
                  <span className="text-[#FFB800] drop-shadow-[0_2px_10px_rgba(255,184,0,0.4)]">
                    SINGH PARIHAR
                  </span>
                </h1>

                {/* Maroon Subtitle Banner */}
                <div>
                  <div className="inline-block px-4 py-1.5 rounded-md bg-[#8B0000] text-white font-black text-xs sm:text-sm tracking-wider uppercase border border-red-400/30 shadow-md">
                    IEPF RECOVERY EXPERT & BUSINESS ASSOCIATE OF
                  </div>
                </div>

                {/* Gold Pill Banner with Shimmer Effect */}
                <div>
                  <div className="inline-block px-5 py-2 rounded-md animate-gold-shimmer text-black font-black text-xs sm:text-sm tracking-wide uppercase shadow-lg border border-amber-300 hover:scale-102 transition-transform">
                    STOCKHOLDING (A CENTRAL GOVERNMENT COMPANY)
                  </div>
                </div>
              </div>

              {/* Right: Securing Investors, Securing Futures Emblem */}
              <div className="hidden lg:flex flex-col items-center text-center space-y-2 shrink-0">
                <div 
                  onClick={() => setShowPosterModal(true)}
                  className="w-24 h-24 rounded-full bg-gradient-to-b from-emerald-950 to-[#041122] border-2 border-[#C5A059] p-1 shadow-xl flex items-center justify-center relative overflow-hidden group cursor-pointer hover:scale-105 transition-transform"
                  title="Click to view brochure"
                >
                  <div className="w-full h-full rounded-full bg-emerald-900/40 flex flex-col items-center justify-center text-emerald-400 p-2 text-center">
                    <TrendingUp className="w-8 h-8 text-emerald-400 mb-1 animate-pulse" />
                    <span className="text-[9px] font-black uppercase text-amber-300 leading-tight">100% Legal</span>
                  </div>
                </div>
                <div className="text-xs font-black text-amber-400 leading-tight">
                  <div>Securing Investors</div>
                  <div className="text-emerald-400 font-extrabold">Securing Futures</div>
                </div>
              </div>

            </div>

            {/* View Original Poster Trigger Button */}
            <div className="mt-4 flex items-center justify-between">
              <div className="text-[11px] font-bold text-amber-300/80 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Interactive Advisory Portal • Click Any Section to Inspect Details</span>
              </div>
              <button
                onClick={() => setShowPosterModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[11px] font-bold text-amber-300 border border-amber-400/40 backdrop-blur-md transition-all cursor-pointer hover:scale-105"
              >
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span>View Original Brochure Poster</span>
              </button>
            </div>
          </div>

          {/* ========================================================
              CONTACT BAR: DIRECT HELPLINE, EMAIL, KANPUR ADDRESS, QR
              (Every element is fully functional with click-to-call, copy, map, QR modal)
             ======================================================== */}
          <div className="bg-[#FAF8F5] border-b-2 border-slate-200 px-4 py-3.5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              
              {/* Phone + Copy Button */}
              <div className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-blue-50/80 transition group bg-white border border-slate-200">
                <a
                  href={`tel:${config.contactNumber.replace(/\s+/g, '')}`}
                  onClick={handleCall}
                  className="flex items-center gap-3 pr-2 cursor-pointer"
                  title="Click to call Gopal Singh Parihar directly"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform shrink-0">
                    <PhoneCall className="w-5 h-5 animate-pulse" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] font-extrabold uppercase text-slate-500 block">Direct Helpline</span>
                    <span className="text-sm sm:text-base font-black text-slate-900 font-mono tracking-tight group-hover:text-blue-700">
                      {config.contactNumber}
                    </span>
                  </div>
                </a>
                <button
                  type="button"
                  onClick={() => copyToClipboard(config.contactNumber, 'Phone number')}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-700 transition"
                  title="Copy Phone Number"
                >
                  {copiedItem === 'Phone number' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Email + Copy Button */}
              <div className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-red-50/80 transition group bg-white border border-slate-200">
                <a
                  href={`mailto:${config.businessEmail}`}
                  className="flex items-center gap-3 pr-2 cursor-pointer"
                  title="Click to email Gopal Singh Parihar"
                >
                  <div className="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] font-extrabold uppercase text-slate-500 block">Email Case Desk</span>
                    <span className="text-xs sm:text-sm font-black text-slate-900 font-mono group-hover:text-rose-700">
                      {config.businessEmail}
                    </span>
                  </div>
                </a>
                <button
                  type="button"
                  onClick={() => copyToClipboard(config.businessEmail, 'Email address')}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-rose-700 transition"
                  title="Copy Email"
                >
                  {copiedItem === 'Email address' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Address + Google Maps / Copy */}
              <div className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-emerald-50/80 transition group bg-white border border-slate-200 max-w-sm">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Arail-82+New+Nankari+IIT+Kalyanpur+Kanpur+Uttar+Pradesh+208016"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 pr-1 cursor-pointer"
                  title="Open location on Google Maps"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md shrink-0 group-hover:scale-110 transition-transform">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] font-extrabold uppercase text-slate-500 block">Office Location</span>
                    <span className="text-xs font-bold text-slate-800 leading-tight group-hover:text-emerald-700">
                      {config.officeAddress}
                    </span>
                  </div>
                </a>
                <button
                  type="button"
                  onClick={() => copyToClipboard(config.officeAddress, 'Office address')}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-700 transition shrink-0"
                  title="Copy Address"
                >
                  {copiedItem === 'Office address' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* QR Code Scan to Connect with Modal trigger */}
              <button
                onClick={() => setShowQrModal(true)}
                className="flex items-center gap-2.5 p-2 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl shadow-md transition cursor-pointer hover:scale-103"
                title="Click to expand QR Code and save contact"
              >
                <div className="p-1 bg-amber-400 text-slate-950 rounded-lg">
                  <QrCode className="w-7 h-7" />
                </div>
                <div className="text-left pr-2">
                  <span className="text-[10px] font-black uppercase text-amber-300 block leading-tight">
                    Scan to Connect
                  </span>
                  <span className="text-[11px] font-extrabold text-white block underline">
                    Open QR & vCard
                  </span>
                </div>
              </button>

            </div>
          </div>

          {/* ========================================================
              MINISTRY OF CORPORATE AFFAIRS / TRUSTED STRIP
             ======================================================== */}
          <div className="bg-white border-b border-slate-200 py-3 px-6 flex flex-wrap items-center justify-between gap-4">
            {/* Government Authority Emblem */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-300 p-1 flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6 text-slate-800" />
              </div>
              <div>
                <div className="text-[10px] font-serif font-bold text-slate-700 leading-none">
                  सत्यमेव जयते
                </div>
                <div className="text-xs font-extrabold text-slate-900 leading-tight mt-0.5">
                  Ministry of Corporate Affairs
                </div>
                <div className="text-[10px] text-slate-500 leading-none">Government of India Regulated</div>
              </div>
            </div>

            {/* Central Badge with pulse ring */}
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-black uppercase tracking-wider animate-pulse-glow">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Trusted • Secure • Reliable</span>
            </div>

            {/* Quick Action Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleWhatsApp()}
                className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 font-black text-xs uppercase tracking-wider shadow-sm flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>WhatsApp Now</span>
              </button>
              <button
                onClick={handleCall}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider shadow-sm flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
                <span>Call Helpline</span>
              </button>
            </div>
          </div>

          {/* ========================================================
              CORE SECTION:
              1. IEPF PROCESS FLOW (Column 1 - Interactive Steps)
              2. RECOVERY OF SHARES – OUR SERVICES (Column 2 - Interactive Checklist)
              3. INSTANT CASE CONSULTATION DESK (Column 3 - Functional Backend Lead Form)
             ======================================================== */}
          <div className="p-4 sm:p-6 bg-[#FCFDFE]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">

              {/* ----------------------------------------------------
                  COLUMN 1: IEPF PROCESS FLOW (Deep Navy Header)
                  (Every Step is Clickable with Modal & Connecting Flow Arrows)
                 ---------------------------------------------------- */}
              <div id="iepf-process" className="lg:col-span-4 bg-white rounded-2xl border-2 border-slate-300 shadow-md flex flex-col justify-between overflow-hidden scroll-mt-24">
                <div>
                  <div className="bg-[#0A2240] text-white font-black py-2.5 px-4 text-center text-xs sm:text-sm tracking-wider uppercase border-b-2 border-amber-400 flex items-center justify-between">
                    <span className="w-4" />
                    <span>IEPF PROCESS FLOW</span>
                    <span className="text-[10px] bg-amber-400 text-slate-950 px-2 py-0.5 rounded font-black">
                      CLICK A STEP
                    </span>
                  </div>

                  <div className="p-3.5 space-y-2 text-xs">
                    {stepDetails.map((step, idx) => {
                      const icons = [
                        <Users key={1} className="w-4 h-4" />,
                        <Building2 key={2} className="w-4 h-4" />,
                        <FileText key={3} className="w-4 h-4" />,
                        <FileCheck2 key={4} className="w-4 h-4" />,
                        <ShieldCheck key={5} className="w-4 h-4" />,
                        <Banknote key={6} className="w-4 h-4" />,
                      ];

                      const colors = [
                        'bg-blue-600',
                        'bg-emerald-600',
                        'bg-amber-600',
                        'bg-rose-600',
                        'bg-purple-600',
                        'bg-teal-600',
                      ];

                      return (
                        <React.Fragment key={step.number}>
                          <div
                            onClick={() => setActiveStep(step)}
                            className="group flex items-center justify-between gap-3 p-2.5 rounded-xl border border-slate-200 hover:border-blue-400 bg-white hover:bg-blue-50/70 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5"
                            title={`Click to read details on Step ${step.number}`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full ${colors[idx]} text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300 font-bold text-xs`}>
                                {icons[idx]}
                              </div>
                              <div className="text-left">
                                <div className="text-[9px] font-black uppercase text-slate-500 tracking-wider">
                                  Step {step.number} of 6
                                </div>
                                <span className="font-extrabold text-slate-900 leading-tight block group-hover:text-blue-900 transition">
                                  {step.title}
                                </span>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition shrink-0" />
                          </div>

                          {idx < stepDetails.length - 1 && (
                            <div className="flex justify-center items-center py-0.5">
                              <div className="text-slate-400 font-black text-xs animate-flow-arrow flex items-center gap-1">
                                <span>↓</span>
                              </div>
                            </div>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>

                <div 
                  onClick={() => setActiveStep(stepDetails[0])}
                  className="bg-[#0A2240] hover:bg-[#071930] text-amber-300 hover:text-amber-200 font-black py-2.5 px-4 text-center text-xs tracking-wider uppercase border-t-2 border-amber-400 cursor-pointer transition flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>WE GUIDE YOU AT EVERY STEP • CLICK TO EXPLORE</span>
                </div>
              </div>

              {/* ----------------------------------------------------
                  COLUMN 2: RECOVERY OF SHARES – OUR SERVICES (Forest Green Header)
                  (Every Service has an Info Button + Instant Consultation Sync)
                 ---------------------------------------------------- */}
              <div id="poster-services" className="lg:col-span-4 bg-white rounded-2xl border-2 border-slate-300 shadow-md flex flex-col justify-between overflow-hidden scroll-mt-24">
                <div>
                  <div className="bg-[#155724] text-white font-black py-2.5 px-4 text-center text-xs sm:text-sm tracking-wider uppercase border-b-2 border-emerald-400 flex items-center justify-between">
                    <span className="w-4" />
                    <span>RECOVERY OF SHARES – OUR SERVICES</span>
                    <span className="text-[10px] bg-emerald-400 text-emerald-950 px-2 py-0.5 rounded font-black">
                      8 SERVICES
                    </span>
                  </div>

                  <div className="p-3.5 space-y-1.5 text-xs">
                    {servicesList.map((service, idx) => {
                      const icons = [
                        <Users key={1} className="w-3.5 h-3.5 text-white" />,
                        <FileText key={2} className="w-3.5 h-3.5 text-white" />,
                        <HelpCircle key={3} className="w-3.5 h-3.5 text-white" />,
                        <FileCheck2 key={4} className="w-3.5 h-3.5 text-white" />,
                        <Building2 key={5} className="w-3.5 h-3.5 text-white" />,
                        <Banknote key={6} className="w-3.5 h-3.5 text-white" />,
                        <Clock key={7} className="w-3.5 h-3.5 text-white" />,
                        <RotateCw key={8} className="w-3.5 h-3.5 text-white" />,
                      ];

                      const colors = [
                        'bg-blue-600',
                        'bg-emerald-600',
                        'bg-amber-600',
                        'bg-rose-600',
                        'bg-purple-600',
                        'bg-teal-600',
                        'bg-orange-600',
                        'bg-green-700',
                      ];

                      const isSelected = caseType === service.title;

                      return (
                        <div
                          key={service.id}
                          className={`flex items-center justify-between gap-2 p-2 rounded-xl transition cursor-pointer border group ${
                            isSelected
                              ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-300/60 shadow-sm'
                              : 'bg-white border-slate-100 hover:border-emerald-200 hover:bg-slate-50'
                          }`}
                        >
                          <div 
                            onClick={() => handleSelectService(service.title)}
                            className="flex items-center gap-2.5 flex-1"
                          >
                            <div className={`w-7 h-7 rounded-full ${colors[idx]} flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 transition-transform`}>
                              {icons[idx]}
                            </div>
                            <span className={`font-bold text-xs leading-tight transition ${
                              isSelected ? 'text-emerald-950 font-black' : 'text-slate-800 group-hover:text-emerald-900'
                            }`}>
                              {service.title}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => setActiveService(service)}
                            className="p-1 rounded-lg bg-slate-100 hover:bg-emerald-100 text-slate-500 hover:text-emerald-700 transition shrink-0"
                            title="View Requirements & Documents for this service"
                          >
                            <Info className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 border-t border-emerald-200 flex items-center justify-between text-center">
                  <span className="text-[11px] font-extrabold text-emerald-900">
                    Click service to select • Click ℹ for checklist
                  </span>
                  <button
                    onClick={() => setActiveService(servicesList[0])}
                    className="text-[11px] font-black text-emerald-700 hover:text-emerald-900 underline cursor-pointer"
                  >
                    View All
                  </button>
                </div>
              </div>

              {/* ----------------------------------------------------
                  COLUMN 3: DIRECT CASE CONSULTATION DESK (REPLACES FAKE EXAMPLES!)
                  (Active Form with Backend Submission, Validation & WhatsApp Link)
                 ---------------------------------------------------- */}
              <div id="poster-inquiry" className="lg:col-span-4 bg-white rounded-2xl border-2 border-slate-300 shadow-md flex flex-col justify-between overflow-hidden scroll-mt-24">
                <div>
                  <div className="bg-[#0F2942] text-white font-black py-2.5 px-4 text-center text-xs sm:text-sm tracking-wider uppercase border-b-2 border-amber-400 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>INSTANT CASE INQUIRY DESK</span>
                    </div>
                    <span className="text-[10px] bg-amber-400 text-slate-950 px-2 py-0.5 rounded font-black">
                      ACTIVE
                    </span>
                  </div>

                  <form onSubmit={handleInquirySubmit} className="p-3.5 space-y-2.5 text-xs">
                    
                    {/* Full Name */}
                    <div>
                      <label className="block text-[11px] font-extrabold uppercase text-slate-700 mb-0.5">
                        Claimant / Shareholder Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Ramesh Kumar / Legal Heir"
                        className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
                      />
                    </div>

                    {/* Mobile Number */}
                    <div>
                      <label className="block text-[11px] font-extrabold uppercase text-slate-700 mb-0.5">
                        Your Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="10-digit Mobile (e.g. 9820011223)"
                        className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-black placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono transition"
                      />
                    </div>

                    {/* Service Category */}
                    <div>
                      <label className="block text-[11px] font-extrabold uppercase text-slate-700 mb-0.5">
                        Select Case Category
                      </label>
                      <select
                        value={caseType}
                        onChange={(e) => setCaseType(e.target.value)}
                        className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
                      >
                        {servicesList.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Company Name */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase text-slate-700 mb-0.5">
                          Company Name
                        </label>
                        <input
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="e.g. Reliance, ITC"
                          className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 focus:outline-none transition text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase text-slate-700 mb-0.5">
                          Shares Count
                        </label>
                        <input
                          type="text"
                          value={sharesCount}
                          onChange={(e) => setSharesCount(e.target.value)}
                          placeholder="e.g. 100 shares"
                          className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 focus:outline-none transition text-xs"
                        />
                      </div>
                    </div>

                    {/* Folio Details */}
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase text-slate-700 mb-0.5">
                        Folio No. / Certificate Details (Optional)
                      </label>
                      <input
                        type="text"
                        value={folioNumber}
                        onChange={(e) => setFolioNumber(e.target.value)}
                        placeholder="e.g. Folio 004521 or Physical Cert. No."
                        className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 focus:outline-none transition text-xs"
                      />
                    </div>

                    {/* Submit Buttons */}
                    <div className="pt-1 space-y-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer hover:scale-102 active:scale-98 disabled:opacity-60"
                      >
                        {isSubmitting ? (
                          <RotateCw className="w-4 h-4 animate-spin text-slate-950" />
                        ) : (
                          <MessageCircle className="w-4 h-4 fill-slate-950" />
                        )}
                        <span>{isSubmitting ? 'Registering Case...' : 'Submit & Connect on WhatsApp'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleCall}
                        className="w-full py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer hover:scale-102 active:scale-98"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Direct Call: +91 94509 08004</span>
                      </button>
                    </div>
                  </form>
                </div>

                <div className="p-2.5 bg-slate-100 border-t border-slate-200 text-center">
                  <div className="flex items-center justify-center gap-2 text-[10px] text-slate-600 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Official Stockholding Associate Desk • 100% Confidential</span>
                  </div>
                </div>
              </div>

            </div>

            {/* ========================================================
                IEPF PROCESS FORMS ROW (Maroon Banner)
                (Every Form Card is Clickable to View Legal Requirements)
               ======================================================== */}
            <div id="poster-forms" className="mt-8 rounded-2xl border-2 border-slate-300 overflow-hidden shadow-md bg-white scroll-mt-24">
              <div className="bg-[#8B0000] text-white font-black py-2.5 px-4 text-center text-xs sm:text-sm tracking-wider uppercase border-b-2 border-red-400 flex items-center justify-between">
                <span className="w-4" />
                <span>IEPF PROCESS FORMS</span>
                <span className="text-[10px] bg-red-400 text-white px-2 py-0.5 rounded font-black">
                  CLICK ANY FORM
                </span>
              </div>

              <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {formsList.map((form) => (
                  <div
                    key={form.code}
                    onClick={() => setActiveForm(form)}
                    className={`p-3 rounded-xl ${form.bgGrad} text-white text-center space-y-1.5 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1.5 group border border-white/10 hover:border-amber-400`}
                    title={`Click to view checklist for ${form.code}`}
                  >
                    <div className={`text-xs font-black uppercase ${form.badgeColor} group-hover:scale-105 transition-transform`}>
                      {form.code}
                    </div>
                    <div className="text-[10px] text-slate-200 leading-tight min-h-[32px] flex items-center justify-center font-medium">
                      {form.title.length > 45 ? `${form.title.slice(0, 45)}...` : form.title}
                    </div>
                    <div className="w-10 h-10 mx-auto rounded bg-white/10 border border-white/20 flex items-center justify-center text-amber-300 mt-1 group-hover:bg-white/20 transition">
                      <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="text-[9px] font-bold text-amber-300/80 pt-1 flex items-center justify-center gap-1">
                      <span>View Checklist</span>
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ========================================================
                DOCUMENTS WE WORK WITH BAR
                (Interactive click shows recovery guidelines for each doc)
               ======================================================== */}
            <div className="mt-5 p-3 rounded-2xl bg-[#FFFDF7] border-2 border-amber-300 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="px-3 py-1.5 rounded-lg bg-[#C27803] text-white text-xs font-black uppercase tracking-wider shadow-xs">
                  DOCUMENTS WE WORK WITH:
                </span>

                <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-800">
                  {docsList.map((doc) => (
                    <button
                      key={doc.title}
                      onClick={() => setActiveDoc(doc)}
                      className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-slate-800 hover:text-amber-900 transition flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95"
                      title={`Click to inspect guidelines for ${doc.title}`}
                    >
                      <FileText className="w-3.5 h-3.5 text-amber-700" />
                      <span>{doc.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Online Portal Button */}
              <a
                href="https://www.iepf.gov.in"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-1.5 rounded-full bg-[#0A2240] hover:bg-[#061528] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition shrink-0 hover:scale-105 shadow-sm"
              >
                <span>SUBMITTED AT: www.iepf.gov.in</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              </a>

            </div>

            {/* ========================================================
                5 TRUST PILLARS (Safe & Secure, Expert Guidance, etc.)
                (Interactive click opens Gopal Singh Parihar's Service Pledge)
               ======================================================== */}
            <div id="poster-pillars" className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs scroll-mt-24">
              {pillarsList.map((pillar) => {
                const pillarIcons = {
                  Lock: <Lock className="w-5 h-5" />,
                  Award: <Award className="w-5 h-5" />,
                  HeadphonesIcon: <HeadphonesIcon className="w-5 h-5" />,
                  Clock: <Clock className="w-5 h-5" />,
                  TrendingUp: <TrendingUp className="w-5 h-5" />,
                };

                return (
                  <div
                    key={pillar.title}
                    onClick={() => setActivePillar(pillar)}
                    className={`p-3.5 rounded-xl ${pillar.color} text-white flex items-center gap-3 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 group border border-white/10 hover:border-amber-400`}
                    title={`Click to view ${pillar.title} commitment`}
                  >
                    <div className="w-9 h-9 rounded-full bg-white/10 text-amber-300 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      {pillarIcons[pillar.iconName as keyof typeof pillarIcons]}
                    </div>
                    <div>
                      <div className="font-black text-amber-300 uppercase tracking-wide group-hover:text-amber-200">
                        {pillar.title}
                      </div>
                      <div className="text-[11px] text-slate-300 leading-tight">
                        {pillar.subtitle}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* ========================================================
              BOTTOM SLOGAN RIBBON (Royal Navy with Gold Flourishes)
              (Shimmering animation with smooth inquiry anchor)
             ======================================================== */}
          <div 
            onClick={() => {
              const el = document.getElementById('poster-inquiry');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-[#051325] text-amber-400 py-3.5 px-6 text-center border-t-2 border-[#C5A059] flex items-center justify-center gap-4 cursor-pointer hover:bg-[#081a30] transition group relative overflow-hidden"
          >
            {/* Shimmer line */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            <span className="hidden sm:inline text-amber-500 font-serif text-lg group-hover:scale-125 transition-transform">✦ ───</span>
            <span className="text-sm sm:text-base font-black uppercase tracking-widest text-[#FFC107] group-hover:text-amber-200 transition">
              YOUR SHARES, YOUR RIGHT – WE HELP YOU CLAIM IT BACK
            </span>
            <span className="hidden sm:inline text-amber-500 font-serif text-lg group-hover:scale-125 transition-transform">─── ✦</span>
          </div>

        </div>

      </div>

      {/* ========================================================
          MODAL 1: INTERACTIVE STEP DETAIL VIEWER
         ======================================================== */}
      {activeStep && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="relative max-w-xl w-full bg-white rounded-3xl border-2 border-blue-600 overflow-hidden shadow-2xl animate-fadeIn">
            {/* Header */}
            <div className="bg-[#0A2240] text-white p-5 flex items-start justify-between border-b-2 border-amber-400">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center text-sm shadow-md shrink-0">
                  {activeStep.number}
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block">
                    IEPF Process Flow • Stage {activeStep.number} of 6
                  </span>
                  <h3 className="text-base font-black leading-tight text-white">
                    {activeStep.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setActiveStep(null)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4 text-xs text-slate-700 max-h-[75vh] overflow-y-auto">
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
                <span className="font-extrabold text-blue-950 block text-xs mb-1">
                  {activeStep.subtitle}
                </span>
                <p className="text-slate-700 leading-relaxed">
                  {activeStep.description}
                </p>
              </div>

              <div>
                <div className="font-black text-slate-900 uppercase text-xs mb-2 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>Estimated Statutory Duration: {activeStep.duration}</span>
                </div>
              </div>

              <div>
                <div className="font-black text-slate-900 uppercase text-xs mb-2 flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4 text-emerald-600" />
                  <span>Key Documents & Artifacts Required:</span>
                </div>
                <ul className="space-y-1.5 pl-2">
                  {activeStep.requiredDocuments.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-950">
                <span className="font-black block text-[11px] mb-0.5">Procedural Guidance Note:</span>
                <p className="leading-relaxed">{activeStep.proceduralNotes}</p>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => {
                    handleWhatsApp(`Hello Gopal Singh Parihar Sir, I need assistance with Step ${activeStep.number}: ${activeStep.title}. Please guide me.`);
                    setActiveStep(null);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition cursor-pointer hover:scale-102"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  <span>{activeStep.ctaText}</span>
                </button>

                <button
                  onClick={() => {
                    handleSelectService(`The claim of unclaimed shares from IEPF`);
                    setActiveStep(null);
                  }}
                  className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer"
                >
                  Pre-fill Inquiry Desk
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 2: INTERACTIVE SERVICE REQUIREMENTS & CHECKLIST
         ======================================================== */}
      {activeService && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="relative max-w-xl w-full bg-white rounded-3xl border-2 border-emerald-600 overflow-hidden shadow-2xl animate-fadeIn">
            {/* Header */}
            <div className="bg-[#155724] text-white p-5 flex items-start justify-between border-b-2 border-emerald-400">
              <div>
                <span className="text-[10px] font-black uppercase text-emerald-300 tracking-wider block">
                  Service Checklist • {activeService.category}
                </span>
                <h3 className="text-base font-black leading-tight text-white">
                  {activeService.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveService(null)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4 text-xs text-slate-700 max-h-[75vh] overflow-y-auto">
              <p className="text-slate-800 text-sm leading-relaxed font-medium">
                {activeService.description}
              </p>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-100 font-bold text-slate-800">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>Typical Processing Window: {activeService.timeline}</span>
              </div>

              <div>
                <div className="font-black text-slate-900 uppercase text-xs mb-2 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span>Mandatory Checklist for this Service:</span>
                </div>
                <ul className="space-y-1.5 pl-2">
                  {activeService.mandatoryDocs.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950">
                <span className="font-black block text-[11px] mb-0.5">How Gopal Singh Parihar Delivers:</span>
                <p className="leading-relaxed">{activeService.howWeHelp}</p>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => {
                    handleSelectService(activeService.title);
                    handleWhatsApp(`Hello Gopal Singh Parihar Sir, I am inquiring about: ${activeService.title}. Please review my case.`);
                    setActiveService(null);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition cursor-pointer hover:scale-102"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  <span>Consult On This Service</span>
                </button>

                <button
                  onClick={() => {
                    handleSelectService(activeService.title);
                    setActiveService(null);
                  }}
                  className="py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer"
                >
                  Select in Inquiry Desk
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 3: INTERACTIVE IEPF FORM REQUIREMENTS
         ======================================================== */}
      {activeForm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="relative max-w-xl w-full bg-white rounded-3xl border-2 border-red-700 overflow-hidden shadow-2xl animate-fadeIn">
            {/* Header */}
            <div className="bg-[#8B0000] text-white p-5 flex items-start justify-between border-b-2 border-amber-400">
              <div>
                <span className="text-[10px] font-black uppercase text-amber-300 tracking-wider block">
                  Official IEPF Form Guide • {activeForm.code}
                </span>
                <h3 className="text-base font-black leading-tight text-white">
                  {activeForm.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveForm(null)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4 text-xs text-slate-700 max-h-[75vh] overflow-y-auto">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Governing Rule</span>
                <span className="font-extrabold text-slate-900 text-xs">{activeForm.legalRule}</span>
                <p className="mt-2 text-slate-700 leading-relaxed font-medium">
                  {activeForm.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-amber-50 border border-amber-200">
                <div>
                  <span className="text-[10px] uppercase font-black text-amber-900 block">Signing Authority</span>
                  <span className="font-bold text-slate-900 text-xs">{activeForm.whoSigns}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-black text-amber-900 block">Stamp / Notary Value</span>
                  <span className="font-bold text-slate-900 text-xs">{activeForm.stampDuty}</span>
                </div>
              </div>

              <div>
                <div className="font-black text-slate-900 uppercase text-xs mb-2 flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4 text-red-600" />
                  <span>Mandatory Enclosures & Annexures:</span>
                </div>
                <ul className="space-y-1.5 pl-2">
                  {activeForm.mandatoryAttachments.map((att, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 shrink-0" />
                      <span>{att}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => {
                    handleWhatsApp(`Hello Gopal Singh Parihar Sir, I need assistance with preparing and filing ${activeForm.code}: ${activeForm.title}. Please guide me.`);
                    setActiveForm(null);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition cursor-pointer hover:scale-102"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  <span>File {activeForm.code} With Us</span>
                </button>

                <a
                  href="https://www.iepf.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-4 rounded-xl bg-[#0A2240] hover:bg-[#061528] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <span>MCA Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 4: INTERACTIVE DOCUMENT GUIDELINES & PITFALLS
         ======================================================== */}
      {activeDoc && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="relative max-w-lg w-full bg-white rounded-3xl border-2 border-amber-500 overflow-hidden shadow-2xl animate-fadeIn">
            {/* Header */}
            <div className="bg-[#C27803] text-white p-5 flex items-start justify-between border-b-2 border-amber-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-amber-100 tracking-wider block">
                    Document Checklist & Guidelines
                  </span>
                  <h3 className="text-base font-black leading-tight text-white">
                    {activeDoc.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setActiveDoc(null)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4 text-xs text-slate-700">
              <p className="text-slate-800 text-sm font-medium leading-relaxed">
                {activeDoc.description}
              </p>

              <div>
                <span className="font-black text-rose-700 uppercase text-xs mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Common Issues & Rejection Causes:</span>
                </span>
                <ul className="space-y-1.5 pl-2 mt-1">
                  {activeDoc.commonIssues.map((issue, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0" />
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950">
                <span className="font-black block text-[11px] mb-0.5">How Gopal Singh Parihar Solves This:</span>
                <p className="leading-relaxed">{activeDoc.solution}</p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    handleWhatsApp(`Hello Gopal Singh Parihar Sir, I have a query regarding my document: ${activeDoc.title}. Please guide me.`);
                    setActiveDoc(null);
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition cursor-pointer hover:scale-102"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  <span>Ask Expert About This Document</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 5: TRUST PILLARS & CREDENTIALS PLEDGE
         ======================================================== */}
      {activePillar && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="relative max-w-lg w-full bg-white rounded-3xl border-2 border-slate-700 overflow-hidden shadow-2xl animate-fadeIn">
            {/* Header */}
            <div className={`${activePillar.color} text-white p-5 flex items-start justify-between border-b-2 border-amber-400`}>
              <div>
                <span className="text-[10px] font-black uppercase text-amber-300 tracking-wider block">
                  Trust Pillar & Service Standard
                </span>
                <h3 className="text-base font-black leading-tight text-white">
                  {activePillar.title}
                </h3>
              </div>
              <button
                onClick={() => setActivePillar(null)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4 text-xs text-slate-700">
              <p className="text-slate-800 text-sm font-semibold leading-relaxed">
                {activePillar.details}
              </p>

              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950">
                <span className="font-black block text-[11px] uppercase mb-1">
                  Our Official Stockholding Associate Pledge:
                </span>
                <p className="leading-relaxed font-medium">
                  {activePillar.pledge}
                </p>
              </div>

              <div className="flex items-center gap-2 text-slate-600 text-[11px] font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Operating from Kanpur, Uttar Pradesh • Servicing Clients Pan-India</span>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => {
                    handleCall();
                    setActivePillar(null);
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call Gopal Singh Parihar</span>
                </button>
                <button
                  onClick={() => {
                    handleWhatsApp();
                    setActivePillar(null);
                  }}
                  className="py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 6: HIGH-RES QR CODE & CONTACT VCARD CARD
         ======================================================== */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="relative max-w-md w-full bg-white rounded-3xl border-2 border-amber-400 overflow-hidden shadow-2xl animate-fadeIn">
            {/* Header */}
            <div className="bg-[#041122] text-white p-5 flex items-center justify-between border-b-2 border-amber-400">
              <div className="flex items-center gap-2.5">
                <QrCode className="w-5 h-5 text-amber-400" />
                <div>
                  <span className="text-[10px] font-black uppercase text-amber-300 block">Digital Contact Card</span>
                  <h3 className="text-sm font-black text-white">Scan to Connect with Gopal Singh Parihar</h3>
                </div>
              </div>
              <button
                onClick={() => setShowQrModal(false)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 text-center space-y-4 text-xs">
              {/* High-res generated QR code simulation */}
              <div className="w-52 h-52 mx-auto p-3 bg-white border-2 border-slate-300 rounded-2xl shadow-inner flex flex-col items-center justify-center relative">
                <svg viewBox="0 0 100 100" className="w-full h-full text-slate-950" fill="currentColor">
                  {/* Top-left position marker */}
                  <rect x="5" y="5" width="26" height="26" rx="3" fill="#0A2240" />
                  <rect x="8" y="8" width="20" height="20" rx="2" fill="#FFFFFF" />
                  <rect x="12" y="12" width="12" height="12" rx="1" fill="#0A2240" />

                  {/* Top-right position marker */}
                  <rect x="69" y="5" width="26" height="26" rx="3" fill="#0A2240" />
                  <rect x="72" y="8" width="20" height="20" rx="2" fill="#FFFFFF" />
                  <rect x="76" y="12" width="12" height="12" rx="1" fill="#0A2240" />

                  {/* Bottom-left position marker */}
                  <rect x="5" y="69" width="26" height="26" rx="3" fill="#0A2240" />
                  <rect x="8" y="72" width="20" height="20" rx="2" fill="#FFFFFF" />
                  <rect x="12" y="76" width="12" height="12" rx="1" fill="#0A2240" />

                  {/* Center authentic data bits */}
                  <rect x="36" y="8" width="5" height="5" fill="#0A2240" />
                  <rect x="46" y="8" width="5" height="5" fill="#0A2240" />
                  <rect x="56" y="8" width="5" height="5" fill="#0A2240" />
                  <rect x="36" y="18" width="8" height="5" fill="#0A2240" />
                  <rect x="48" y="18" width="5" height="8" fill="#0A2240" />
                  <rect x="58" y="18" width="6" height="5" fill="#0A2240" />

                  <rect x="8" y="36" width="5" height="8" fill="#0A2240" />
                  <rect x="18" y="36" width="8" height="5" fill="#0A2240" />
                  <rect x="28" y="36" width="5" height="5" fill="#0A2240" />

                  {/* Center Logo Shield */}
                  <circle cx="50" cy="50" r="14" fill="#C5A059" />
                  <circle cx="50" cy="50" r="11" fill="#0A2240" />
                  <text x="50" y="54" fill="#FFC107" fontSize="10" fontWeight="900" textAnchor="middle">₹</text>

                  {/* Bottom data bits */}
                  <rect x="36" y="72" width="8" height="5" fill="#0A2240" />
                  <rect x="48" y="72" width="6" height="8" fill="#0A2240" />
                  <rect x="58" y="72" width="5" height="5" fill="#0A2240" />
                  <rect x="72" y="36" width="5" height="8" fill="#0A2240" />
                  <rect x="82" y="36" width="8" height="5" fill="#0A2240" />
                  <rect x="72" y="48" width="8" height="5" fill="#0A2240" />
                  <rect x="85" y="48" width="5" height="8" fill="#0A2240" />
                  <rect x="72" y="60" width="5" height="5" fill="#0A2240" />
                  <rect x="80" y="60" width="8" height="5" fill="#0A2240" />
                  <rect x="36" y="84" width="5" height="8" fill="#0A2240" />
                  <rect x="46" y="84" width="8" height="5" fill="#0A2240" />
                  <rect x="60" y="84" width="8" height="5" fill="#0A2240" />
                  <rect x="72" y="72" width="6" height="6" fill="#0A2240" />
                  <rect x="84" y="72" width="6" height="6" fill="#0A2240" />
                  <rect x="72" y="84" width="6" height="6" fill="#0A2240" />
                  <rect x="84" y="84" width="6" height="6" fill="#0A2240" />
                </svg>
              </div>

              <div className="space-y-1">
                <div className="font-black text-slate-900 text-sm">Gopal Singh Parihar</div>
                <div className="text-[11px] font-bold text-slate-600">
                  IEPF Recovery Expert & Business Associate of Stockholding
                </div>
                <div className="text-xs font-mono font-black text-blue-700">
                  {config.contactNumber}
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={downloadVCard}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition cursor-pointer hover:scale-102"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Save Contact to Phone (.vCard)</span>
                </button>

                <button
                  onClick={() => {
                    handleWhatsApp();
                    setShowQrModal(false);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition cursor-pointer hover:scale-102"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  <span>Open WhatsApp Direct Chat</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 7: CASE SUBMISSION SUCCESS CELEBRATION MODAL
         ======================================================== */}
      {submissionSuccess && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="relative max-w-md w-full bg-white rounded-3xl border-2 border-emerald-500 overflow-hidden shadow-2xl animate-fadeIn">
            {/* Header */}
            <div className="bg-[#0F5132] text-white p-6 text-center border-b-2 border-emerald-400">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-400/20 border-2 border-emerald-300 flex items-center justify-center text-emerald-300 mb-2">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black text-white">Case Inquiry Registered!</h3>
              <p className="text-xs text-emerald-200 mt-1">
                Your details have been logged in our recovery system.
              </p>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4 text-xs text-slate-700">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Official Case Ref</span>
                  <span className="font-mono font-black text-blue-700 text-sm">
                    {submissionSuccess.id}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Claimant</span>
                  <span className="font-bold text-slate-900">{submissionSuccess.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Contact Number</span>
                  <span className="font-mono font-bold text-slate-900">{submissionSuccess.phone}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Service Category</span>
                  <span className="font-bold text-slate-900 text-right truncate max-w-[200px]">
                    {submissionSuccess.service}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-center">
                <span className="font-extrabold block text-xs mb-0.5">Next Recommended Step:</span>
                <span>Send this case draft to Gopal Singh Parihar on WhatsApp for priority verification.</span>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    const msg = `Hello Gopal Singh Parihar Sir, I registered case Ref ${submissionSuccess.id}:
• Claimant: ${submissionSuccess.name}
• Phone: ${submissionSuccess.phone}
• Company: ${submissionSuccess.company || 'To be discussed'}
• Service: ${submissionSuccess.service}
Please advise the procedural requirements.`;
                    handleWhatsApp(msg);
                    setSubmissionSuccess(null);
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition cursor-pointer hover:scale-102"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  <span>Send Case Details on WhatsApp</span>
                </button>

                <button
                  onClick={() => setSubmissionSuccess(null)}
                  className="w-full py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider transition cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 8: VIEW ORIGINAL FULL-SIZE FLYER/BROCHURE
         ======================================================== */}
      {showPosterModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl border border-amber-400/50 overflow-hidden shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between p-4 bg-slate-950 border-b border-slate-800 text-white">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span className="font-bold text-sm">Gopal Singh Parihar - Official Advisory Brochure</span>
              </div>
              <button
                onClick={() => setShowPosterModal(false)}
                className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 bg-slate-950 flex flex-col items-center">
              <img
                src="/assets/aistudio/IMG-20261028-WA0000_5ee6995d.jpg"
                alt="Gopal Singh Parihar - Official IEPF Recovery Expert Brochure"
                className="max-h-[75vh] w-auto rounded-xl shadow-2xl border border-slate-700 object-contain"
              />
              
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300">
                <a
                  href={`tel:${config.contactNumber.replace(/\s+/g, '')}`}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call {config.contactNumber}</span>
                </a>
                <button
                  onClick={() => handleWhatsApp()}
                  className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 font-black flex items-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  <span>WhatsApp Gopal Singh Parihar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
