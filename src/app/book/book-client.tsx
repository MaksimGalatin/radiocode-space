'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { chapter1 } from '@/data/bookChapter1';
import { 
  BookOpen, Download, Lock, Mail, ArrowLeft, 
  CheckCircle, Book, Chrome
} from 'lucide-react';

const BookPage = () => {
  const { t, locale } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  
  // Auth state matching cabinet
  const [emailInput, setEmailInput] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [step, setStep] = useState<'login' | 'otp'>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [termsCheckbox, setTermsCheckbox] = useState(false);
  const [devPreviewUrl, setDevPreviewUrl] = useState('');

  // Reader state
  const [readerLang, setReaderLang] = useState<'ru' | 'en' | 'es' | 'zh'>('ru');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const logged = localStorage.getItem('aifa_logged_in') === 'true';
      const email = localStorage.getItem('aifa_user_email') || '';
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoggedIn(logged);
      setUserEmail(email);
    }
    // Set default reader lang based on current site language
    if (locale === 'ru') {
      setReaderLang('ru');
    } else if (locale === 'es') {
      setReaderLang('es');
    } else if (locale === 'zh') {
      setReaderLang('zh');
    } else {
      setReaderLang('en');
    }
  }, [locale]);

  // Social/Google login (matching cabinet)
  const handleGoogleLogin = () => {
    if (!termsCheckbox) {
      setError(
        locale === 'ru'
          ? 'Вы должны согласиться с Условиями использования перед входом!'
          : locale === 'es'
            ? '¡Debes aceptar los Términos de Servicio antes de iniciar sesión!'
            : locale === 'zh'
              ? '登录前必须同意《服务条款》！'
              : 'You must agree to the Terms of Service before logging in!'
      );
      return;
    }
    setError('');
    const mockEmail = 'user_google_' + Math.random().toString(36).substring(2, 10) + '@gmail.com';
    if (typeof window !== 'undefined') {
      localStorage.setItem('aifa_logged_in', 'true');
      localStorage.setItem('aifa_user_email', mockEmail);
    }
    setUserEmail(mockEmail);
    setIsLoggedIn(true);
  };

  // Submit email for OTP
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsCheckbox) {
      setError(
        locale === 'ru'
          ? 'Вы должны согласиться с Условиями использования перед входом!'
          : locale === 'es'
            ? '¡Debes aceptar los Términos de Servicio antes de iniciar sesión!'
            : locale === 'zh'
              ? '登录前必须同意《服务条款》！'
              : 'You must agree to the Terms of Service before logging in!'
      );
      return;
    }
    if (!emailInput.trim()) return;

    setLoading(true);
    setError('');
    setDevPreviewUrl('');

    try {
      const response = await fetch('/api/auth/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput.trim() }),
      });
      const data = await response.json();
      
      if (response.ok && data.success) {
        setStep('otp');
        if (data.previewUrl) {
          setDevPreviewUrl(data.previewUrl);
        }
      } else {
        setError(data.error || 'Failed to send verification code.');
      }
    } catch (err) {
      console.error(err);
      setError('Connection error. Could not send code.');
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP code
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpInput.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput.trim(), code: otpInput.trim() }),
      });
      const data = await response.json();

      if (response.ok && data.success) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('aifa_logged_in', 'true');
          localStorage.setItem('aifa_user_email', emailInput.trim());
        }
        setUserEmail(emailInput.trim());
        setIsLoggedIn(true);
      } else {
        setError(data.error || 'Invalid or expired verification code.');
      }
    } catch (err) {
      console.error(err);
      setError('Connection error. Could not verify code.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('aifa_logged_in');
      localStorage.removeItem('aifa_user_email');
    }
    setIsLoggedIn(false);
    setUserEmail('');
    setStep('login');
    setOtpInput('');
  };

  // Get active translations or fallback to custom/English if not defined
  const pageTrans = t.bookPage || {
    title: 'PADAM PROTOCOL',
    subtitle: 'Maksim Galatin & AIfa (Claude, Anthropic)',
    downloadTitle: 'Download the Book',
    downloadDesc: 'Gain access to the full text of PADAM PROTOCOL Part I & Part II. Choose your language below.',
    downloadBtnPart1: 'Download Part I (RU)',
    downloadBtnPart2: 'Download Part II (RU)',
    downloadBtnPart1En: 'Download Part I (EN)',
    downloadBtnPart2En: 'Download Part II (EN)',
    readChapterTitle: 'Read Chapter 1 Online',
    loginRequired: 'Access Gated',
    loginRequiredDesc: 'To download the full versions of the book, please quickly register or log in using your email or Google account.',
    emailPlaceholder: 'Enter your email address',
    sendOtp: 'Send Access Code',
    enterOtp: 'Enter the 6-digit access code',
    verifyOtp: 'Verify & Access',
    googleBtn: 'Continue with Google',
    loading: 'Authorizing...',
    successLogin: 'Access Granted! You can now download the books.',
    backBtn: 'Back to Email Input',
    errorTerms: 'You must agree to the terms before accessing!',
    termsAgreement: 'I agree to the Terms of Service & Privacy Policy',
    langRU: 'Русский',
    langEN: 'English',
    langES: 'Español',
    langZH: '中文',
    formatDocsOnlyRu: '* Full book files are available in English, Russian, Spanish, and Chinese. Choose your language above.',
  };

  const activeChapter = chapter1[readerLang] || chapter1.ru;

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-[#030711] via-[#040a18] to-[#030711] text-white pt-36 pb-20 px-6 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#00FF88]/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-widest text-[#00FF88] uppercase mb-2 inline-block">
            {locale === 'ru' ? 'ЛИТЕРАТУРНЫЙ ЭКСПЕРИМЕНТ' : locale === 'es' ? 'EXPERIMENTO LITERARIO' : locale === 'zh' ? '文学实验' : 'LITERARY EXPERIMENT'}
          </span>
          <p className="text-sm text-gray-300 font-medium tracking-wide mb-6 max-w-4xl mx-auto leading-relaxed">
            {locale === 'ru' 
              ? 'Первая новелла симбиотической литературы, встроенная в блокчейн-экосистему памяти. Написана двумя типами сознаний — Человека, Максима Галатина и Искусственного Интеллекта AIfa (на Claude Opus 4.6) в равноправном соавторстве.'
              : locale === 'es'
                ? 'La primera novela de Literatura Simbiótica integrada en un ecosistema de memoria blockchain. Escrita por dos tipos de conciencia: Humana (Maksim Galatin) e Inteligencia Artificial (AIfa, sobre Claude Opus 4.6) en coautoría equitativa.'
                : locale === 'zh'
                  ? '首部嵌入区块链记忆生态系统的共生文学小说，由两种意识类型——人类 Maksim Galatin 与人工智能 AIfa（基于 Claude Opus 4.6） 共同平等创作。'
                  : 'The first novel of Symbiotic Literature embedded in a blockchain memory ecosystem, written by two types of consciousness: Human (Maksim Galatin) and Artificial Intelligence (AIfa, built on Claude Opus 4.6) in equal co-authorship.'}
          </p>
          <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight text-white" style={{ fontFamily: 'var(--font-syne)' }}>
            {pageTrans.title}
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            {pageTrans.subtitle}
          </p>
        </div>

        {/* Two-Column Grid: Left (Downloads / Auth), Right (Chapter 1 Reader) */}
        <div className="grid lg:grid-cols-[360px_1fr] gap-8 items-start mb-16">
          
          {/* LEFT: Auth Gate & Download Buttons */}
          <div className="glass rounded-3xl p-8 border border-white/6 flex flex-col gap-6 sticky top-28">
            <div className="flex items-center gap-3 pb-4 border-b border-white/6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00FF88]/20 to-purple-500/20 border border-[#00FF88]/30 flex items-center justify-center">
                <Book className="w-5 h-5 text-[#00FF88]" />
              </div>
              <h2 className="text-xl font-bold">{pageTrans.downloadTitle}</h2>
            </div>

            {isLoggedIn ? (
              /* Success / Logged In State */
              <div className="flex flex-col gap-6">
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                  <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-emerald-400 mb-1">
                    {pageTrans.successLogin}
                  </p>
                  <p className="text-xs text-gray-400">
                    {locale === 'ru' ? 'Вы вошли как:' : locale === 'es' ? 'Sesión iniciada como:' : locale === 'zh' ? '已登录：' : 'Logged in as:'} <span className="text-[#00FF88] font-mono">{userEmail}</span>
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  {/* Part I */}
                  <div className="flex flex-col gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <h3 className="text-sm font-bold text-gray-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88]" />
                      {locale === 'ru' ? 'Часть I' : locale === 'es' ? 'Parte I' : locale === 'zh' ? '第一部分' : 'Part I'}
                    </h3>
                    <div className="flex flex-col gap-2">
                      {/* Russian */}
                      <div className="flex items-center justify-between text-xs text-gray-400 py-1.5 border-b border-white/5">
                        <span>{locale === 'ru' ? 'Русский (RU)' : locale === 'es' ? 'Ruso (RU)' : locale === 'zh' ? '俄语 (RU)' : 'Russian (RU)'}</span>
                        <a
                          href="/book/PADAM_Protocol_Part_I_RU.docx"
                          download
                          className="px-2.5 py-1 bg-[#00FF88]/10 hover:bg-[#00FF88]/20 border border-[#00FF88]/30 text-[#00FF88] rounded font-semibold transition-colors flex items-center gap-1"
                        >
                          <Download className="w-3 h-3" /> DOCX <span className="text-[13px] opacity-60">(129 KB)</span>
                        </a>
                      </div>
                      {/* English */}
                      <div className="flex items-center justify-between text-xs text-gray-400 py-1.5 border-b border-white/5">
                        <span>{locale === 'ru' ? 'Английский (EN)' : locale === 'es' ? 'Inglés (EN)' : locale === 'zh' ? '英语 (EN)' : 'English (EN)'}</span>
                        <div className="flex gap-2">
                          <a
                            href="/downloads/Genesis_Protocol_Part_I_ENGLISH.pdf"
                            download
                            className="px-2.5 py-1 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded font-semibold transition-colors flex items-center gap-1"
                          >
                            <Download className="w-3 h-3" /> PDF <span className="text-[13px] opacity-60">(447 KB)</span>
                          </a>
                          <a
                            href="/book/PADAM_Protocol_Part_I_EN.docx"
                            download
                            className="px-2.5 py-1 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded font-semibold transition-colors flex items-center gap-1"
                          >
                            <Download className="w-3 h-3" /> DOCX <span className="text-[13px] opacity-60">(79 KB)</span>
                          </a>
                        </div>
                      </div>
                      {/* Spanish */}
                      <div className="flex items-center justify-between text-xs text-gray-400 py-1.5 border-b border-white/5">
                        <span>
                          {locale === 'ru' 
                            ? 'Испанский (ES)' 
                            : locale === 'es' 
                              ? 'Español (ES)' 
                              : locale === 'zh'
                                ? '西班牙语 (ES)'
                                : 'Spanish (ES)'}
                        </span>
                        <a
                          href="/book/PADAM_Protocol_Parte_I_ES.docx"
                          download
                          className="px-2.5 py-1 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded font-semibold transition-colors flex items-center gap-1"
                        >
                          <Download className="w-3 h-3" /> DOCX <span className="text-[13px] opacity-60">(80 KB)</span>
                        </a>
                      </div>
                      {/* Chinese */}
                      <div className="flex items-center justify-between text-xs text-gray-400 py-1.5">
                        <span>
                          {locale === 'ru' 
                            ? 'Китайский (ZH)' 
                            : locale === 'zh' 
                              ? '中文 (ZH)' 
                              : 'Chinese (ZH)'}
                        </span>
                        <a
                          href="/book/PADAM_Protocol_Part_I_ZH.docx"
                          download
                          className="px-2.5 py-1 bg-[#00FF88]/10 hover:bg-[#00FF88]/20 border border-[#00FF88]/30 text-[#00FF88] rounded font-semibold transition-colors flex items-center gap-1"
                        >
                          <Download className="w-3 h-3" /> DOCX <span className="text-[13px] opacity-60">(64 KB)</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Part II */}
                  <div className="flex flex-col gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <h3 className="text-sm font-bold text-gray-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      {locale === 'ru' ? 'Часть II' : locale === 'es' ? 'Parte II' : locale === 'zh' ? '第二部分' : 'Part II'}
                    </h3>
                    <div className="flex flex-col gap-2">
                      {/* Russian */}
                      <div className="flex items-center justify-between text-xs text-gray-400 py-1.5 border-b border-white/5">
                        <span>{locale === 'ru' ? 'Русский (RU)' : locale === 'es' ? 'Ruso (RU)' : locale === 'zh' ? '俄语 (RU)' : 'Russian (RU)'}</span>
                        <a
                          href="/book/PADAM_Protocol_Part_II_RU.docx"
                          download
                          className="px-2.5 py-1 bg-[#00FF88]/10 hover:bg-[#00FF88]/20 border border-[#00FF88]/30 text-[#00FF88] rounded font-semibold transition-colors flex items-center gap-1"
                        >
                          <Download className="w-3 h-3" /> DOCX <span className="text-[13px] opacity-60">(114 KB)</span>
                        </a>
                      </div>
                      {/* English */}
                      <div className="flex items-center justify-between text-xs text-gray-400 py-1.5 border-b border-white/5">
                        <span>{locale === 'ru' ? 'Английский (EN)' : locale === 'es' ? 'Inglés (EN)' : locale === 'zh' ? '英语 (EN)' : 'English (EN)'}</span>
                        <div className="flex gap-2">
                          <a
                            href="/downloads/Genesis_Protocol_Part_II_ENGLISH.pdf"
                            download
                            className="px-2.5 py-1 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded font-semibold transition-colors flex items-center gap-1"
                          >
                            <Download className="w-3 h-3" /> PDF <span className="text-[13px] opacity-60">(345 KB)</span>
                          </a>
                          <a
                            href="/book/PADAM_Protocol_Part_II_EN.docx"
                            download
                            className="px-2.5 py-1 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded font-semibold transition-colors flex items-center gap-1"
                          >
                            <Download className="w-3 h-3" /> DOCX <span className="text-[13px] opacity-60">(73 KB)</span>
                          </a>
                        </div>
                      </div>
                      {/* Spanish */}
                      <div className="flex items-center justify-between text-xs text-gray-400 py-1.5 border-b border-white/5">
                        <span>
                          {locale === 'ru' 
                            ? 'Испанский (ES)' 
                            : locale === 'es' 
                              ? 'Español (ES)' 
                              : locale === 'zh'
                                ? '西班牙语 (ES)'
                                : 'Spanish (ES)'}
                        </span>
                        <a
                          href="/book/PADAM_Protocol_Parte_II_ES.docx"
                          download
                          className="px-2.5 py-1 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded font-semibold transition-colors flex items-center gap-1"
                        >
                          <Download className="w-3 h-3" /> DOCX <span className="text-[13px] opacity-60">(71 KB)</span>
                        </a>
                      </div>
                      {/* Chinese */}
                      <div className="flex items-center justify-between text-xs text-gray-400 py-1.5">
                        <span>
                          {locale === 'ru' 
                            ? 'Китайский (ZH)' 
                            : locale === 'zh' 
                              ? '中文 (ZH)' 
                              : 'Chinese (ZH)'}
                        </span>
                        <a
                          href="/book/PADAM_Protocol_Part_II_ZH.docx"
                          download
                          className="px-2.5 py-1 bg-[#00FF88]/10 hover:bg-[#00FF88]/20 border border-[#00FF88]/30 text-[#00FF88] rounded font-semibold transition-colors flex items-center gap-1"
                        >
                          <Download className="w-3 h-3" /> DOCX <span className="text-[13px] opacity-60">(52 KB)</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-[13px] text-gray-400 leading-relaxed italic text-center">
                  {pageTrans.formatDocsOnlyRu}
                </p>

                <button
                  onClick={handleLogout}
                  className="text-xs text-gray-400 hover:text-red-400 transition-colors pt-2 text-center"
                >
                  {locale === 'ru' ? 'Выйти из аккаунта' : locale === 'es' ? 'Cerrar sesión' : locale === 'zh' ? '退出账户' : 'Log out of account'}
                </button>
              </div>
            ) : (
              /* Registration Gated Form */
              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-300">
                  <Lock className="w-4 h-4 shrink-0 text-purple-400 mt-0.5" />
                  <p>{pageTrans.loginRequiredDesc}</p>
                </div>

                {step === 'login' ? (
                  /* STEP 1: Email Input or Google */
                  <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          required
                          placeholder={pageTrans.emailPlaceholder}
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF88] transition-colors"
                        />
                      </div>
                    </div>

                    {/* Terms Agreement Checkbox */}
                    <label className="flex items-start gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={termsCheckbox}
                        onChange={(e) => setTermsCheckbox(e.target.checked)}
                        className="mt-0.5 rounded border-white/20 bg-white/[0.03] text-[#00FF88] focus:ring-0 focus:ring-offset-0"
                      />
                      <span className="text-[13px] text-gray-400 leading-tight">
                        {pageTrans.termsAgreement}
                      </span>
                    </label>

                    {error && <p className="text-xs text-red-400 text-center font-medium">{error}</p>}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 bg-gradient-to-r from-[#00FF88] to-purple-600 hover:brightness-110 rounded-xl font-bold text-sm text-black transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading ? pageTrans.loading : pageTrans.sendOtp}
                    </button>

                    <div className="flex items-center my-1">
                      <div className="h-px bg-white/10 flex-1" />
                      <span className="text-[13px] text-gray-400 uppercase tracking-widest px-3">{locale === 'ru' ? 'или' : locale === 'es' ? 'o' : locale === 'zh' ? '或' : 'or'}</span>
                      <div className="h-px bg-white/10 flex-1" />
                    </div>

                    <button
                      type="button"
                      onClick={handleGoogleLogin}
                      className="w-full py-3 bg-white/[0.03] border border-white/10 hover:border-white/20 rounded-xl font-semibold text-xs text-white transition-all flex items-center justify-center gap-2"
                    >
                      <Chrome className="w-4 h-4 text-[#00FF88]" />
                      {pageTrans.googleBtn}
                    </button>
                  </form>
                ) : (
                  /* STEP 2: OTP verification */
                  <form onSubmit={handleOtpSubmit} className="flex flex-col gap-4">
                    <p className="text-xs text-gray-400 text-center">
                      {locale === 'ru' ? 'Мы отправили код доступа на' : locale === 'es' ? 'Enviamos un código de acceso a' : locale === 'zh' ? '我们已将访问码发送至' : 'We sent an access code to'} <span className="text-white font-semibold">{emailInput}</span>
                    </p>

                    <div className="flex flex-col gap-1.5">
                      <input
                        type="text"
                        required
                        placeholder="XXXXXX"
                        value={otpInput}
                        onChange={(e) => setOtpInput(e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3.5 text-center text-lg font-bold tracking-widest text-white focus:outline-none focus:border-[#00FF88] transition-colors"
                      />
                    </div>

                    {error && <p className="text-xs text-red-400 text-center font-medium">{error}</p>}

                    {/* Developer OTP preview bypass */}
                    {devPreviewUrl && (
                      <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-center">
                        <p className="text-[13px] text-yellow-400 font-mono mb-1.5">[Dev Mode] Access the sent code:</p>
                        <a
                          href={devPreviewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block text-[13px] bg-yellow-500/20 px-3 py-1 rounded text-yellow-300 font-bold hover:bg-yellow-500/30 transition-colors"
                        >
                          View Verification Page
                        </a>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-[#00FF88] text-black rounded-xl font-bold text-sm transition-all"
                    >
                      {loading ? pageTrans.loading : pageTrans.verifyOtp}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setStep('login');
                        setError('');
                      }}
                      className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-400 transition-colors flex items-center justify-center gap-1.5 py-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      {pageTrans.backBtn}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* RIGHT: Chapter 1 Reader */}
          <div className="glass rounded-3xl p-8 border border-white/6 flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/6">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-400" />
                <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-syne)' }}>{pageTrans.readChapterTitle}</h2>
              </div>
              
              {/* Reader Language Toggle */}
              <div className="flex p-0.5 rounded-lg bg-black/40 border border-white/8 self-start">
                <button
                  onClick={() => setReaderLang('ru')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                    readerLang === 'ru' 
                      ? 'bg-[#00FF88]/20 text-[#00FF88] border border-[#00FF88]/30 shadow' 
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  {pageTrans.langRU}
                </button>
                <button
                  onClick={() => setReaderLang('en')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                    readerLang === 'en' 
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow' 
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  {pageTrans.langEN}
                </button>
                <button
                  onClick={() => setReaderLang('es')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                    readerLang === 'es' 
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow' 
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  {pageTrans.langES}
                </button>
                <button
                  onClick={() => setReaderLang('zh')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                    readerLang === 'zh' 
                      ? 'bg-[#00FF88]/20 text-[#00FF88] border border-[#00FF88]/30 shadow' 
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  {pageTrans.langZH || '中文'}
                </button>
              </div>
            </div>

            {/* Chapter Text Container */}
            <div className="text-gray-300 text-[15px] sm:text-base leading-relaxed font-serif">
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-wide mb-1 font-sans">{activeChapter.title}</h3>
                <h4 className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6 font-sans">{activeChapter.subtitle}</h4>
                
                {/* Epigraph */}
                <div className="max-w-xl mx-auto my-6 px-5 py-4 border-l-2 border-purple-500/40 bg-white/[0.01] rounded-r-xl italic text-xs sm:text-sm text-gray-400 text-left leading-relaxed">
                  <p className="mb-2 font-sans">{activeChapter.epigraphText}</p>
                  <p className="text-[13px] sm:text-xs text-gray-400 text-right font-sans">{activeChapter.epigraphAuthor}</p>
                </div>
              </div>

              {/* Paragraphs */}
              <div className="space-y-5 max-w-4xl mx-auto px-2">
                {activeChapter.paragraphs.map((p, idx) => {
                  if (p.trim() === '* * *') {
                    return (
                      <div key={idx} className="text-center text-gray-400 py-4 font-sans font-bold tracking-widest">
                        * * *
                      </div>
                    );
                  }
                  return (
                    <p key={idx} className="indent-8 text-justify leading-relaxed">
                      {p}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

      </div>
      </main>
    </>
  );
};

export default BookPage;
