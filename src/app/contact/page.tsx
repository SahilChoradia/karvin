'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Phone, MapPin, Clock, Send, Check, Facebook, Linkedin, Twitter, Instagram } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { submitContactForm } from '@/app/actions/contact';
import { contactSchema, type ContactFormData } from '@/lib/validation';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';

function ContactFormContent() {
  const searchParams = useSearchParams();
  const productParam = searchParams.get('product') || '';

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      website_field: '',
    },
  });

  // Pre-fill product in message if query param changes
  useEffect(() => {
    if (productParam) {
      setValue('message', `Interested in product: ${productParam}\n\nAdditional requirements: `);
    }
  }, [productParam, setValue]);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await submitContactForm(data);
      if (response.success) {
        setSubmitSuccess(true);
        reset();
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 6000);
      } else {
        setSubmitError(response.message || 'Validation error. Please verify input fields.');
      }
    } catch (err) {
      const error = err as Error;
      setSubmitError(error.message || 'Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Banner */}
      <section className="bg-brand-dark text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1500"
            alt="Contact Banner"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 space-y-4 pt-10">
          <ScrollReveal variant="text-mask-left">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-brand-red">
              Connect With Us
            </h4>
          </ScrollReveal>
          <ScrollReveal variant="text-mask-left" delay={0.1}>
            <h1 className="font-serif font-black text-4xl md:text-6xl text-white">
              Request Engineering Consultation
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Split layout */}
      <section className="py-20 max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Coordinates */}
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-4">
              <ScrollReveal variant="text-mask-left">
                <h2 className="font-serif font-black text-3xl text-brand-dark tracking-tight">
                  KARVIN Power Systems Pvt. Ltd.
                </h2>
              </ScrollReveal>
            </div>

            {/* Google Map (Covering 50% of the left column height visually) */}
            <ScrollReveal variant="slide-right" delay={0.15}>
              <div className="w-full h-[500px] md:h-[550px] rounded-2xl overflow-hidden border border-brand-border luxury-shadow">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.7818451838634!2d72.8624131!3d19.0732439!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8ef40000001%3A0xc07a8fe8b56f8f1c!2sBandra%20Kurla%20Complex%2C%20Bandra%20East%2C%20Mumbai%2C%20Maharashtra%20400051!5e0!3m2!1sen!2sin!4v1719398000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mumbai HQ Map Location"
                />
              </div>
            </ScrollReveal>

            {/* Coordinates List (Moved below the map) */}
            <ul className="space-y-6">
              <ScrollReveal variant="slide-right" delay={0.2}>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-red-light rounded-xl flex items-center justify-center text-brand-red shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="font-sans text-sm text-brand-gray leading-relaxed">
                    <h4 className="font-display font-bold text-brand-dark">Corporate Office</h4>
                    <p>Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051</p>
                  </div>
                </li>
              </ScrollReveal>

              <ScrollReveal variant="slide-right" delay={0.25}>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-red-light rounded-xl flex items-center justify-center text-brand-red shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="font-sans text-sm text-brand-gray">
                    <h4 className="font-display font-bold text-brand-dark">Direct Call</h4>
                    <a href="tel:+912212345678" className="hover:text-brand-red transition-colors font-semibold">
                      +91 22 1234 5678
                    </a>
                  </div>
                </li>
              </ScrollReveal>

              <ScrollReveal variant="slide-right" delay={0.3}>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-red-light rounded-xl flex items-center justify-center text-brand-red shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="font-sans text-sm text-brand-gray">
                    <h4 className="font-display font-bold text-brand-dark">Email Routing</h4>
                    <a href="mailto:info@karvinpower.com" className="hover:text-brand-red transition-colors font-semibold">
                      info@karvinpower.com
                    </a>
                  </div>
                </li>
              </ScrollReveal>

              <ScrollReveal variant="slide-right" delay={0.35}>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-red-light rounded-xl flex items-center justify-center text-brand-red shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="font-sans text-sm text-brand-gray">
                    <h4 className="font-display font-bold text-brand-dark">Operational Hours</h4>
                    <p>Monday - Saturday: 09:00 AM - 06:00 PM IST</p>
                  </div>
                </li>
              </ScrollReveal>
            </ul>

            {/* Social Media Links */}
            <ScrollReveal variant="slide-right" delay={0.4}>
              <div className="space-y-3 pt-4 border-t border-brand-border/40">
                <h4 className="font-display font-bold text-xs uppercase tracking-widest text-brand-red">
                  Connect With Us
                </h4>
                <div className="flex items-center gap-4">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center text-brand-gray hover:bg-brand-red hover:text-white hover:border-brand-red transition-all shadow-sm"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center text-brand-gray hover:bg-brand-red hover:text-white hover:border-brand-red transition-all shadow-sm"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center text-brand-gray hover:bg-brand-red hover:text-white hover:border-brand-red transition-all shadow-sm"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center text-brand-gray hover:bg-brand-red hover:text-white hover:border-brand-red transition-all shadow-sm"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-5">
            <ScrollReveal variant="slide-left" delay={0.15}>
              <div className="bg-brand-light-gray p-8 rounded-2xl border border-brand-border luxury-shadow h-full">
                <div className="mb-6 space-y-2">
                  <h3 className="font-display font-bold text-xl text-brand-dark">
                    Submit Inquiry Form
                  </h3>
                </div>

                {submitSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center space-y-4 bg-white rounded-xl border border-brand-border"
                  >
                    <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                      <Check className="w-8 h-8 animate-bounce" />
                    </div>
                    <h4 className="font-display font-bold text-lg text-brand-dark">Lead Submission Successful</h4>
                    <p className="text-sm text-brand-gray max-w-sm font-sans px-4">
                      Thank you! Your inquiry has been submitted.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Honeypot anti-spam check */}
                    <input
                      type="text"
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                      {...register('website_field')}
                    />

                    {submitError && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs font-semibold">
                        {submitError}
                      </div>
                    )}

                    <Input
                      label="Full Name *"
                      placeholder="John Doe"
                      error={errors.name?.message}
                      {...register('name')}
                    />

                    <Input
                      label="Phone Number *"
                      type="tel"
                      placeholder="9876543210"
                      error={errors.phone?.message}
                      {...register('phone')}
                    />

                    <Textarea
                      label="Remark / Additional Requirement *"
                      placeholder="Enter details..."
                      error={errors.message?.message}
                      {...register('message')}
                    />

                    <div className="pt-4 border-t border-brand-border/40 flex justify-end">
                      <Button
                        type="submit"
                        loading={isSubmitting}
                        className="w-full sm:w-auto font-bold"
                        icon={<Send className="w-4 h-4" />}
                      >
                        Submit Technical Lead
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white text-brand-gray">
        Loading Contact Forms...
      </div>
    }>
      <ContactFormContent />
    </Suspense>
  );
}
