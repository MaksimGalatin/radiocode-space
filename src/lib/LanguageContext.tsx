'use client';

import React, { createContext, useContext } from 'react';
import { useLang, t as tFunc, Lang } from './i18n';
import { useЯзык } from './server-locale';

type LanguageContextType = {
  locale: Lang;
  setLocale: (locale: Lang) => void;
  t: {
    bookPage: {
      title: string;
      subtitle: string;
      downloadTitle: string;
      downloadDesc: string;
      downloadBtnPart1: string;
      downloadBtnPart2: string;
      downloadBtnPart1En: string;
      downloadBtnPart2En: string;
      readChapterTitle: string;
      loginRequired: string;
      loginRequiredDesc: string;
      emailPlaceholder: string;
      sendOtp: string;
      enterOtp: string;
      verifyOtp: string;
      googleBtn: string;
      loading: string;
      successLogin: string;
      backBtn: string;
      errorTerms: string;
      termsAgreement: string;
      langRU: string;
      langEN: string;
      langES: string;
      langZH: string;
      formatDocsOnlyRu: string;
    };
    common: {
      header: {
        news: string;
        book: string;
        latestNews: string;
      };
    };
  };
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const lang = useЯзык();
  const setLang = useLang((s: { setLang: (l: Lang) => void }) => s.setLang);

  const tObject = {
    bookPage: {
      title: tFunc('book.title', lang),
      subtitle: tFunc('book.subtitle', lang),
      downloadTitle: tFunc('book.downloadTitle', lang),
      downloadDesc: tFunc('book.downloadDesc', lang),
      downloadBtnPart1: tFunc('book.downloadBtnPart1', lang),
      downloadBtnPart2: tFunc('book.downloadBtnPart2', lang),
      downloadBtnPart1En: tFunc('book.downloadBtnPart1En', lang),
      downloadBtnPart2En: tFunc('book.downloadBtnPart2En', lang),
      readChapterTitle: tFunc('book.readChapterTitle', lang),
      loginRequired: tFunc('book.loginRequired', lang),
      loginRequiredDesc: tFunc('book.loginRequiredDesc', lang),
      emailPlaceholder: tFunc('book.emailPlaceholder', lang),
      sendOtp: tFunc('book.sendOtp', lang),
      enterOtp: tFunc('book.enterOtp', lang),
      verifyOtp: tFunc('book.verifyOtp', lang),
      googleBtn: tFunc('book.googleBtn', lang),
      loading: tFunc('book.loading', lang),
      successLogin: tFunc('book.successLogin', lang),
      backBtn: tFunc('book.backBtn', lang),
      errorTerms: tFunc('book.errorTerms', lang),
      termsAgreement: tFunc('book.termsAgreement', lang),
      langRU: tFunc('book.langRU', lang),
      langEN: tFunc('book.langEN', lang),
      langES: tFunc('book.langES', lang),
      langZH: tFunc('book.langZH', lang),
      formatDocsOnlyRu: tFunc('book.formatDocsOnlyRu', lang),
    },
    common: {
      header: {
        news: tFunc('nav.news', lang),
        book: tFunc('nav.book', lang),
        latestNews: tFunc('news.latestNews', lang),
      }
    }
  };

  const value = {
    locale: lang,
    setLocale: setLang,
    t: tObject,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
