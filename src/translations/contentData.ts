import { Language } from './translations';

export interface StepDetail {
  number: number;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  requiredDocuments: string[];
  proceduralNotes: string;
  ctaText: string;
}

export interface ServiceDetail {
  id: string;
  title: string;
  category: string;
  description: string;
  timeline: string;
  mandatoryDocs: string[];
  howWeHelp: string;
}

export interface FormDetail {
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

export interface DocDetail {
  title: string;
  iconName: string;
  description: string;
  commonIssues: string[];
  solution: string;
}

export interface PillarDetail {
  title: string;
  subtitle: string;
  color: string;
  iconName: string;
  details: string;
  pledge: string;
}

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

// -------------------------------------------------------------
// 1. STEP DETAILS (6 PROCESS STEPS)
// -------------------------------------------------------------
export const getStepDetails = (lang: Language): StepDetail[] => {
  if (lang === 'hi') {
    return [
      {
        number: 1,
        title: 'शेयर / डिविडेंड 7 वर्षों तक अनिर्दिष्ट (Unclaimed) रहना',
        subtitle: 'कंपनी अधिनियम, 2013 की धारा 124(5) के तहत वैधानिक अवधि',
        description: 'भारतीय कंपनी कानून के तहत, जब किसी घोषित लाभांश (डिविडेंड) का लगातार 7 वर्षों तक भुगतान या दावा नहीं किया जाता, तो कंपनी अनिवार्य रूप से unpaid डिविडेंड और उससे संबंधित शेयरों को निवेशक शिक्षा और संरक्षण निधि (IEPF) को हस्तांतरित कर देती है।',
        duration: 'लगातार 7 वित्तीय वर्ष',
        requiredDocuments: [
          'फिजिकल शेयर प्रमाण पत्र (या फोलियो विवरण)',
          'डिविडेंड वारंट / काउंटरफॉइल / पुराने बैंक क्रेडिट रिकॉर्ड',
          'कंपनी सूचना पत्र / वार्षिक रिपोर्ट में नाम',
        ],
        proceduralNotes: 'पते में बदलाव, पुराने कागजी शेयर खो जाने या मूल शेयरधारक के निधन के कारण कई निवेशक अपने शेयरों की जानकारी भूल जाते हैं।',
        ctaText: 'जांचें कि क्या आपके शेयर IEPF में हैं',
      },
      {
        number: 2,
        title: 'कंपनी द्वारा शेयर और लाभांश IEPF अथॉरिटी को ट्रांसफर करना',
        subtitle: 'NSDL/CDSL के माध्यम से IEPF सस्पेंस खाते में कॉर्पोरेट कार्रवाई',
        description: 'कंपनी फॉर्म IEPF-2 दाखिल करती है और NSDL/CDSL में मेंटेन किए गए IEPF डिमैट खाते में शेयर जमा करती है। नकद लाभांश IEPF प्राधिकरण की निगरानी में सीधे भारत के संचित कोष में क्रेडिट किया जाता है।',
        duration: 'कंपनियों द्वारा वार्षिक अनुपालन चक्र',
        requiredDocuments: [
          'कंपनी का नाम / CIN',
          'शेयरधारक का नाम और फोलियो नंबर',
          'आधिकारिक IEPF-2 स्टेटमेंट सर्च मिलान',
        ],
        proceduralNotes: 'हम एमसीए (MCA) डेटाबेस से आपके सही ट्रांसफर रिकॉर्ड का पता लगाते हैं और आपके नाम पर रखे गए शेयरों और संचित लाभांश की सटीक मात्रा सत्यापित करते हैं।',
        ctaText: 'अपने ट्रांसफर शेयरों की स्थिति जानें',
      },
      {
        number: 3,
        title: 'निवेशक या कानूनी वारिस द्वारा IEPF अथॉरिटी के पास दावा दायर करना',
        subtitle: 'कॉरपोरेट कार्य मंत्रालय (MCA V3) पोर्टल पर ऑनलाइन आवेदन',
        description: 'उचित मालिक या कानूनी उत्तराधिकारी आधिकारिक MCA पोर्टल पर वेब फॉर्म IEPF-5 दाखिल करते हैं। एक यूनिक सर्विस रिक्वेस्ट नंबर (SRN) और भौतिक सत्यापन किट तैयार होती है जिसे 30 दिनों के भीतर कंपनी के नोडल अधिकारी को भेजना होता है।',
        duration: 'तैयारी और दाखिल करने में 3 से 7 कार्य दिवस',
        requiredDocuments: [
          'फॉर्म IEPF-5 SRN पावती रसीद',
          'फॉर्म IEPF-5A (दावेदार द्वारा घोषणा)',
          'फॉर्म IEPF-5B (गैर-न्यायिक स्टांप पेपर पर क्षतिपूर्ति बांड)',
          'फॉर्म IEPF-5C (मूल शेयर प्रमाण पत्र का समर्पण)',
          'फॉर्म IEPF-5D (कैंसिल्ड चेक के साथ बैंक प्रबंधक सत्यापन)',
          'सक्रिय डिमैट खाते की क्लाइंट मास्टर लिस्ट (CML)',
        ],
        proceduralNotes: 'ऑनलाइन फॉर्म या दस्तावेजों में किसी भी प्रकार की छोटी सी त्रुटि दावे को अस्वीकार कर देती है। हम त्रुटिहीन फाइलिंग सुनिश्चित करते हैं।',
        ctaText: 'हमारे साथ फॉर्म IEPF-5 फाइल करें',
      },
      {
        number: 4,
        title: 'IEPF अथॉरिटी और कंपनी द्वारा दस्तावेजों का सत्यापन',
        subtitle: 'कंपनी के नोडल अधिकारी और रजिस्ट्रार (RTA) द्वारा गहन जांच',
        description: 'भौतिक दस्तावेज कंपनी के आरटीए (जैसे KFintech, Link Intime, Bigshare) को भेजे जाते हैं। कंपनी के नोडल अधिकारी हस्ताक्षर, स्वामित्व और डिमैट विवरण की जांच करते हैं, और IEPF अथॉरिटी को एक ई-सत्यापन रिपोर्ट (e-Verification Report) अपलोड करते हैं।',
        duration: '30 से 60 दिनों की वैधानिक सत्यापन अवधि',
        requiredDocuments: [
          'स्व-सत्यापित पैन और आधार कार्ड की प्रतियां',
          'मूल शेयर प्रमाण पत्र या फॉर्म ISR-4 (यदि डुप्लीकेट हो)',
          'उत्तराधिकार प्रमाण पत्र / कानूनी वारिस प्रमाण पत्र (यदि मूल धारक दिवंगत हैं)',
          'बैंक प्रबंधक द्वारा फॉर्म ISR-2 में हस्ताक्षर सत्यापन',
        ],
        proceduralNotes: 'हम भारत भर के आरटीए के साथ लगातार संपर्क बनाए रखते हैं ताकि सत्यापन रिपोर्ट बिना किसी देरी के अपलोड हो सके।',
        ctaText: 'अपनी सत्यापन किट ट्रैक करें',
      },
      {
        number: 5,
        title: 'IEPF अथॉरिटी द्वारा दावा स्वीकृत होना',
        subtitle: 'एमसीए आईईपीएफ अथॉरिटी द्वारा जारी स्वीकृति आदेश (Sanction Order)',
        description: 'आईईपीएफ प्राधिकरण कंपनी की ई-सत्यापन रिपोर्ट और सहायक दस्तावेजों की जांच करता है। पूर्ण सत्यापन होने पर स्वीकृति आदेश (Sanction Order) जारी किया जाता है। किसी मामूली विसंगति पर री-सबमिशन नोटिस दिया जाता है (जिसका उत्तर 15 दिनों में देना अनिवार्य है)।',
        duration: 'ई-सत्यापन रिपोर्ट के बाद 60 से 90 दिन',
        requiredDocuments: [
          'SRN ट्रैकिंग स्टेटस रिपोर्ट',
          'री-सबमिशन प्रत्युत्तर पत्र (यदि कोई आपत्ति उठाई गई हो)',
          'पूरक शपथ पत्र या स्पष्टीकरण',
        ],
        proceduralNotes: 'गोपाल सिंह परिहार दावे को खारिज होने से बचाने के लिए अधिकारियों के साथ सीधे सभी री-सबमिशन नोटिस का समाधान करते हैं।',
        ctaText: 'लंबित स्वीकृति का समाधान करें',
      },
      {
        number: 6,
        title: 'दावेदार के डीमैट खाते में शेयर और बैंक में डिविडेंड की वापसी',
        subtitle: 'सीधे डिमैट ट्रांसफर + PFMS के जरिए बैंक खाते में लाभांश क्रेडिट',
        description: 'आईईपीएफ अथॉरिटी NSDL / CDSL को बरामद किए गए शेयरों को सीधे दावेदार के सक्रिय डिमैट खाते में स्थानांतरित करने का निर्देश देती है। संचित नकद लाभांश PFMS के माध्यम से सीधे आपके बैंक खाते में क्रेडिट कर दिया जाता है।',
        duration: 'स्वीकृति आदेश से 10 से 15 दिन',
        requiredDocuments: [
          'सक्रिय डिमैट खाता (NSDL / CDSL)',
          'पूर्व-सत्यापित बैंक खाता (IFSC मिलान के साथ)',
          'IEPF से जारी स्वीकृति सलाह पत्र',
        ],
        proceduralNotes: 'आपका पूर्ण कानूनी स्वामित्व बहाल हो जाता है, जिससे आप स्वतंत्र रूप से शेयर बेच सकते हैं, रख सकते हैं या हस्तांतरित कर सकते हैं।',
        ctaText: 'आज ही अपने शेयरों का दावा करें',
      },
    ];
  }

  // English fallback
  return [
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
};

// -------------------------------------------------------------
// 2. SERVICES LIST (8 SPECIALIZED SERVICES)
// -------------------------------------------------------------
export const getServicesList = (lang: Language): ServiceDetail[] => {
  if (lang === 'hi') {
    return [
      {
        id: 'death-transmission',
        title: 'मूल शेयरधारक की मृत्यु के बाद शेयरों का हस्तांतरण (Transmission)',
        category: 'उत्तराधिकार एवं कानूनी वारिस दावा',
        description: 'दिवंगत माता-पिता, पति/पत्नी या रिश्तेदार से जीवित वारिसों, संयुक्त धारकों या नामांकित व्यक्तियों को शेयरों का पूर्ण कानूनी हस्तांतरण। हम IEPF ट्रांसफर से पहले और बाद दोनों मामलों को संभालते हैं।',
        timeline: '60 से 120 दिन',
        mandatoryDocs: [
          'मूल मृत्यु प्रमाण पत्र (नगर निगम / सक्षम प्राधिकारी द्वारा जारी)',
          'कानूनी वारिस प्रमाण पत्र / उत्तराधिकार प्रमाण पत्र (Succession) / पंजीकृत वसीयत',
          'अन्य सभी कानूनी उत्तराधिकारियों से अनापत्ति प्रमाण पत्र (NOC) एवं शपथ पत्र',
          'दावेदार की KYC (पैन, आधार, डिमैट CML, कैंसिल्ड चेक)',
        ],
        howWeHelp: 'हम सेबी (SEBI) और आरटीए परिपत्रों के अनुसार सभी स्टांप पेपर हलफनामे, क्षतिपूर्ति बांड और एनओसी तैयार करते हैं।',
      },
      {
        id: 'physical-transfer',
        title: 'फिजिकल (कागजी) शेयरों का डीमैट में ट्रांसफर',
        category: 'डीमैट रूपांतरण एवं नाम सुधार',
        description: 'सेबी अब कागजी शेयरों के सीधे व्यापार की अनुमति नहीं देता। सभी कागजी शेयर प्रमाण पत्रों को फॉर्म ISR-1, ISR-2 और SH-13 के जरिए अनिवार्य रूप से डिजिटल डीमैट रूप में बदलना होता है।',
        timeline: '45 से 90 दिन',
        mandatoryDocs: [
          'मूल फिजिकल शेयर प्रमाण पत्र',
          'फॉर्म ISR-1 (पैन, बैंक, नामांकन की KYC पंजीकरण)',
          'फॉर्म ISR-2 (बैंक प्रबंधक से हस्ताक्षर सत्यापन)',
          'फॉर्म SH-13 (नामांकन फॉर्म)',
          'सक्रिय डिमैट खाते की मुहरयुक्त क्लाइंट मास्टर लिस्ट (CML)',
        ],
        howWeHelp: 'हम संपूर्ण डीमैट अनुरोध किट (DRF) तैयार करते हैं और आपके डीपी एवं कंपनी आरटीए के साथ समन्वय करते हैं।',
      },
      {
        id: 'lost-shares',
        title: 'खोए हुए / नष्ट हुए शेयरों की कानूनी वसूली',
        category: 'लापता एवं अनुपलब्ध प्रतिभूतियां',
        description: 'मकान बदलने, आग, दीमक, पानी से खराब होने या बैंक लॉकर में भूल जाने के कारण खोए हुए शेयर प्रमाण पत्रों की पूरी कानूनी बहाली प्रक्रिया।',
        timeline: '90 से 120 दिन',
        mandatoryDocs: [
          'खोए हुए शेयरों के संबंध में पुलिस शिकायत / FIR / गैर-संज्ञेय रिपोर्ट (NCR)',
          'समाचार पत्रों में सार्वजनिक नोटिस (अंग्रेजी व क्षेत्रीय भाषा में यदि मूल्य ₹5 लाख से अधिक हो)',
          'गैर-न्यायिक स्टांप पेपर पर नुकसान का शपथ पत्र (Affidavit of Loss)',
          'फॉर्म ISR-4 (डुप्लीकेट / पुष्टि पत्र जारी करने हेतु आवेदन)',
        ],
        howWeHelp: 'हम आवश्यक समाचार पत्र विज्ञापन प्रकाशित करवाते हैं और कंपनी के लिए कानूनी रूप से सुरक्षित हलफनामे तैयार करते हैं।',
      },
      {
        id: 'duplicate-shares',
        title: 'डुप्लीकेट शेयर (Letter of Confirmation) जारी करवाना',
        category: 'सेबी डुप्लीकेट प्रक्रिया',
        description: 'सेबी के नए नियमों के तहत कंपनियां अब कागजी डुप्लीकेट प्रमाण पत्र जारी नहीं करतीं; इसके बदले वे औपचारिक पुष्टि पत्र (Letter of Confirmation - LOC) जारी करती हैं जो सीधे डिमैट में जमा होता है।',
        timeline: '60 से 90 दिन',
        mandatoryDocs: [
          'पुष्टि पत्र हेतु फॉर्म ISR-4',
          'दो स्वतंत्र गारंटरों (Sureties) के साथ स्टांप पेपर पर क्षतिपूर्ति बांड',
          'दोनों गारंटरों की पहचान और पते का प्रमाण',
          'सक्रिय डिमैट खाते की क्लाइंट मास्टर लिस्ट',
        ],
        howWeHelp: 'हम गारंटरों के दस्तावेज तैयार करने में सहायता करते हैं और निर्धारित समय सीमा के भीतर पुष्टि पत्र प्राप्त करवाते हैं।',
      },
      {
        id: 'iepf-shares',
        title: 'आईईपीएफ में फंसे अनक्लेम्ड शेयरों की कानूनी वसूली',
        category: 'IEPF-5 रिकवरी प्रक्रिया',
        description: 'कंपनी अधिनियम की धारा 124(6) के तहत निवेशक शिक्षा और संरक्षण निधि (IEPF) में स्थानांतरित किए गए शेयरों की संपूर्ण एंड-टू-एंड वसूली।',
        timeline: '3 से 6 महीने',
        mandatoryDocs: [
          'MCA V3 पोर्टल पर फॉर्म IEPF-5 की ऑनलाइन फाइलिंग',
          'फॉर्म IEPF-5A (घोषणा), 5B (क्षतिपूर्ति), 5C (समर्पण), 5D (बैंक सत्यापन)',
          'डीपी मुहर और हस्ताक्षर के साथ डिमैट CML',
          'दावेदार के नाम छपे मूल कैंसिल्ड चेक',
        ],
        howWeHelp: 'स्टॉकहोल्डिंग के अधिकृत बिजनेस एसोसिएट के रूप में हम सीधे आरटीए नोडल अधिकारियों और नई दिल्ली स्थित IEPF अधिकारियों से फॉलो-अप करते हैं।',
      },
      {
        id: 'iepf-dividend',
        title: 'आईईपीएफ में जमा पुराने लाभांश (Dividend) की वसूली',
        category: 'संचित लाभांश एवं ब्याज',
        description: '7 या अधिक वर्षों से बिना भुनाए पड़े लाभांश वारंटों की पूरी राशि, जो सरकारी संचित निधि में जमा हो गई है, उस पर संचित लाभांश सहित प्रत्यक्ष बैंक खाते में वापसी।',
        timeline: '60 से 90 दिन',
        mandatoryDocs: [
          'दावेदार के बैंक खाते का IFSC व MICR सत्यापन',
          'पुराने अनक्लेम्ड डिविडेंड वारंट / बैंक पासबुक प्रविष्टियां (यदि उपलब्ध हों)',
          'पीएफएमएस (PFMS) इलेक्ट्रॉनिक ट्रांसफर हेतु फॉर्म IEPF-5D',
        ],
        howWeHelp: 'हम कंपनी के पुराने रिकॉर्ड से सभी वर्षों के अनक्लेम्ड डिविडेंड का मिलान करते हैं और PFMS के जरिए बैंक क्रेडिट सुनिश्चित करते हैं।',
      },
      {
        id: 'rta-followup',
        title: 'कंपनी के आरटीए (RTA) और नोडल अधिकारी से निरंतर फॉलो-अप',
        category: 'प्रक्रियात्मक ट्रैकिंग',
        description: 'KFintech, Link Intime, Datamatics, MCS, Bigshare जैसे प्रमुख आरटीए और कंपनी नोडल अधिकारियों के पास लंबित सत्यापन किट और आपत्तियों का तीव्र समाधान।',
        timeline: 'चल रही निरंतर सेवा',
        mandatoryDocs: [
          'पूर्व में जमा की गई स्पीड पोस्ट ट्रैकिंग रसीदें',
          'आरटीए पावती या अस्वीकृति पत्र (यदि कोई हो)',
          'कंपनी फोलियो संख्या और संदर्भ आईडी',
        ],
        howWeHelp: 'हम सीधे आरटीए शाखाओं और मुंबई/हैदराबाद/कोलकाता स्थित प्रधान कार्यालयों में फॉलो-अप कर ई-सत्यापन रिपोर्ट अपलोड करवाते हैं।',
      },
      {
        id: 'share-transfer',
        title: 'शेयरों के कानूनी ट्रांसफर व स्वामित्व बहाली',
        category: 'स्वामित्व एवं नाम सुधार',
        description: 'हस्ताक्षर बेमेल (Signature Mismatch), नाम में वर्तनी अंतर, विवाह उपरांत उपनाम परिवर्तन, या संयुक्त धारक हटाने से संबंधित सभी जटिल शेयर मामलों का समाधान।',
        timeline: '45 से 75 दिन',
        mandatoryDocs: [
          'हस्ताक्षर सत्यापन हेतु बैंक प्रबंधक द्वारा प्रमाणित फॉर्म ISR-2',
          'नाम में परिवर्तन के लिए राजपत्र अधिसूचना (Gazette Notification) या विवाह प्रमाण पत्र',
          'नवीनतम पैन एवं आधार कार्ड की स्व-सत्यापित प्रति',
        ],
        howWeHelp: 'हम बैंक प्रबंधकों से उचित प्रारूप में हस्ताक्षर प्रमाणीकरण प्राप्त करने और कंपनी रिकॉर्ड में नाम दुरुस्त कराने में पूर्ण सहायता करते हैं।',
      },
    ];
  }

  // English fallback
  return [
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
      category: 'Dividend Recovery',
      description: 'Recovery of all accumulated past dividend cheques/warrants that expired or were transferred to the government fund, credited directly to your bank account via PFMS.',
      timeline: '60 - 90 Days',
      mandatoryDocs: [
        'Claimant bank account details with IFSC & MICR',
        'Historical dividend counterfoils or past passbook credit entries (if available)',
        'Form IEPF-5D for PFMS release',
      ],
      howWeHelp: 'We reconcile all past unpaid dividend years from company registers to maximize your monetary claim.',
    },
    {
      id: 'rta-followup',
      title: 'Following up with Register and Transfer Agent (RTA)',
      category: 'Procedural Expediting',
      description: 'Speedy liaison and tracking with major RTAs (KFintech, Link Intime, Datamatics, MCS, etc.) to resolve objections and expedite e-verification reports.',
      timeline: 'Ongoing Continuous',
      mandatoryDocs: [
        'Speed Post tracking records of verification packet',
        'RTA acknowledgement or objection letters (if any)',
        'Company folio numbers & query references',
      ],
      howWeHelp: 'Direct follow-up through Stockholding regional network and RTA head offices in Mumbai/Hyderabad.',
    },
    {
      id: 'share-transfer',
      title: 'For transfer of shares',
      category: 'Legal Title & Transmission',
      description: 'Resolving severe signature mismatches, spelling errors in name, joint holder deletion, or marital surname change to restore legal title.',
      timeline: '45 - 75 Days',
      mandatoryDocs: [
        'Form ISR-2 signature attestation from nationalized bank branch manager',
        'Name change gazette notification or marriage certificate (if applicable)',
        'Self-attested updated PAN & Aadhaar',
      ],
      howWeHelp: 'We coordinate with branch managers to secure compliant signature attestations without repeated rejections.',
    },
  ];
};

// -------------------------------------------------------------
// 3. IEPF FORMS LIST (5 FORMS)
// -------------------------------------------------------------
export const getFormsList = (lang: Language): FormDetail[] => {
  if (lang === 'hi') {
    return [
      {
        code: 'FORM IEPF-5',
        title: 'शेयर, लाभांश और अन्य दावों का आधिकारिक आवेदन फॉर्म',
        legalRule: 'कंपनी (IEPF अथॉरिटी लेखा, लेखापरीक्षा, अंतरण एवं प्रतिदाय) नियम, 2016 के नियम 7(1)',
        bgGrad: 'bg-[#1E3A8A]',
        badgeColor: 'text-blue-200',
        description: 'अनक्लेम्ड शेयर, संचित लाभांश, परिपक्व जमा और डिबेंचर की वापसी के लिए कॉरपोरेट कार्य मंत्रालय (MCA V3) पोर्टल पर दाखिल किया जाने वाला प्राथमिक वैधानिक वेब फॉर्म।',
        whoSigns: 'दावेदार (निवेशक या कानूनी उत्तराधिकारी) द्वारा डिजिटल हस्ताक्षर (DSC) या OTP प्रमाणीकरण',
        stampDuty: 'लागू नहीं (सरकारी MCA V3 वेब फाइलिंग)',
        mandatoryAttachments: [
          'दावेदार के स्व-सत्यापित पैन और आधार कार्ड की प्रति',
          'सक्रिय डिमैट खाते की क्लाइंट मास्टर लिस्ट (CML)',
          'बैंक पासबुक एवं मूल कैंसिल्ड चेक',
          'शेयर प्रमाण पत्र / फोलियो प्रमाण',
        ],
      },
      {
        code: 'FORM IEPF-5A',
        title: 'दावेदार / कानूनी वारिस द्वारा सत्यनिष्ठा घोषणा पत्र',
        legalRule: 'IEPF दावा नियम 7(2)(a) - दावेदार की पात्रता घोषणा',
        bgGrad: 'bg-[#14532D]',
        badgeColor: 'text-emerald-200',
        description: 'दावेदार द्वारा एक अनिवार्य सत्यनिष्ठा घोषणा कि वे कंपनी के शेयरों और लाभांश के वास्तविक व वैध मालिक हैं और उन्होंने यह दावा पहले कभी वापस नहीं लिया है।',
        whoSigns: 'दावेदार (निवेशक या कानूनी वारिस) के मूल हस्ताक्षर',
        stampDuty: 'सादे A4 पेपर पर मुद्रित (हस्ताक्षरित)',
        mandatoryAttachments: [
          'दावेदार का मूल हस्ताक्षर (कंपनी रिकॉर्ड / ISR-2 से मेल खाता हुआ)',
          'पासपोर्ट साइज फोटो चिपकाई और स्व-हस्ताक्षरित',
          'दावेदार के पते का प्रमाण (आधार / मतदाता पहचान पत्र / पासपोर्ट)',
        ],
      },
      {
        code: 'FORM IEPF-5B',
        title: 'दावेदार द्वारा गैर-न्यायिक स्टांप पेपर पर क्षतिपूर्ति बांड (Indemnity Bond)',
        legalRule: 'कंपनी नियम 7(2)(b) - वित्तीय देयता क्षतिपूर्ति बांड',
        bgGrad: 'bg-[#7C2D12]',
        badgeColor: 'text-amber-200',
        description: 'एक कानूनी रूप से बाध्यकारी क्षतिपूर्ति बांड जो कंपनी और भारत सरकार को किसी भी भविष्य के विवाद, दोहरे दावे या गलत दावेदार के भुगतान के वित्तीय जोखिम से सुरक्षित करता है।',
        whoSigns: 'दावेदार एवं दो स्वतंत्र भारतीय नागरिक गवाह (Sureties/Witnesses)',
        stampDuty: 'राज्य के अनुसार ₹100 से ₹500 का गैर-न्यायिक स्टांप पेपर (नोटरी द्वारा सत्यापित)',
        mandatoryAttachments: [
          'नोटरी पब्लिक या प्रथम श्रेणी मजिस्ट्रेट द्वारा विधिवत सत्यापित व मुहरबंद',
          'दोनों गवाहों के पैन कार्ड और आधार कार्ड की स्व-सत्यापित प्रतियां',
          'स्टांप पेपर की तारीख और दावेदार के नाम का मिलान',
        ],
      },
      {
        code: 'FORM IEPF-5C',
        title: 'मूल शेयर प्रमाण पत्रों के समर्पण (Surrender) का प्रपत्र',
        legalRule: 'IEPF दावा नियम 7(2)(c) - कागजी प्रमाण पत्र रद्दकरण',
        bgGrad: 'bg-[#581C87]',
        badgeColor: 'text-purple-200',
        description: 'दावेदार द्वारा भौतिक शेयर प्रमाण पत्रों को IEPF अथॉरिटी और कंपनी के सुपुर्द करने का आधिकारिक प्रपत्र, ताकि उन्हें रद्द कर सीधे नए शेयर डिमैट में क्रेडिट किए जा सकें।',
        whoSigns: 'पंजीकृत शेयरधारक / हस्तांतरिती / कानूनी दावेदार',
        stampDuty: '₹1 का रेवेन्यू स्टांप चिपकाकर उस पर क्रॉस-हस्ताक्षर',
        mandatoryAttachments: [
          'रेवेन्यू स्टांप और क्रॉस-हस्ताक्षर के साथ मूल फिजिकल शेयर प्रमाण पत्र',
          'फोलियो संख्या और डिस्टिंक्टिव (Distinctive) नंबरों की सूची',
          'कंपनी के नोडल अधिकारी को प्रेषण पत्र',
        ],
      },
      {
        code: 'FORM IEPF-5D',
        title: 'बैंक खाता विवरण एवं कैंसिल्ड चेक का प्रबंधक सत्यापन',
        legalRule: 'PFMS इलेक्ट्रॉनिक भुगतान सत्यापन मानक',
        bgGrad: 'bg-[#0E7490]',
        badgeColor: 'text-cyan-200',
        description: 'अनिवार्य बैंक सत्यापन जो यह प्रमाणित करता है कि बैंक खाता वास्तव में दावेदार का ही है, जिससे सार्वजनिक वित्तीय प्रबंधन प्रणाली (PFMS) सीधे लाभांश क्रेडिट कर सके।',
        whoSigns: 'दावेदार एवं बैंक शाखा प्रबंधक की अधिकृत बैंक मुहर व कर्मचारी कोड के साथ',
        stampDuty: 'लागू नहीं; बैंक शाखा प्रबंधक का प्रमाणीकरण आवश्यक',
        mandatoryAttachments: [
          'दावेदार के नाम छपे मूल कैंसिल्ड चेक',
          'स्व-सत्यापित बैंक पासबुक या 3 महीने का बैंक स्टेटमेंट (IFSC व MICR सहित)',
          'बैंक कर्मचारी कोड और रबर स्टैंप के साथ बैंक सत्यापन पत्र',
        ],
      },
    ];
  }

  // English fallback
  return [
    {
      code: 'FORM IEPF-5',
      title: 'Claim Form for Shares / Dividend / Other Amounts',
      legalRule: 'Rule 7(1) of the IEPF (Accounting, Audit, Transfer and Refund) Rules, 2016',
      bgGrad: 'bg-[#1E3A8A]',
      badgeColor: 'text-blue-200',
      description: 'The primary statutory web form submitted on the Ministry of Corporate Affairs (MCA V3) portal to initiate recovery of shares, dividends, matured deposits, and debentures.',
      whoSigns: 'Claimant (Investor or Legal Heir) via DSC or OTP Authentication',
      stampDuty: 'Not applicable (MCA V3 portal submission)',
      mandatoryAttachments: [
        'Self-attested PAN and Aadhaar of Claimant',
        'Client Master List (CML) of Demat Account',
        'Bank Passbook / Cancelled Cheque Leaf',
        'Share Certificate / Folio Proof',
      ],
    },
    {
      code: 'FORM IEPF-5A',
      title: 'Declaration by Legal Heir / Claimant',
      legalRule: 'IEPF Claim Rule 7(2)(a) - Truth & Title Affidavit',
      bgGrad: 'bg-[#14532D]',
      badgeColor: 'text-emerald-200',
      description: 'A formal declaration executed by the claimant stating under oath that they are the true and lawful beneficial owner of the shares and dividends, and no prior claim was made.',
      whoSigns: 'Original Signature of Claimant',
      stampDuty: 'Printed on Plain A4 Paper (Signed in ink)',
      mandatoryAttachments: [
        'Original ink signature matching bank/company records',
        'Passport size photograph pasted and crossed signed',
        'Proof of identity and address',
      ],
    },
    {
      code: 'FORM IEPF-5B',
      title: 'Indemnity Bond on Non-Judicial Stamp Paper',
      legalRule: 'Companies Rule 7(2)(b) - Financial Liability Indemnity',
      bgGrad: 'bg-[#7C2D12]',
      badgeColor: 'text-amber-200',
      description: 'A legally binding indemnity protecting the company, IEPF Authority, and Govt of India against any duplicate claims, disputes, or liabilities arising from the transfer.',
      whoSigns: 'Claimant and Two Independent Witnesses (Sureties)',
      stampDuty: 'Non-Judicial Stamp Paper (₹100 to ₹500 depending on state, Notarized)',
      mandatoryAttachments: [
        'Duly notarized by a Notary Public or First Class Magistrate',
        'PAN and Aadhaar copies of both independent witnesses',
        'Date of execution matching submission window',
      ],
    },
    {
      code: 'FORM IEPF-5C',
      title: 'Surrender of Original Share Certificate(s)',
      legalRule: 'IEPF Claim Rule 7(2)(c) - Share Paper Defacement',
      bgGrad: 'bg-[#581C87]',
      badgeColor: 'text-purple-200',
      description: 'Surrender slip executed by the claimant formally surrendering original physical share certificates to the IEPF Authority for corporate cancellation upon demat credit.',
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
};

// -------------------------------------------------------------
// 4. DOCUMENTS LIST (5 DOCS)
// -------------------------------------------------------------
export const getDocsList = (lang: Language): DocDetail[] => {
  if (lang === 'hi') {
    return [
      {
        title: 'फिजिकल शेयर प्रमाण पत्र (Physical Share Certificate)',
        iconName: 'FileText',
        description: 'अनिवार्य डीमैटकरण से पहले जारी किए गए कागजी शेयर प्रमाण पत्र। अक्सर पुरानी गोदरेज अलमारी, संदूक या बैंक लॉकरों में मिलते हैं।',
        commonIssues: [
          'प्रमाण पत्र फटे या पुराने हो जाना',
          'कंपनी का नाम बदल जाना (उदा. TISCO से Tata Steel)',
          'फेस वैल्यू विभाजन (Stock Split) या बोनस शेयरों का हिसाब न होना',
        ],
        solution: 'हम कंपनी के ऐतिहासिक कॉर्पोरेट रिकॉर्ड का मिलान करते हैं और फॉर्म ISR-1 व ISR-2 के जरिए सीधे डीमैट रूपांतरण करवाते हैं।',
      },
      {
        title: 'डुप्लीकेट शेयर प्रमाण पत्र (Duplicate Share Certificate)',
        iconName: 'FileCheck2',
        description: 'आवश्यक तब होता है जब मूल कागजी प्रमाण पत्र खो गए हों या आग, बाढ़ या चोरी में नष्ट हो गए हों।',
        commonIssues: [
          'फोलियो संख्या या प्रमाण पत्र संख्या खो जाना',
          'पुलिस में FIR या गैर-संज्ञेय रिपोर्ट दर्ज कराने की औपचारिकताएं',
          'अखबार में सार्वजनिक विज्ञापन की प्रक्रिया',
        ],
        solution: 'हम आरटीए से फोलियो डेटा प्राप्त करते हैं, पुलिस शिकायत ड्राफ्ट करते हैं, लागत प्रभावी समाचार पत्र विज्ञापन करवाते हैं और पुष्टि पत्र (LOC) जारी करवाते हैं।',
      },
      {
        title: 'डिविडेंड वारंट / पुराना चेक (Dividend Warrant)',
        iconName: 'Banknote',
        description: 'पुराने लाभांश चेक जो 90 दिनों की वैधता के बाद बिना भुनाए पड़े रह गए और 7 वर्षों में संचित होकर सरकार को चले गए।',
        commonIssues: [
          'वारंट की वैधता समाप्त होना या डाक से वापस लौटना',
          'पुराना बैंक खाता बंद या बैंकों के विलय के कारण बदल जाना',
          'कंपनी रिकॉर्ड में पते का बेमेल होना',
        ],
        solution: 'हम कंपनी के IEPF रजिस्टर से सभी पुराने वर्षों के लाभांश का मिलान करते हैं और PFMS भुगतान के लिए आपके वर्तमान बैंक खाते को लिंक करते हैं।',
      },
      {
        title: 'कैंसिल्ड चेक (Cancelled Cheque)',
        iconName: 'CheckCircle2',
        description: 'दावेदार के नाम छपे चेक की प्रति, जिसका उपयोग एमसीए और आरटीए द्वारा बैंक खाता स्वामित्व की पुष्टि के लिए किया जाता है।',
        commonIssues: [
          'चेक पर दावेदार का नाम पहले से छपा न होना',
          'संयुक्त खातों में धारकों के नाम का क्रम उल्टा होना',
          'बैंक विलय (उदा. सिंडिकेट बैंक का केनरा बैंक में विलय) के कारण IFSC कोड बदल जाना',
        ],
        solution: 'हम अपडेटेड IFSC कोड और बैंक प्रबंधक मुहर सुनिश्चित करते हैं ताकि PFMS भुगतान अस्वीकृत न हो।',
      },
      {
        title: 'बैंक पासबुक (Bank Passbook)',
        iconName: 'Award',
        description: 'बैंक पासबुक का प्रथम पृष्ठ जिसमें खाता संख्या, IFSC कोड, दावेदार का नाम, पता और बैंक की आधिकारिक मुहर दर्शित हो।',
        commonIssues: [
          'फोटो या बैंक प्रबंधक की मुहर न होना',
          'आधार कार्ड में दर्ज पते से पासबुक का पता अलग होना',
        ],
        solution: 'हम बैंक-स्वीकृत सत्यापन प्रारूप (फॉर्म ISR-2) प्रदान करते हैं जिससे बैंक प्रबंधक से तुरंत सत्यापन प्राप्त हो जाता है।',
      },
    ];
  }

  // English fallback
  return [
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
};

// -------------------------------------------------------------
// 5. PILLARS LIST (5 TRUST PILLARS)
// -------------------------------------------------------------
export const getPillarsList = (lang: Language): PillarDetail[] => {
  if (lang === 'hi') {
    return [
      {
        title: 'सुरक्षित और गोपनीय',
        subtitle: 'आपकी समस्त जानकारी हमेशा सुरक्षित है',
        color: 'bg-[#0A2540]',
        iconName: 'Lock',
        details: 'सभी भौतिक प्रमाण पत्र, केवाईसी दस्तावेज और फोलियो रिकॉर्ड सख्त गोपनीयता और सुरक्षा मानकों के तहत प्रबंधित किए जाते हैं।',
        pledge: 'कोई अनधिकृत दलाल या बिचौलिया नहीं। हम अधिकृत कस्टडी बनाए रखते हैं और भारत सरकार की रजिस्टर्ड स्पीड पोस्ट द्वारा डिस्पैच करते हैं।',
      },
      {
        title: 'विशेषज्ञ मार्गदर्शन',
        subtitle: 'गहन कानूनी ज्ञान एवं प्रमाणित अनुभव',
        color: 'bg-[#0F5132]',
        iconName: 'Award',
        details: 'कंपनी कानून, सेबी परिपत्रों और IEPF अथॉरिटी नियमों में 15+ वर्षों की विशेष दक्षता।',
        pledge: 'स्टॉकहोल्डिंग (केंद्र सरकार की कंपनी) के अधिकृत बिजनेस एसोसिएट के रूप में पूर्ण प्रामाणिक और आधिकारिक प्रक्रिया।',
      },
      {
        title: 'समर्पित सहायता',
        subtitle: 'हर कदम पर वन-टू-वन व्यक्तिगत सहायता',
        color: 'bg-[#7A3E00]',
        iconName: 'HeadphonesIcon',
        details: 'आईआईटी कल्याणपुर, कानपुर स्थित समर्पित परामर्श डेस्क और भारत भर के निवेशकों के लिए फोन व व्हाट्सएप हेल्पलाइन।',
        pledge: 'दावे की तैयारी से लेकर डीमैट में शेयर जमा होने तक व्यक्तिगत समर्पित केस मैनेजर।',
      },
      {
        title: 'समयबद्ध फॉलो-अप',
        subtitle: 'कंपनी एवं आरटीए के साथ नियमित फॉलो-अप',
        color: 'bg-[#4B1E78]',
        iconName: 'Clock',
        details: 'केस किट डिस्पैच से लेकर नोडल अधिकारी द्वारा ई-सत्यापन रिपोर्ट अपलोड करने तक साप्ताहिक ट्रैकिंग।',
        pledge: 'हम किसी भी आपत्ति या री-सबमिशन का समाधान 72 घंटों के भीतर प्राथमिकता पर करते हैं।',
      },
      {
        title: 'परिणाम उन्मुख सेवा',
        subtitle: 'सफल वसूली और कानूनी स्वामित्व पर केंद्रित',
        color: 'bg-[#004B6E]',
        iconName: 'TrendingUp',
        details: 'हमारा लक्ष्य केवल फॉर्म भरना नहीं, बल्कि आपके शेयरों का वास्तविक डीमैट क्रेडिट और डिविडेंड का बैंक क्रेडिट सुनिश्चित करना है।',
        pledge: '100% कानूनी एवं पारदर्शी प्रक्रिया — सभी शेयर सीधे आपके अपने डिमैट खाते में स्थानांतरित होते हैं।',
      },
    ];
  }

  // English fallback
  return [
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
      color: 'bg-[#7A3E00]',
      iconName: 'HeadphonesIcon',
      details: 'Dedicated desk at Arail-82 New Nankari, IIT Kalyanpur, Kanpur and direct phone/WhatsApp assistance nationwide.',
      pledge: 'Direct access to Gopal Singh Parihar from first case audit until your final Demat and bank credits are released.',
    },
    {
      title: 'TIMELY FOLLOW-UP',
      subtitle: 'Regular follow-up with Company & RTA',
      color: 'bg-[#4B1E78]',
      iconName: 'Clock',
      details: 'Proactive tracking from dispatch to Nodal Officer e-Verification report generation and IEPF sanction order.',
      pledge: 'We resolve resubmission requisitions within 72 hours, preventing claim lapses and rejection cycles.',
    },
    {
      title: 'RESULT ORIENTED',
      subtitle: 'Focused on delivering successful outcomes',
      color: 'bg-[#004B6E]',
      iconName: 'TrendingUp',
      details: 'Our mandate is not just submitting paperwork, but ensuring tangible share credits into your Demat account.',
      pledge: '100% legal compliance — all shares are credited directly by depository to the investor’s own Demat account.',
    },
  ];
};

// -------------------------------------------------------------
// 6. CERTIFICATE & DIVIDEND WARRANT EXAMPLES
// -------------------------------------------------------------
export const getCertificateExamples = (lang: Language) => {
  if (lang === 'hi') {
    return {
      certTitle: 'फिजिकल शेयर प्रमाण पत्र (उदाहरण)',
      companyName: 'एबीसी लिमिटेड (ABC LIMITED)',
      capital: 'पूर्ण चुकता इक्विटी शेयर पूंजी',
      certifies: 'यह प्रमाणित किया जाता है कि',
      holder: 'श्री रमेश कुमार (Mr. Ramesh Kumar)',
      isHolder: 'कंपनी के पंजीकृत शेयरधारक हैं',
      sharesCount: 'एक सौ (100) इक्विटी शेयर',
      sharePrice: 'प्रत्येक शेयर का अंकित मूल्य ₹ 10/-',
      director: 'निदेशक (Director)',
      secretary: 'कंपनी सचिव (Company Secretary)',

      warrantTitle: 'डिविडेंड वारंट / चेक (उदाहरण)',
      warrantCompany: 'एक्सवाईजेड लिमिटेड (XYZ LIMITED)',
      warrantHeading: 'डिविडेंड वारंट (DIVIDEND WARRANT)',
      payTo: 'भुगतान करें:',
      payee: 'श्री सुरेश शर्मा (Mr. Suresh Sharma)',
      amountWords: 'रुपये: एक हजार दो सौ रुपये मात्र',
      amountNum: '₹ 1,200/-',
      warrantDate: 'दिनांक: 15/03/2020',
      authSignatory: 'अधिकृत हस्ताक्षरकर्ता (Authorised Signatory)',
    };
  }

  return {
    certTitle: 'PHYSICAL SHARE CERTIFICATE (EXAMPLE)',
    companyName: 'ABC LIMITED',
    capital: 'FULLY PAID-UP EQUITY SHARE CAPITAL',
    certifies: 'This is to Certify that',
    holder: 'Mr. Ramesh Kumar',
    isHolder: 'is the Registered Holder of',
    sharesCount: 'ONE HUNDRED',
    sharePrice: 'Equity Shares of Rs. 10/- each fully paid-up in ABC LIMITED.',
    director: 'Director',
    secretary: 'Company Secretary',

    warrantTitle: 'DIVIDEND WARRANT / CHEQUE (EXAMPLE)',
    warrantCompany: 'XYZ LIMITED',
    warrantHeading: 'DIVIDEND WARRANT',
    payTo: 'Pay',
    payee: 'Mr. Suresh Sharma',
    amountWords: 'Rupees One Thousand Two Hundred Only',
    amountNum: '₹ 1,200/-',
    warrantDate: 'Date: 15/03/2020',
    authSignatory: 'Authorised Signatory',
  };
};

// -------------------------------------------------------------
// 7. FAQS LIST (BILINGUAL)
// -------------------------------------------------------------
export const getFaqsList = (lang: Language): FAQItem[] => {
  if (lang === 'hi') {
    return [
      {
        id: 'faq-1',
        category: 'General',
        question: 'शेयर और लाभांश IEPF में क्यों ट्रांसफर किए जाते हैं?',
        answer: 'कंपनी अधिनियम, 2013 की धारा 124(5) और 124(6) के अनुसार, यदि किसी शेयर पर लगातार 7 वर्षों तक घोषित लाभांश का दावा नहीं किया जाता, तो कंपनी को वे सभी लाभांश और संबंधित शेयर अनिवार्य रूप से निवेशक शिक्षा और संरक्षण निधि (IEPF) प्राधिकरण को ट्रांसफर करने पड़ते हैं।',
      },
      {
        id: 'faq-2',
        category: 'Process',
        question: 'IEPF से शेयर वापस पाने की कानूनी प्रक्रिया क्या है?',
        answer: 'प्रक्रिया में एमसीए पोर्टल (MCA V3) पर फॉर्म IEPF-5 ऑनलाइन भरना, उत्पन्न भौतिक सत्यापन किट (फॉर्म 5A, 5B, 5C, 5D और मूल दस्तावेजों सहित) को कंपनी के नोडल अधिकारी को भेजना, आरटीए द्वारा सत्यापन रिपोर्ट अपलोड कराना और अंत में सीधे आपके डिमैट खाते में शेयर व बैंक में लाभांश प्राप्त करना शामिल है।',
      },
      {
        id: 'faq-3',
        category: 'Process',
        question: 'शेयर वापस मिलने में कुल कितना समय लगता है?',
        answer: 'आम तौर पर संपूर्ण प्रक्रिया में 60 से 120 दिन का समय लगता है। यह इस बात पर निर्भर करता है कि आरटीए और कंपनी के नोडल अधिकारी कितनी जल्दी ई-सत्यापन रिपोर्ट अपलोड करते हैं। हम समय पर फॉलो-अप करके इस प्रक्रिया को तेज करवाते हैं।',
      },
      {
        id: 'faq-4',
        category: 'Documents',
        question: 'यदि मूल शेयर प्रमाण पत्र खो गया हो, तो क्या दावा किया जा सकता है?',
        answer: 'हाँ, बिल्कुल! यदि मूल शेयर प्रमाण पत्र खो गए हैं, तो हम कंपनी के आरटीए से फोलियो विवरण प्राप्त करते हैं, पुलिस शिकायत/एफआईआर दर्ज करवाते हैं, सेबी नियमानुसार समाचार पत्र में सार्वजनिक सूचना प्रकाशित करवाते हैं और "Letter of Confirmation (LOC)" प्राप्त कर आपके डिमैट में शेयर वापस लाते हैं।',
      },
      {
        id: 'faq-5',
        category: 'Documents',
        question: 'मूल शेयरधारक के निधन के बाद कानूनी उत्तराधिकारी कैसे दावा करें?',
        answer: 'इसके लिए ट्रांसमिशन (Transmission) प्रक्रिया अपनाई जाती है। मूल मृत्यु प्रमाण पत्र, कानूनी वारिस प्रमाण पत्र (Legal Heir Certificate) या उत्तराधिकार प्रमाण पत्र (Succession Certificate), अन्य वारिसों से एनओसी हलफनामे और क्षतिपूर्ति बांड के साथ फॉर्म IEPF-5 दायर किया जाता है।',
      },
      {
        id: 'faq-6',
        category: 'Status & Security',
        question: 'क्या बरामद शेयर सुरक्षित रूप से सीधे मेरे खाते में आएंगे?',
        answer: 'हाँ, 100% सुरक्षित! सरकारी नियमों के अनुसार IEPF अथॉरिटी और डिपॉजिटरी (NSDL/CDSL) बरामद किए गए शेयरों को सीधे निवेशक या कानूनी वारिस के अपने व्यक्तिगत डिमैट खाते में ही ट्रांसफर करते हैं। कोई तीसरा पक्ष आपके शेयर नहीं ले सकता।',
      },
      {
        id: 'faq-7',
        category: 'General',
        question: 'गोपाल सिंह परिहार और स्टॉकहोल्डिंग की क्या भूमिका है?',
        answer: 'श्री गोपाल सिंह परिहार स्टॉकहोल्डिंग (केंद्र सरकार की कंपनी) के अधिकृत बिजनेस एसोसिएट और आईईपीएफ रिकवरी विशेषज्ञ हैं। वे आपको संपूर्ण दस्तावेजीकरण, हलफनामों की ड्राफ्टिंग, फॉर्म फाइलिंग, आरटीए समन्वय और त्वरित स्वीकृति में पेशेवर सहायता प्रदान करते हैं।',
      },
    ];
  }

  return [
    {
      id: 'faq-1',
      category: 'General',
      question: 'Why are shares and dividends transferred to the IEPF?',
      answer: 'Under Section 124(5) & 124(6) of the Companies Act, 2013, if dividends on shares remain unpaid or unclaimed for 7 consecutive years, the company must mandatorily transfer both the unpaid dividends and the underlying shares to the IEPF Authority.',
    },
    {
      id: 'faq-2',
      category: 'Process',
      question: 'What is the complete legal process to reclaim shares from IEPF?',
      answer: 'The process involves online filing of Form IEPF-5 on the MCA V3 portal, submitting the physical verification kit (Forms 5A, 5B, 5C, 5D, original certificates, CML) to the company Nodal Officer, tracking the RTA e-verification report, and receiving shares directly into your Demat account.',
    },
    {
      id: 'faq-3',
      category: 'Process',
      question: 'How much time does the recovery process take?',
      answer: 'Typically, a clean IEPF claim takes 60 to 120 days. Timelines depend on how quickly the company Nodal Officer and RTA scrutinize documents and upload the e-verification report. We expedite this through continuous liaison.',
    },
    {
      id: 'faq-4',
      category: 'Documents',
      question: 'Can I claim shares if the original physical share certificates are lost?',
      answer: 'Yes! If physical certificates are lost or destroyed, we obtain folio records from the RTA, draft police affidavits, publish required newspaper public notices, and obtain a formal Letter of Confirmation (LOC) under SEBI guidelines for direct Demat credit.',
    },
    {
      id: 'faq-5',
      category: 'Documents',
      question: 'How do legal heirs claim shares if the original shareholder has passed away?',
      answer: 'This requires legal transmission. We draft requisite family NOCs, affidavits, indemnity bonds, and prepare the submission along with the death certificate, legal heir certificate or succession deed to ensure swift approval.',
    },
    {
      id: 'faq-6',
      category: 'Status & Security',
      question: 'Are recovered shares transferred safely directly into my account?',
      answer: 'Yes, 100% safe! Under statutory MCA guidelines, the IEPF Authority instructs NSDL/CDSL to credit recovered shares directly into the claimant’s own active Demat account, and cash dividends via PFMS directly to your verified bank account.',
    },
    {
      id: 'faq-7',
      category: 'General',
      question: 'What is the role of Gopal Singh Parihar & Stockholding?',
      answer: 'Gopal Singh Parihar is an authorized Business Associate of Stockholding (A Central Government Company) providing procedural guidance, document drafting, MCA filing, and proactive RTA follow-ups to ensure your shares and dividends are successfully reclaimed.',
    },
  ];
};
