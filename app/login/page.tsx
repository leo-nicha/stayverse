'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation, Language } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Shield, ArrowLeft, ArrowRight, Chrome, Facebook, Apple, Globe } from 'lucide-react';

const loginTranslations: Record<Language, Record<string, string>> = {
  th: {
    welcome: 'ยินดีต้อนรับสู่ STAYVERSE',
    subtitle: 'ระบบจัดการอสังหาริมทรัพย์ระดับลักชัวรีและเครื่องมืออัจฉริยะ',
    ssoButton: 'เข้าสู่ระบบด้วย Stayverse SSO',
    orDivider: 'หรือเข้าสู่ระบบด้วยอีเมล',
    emailLabel: 'อีเมล',
    passwordLabel: 'รหัสผ่าน',
    emailPlaceholder: 'ระบุอีเมลของคุณ',
    passwordPlaceholder: 'ระบุรหัสผ่านของคุณ',
    rememberMe: 'จดจำฉัน',
    forgotPassword: 'ลืมรหัสผ่าน?',
    signInBtn: 'เข้าสู่ระบบ',
    socialLogin: 'หรือเชื่อมต่อผ่านช่องทางอื่น',
    signUpText: 'ยังไม่มีบัญชีใช่หรือไม่?',
    signUpBtn: 'สมัครสมาชิก',
    brandQuote: 'การอยู่อาศัยที่เหนือระดับบนทำเลศักยภาพสูงสุดในกรุงเทพฯ',
    brandConcept: 'นวัตกรรมเช่าออมห้อง (Rent-to-own) และระบบการจองแบบดิจิทัลเต็มรูปแบบ',
    errorInvalid: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
    successMsg: 'เข้าสู่ระบบสำเร็จ กำลังนำทาง...',
    mockAdminNote: 'หมายเหตุ: สามารถเข้าสู่ระบบแอดมินด้วยบัญชีทดสอบด้านล่าง หรือใช้ปุ่ม SSO',
    useMockAdmin: 'ใช้อีเมลทดสอบแอดมิน'
  },
  en: {
    welcome: 'Welcome to STAYVERSE',
    subtitle: 'Luxury real estate management & smart broker tools',
    ssoButton: 'Log in with Stayverse SSO',
    orDivider: 'or sign in with email',
    emailLabel: 'Email Address',
    passwordLabel: 'Password',
    emailPlaceholder: 'Enter your email',
    passwordPlaceholder: 'Enter your password',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    signInBtn: 'Sign In',
    socialLogin: 'or continue with other options',
    signUpText: "Don't have an account?",
    signUpBtn: 'Sign Up',
    brandQuote: 'Elevated urban living in Bangkok’s most prestigious locations',
    brandConcept: 'Innovative Rent-to-own solutions & 100% digital transactions',
    errorInvalid: 'Invalid email or password',
    successMsg: 'Login successful! Redirecting...',
    mockAdminNote: 'Note: You can log in as admin using the mock account below or use SSO button',
    useMockAdmin: 'Use Mock Admin Account'
  },
  ru: {
    welcome: 'Добро пожаловать в STAYVERSE',
    subtitle: 'Система управления элитной недвижимостью и смарт-инструменты',
    ssoButton: 'Войти через Stayverse SSO',
    orDivider: 'или войдите с помощью email',
    emailLabel: 'Электронная почта',
    passwordLabel: 'Пароль',
    emailPlaceholder: 'Введите ваш email',
    passwordPlaceholder: 'Введите ваш пароль',
    rememberMe: 'Запомнить меня',
    forgotPassword: 'Забыли пароль?',
    signInBtn: 'Войти',
    socialLogin: 'или продолжите через',
    signUpText: 'Еще нет аккаунта?',
    signUpBtn: 'Зарегистрироваться',
    brandQuote: 'Изысканная городская жизнь в престижных районах Бангкока',
    brandConcept: 'Инновационные решения Rent-to-own и 100% цифровые транзакции',
    errorInvalid: 'Неверный email или пароль',
    successMsg: 'Вход выполнен! Перенаправление...',
    mockAdminNote: 'Примечание: Вы можете войти как админ, используя тестовый аккаунт ниже или кнопку SSO',
    useMockAdmin: 'Тестовый аккаунт админа'
  },
  zh: {
    welcome: '欢迎来到 STAYVERSE',
    subtitle: '豪宅物业管理与智能经纪人专属工具',
    ssoButton: '使用 Stayverse SSO 登录',
    orDivider: '或使用电子邮箱登录',
    emailLabel: '电子邮箱',
    passwordLabel: '密码',
    emailPlaceholder: '请输入您的邮箱',
    passwordPlaceholder: '请输入您的密码',
    rememberMe: '记住我',
    forgotPassword: '忘记密码？',
    signInBtn: '登录',
    socialLogin: '或使用其他方式登录',
    signUpText: '还没有账号？',
    signUpBtn: '立即注册',
    brandQuote: '在曼谷最负盛名的黄金地段，开启尊贵非凡的都市生活',
    brandConcept: '首创先租后买（Rent-to-own）理念与全数字化高效房产服务',
    errorInvalid: '邮箱或密码错误',
    successMsg: '登录成功！正在跳转...',
    mockAdminNote: '提示：您可以使用下方的测试账号直接登录后台，或点击SSO单点登录',
    useMockAdmin: '使用测试管理员账号'
  },
  ja: {
    welcome: 'STAYVERSEへようこそ',
    subtitle: 'ラグジュアリー不動産管理＆スマートブローカーツール',
    ssoButton: 'Stayverse SSOでログイン',
    orDivider: 'またはメールアドレスでログイン',
    emailLabel: 'メールアドレス',
    passwordLabel: 'パスワード',
    emailPlaceholder: 'メールアドレスを入力',
    passwordPlaceholder: 'パスワードを入力',
    rememberMe: 'ログイン状態を保持',
    forgotPassword: 'パスワードをお忘れですか？',
    signInBtn: 'ログイン',
    socialLogin: 'またはその他のアカウントでログイン',
    signUpText: 'アカウントをお持ちではありませんか？',
    signUpBtn: '新規登録',
    brandQuote: 'バンコクで最もプレステージなロケーションで叶える上質な暮らし',
    brandConcept: '革新的なレント・トゥ・オウン（先賃貸後購入）＆100%デジタル取引',
    errorInvalid: 'メールアドレスまたはパスワードが正しくありません',
    successMsg: 'ログインに成功しました！リダイレクト中...',
    mockAdminNote: '注意：下記のテストアカウントを使用して管理者としてログインするか、SSOボタンを使用できます',
    useMockAdmin: 'テスト管理者アカウントを使用'
  },
  ko: {
    welcome: 'STAYVERSE에 오신 것을 환영합니다',
    subtitle: '럭셔리 부동산 관리 및 스마트 브로커 툴',
    ssoButton: 'Stayverse SSO로 로그인',
    orDivider: '또는 이메일로 로그인',
    emailLabel: '이메일 주소',
    passwordLabel: '비밀번호',
    emailPlaceholder: '이메일을 입력하세요',
    passwordPlaceholder: '비밀번호를 입력하세요',
    rememberMe: '로그인 상태 유지',
    forgotPassword: '비밀번호를 잊으셨나요?',
    signInBtn: '로그인',
    socialLogin: '또는 소셜 계정으로 로그인',
    signUpText: '계정이 없으신가요?',
    signUpBtn: '회원가입',
    brandQuote: '방콕에서 가장 명성 높은 위치에서 누리는 품격 있는 도시 생활',
    brandConcept: '혁신적인 Rent-to-own 솔루션 및 100% 디지털 거래 시스템',
    errorInvalid: '이메일 또는 비밀번호가 올바르지 않습니다',
    successMsg: '로그인 성공! 이동 중...',
    mockAdminNote: '참고: 아래의 테스트 계정을 사용하여 관리자로 로그인하거나 SSO 버튼을 사용할 수 있습니다',
    useMockAdmin: '테스트 관리자 계정 사용'
  }
};

const languageFlags: Record<Language, string> = {
  th: '🇹🇭',
  en: '🇺🇸',
  ru: '🇷🇺',
  zh: '🇨🇳',
  ja: '🇯🇵',
  ko: '🇰🇷'
};

const languageNames: Record<Language, string> = {
  th: 'ไทย',
  en: 'English',
  ru: 'Русский',
  zh: '中文',
  ja: '日本語',
  ko: '한국어'
};

export default function LoginPage() {
  const router = useRouter();
  const { language, setLanguage } = useTranslation();
  const t = loginTranslations[language] || loginTranslations.en;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  // Auto fill mock user for testing if they want
  const handleFillMockAdmin = () => {
    setEmail('admin@stayverse.com');
    setPassword('admin1234');
    setError('');
  };

  const handleSSOLogin = () => {
    setLoading(true);
    // Dynamically construct redirect callback URL to match Keycloak parameters
    const redirectUri = encodeURIComponent(`${window.location.origin}/api/auth/callback`);
    const ssoUrl = `https://stayverse.app/auth/realms/stayverse/protocol/openid-connect/auth?client_id=stayverse-frontend&redirect_uri=${redirectUri}&response_type=code&scope=openid+profile+email&ui_locales=${language}&kc_locale=${language}`;
    window.location.href = ssoUrl;
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) return;

    setLoading(true);

    // Mock Authentication delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Admin mock bypass for demonstration
    if (email === 'admin@stayverse.com' && password === 'admin1234') {
      setSuccess(t.successMsg);
      if (typeof window !== 'undefined') {
        localStorage.setItem('stayverse_logged_in', 'true');
        localStorage.setItem('stayverse_user_email', email);
      }
      setTimeout(() => {
        router.push('/admin');
      }, 1200);
    } else {
      setError(t.errorInvalid);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#191B1C] flex items-center justify-center font-sans overflow-x-hidden relative">
      
      {/* Premium Language Swapper at top-right */}
      <div className="absolute top-4 right-4 z-50">
        <div className="relative">
          <button
            onClick={() => setLangMenuOpen(!langMenuOpen)}
            className="flex items-center space-x-2 px-3.5 py-1.5 bg-[#191B1C]/80 backdrop-blur-md hover:bg-white/10 rounded-full border border-white/10 text-xs text-white shadow-lg transition-all cursor-pointer"
            id="login-lang-button"
          >
            <span>{languageFlags[language]}</span>
            <span className="font-semibold uppercase">{language}</span>
            <Globe className="w-3.5 h-3.5 text-[#CF7536]" />
          </button>

          <AnimatePresence>
            {langMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setLangMenuOpen(false)}
                ></div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-36 bg-[#1E2122] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
                >
                  {(Object.keys(languageFlags) as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs flex items-center space-x-2.5 hover:bg-[#CF7536]/20 hover:text-white transition-all duration-200 cursor-pointer ${language === lang ? 'bg-[#CF7536]/10 text-[#CF7536] font-bold' : 'text-gray-300'}`}
                    >
                      <span>{languageFlags[lang]}</span>
                      <span>{languageNames[lang]}</span>
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Main Split Screen Container Card */}
      <div className="w-full max-w-6xl min-h-[600px] bg-[#1E2122]/95 border border-white/5 rounded-none md:rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Panel: Luxury Brand Presentation (Col Span 5) */}
        <div className="lg:col-span-5 relative hidden lg:flex flex-col justify-between p-10 overflow-hidden bg-black">
          {/* Background image with high-end overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&q=80" 
              alt="Luxury Building" 
              className="w-full h-full object-cover opacity-50 transform scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E2122] via-[#1E2122]/50 to-black/20"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1E2122]"></div>
          </div>

          {/* Top Logo and Back to home */}
          <div className="relative z-10 flex justify-between items-center select-none">
            <a href="/" className="flex items-center space-x-2 group">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#CF7536] to-[#A15A28] flex items-center justify-center text-white font-extrabold text-xs shadow-md transition-all group-hover:scale-105">
                SV
              </div>
              <span className="font-extrabold text-base tracking-tight text-white">
                STAY<span className="text-[#CF7536]">VERSE</span>
              </span>
            </a>
            
            <a 
              href="/" 
              className="text-xs font-semibold text-gray-400 hover:text-white flex items-center gap-1 transition-all duration-200"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </a>
          </div>

          {/* Core Brand value proposition messages */}
          <div className="relative z-10 my-auto pt-16 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <span className="bg-[#CF7536]/20 text-[#CF7536] border border-[#CF7536]/30 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Luxury Real Estate
              </span>
              <h2 className="text-3xl font-extrabold text-white leading-tight">
                Discover the Art of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CF7536] to-[#F39D66]">
                  Refined Living
                </span>
              </h2>
              <p className="text-sm text-gray-300 font-light leading-relaxed">
                {t.brandQuote}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-start space-x-3.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-xl"
            >
              <div className="w-8 h-8 rounded-lg bg-[#CF7536]/20 flex items-center justify-center text-[#CF7536] shrink-0 mt-0.5">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white mb-1">Stayverse Ecosystem</h4>
                <p className="text-[11px] text-gray-400 leading-normal font-light">{t.brandConcept}</p>
              </div>
            </motion.div>
          </div>

          {/* Bottom Copyright */}
          <div className="relative z-10 text-[10px] text-gray-500 font-semibold select-none">
            © 2026 STAYVERSE CO., LTD. ALL RIGHTS RESERVED.
          </div>
        </div>

        {/* Right Panel: Clean interactive Form inputs (Col Span 7) */}
        <div className="lg:col-span-7 flex flex-col justify-center p-8 md:p-14 bg-[#1E2122]">
          
          {/* Logo visible only on mobile */}
          <div className="flex lg:hidden justify-between items-center mb-8 select-none">
            <a href="/" className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#CF7536] to-[#A15A28] flex items-center justify-center text-white font-extrabold text-xs shadow-md">
                SV
              </div>
              <span className="font-extrabold text-base tracking-tight text-white">
                STAY<span className="text-[#CF7536]">VERSE</span>
              </span>
            </a>
            
            <a 
              href="/" 
              className="text-xs font-semibold text-gray-400 hover:text-white flex items-center gap-1 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </a>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">{t.welcome}</h1>
              <p className="text-xs text-gray-400 font-light mt-1.5">{t.subtitle}</p>
            </div>

            {/* Error and Success Banners */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-red-500/10 border border-red-500/35 text-red-400 text-xs px-4 py-3 rounded-xl flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                  <span className="font-medium">{error}</span>
                </motion.div>
              )}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-green-500/10 border border-green-500/35 text-green-400 text-xs px-4 py-3 rounded-xl flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  <span className="font-medium">{success}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Big Prominent SSO Login Button */}
            <button
              type="button"
              onClick={handleSSOLogin}
              disabled={loading}
              className="w-full bg-[#CF7536] hover:bg-[#A15A28] disabled:bg-[#CF7536]/50 text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-all duration-300 transform active:scale-[0.98] shadow-[0_4px_20px_rgba(207,117,54,0.3)] hover:shadow-[0_6px_25px_rgba(207,117,54,0.4)] cursor-pointer flex items-center justify-center gap-2 select-none"
              id="sso-login-button"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Shield className="w-4 h-4 text-white" />
                  <span>{t.ssoButton}</span>
                </>
              )}
            </button>

            {/* Divider lines */}
            <div className="flex items-center gap-3 py-2 select-none">
              <div className="flex-1 h-[1px] bg-white/10"></div>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{t.orDivider}</span>
              <div className="flex-1 h-[1px] bg-white/10"></div>
            </div>

            {/* Traditional Email Form */}
            <form onSubmit={handleEmailLogin} className="space-y-4">
              {/* Email field */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{t.emailLabel}</label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder={t.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-[#131516] border border-white/10 focus:border-[#CF7536] rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none transition-all duration-200 font-medium"
                    id="login-email-input"
                  />
                  <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-600" />
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{t.passwordLabel}</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t.passwordPlaceholder}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    required
                    className="w-full pl-10 pr-11 py-3 bg-[#131516] border border-white/10 focus:border-[#CF7536] rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none transition-all duration-200 font-medium"
                    id="login-password-input"
                  />
                  <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-600" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 p-1 hover:text-white text-gray-500 rounded transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot options */}
              <div className="flex items-center justify-between text-xs select-none">
                <label className="flex items-center gap-2 text-gray-400 font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={() => setRemember(!remember)}
                    disabled={loading}
                    className="w-4 h-4 rounded border-white/15 text-[#CF7536] bg-[#131516] focus:ring-[#CF7536]/30 cursor-pointer"
                  />
                  <span>{t.rememberMe}</span>
                </label>
                <a href="#" className="text-[#CF7536] hover:text-[#A15A28] font-bold transition-all">
                  {t.forgotPassword}
                </a>
              </div>

              {/* Email Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#131516] border border-white/15 hover:border-[#CF7536] hover:bg-white hover:text-black disabled:bg-gray-800 disabled:border-transparent disabled:text-gray-500 font-bold py-3 px-4 rounded-xl text-sm transition-all duration-300 transform active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 select-none mt-2"
                id="login-email-submit"
              >
                {loading && !success ? (
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>{t.signInBtn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Social logins */}
            <div className="space-y-4 pt-4 select-none">
              <div className="flex items-center gap-3">
                <div className="flex-1 h-[1px] bg-white/5"></div>
                <span className="text-[9px] text-gray-600 uppercase tracking-widest font-bold">{t.socialLogin}</span>
                <div className="flex-1 h-[1px] bg-white/5"></div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <button type="button" className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#131516] hover:bg-white/5 border border-white/5 hover:border-white/10 rounded-xl text-xs text-gray-300 font-semibold cursor-pointer transition-all">
                  <Chrome className="w-4 h-4 text-red-400" />
                  <span className="hidden sm:inline">Google</span>
                </button>
                <button type="button" className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#131516] hover:bg-white/5 border border-white/5 hover:border-white/10 rounded-xl text-xs text-gray-300 font-semibold cursor-pointer transition-all">
                  <Facebook className="w-4 h-4 text-blue-500" />
                  <span className="hidden sm:inline">Facebook</span>
                </button>
                <button type="button" className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#131516] hover:bg-white/5 border border-white/5 hover:border-white/10 rounded-xl text-xs text-gray-300 font-semibold cursor-pointer transition-all">
                  <Apple className="w-4 h-4 text-white" />
                  <span className="hidden sm:inline">Apple</span>
                </button>
              </div>
            </div>

            {/* Mock Admin Help Block */}
            <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-2xl space-y-2">
              <p className="text-[10px] text-gray-400 font-light leading-normal">{t.mockAdminNote}</p>
              <div className="flex items-center justify-between text-[11px] font-mono select-all">
                <div className="text-gray-300">
                  Email: <span className="text-[#CF7536]">admin@stayverse.com</span> <br />
                  Pass: <span className="text-[#CF7536]">admin1234</span>
                </div>
                <button 
                  onClick={handleFillMockAdmin}
                  type="button"
                  className="bg-[#CF7536]/20 hover:bg-[#CF7536]/30 text-[#CF7536] px-2.5 py-1 rounded text-[10px] font-bold font-sans cursor-pointer transition-all select-none"
                >
                  {t.useMockAdmin}
                </button>
              </div>
            </div>

            {/* Sign Up switcher */}
            <div className="text-center text-xs select-none pt-2">
              <span className="text-gray-400 font-medium">{t.signUpText} </span>
              <a href="#" className="text-[#CF7536] hover:text-[#A15A28] font-bold transition-all ml-1">
                {t.signUpBtn}
              </a>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
