'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import Textarea from '@/components/atoms/Textarea';
import Button from '@/components/atoms/Button';
import { contactFormSchema, type ContactFormValues } from '@/lib/validation';

export default function ContactForm() {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      positions: '',
      type: '',
      source: '',
      message: '',
    },
  });

  const getError = (field: keyof ContactFormValues) => {
    const err = errors[field]?.message;
    if (!err) return undefined;
    // Map zod error keys to translation keys
    if (err === 'required') return t('required');
    if (err === 'invalidEmail') return t('invalidEmail');
    if (err === 'invalidPhone') return t('invalidPhone');
    return err;
  };

  const onSubmit = async (data: ContactFormValues) => {
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  const typeOptions = [
    { value: 'executive', label: t('typeOptions.executive') },
    { value: 'suite', label: t('typeOptions.suite') },
    { value: 'floor', label: t('typeOptions.floor') },
    { value: 'event', label: t('typeOptions.event') },
    { value: 'other', label: t('typeOptions.other') },
  ];

  const sourceOptions = [
    { value: 'search', label: t('sourceOptions.search') },
    { value: 'social', label: t('sourceOptions.social') },
    { value: 'referral', label: t('sourceOptions.referral') },
    { value: 'press', label: t('sourceOptions.press') },
    { value: 'other', label: t('sourceOptions.other') },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          id="firstName"
          label={t('firstName')}
          error={getError('firstName')}
          {...register('firstName')}
        />
        <Input
          id="lastName"
          label={t('lastName')}
          error={getError('lastName')}
          {...register('lastName')}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          id="email"
          type="email"
          label={t('email')}
          error={getError('email')}
          {...register('email')}
        />
        <Input
          id="phone"
          type="tel"
          label={t('phone')}
          error={getError('phone')}
          {...register('phone')}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          id="company"
          label={t('company')}
          error={getError('company')}
          {...register('company')}
        />
        <Input
          id="positions"
          label={t('positions')}
          type="number"
          {...register('positions')}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          id="type"
          label={t('type')}
          options={typeOptions}
          placeholder={t('typePlaceholder')}
          error={getError('type')}
          {...register('type')}
        />
        <Select
          id="source"
          label={t('source')}
          options={sourceOptions}
          placeholder={t('sourcePlaceholder')}
          {...register('source')}
        />
      </div>

      <Textarea
        id="message"
        label={t('message')}
        error={getError('message')}
        {...register('message')}
      />

      <Button
        type="submit"
        variant="secondary"
        size="lg"
        className="w-full"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? t('sending') : t('submit')}
      </Button>

      <AnimatePresence>
        {status === 'success' && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-green-600 text-sm text-center"
          >
            {t('success')}
          </motion.p>
        )}
        {status === 'error' && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-red-500 text-sm text-center"
          >
            {t('error')}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
