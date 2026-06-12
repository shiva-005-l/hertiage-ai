"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export const languages = [
  { code: "en", name: "English" },
  { code: "te", name: "Telugu" },
  { code: "hi", name: "Hindi" },
  { code: "ta", name: "Tamil" },
  { code: "kn", name: "Kannada" },
] as const;

export type LanguageCode = (typeof languages)[number]["code"];

function isLanguageCode(value: string | null): value is LanguageCode {
  return languages.some((lang) => lang.code === value);
}

type TranslationKey =
  | "nav.explore"
  | "nav.passport"
  | "nav.assistance"
  | "nav.admin"
  | "nav.login"
  | "nav.getStarted"
  | "home.badge"
  | "home.title"
  | "home.subtitle"
  | "home.startExploring"
  | "home.tryChatbot"
  | "assistance.title"
  | "assistance.subtitle"
  | "assistance.reportTitle"
  | "assistance.category"
  | "assistance.location"
  | "assistance.description"
  | "assistance.upload"
  | "assistance.submit"
  | "admin.title"
  | "admin.subtitle"
  | "admin.analytics"
  | "admin.complaints"
  | "admin.contributions"
  | "admin.recentComplaints";

const translations: Record<LanguageCode, Record<TranslationKey, string>> = {
  en: {
    "nav.explore": "Explore",
    "nav.passport": "Passport",
    "nav.assistance": "Assistance",
    "nav.admin": "Admin",
    "nav.login": "Login",
    "nav.getStarted": "Get Started",
    "home.badge": "AI-Powered Real-Time Heritage Guide",
    "home.title": "Experience India's History Like Never Before",
    "home.subtitle": "Your personal AI companion for exploring India's magnificent heritage sites. Real-time crowd data, multilingual voice guides, AI chatbot, and a digital passport to track your journey.",
    "home.startExploring": "Start Exploring",
    "home.tryChatbot": "Try AI Chatbot",
    "assistance.title": "Emergency & Tourist Help",
    "assistance.subtitle": "Instant access to local authorities, medical help, and reporting issues.",
    "assistance.reportTitle": "Report an Issue",
    "assistance.category": "Issue Category",
    "assistance.location": "Location / Monument",
    "assistance.description": "Description",
    "assistance.upload": "Upload Photo of the Issue",
    "assistance.submit": "Submit Complaint",
    "admin.title": "Admin Dashboard",
    "admin.subtitle": "Manage heritage sites, view analytics, and resolve complaints.",
    "admin.analytics": "Analytics",
    "admin.complaints": "Complaints",
    "admin.contributions": "Contributions",
    "admin.recentComplaints": "Recent Complaints",
  },
  te: {
    "nav.explore": "అన్వేషించండి",
    "nav.passport": "పాస్‌పోర్ట్",
    "nav.assistance": "సహాయం",
    "nav.admin": "అడ్మిన్",
    "nav.login": "లాగిన్",
    "nav.getStarted": "ప్రారంభించండి",
    "home.badge": "AI ఆధారిత ప్రత్యక్ష వారసత్వ గైడ్",
    "home.title": "భారత చరిత్రను కొత్తగా అనుభవించండి",
    "home.subtitle": "భారత వారసత్వ ప్రదేశాలను అన్వేషించేందుకు మీ వ్యక్తిగత AI సహచరుడు. ప్రత్యక్ష జనసందోహ సమాచారం, బహుభాషా వాయిస్ గైడ్‌లు, AI చాట్‌బాట్ మరియు డిజిటల్ పాస్‌పోర్ట్.",
    "home.startExploring": "అన్వేషణ ప్రారంభించండి",
    "home.tryChatbot": "AI చాట్‌బాట్ ప్రయత్నించండి",
    "assistance.title": "అత్యవసర & పర్యాటక సహాయం",
    "assistance.subtitle": "స్థానిక అధికారులు, వైద్య సహాయం మరియు సమస్యల నివేదికకు తక్షణ ప్రవేశం.",
    "assistance.reportTitle": "సమస్యను నివేదించండి",
    "assistance.category": "సమస్య వర్గం",
    "assistance.location": "ప్రదేశం / స్మారకం",
    "assistance.description": "వివరణ",
    "assistance.upload": "సమస్య ఫోటోను అప్లోడ్ చేయండి",
    "assistance.submit": "ఫిర్యాదు సమర్పించండి",
    "admin.title": "అడ్మిన్ డాష్‌బోర్డ్",
    "admin.subtitle": "వారసత్వ ప్రదేశాలను నిర్వహించండి, విశ్లేషణలు చూడండి, ఫిర్యాదులను పరిష్కరించండి.",
    "admin.analytics": "విశ్లేషణలు",
    "admin.complaints": "ఫిర్యాదులు",
    "admin.contributions": "సహకారాలు",
    "admin.recentComplaints": "తాజా ఫిర్యాదులు",
  },
  hi: {
    "nav.explore": "एक्सप्लोर",
    "nav.passport": "पासपोर्ट",
    "nav.assistance": "सहायता",
    "nav.admin": "एडमिन",
    "nav.login": "लॉगिन",
    "nav.getStarted": "शुरू करें",
    "home.badge": "AI आधारित रियल-टाइम हेरिटेज गाइड",
    "home.title": "भारत के इतिहास को नए तरीके से अनुभव करें",
    "home.subtitle": "भारत के शानदार विरासत स्थलों को देखने के लिए आपका निजी AI साथी। रियल-टाइम भीड़ डेटा, बहुभाषी वॉइस गाइड, AI चैटबॉट और डिजिटल पासपोर्ट।",
    "home.startExploring": "एक्सप्लोर शुरू करें",
    "home.tryChatbot": "AI चैटबॉट आजमाएं",
    "assistance.title": "आपातकालीन और पर्यटक सहायता",
    "assistance.subtitle": "स्थानीय अधिकारियों, चिकित्सा सहायता और समस्या रिपोर्टिंग तक तुरंत पहुंच।",
    "assistance.reportTitle": "समस्या रिपोर्ट करें",
    "assistance.category": "समस्या श्रेणी",
    "assistance.location": "स्थान / स्मारक",
    "assistance.description": "विवरण",
    "assistance.upload": "समस्या की फोटो अपलोड करें",
    "assistance.submit": "शिकायत जमा करें",
    "admin.title": "एडमिन डैशबोर्ड",
    "admin.subtitle": "हेरिटेज साइट्स प्रबंधित करें, एनालिटिक्स देखें और शिकायतें हल करें।",
    "admin.analytics": "एनालिटिक्स",
    "admin.complaints": "शिकायतें",
    "admin.contributions": "योगदान",
    "admin.recentComplaints": "हाल की शिकायतें",
  },
  ta: {
    "nav.explore": "ஆராயுங்கள்",
    "nav.passport": "பாஸ்போர்ட்",
    "nav.assistance": "உதவி",
    "nav.admin": "நிர்வாகி",
    "nav.login": "உள்நுழைவு",
    "nav.getStarted": "தொடங்குங்கள்",
    "home.badge": "AI இயங்கும் நேரடி பாரம்பரிய வழிகாட்டி",
    "home.title": "இந்திய வரலாற்றை புதிய முறையில் அனுபவிக்கவும்",
    "home.subtitle": "இந்தியாவின் பாரம்பரிய இடங்களை ஆராய உங்கள் தனிப்பட்ட AI துணை. நேரடி கூட்டத் தகவல், பல மொழி குரல் வழிகாட்டி, AI chatbot மற்றும் டிஜிட்டல் பாஸ்போர்ட்.",
    "home.startExploring": "ஆராயத் தொடங்குங்கள்",
    "home.tryChatbot": "AI chatbot முயற்சி",
    "assistance.title": "அவசர & சுற்றுலா உதவி",
    "assistance.subtitle": "உள்ளூர் அதிகாரிகள், மருத்துவ உதவி மற்றும் பிரச்சினை அறிக்கைக்கு உடனடி அணுகல்.",
    "assistance.reportTitle": "பிரச்சினையை புகாரளிக்கவும்",
    "assistance.category": "பிரச்சினை வகை",
    "assistance.location": "இடம் / நினைவிடம்",
    "assistance.description": "விளக்கம்",
    "assistance.upload": "பிரச்சினையின் புகைப்படத்தை பதிவேற்றவும்",
    "assistance.submit": "புகாரை சமர்ப்பிக்கவும்",
    "admin.title": "நிர்வாகி டாஷ்போர்டு",
    "admin.subtitle": "பாரம்பரிய இடங்களை நிர்வகிக்கவும், பகுப்பாய்வைக் காணவும், புகார்களை தீர்க்கவும்.",
    "admin.analytics": "பகுப்பாய்வு",
    "admin.complaints": "புகார்கள்",
    "admin.contributions": "பங்களிப்புகள்",
    "admin.recentComplaints": "சமீபத்திய புகார்கள்",
  },
  kn: {
    "nav.explore": "ಅನ್ವೇಷಿಸಿ",
    "nav.passport": "ಪಾಸ್‌ಪೋರ್ಟ್",
    "nav.assistance": "ಸಹಾಯ",
    "nav.admin": "ನಿರ್ವಹಣೆ",
    "nav.login": "ಲಾಗಿನ್",
    "nav.getStarted": "ಪ್ರಾರಂಭಿಸಿ",
    "home.badge": "AI ಚಾಲಿತ ನೈಜ-ಸಮಯದ ಪರಂಪರೆ ಮಾರ್ಗದರ್ಶಿ",
    "home.title": "ಭಾರತದ ಇತಿಹಾಸವನ್ನು ಹೊಸ ರೀತಿಯಲ್ಲಿ ಅನುಭವಿಸಿ",
    "home.subtitle": "ಭಾರತದ ಪರಂಪರೆ ಸ್ಥಳಗಳನ್ನು ಅನ್ವೇಷಿಸಲು ನಿಮ್ಮ ವೈಯಕ್ತಿಕ AI ಸಂಗಾತಿ. ನೈಜ-ಸಮಯದ ಜನಸಂದಣಿ ಮಾಹಿತಿ, ಬಹುಭಾಷಾ ಧ್ವನಿ ಮಾರ್ಗದರ್ಶಿ, AI chatbot ಮತ್ತು ಡಿಜಿಟಲ್ ಪಾಸ್‌ಪೋರ್ಟ್.",
    "home.startExploring": "ಅನ್ವೇಷಣೆ ಪ್ರಾರಂಭಿಸಿ",
    "home.tryChatbot": "AI chatbot ಪ್ರಯತ್ನಿಸಿ",
    "assistance.title": "ತುರ್ತು & ಪ್ರವಾಸಿ ಸಹಾಯ",
    "assistance.subtitle": "ಸ್ಥಳೀಯ ಅಧಿಕಾರಿಗಳು, ವೈದ್ಯಕೀಯ ಸಹಾಯ ಮತ್ತು ಸಮಸ್ಯೆ ವರದಿಗೆ ತಕ್ಷಣದ ಪ್ರವೇಶ.",
    "assistance.reportTitle": "ಸಮಸ್ಯೆಯನ್ನು ವರದಿ ಮಾಡಿ",
    "assistance.category": "ಸಮಸ್ಯೆಯ ವರ್ಗ",
    "assistance.location": "ಸ್ಥಳ / ಸ್ಮಾರಕ",
    "assistance.description": "ವಿವರಣೆ",
    "assistance.upload": "ಸಮಸ್ಯೆಯ ಫೋಟೋ ಅಪ್ಲೋಡ್ ಮಾಡಿ",
    "assistance.submit": "ದೂರು ಸಲ್ಲಿಸಿ",
    "admin.title": "ನಿರ್ವಹಣಾ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    "admin.subtitle": "ಪರಂಪರೆ ಸ್ಥಳಗಳನ್ನು ನಿರ್ವಹಿಸಿ, ವಿಶ್ಲೇಷಣೆಗಳನ್ನು ನೋಡಿ ಮತ್ತು ದೂರುಗಳನ್ನು ಪರಿಹರಿಸಿ.",
    "admin.analytics": "ವಿಶ್ಲೇಷಣೆ",
    "admin.complaints": "ದೂರುಗಳು",
    "admin.contributions": "ಕೊಡುಗೆಗಳು",
    "admin.recentComplaints": "ಇತ್ತೀಚಿನ ದೂರುಗಳು",
  },
};

type LanguageContextValue = {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("smart-heritage-language");
    if (isLanguageCode(saved)) {
      const frameId = window.requestAnimationFrame(() => setLanguageState(saved));
      return () => window.cancelAnimationFrame(frameId);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    
    const syncGoogleTranslate = () => {
      const selectField = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
      if (selectField && selectField.value !== language) {
        selectField.value = language;
        selectField.dispatchEvent(new Event('change'));
      }
    };

    syncGoogleTranslate();
    const t1 = setTimeout(syncGoogleTranslate, 1000);
    const t2 = setTimeout(syncGoogleTranslate, 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [language]);

  const setLanguage = (nextLanguage: LanguageCode) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem("smart-heritage-language", nextLanguage);
    document.documentElement.lang = nextLanguage;
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: (key: TranslationKey) => translations[language][key] ?? translations.en[key],
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}
