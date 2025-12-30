'use client';

import React, { useState } from 'react';
import { X, ArrowRight, Loader2 } from 'lucide-react';
import { useUserStore } from '@/store/user';
import { api } from '@/lib/api';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthStep = 'PHONE' | 'OTP' | 'SIGNUP';

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [step, setStep] = useState<AuthStep>('PHONE');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useUserStore();

  const [flow, setFlow] = useState<'SIGNIN' | 'SIGNUP'>('SIGNIN');

  if (!isOpen) return null;

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error } = await api.POST('/auth/signin', {
      body: { phone },
    });

    setIsLoading(false);
    if (error) {
      setError(error.message || 'An unexpected error occurred.');
    } else {
      setFlow('SIGNIN');
      setStep('OTP');
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const endpoint = flow === 'SIGNUP' ? '/auth/signup/verify' : '/auth/signin/verify';
    const { data, error } = await api.POST(endpoint, {
      body: { phone, code: otp },
    });

    setIsLoading(false);
    if (error) {
      setError('Invalid or expired OTP. Please try again.');
    } else if (data) {
      setUser(data.user, data.accessToken);
      onClose();
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error } = await api.POST('/auth/signup', {
      body: { phone, fullName },
    });

    setIsLoading(false);
    if (error) {
      setError(error.message || 'An unexpected error occurred.');
    } else {
      setFlow('SIGNUP');
      setStep('OTP');
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    if (/[^0-9]/.test(value)) return;

    const newOtp = otp.split('');
    newOtp[index] = value;
    setOtp(newOtp.join(''));

    // Move to next input
    if (value && e.target.nextElementSibling instanceof HTMLInputElement) {
      e.target.nextElementSibling.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl bg-background rounded-2xl shadow-2xl border border-foreground/10 overflow-hidden transform transition-all animate-fade-in-up flex">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-foreground/5 text-foreground/60 hover:text-foreground transition-colors z-50"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side - Pattern Background */}
        <div
          className="hidden md:flex w-72 relative overflow-hidden items-center justify-center"
          style={{
            backgroundImage: 'url(/images/pattern.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />

        {/* Right Side - Form Content */}
        <div className="flex-1 relative">
          {/* Decorative Background Shapes for mobile */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none md:hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-50" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/10 rounded-full blur-3xl opacity-50" />
          </div>

        <div className="p-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {step === 'PHONE' && 'Welcome Back'}
              {step === 'OTP' && 'Verify Your Phone'}
              {step === 'SIGNUP' && 'Create Account'}
            </h2>
            <p className="text-foreground/60 text-sm">
              {step === 'PHONE' && 'Enter your phone number to sign in'}
              {step === 'OTP' && `We sent a code to ${phone}`}
              {step === 'SIGNUP' && 'Join the community to share your experience'}
            </p>
          </div>

          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

          {/* Forms */}
          {step === 'PHONE' && (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 234 567 8900"
                  className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-foreground/5 text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-foreground/30"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-secondary hover:bg-secondary-600 text-secondary-foreground font-semibold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-secondary/25"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Continue <ArrowRight className="w-4 h-4" /></>}
              </button>
              <div className="mt-6 text-center text-sm">
                <span className="text-foreground/60">Don&apos;t have an account? </span>
                <button
                  type="button"
                  onClick={() => setStep('SIGNUP')}
                  className="text-primary font-semibold hover:underline"
                >
                  Sign up
                </button>
              </div>
            </form>
          )}

          {step === 'OTP' && (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div className="flex justify-center gap-2">
                {[...Array(6)].map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    value={otp[i] || ''}
                    onChange={(e) => handleOtpChange(e, i)}
                    className="w-12 h-12 text-center text-2xl font-bold rounded-xl border border-foreground/10 bg-foreground/5 text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    required
                  />
                ))}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-secondary hover:bg-secondary-600 text-secondary-foreground font-semibold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-secondary/25"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Verify & Login'}
              </button>
              <button
                type="button"
                onClick={() => setStep('PHONE')}
                className="w-full text-sm text-foreground/60 hover:text-foreground transition-colors"
              >
                Change phone number
              </button>
            </form>
          )}

          {step === 'SIGNUP' && (
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-foreground/5 text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-foreground/30"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 234 567 8900"
                  className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-foreground/5 text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-foreground/30"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-secondary hover:bg-secondary-600 text-secondary-foreground font-semibold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-secondary/25"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
              </button>
              <div className="mt-6 text-center text-sm">
                <span className="text-foreground/60">Already have an account? </span>
                <button
                  type="button"
                  onClick={() => setStep('PHONE')}
                  className="text-primary font-semibold hover:underline"
                >
                  Log in
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
