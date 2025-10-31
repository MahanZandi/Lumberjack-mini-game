import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'fa';

interface Translations {
  title: string;
  subtitle: string;
  startGame: string;
  readyToChop: string;
  avoidBranches: string;
  score: string;
  chopLeft: string;
  chopRight: string;
  keyboardTip: string;
  gameOver: string;
  youChopped: string;
  piecesOfWood: string;
  enterName: string;
  yourName: string;
  saveRestart: string;
  restart: string;
  saving: string;
  topLumberjacks: string;
  loading: string;
  noScores: string;
  records: string;
  skins: string;
  selectSkin: string;
  classic: string;
  modern: string;
  ninja: string;
  backToGame: string;
  scoreSaved: string;
  enterNameError: string;
  failedToSave: string;
}

const translations: Record<Language, Translations> = {
  en: {
    title: '🪓 Lumberjack - Chop Wood',
    subtitle: 'Use arrow keys or tap the buttons to switch sides and chop!',
    startGame: 'Start Game',
    readyToChop: 'Ready to Chop?',
    avoidBranches: 'Avoid the branches!',
    score: 'Score',
    chopLeft: 'Chop Left',
    chopRight: 'Chop Right',
    keyboardTip: 'Tip: Press arrow keys on keyboard for faster gameplay!',
    gameOver: 'Game Over!',
    youChopped: 'You chopped',
    piecesOfWood: 'pieces of wood!',
    enterName: 'Enter your name for the leaderboard',
    yourName: 'Your name',
    saveRestart: 'Save & Restart',
    restart: 'Restart',
    saving: 'Saving...',
    topLumberjacks: 'Top Lumberjacks',
    loading: 'Loading...',
    noScores: 'No scores yet. Be the first to play!',
    records: 'Records',
    skins: 'Skins',
    selectSkin: 'Select Your Skin',
    classic: 'Classic',
    modern: 'Modern',
    ninja: 'Ninja',
    backToGame: 'Back to Game',
    scoreSaved: 'Score saved to leaderboard!',
    enterNameError: 'Please enter your name',
    failedToSave: 'Failed to save score',
  },
  fa: {
    title: '🪓 هیزم‌شکن - چوب بشکن',
    subtitle: 'از کلیدهای جهت‌دار یا دکمه‌ها برای تغییر سمت و بریدن استفاده کنید!',
    startGame: 'شروع بازی',
    readyToChop: 'آماده برای بریدن؟',
    avoidBranches: 'از شاخه‌ها دوری کنید!',
    score: 'امتیاز',
    chopLeft: 'بریدن چپ',
    chopRight: 'بریدن راست',
    keyboardTip: 'نکته: برای بازی سریع‌تر از کلیدهای جهت‌دار استفاده کنید!',
    gameOver: 'بازی تمام شد!',
    youChopped: 'شما',
    piecesOfWood: 'تکه چوب بریدید!',
    enterName: 'نام خود را برای جدول امتیازات وارد کنید',
    yourName: 'نام شما',
    saveRestart: 'ذخیره و شروع مجدد',
    restart: 'شروع مجدد',
    saving: 'در حال ذخیره...',
    topLumberjacks: 'برترین هیزم‌شکن‌ها',
    loading: 'در حال بارگذاری...',
    noScores: 'هنوز امتیازی ثبت نشده. اولین نفر باشید!',
    records: 'رکوردها',
    skins: 'ظاهر',
    selectSkin: 'ظاهر خود را انتخاب کنید',
    classic: 'کلاسیک',
    modern: 'مدرن',
    ninja: 'نینجا',
    backToGame: 'بازگشت به بازی',
    scoreSaved: 'امتیاز ذخیره شد!',
    enterNameError: 'لطفاً نام خود را وارد کنید',
    failedToSave: 'خطا در ذخیره امتیاز',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'fa';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const isRTL = language === 'fa';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language], isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
