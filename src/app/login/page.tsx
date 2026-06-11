"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Landmark, Mail, Phone, User, LogIn, Eye, EyeOff, ArrowRight, Globe2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  createAuthSession,
  generateOtp,
  isAdminCredential,
  isAdminIdentifier,
} from '@/lib/auth';

type AuthMode = 'login' | 'otp' | 'guest';

export default function LoginPage() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const handleSendOtp = () => {
    if (!phone) return;
    setAuthError('');
    setIsLoading(true);
    setTimeout(() => {
      setGeneratedOtp(generateOtp());
      setOtp('');
      setOtpSent(true);
      setIsLoading(false);
    }, 1500);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (isAdminIdentifier(email) && !isAdminCredential(email, password)) {
      setAuthError('Invalid email, phone number, or password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const isAdmin = isAdminCredential(email, password);
      createAuthSession(isAdmin ? 'admin' : 'user', email);
      window.location.href = isAdmin ? '/admin' : '/';
    }, 900);
  };

  const handleOtpSubmit = () => {
    setAuthError('');

    if (otp !== generatedOtp) {
      setAuthError('The OTP does not match. Please enter the latest generated code.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      createAuthSession('user', phone);
      window.location.href = '/';
    }, 900);
  };

  const handleGoogleSignIn = () => {
    setAuthError('');
    setIsLoading(true);
    setTimeout(() => {
      createAuthSession('user', 'google-user');
      window.location.href = '/';
    }, 900);
  };

  const handleGuestContinue = () => {
    createAuthSession('guest', 'guest');
  };

  const handleModeChange = (nextMode: AuthMode) => {
    setMode(nextMode);
    setAuthError('');
    setIsLoading(false);
    if (nextMode !== 'otp') {
      setOtp('');
      setGeneratedOtp('');
      setOtpSent(false);
    }
  };

  const resetOtp = () => {
    setOtp('');
    setGeneratedOtp('');
    setOtpSent(false);
    setAuthError('');
  };

  const handleIdentifierChange = (value: string) => {
    setEmail(value);
    if (authError) setAuthError('');
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    if (otpSent) resetOtp();
    if (authError) setAuthError('');
  };

  const handleOtpChange = (value: string) => {
    setOtp(value.replace(/\D/g, '').slice(0, 6));
    if (authError) setAuthError('');
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (authError) setAuthError('');
  };

  const handleTogglePassword = () => {
    setShowPassword((current) => !current);
  };

  const canSendOtp = phone.trim().length >= 10;

  const canSubmitOtp = otp.length === 6 && Boolean(generatedOtp);

  const canSubmitPassword = email.trim().length > 0 && password.trim().length > 0;

  const otpMessage = generatedOtp
    ? `OTP generated for ${phone}. Your code is ${generatedOtp}.`
    : '';

  const passwordPlaceholder = 'Enter your password';

  const loginDescription = mode === 'login'
    ? 'Sign in to continue your heritage journey.'
    : 'Sign in to continue your heritage journey';

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-gradient-to-br from-background via-accent to-background p-12 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
        </div>

        <Link href="/" className="flex items-center space-x-2 relative z-10">
          <Landmark className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold tracking-tight">Smart Heritage</span>
        </Link>

        <div className="relative z-10 space-y-8">
          <div>
            <h2 className="text-4xl font-bold tracking-tight leading-tight mb-4">
              Your Personal AI Guide to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-600">
                India&apos;s Heritage
              </span>
            </h2>
            <p className="text-foreground/70 text-lg leading-relaxed">
              Discover monuments, earn digital stamps, get AI-powered tours, and explore history like never before.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { icon: '🤖', text: 'AI Chatbot — Ask anything about monuments' },
              { icon: '🎙️', text: 'Voice Guide — Automatic narration at sites' },
              { icon: '🏆', text: 'Digital Passport — Earn badges & stamps' },
              { icon: '📸', text: 'Image Recognition — Snap & identify instantly' },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 bg-accent/50 backdrop-blur-sm rounded-xl px-4 py-3 border border-border/30">
                <span className="text-xl">{feature.icon}</span>
                <span className="text-sm text-foreground/80">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-foreground/40 text-sm relative z-10">© 2026 Smart Heritage Guide — Hackathon Project</p>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md space-y-6">
          {/* Logo for mobile */}
          <div className="flex lg:hidden items-center justify-center gap-2 mb-8">
            <Landmark className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold">Smart Heritage</span>
          </div>

          <Card className="glass border-border/50 shadow-2xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
              <CardDescription>{loginDescription}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Auth Mode Tabs */}
              <div className="flex bg-accent rounded-lg p-1 gap-1">
                {([['login', 'Email'], ['otp', 'OTP'], ['guest', 'Guest']] as [AuthMode, string][]).map(([m, label]) => (
                  <button
                    key={m}
                    onClick={() => handleModeChange(m)}
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      mode === m
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'text-foreground/60 hover:text-foreground'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {authError && (
                <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {authError}
                </div>
              )}

              {/* Email Login */}
              {mode === 'login' && (
                <form onSubmit={handlePasswordSubmit} className="space-y-4" autoComplete="off">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email or Phone Number</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
                      <input
                        type="text"
                        name="login-identifier"
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck={false}
                        value={email}
                        onChange={(e) => handleIdentifierChange(e.target.value)}
                        className="w-full bg-accent/50 border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password</label>
                    <div className="relative">
                      <LogIn className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="login-password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => handlePasswordChange(e.target.value)}
                        placeholder={passwordPlaceholder}
                        className="w-full bg-accent/50 border border-border rounded-lg pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        required
                      />
                      <button type="button" onClick={handleTogglePassword} className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground">
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20" disabled={isLoading || !canSubmitPassword}>
                    {isLoading ? 'Signing In...' : (
                      <><LogIn className="h-4 w-4 mr-2" /> Sign In</>
                    )}
                  </Button>
                </form>
              )}

              {/* OTP Login */}
              {mode === 'otp' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
                      <input
                        type="tel"
                        name="otp-phone"
                        autoComplete="off"
                        value={phone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        className="w-full bg-accent/50 border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </div>
                  </div>
                  {!otpSent ? (
                    <Button onClick={handleSendOtp} className="w-full bg-primary hover:bg-primary/90" disabled={isLoading || !canSendOtp}>
                      {isLoading ? 'Generating...' : <><ArrowRight className="h-4 w-4 mr-2" /> Generate OTP</>}
                    </Button>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Enter OTP</label>
                        <input
                          type="text"
                          value={otp}
                          onChange={(e) => handleOtpChange(e.target.value)}
                          placeholder="6-digit OTP"
                          maxLength={6}
                          className="w-full bg-accent/50 border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-center tracking-[0.5em] font-mono text-lg transition-all"
                        />
                        <p className="text-xs text-green-500 text-center">{otpMessage}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button onClick={resetOtp} variant="outline" disabled={isLoading}>
                          Change Number
                        </Button>
                        <Button onClick={handleOtpSubmit} className="bg-primary hover:bg-primary/90" disabled={isLoading || !canSubmitOtp}>
                        {isLoading ? 'Verifying...' : 'Verify & Sign In'}
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Guest Mode */}
              {mode === 'guest' && (
                <div className="space-y-4">
                  <div className="bg-accent/50 rounded-xl p-4 border border-border/50 text-sm text-foreground/70 space-y-2">
                    <p className="font-medium text-foreground">👀 Browse as Guest</p>
                    <p>You can explore heritage sites, use the AI chatbot, and listen to voice guides. Sign up to unlock your digital passport and badges.</p>
                  </div>
                  <Link href="/">
                    <Button className="w-full" variant="outline" onClick={handleGuestContinue}>
                      <User className="h-4 w-4 mr-2" /> Continue as Guest
                    </Button>
                  </Link>
                </div>
              )}

              {/* Divider */}
              {mode !== 'guest' && (
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-foreground/40">Or continue with</span>
                  </div>
                </div>
              )}

              {/* Google OAuth */}
              {mode !== 'guest' && (
                <Button variant="outline" className="w-full gap-2 hover:bg-accent/50" onClick={handleGoogleSignIn}>
                <Globe2 className="h-4 w-4" />
                  Sign in with Google
                </Button>
              )}
            </CardContent>
          </Card>

          <p className="text-center text-sm text-foreground/50">
            Don&apos;t have an account?{' '}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
