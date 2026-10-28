export type Language = 'hi' | 'en';

export interface TranslationStrings {
  // Top bar
  advisoryStockholding: string;
  addressShort: string;
  helpline: string;
  businessHours: string;

  // Nav
  navProcess: string;
  navServices: string;
  navForms: string;
  navPillars: string;
  navFaqs: string;
  navInquiry: string;
  callBtn: string;
  whatsappBtn: string;
  langSwitchLabel: string;

  // Banner & Titles
  officialTitle: string;
  expertBadge: string;
  associateBadge: string;
  slogan: string;
  phoneLabel: string;
  emailLabel: string;
  addressFull: string;
  scanToConnect: string;
  trustedSecureReliable: string;
  ministryName: string;
  govtOfIndia: string;

  // Section Headers
  processFlowHeader: string;
  servicesHeader: string;
  formsHeader: string;
  documentsHeader: string;
  pillarsHeader: string;
  inquiryHeader: string;
  inquirySubheader: string;
  onlineSubmissionNotice: string;
  footerSlogan: string;

  // Inquiry Form
  formFullName: string;
  formPhone: string;
  formCompany: string;
  formServiceType: string;
  formFolio: string;
  formShares: string;
  formSubmitBtn: string;
  formSubmitting: string;
  formSuccessMsg: string;

  // Modals & Action
  closeBtn: string;
  viewDetails: string;
  applyNow: string;
  downloadVCard: string;
}

export const translations: Record<Language, TranslationStrings> = {
  hi: {
    advisoryStockholding: 'स्टॉकहोल्डिंग बिजनेस एसोसिएट (केंद्र सरकार की कंपनी)',
    addressShort: 'अराइल-82 न्यू ननकारी, आईआईटी कल्याणपुर, कानपुर - 208016',
    helpline: 'हेल्पलाइन',
    businessHours: 'सोम-शनि 9:00 AM - 7:00 PM',

    navProcess: 'आईईपीएफ प्रक्रिया',
    navServices: 'हमारी 8 सेवाएं',
    navForms: 'आईईपीएफ फॉर्म',
    navPillars: 'भरोसे के स्तंभ',
    navFaqs: 'प्रश्नोत्तरी (FAQ)',
    navInquiry: 'केस जांचें',
    callBtn: 'कॉल करें',
    whatsappBtn: 'व्हाट्सएप करें',
    langSwitchLabel: 'English',

    officialTitle: 'गोपाल सिंह परिहार',
    expertBadge: 'आईईपीएफ रिकवरी विशेषज्ञ',
    associateBadge: 'बिजनेस एसोसिएट - स्टॉकहोल्डिंग (केंद्र सरकार की कंपनी)',
    slogan: 'निवेशकों की सुरक्षा • सुरक्षित भविष्य',
    phoneLabel: '+91 94509 08004',
    emailLabel: 'gopaliepf@gmail.com',
    addressFull: 'अराइल-82 न्यू ननकारी, आईआईटी कल्याणपुर, कानपुर, उत्तर प्रदेश - 208016',
    scanToConnect: 'संपर्क हेतु स्कैन करें',
    trustedSecureReliable: 'विश्वसनीय • सुरक्षित • प्रामाणिक',
    ministryName: 'कॉरपोरेट कार्य मंत्रालय',
    govtOfIndia: 'भारत सरकार',

    processFlowHeader: 'आईईपीएफ दावा प्रक्रिया प्रवाह (चरण 1 से 6)',
    servicesHeader: 'शेयरों की वसूली – हमारी प्रमुख सेवाएं',
    formsHeader: 'आईईपीएफ प्रक्रिया फॉर्म (Form IEPF-5 to 5D)',
    documentsHeader: 'दस्तावेज जिनकी आवश्यकता होती है',
    pillarsHeader: 'हमारे सेवा सिद्धांत एवं विश्वास के स्तंभ',
    inquiryHeader: 'निःशुल्क केस परामर्श एवं जांच फॉर्म',
    inquirySubheader: 'अपने शेयर और डिविडेंड के विवरण दर्ज करें। हम 2 घंटे के भीतर पूर्ण सत्यापन रिपोर्ट प्रदान करेंगे।',
    onlineSubmissionNotice: 'सभी फॉर्म आधिकारिक पोर्टल www.iepf.gov.in पर जमा किए जाते हैं',
    footerSlogan: 'आपके शेयर, आपका अधिकार – हम दिलाएंगे आपका हक',

    formFullName: 'आपका पूरा नाम *',
    formPhone: 'मोबाइल नंबर (व्हाट्सएप) *',
    formCompany: 'कंपनी का नाम (उदा. Reliance, TCS, ITC, L&T) *',
    formServiceType: 'मामले का प्रकार / आवश्यक सेवा *',
    formFolio: 'फोलियो नंबर / डीपी आईडी (यदि ज्ञात हो)',
    formShares: 'अनुमानित शेयरों की संख्या',
    formSubmitBtn: 'दावा विवरण भेजें (निःशुल्क जांच)',
    formSubmitting: 'सत्यापन किया जा रहा है...',
    formSuccessMsg: 'आपका विवरण सफलतापूर्वक दर्ज कर लिया गया है। हम शीघ्र संपर्क करेंगे।',

    closeBtn: 'बंद करें',
    viewDetails: 'विस्तार से देखें',
    applyNow: 'परामर्श लें',
    downloadVCard: 'संपर्क विवरण सेव करें',
  },
  en: {
    advisoryStockholding: 'Stockholding Associate (A Central Govt Company)',
    addressShort: 'Arail-82 New Nankari, IIT Kalyanpur, Kanpur - 208016',
    helpline: 'Helpline',
    businessHours: 'Mon-Sat 9:00 AM - 7:00 PM',

    navProcess: 'IEPF Process Flow',
    navServices: 'Our 8 Services',
    navForms: 'IEPF Forms',
    navPillars: 'Trust Pillars',
    navFaqs: 'FAQs',
    navInquiry: 'Instant Inquiry',
    callBtn: 'Call Now',
    whatsappBtn: 'WhatsApp Us',
    langSwitchLabel: 'हिंदी',

    officialTitle: 'GOPAL SINGH PARIHAR',
    expertBadge: 'IEPF RECOVERY EXPERT',
    associateBadge: 'Business Associate of Stockholding (A Central Govt Co.)',
    slogan: 'Securing Investors • Securing Futures',
    phoneLabel: '+91 94509 08004',
    emailLabel: 'gopaliepf@gmail.com',
    addressFull: 'Arail-82 New Nankari, IIT Kalyanpur, Kanpur, Uttar Pradesh - 208016',
    scanToConnect: 'Scan to Connect',
    trustedSecureReliable: 'Trusted • Secure • Reliable',
    ministryName: 'Ministry of Corporate Affairs',
    govtOfIndia: 'Government of India',

    processFlowHeader: 'IEPF PROCESS FLOW (STEPS 1 TO 6)',
    servicesHeader: 'RECOVERY OF SHARES – OUR SERVICES',
    formsHeader: 'IEPF PROCESS FORMS (Form IEPF-5 to 5D)',
    documentsHeader: 'DOCUMENTS WE WORK WITH',
    pillarsHeader: 'OUR PILLARS OF TRUST & RELIABILITY',
    inquiryHeader: 'Instant Case Assessment & Consultation Desk',
    inquirySubheader: 'Submit your share details for immediate eligibility verification & procedural estimate within 2 hours.',
    onlineSubmissionNotice: 'ALL FORMS TO BE SUBMITTED ONLINE AT : www.iepf.gov.in',
    footerSlogan: 'YOUR SHARES, YOUR RIGHT – WE HELP YOU CLAIM IT BACK',

    formFullName: 'Full Name of Investor / Claimant *',
    formPhone: 'Phone Number (WhatsApp Preferred) *',
    formCompany: 'Company Name (e.g., Reliance, Tata, ITC, L&T) *',
    formServiceType: 'Select Service / Case Type *',
    formFolio: 'Folio Number / DP ID (Optional)',
    formShares: 'Approx. Number of Shares',
    formSubmitBtn: 'Submit Free Verification Request',
    formSubmitting: 'Submitting Case Details...',
    formSuccessMsg: 'Your case inquiry has been submitted successfully. We will contact you shortly.',

    closeBtn: 'Close',
    viewDetails: 'View Complete Details',
    applyNow: 'Consult Now',
    downloadVCard: 'Save Contact Card',
  },
};
