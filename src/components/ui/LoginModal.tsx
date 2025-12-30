'use client';

import React, { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { useUserStore } from '@/store/user';
import { api } from '@/lib/api';
import { setAuthCookie } from '@/lib/cookies';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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
  const [flow, setFlow] = useState<'SIGNIN' | 'SIGNUP'>('SIGNIN');
  const { setUser } = useUserStore();

  // Sign in mutation
  const signInMutation = useMutation({
    mutationFn: async (phoneNumber: string) => {
      const { error } = await api.POST('/auth/signin', {
        body: { phone: phoneNumber },
      });
      if (error) {
        throw new Error((error as { message?: string }).message || 'An unexpected error occurred.');
      }
    },
    onSuccess: () => {
      setFlow('SIGNIN');
      setStep('OTP');
    },
  });

  // Signup request mutation
  const signupMutation = useMutation({
    mutationFn: async (data: { phone: string; fullName: string }) => {
      const { error } = await api.POST('/auth/signup', {
        body: { phone: data.phone, fullName: data.fullName },
      });
      if (error) {
        throw new Error((error as { message?: string }).message || 'An unexpected error occurred.');
      }
    },
    onSuccess: () => {
      setFlow('SIGNUP');
      setStep('OTP');
    },
  });

  // OTP verification mutation
  const verifyOtpMutation = useMutation({
    mutationFn: async (data: { phone: string; code: string; isSignup: boolean }) => {
      const endpoint = data.isSignup ? '/auth/signup/verify' : '/auth/signin/verify';
      const { data: responseData, error } = await api.POST(endpoint, {
        body: { phone: data.phone, code: data.code },
      });
      if (error) {
        throw new Error('Invalid or expired OTP. Please try again.');
      }
      return responseData;
    },
    onSuccess: (data) => {
      if (data && data.user && data.accessToken) {
        // Set cookie for persistence across page refreshes
        setAuthCookie(data.accessToken);
        setUser(data.user as { id: number; phone: string; fullName: string; isVerified: boolean }, data.accessToken);
        onClose();
      }
    },
  });

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signInMutation.mutate(phone);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verifyOtpMutation.mutate({ phone, code: otp, isSignup: flow === 'SIGNUP' });
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signupMutation.mutate({ phone, fullName });
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

  // Determine current error and loading state based on active mutation
  const isLoading = signInMutation.isPending || signupMutation.isPending || verifyOtpMutation.isPending;
  const error =
    signInMutation.error?.message ||
    signupMutation.error?.message ||
    verifyOtpMutation.error?.message ||
    null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className=" max-w-md sm:max-w-md md:max-w-2xl lg:max-w-3xl p-0 overflow-hidden"
        showCloseButton={true}
      >
        <div className="flex min-h-[400px]">
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
          <div className="flex-1 relative min-w-[420px]">
            {/* Decorative Background Shapes for mobile */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none md:hidden">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-50" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/10 rounded-full blur-3xl opacity-50" />
            </div>

            <div className="p-8 relative z-10">
              {/* Header */}
              <DialogHeader className="text-center mb-8">
                <DialogTitle className="text-2xl font-bold">
                  {step === 'PHONE' && 'Welcome Back'}
                  {step === 'OTP' && 'Verify Your Phone'}
                  {step === 'SIGNUP' && 'Create Account'}
                </DialogTitle>
                <DialogDescription>
                  {step === 'PHONE' && 'Enter your phone number to sign in'}
                  {step === 'OTP' && `We sent a code to ${phone}`}
                  {step === 'SIGNUP' && 'Join the community to share your experience'}
                </DialogDescription>
              </DialogHeader>

              {error && <p className="text-destructive text-sm text-center mb-4">{error}</p>}

              {/* Forms */}
              {step === 'PHONE' && (
                <form onSubmit={handlePhoneSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-1.5">Phone Number</label>
                    <Input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 234 567 8900"
                      className="h-12 rounded-xl"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    variant="secondary"
                    size="lg"
                    className="w-full h-12"
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Continue <ArrowRight className="w-4 h-4" /></>}
                  </Button>
                  <div className="mt-6 text-center text-sm">
                    <span className="text-muted-foreground">Don&apos;t have an account? </span>
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
                      <Input
                        key={i}
                        type="text"
                        maxLength={1}
                        value={otp[i] || ''}
                        onChange={(e) => handleOtpChange(e, i)}
                        className="w-12 h-12 text-center text-2xl font-bold rounded-xl"
                        required
                      />
                    ))}
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    variant="secondary"
                    size="lg"
                    className="w-full h-12"
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Verify & Login'}
                  </Button>
                  <button
                    type="button"
                    onClick={() => setStep('PHONE')}
                    className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Change phone number
                  </button>
                </form>
              )}

              {step === 'SIGNUP' && (
                <form onSubmit={handleSignupSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-1.5">Full Name</label>
                    <Input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="John Doe"
                      className="h-12 rounded-xl"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-1.5">Phone Number</label>
                    <Input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 234 567 8900"
                      className="h-12 rounded-xl"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    variant="secondary"
                    size="lg"
                    className="w-full h-12"
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
                  </Button>
                  <div className="mt-6 text-center text-sm">
                    <span className="text-muted-foreground">Already have an account? </span>
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
      </DialogContent>
    </Dialog>
  );
}
