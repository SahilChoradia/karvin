'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Briefcase, MapPin, CheckCircle2, ShieldCheck, Upload, Send, Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { JOB_OPENINGS } from '@/lib/data';
import { submitContactForm } from '@/app/actions/contact';
import ScrollReveal from '@/components/ui/ScrollReveal';

const careerFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  companyName: z.string().min(1), // Passed via defaultValues
  phone: z.string().min(10, { message: 'Phone number must be at least 10 digits' }),
  email: z.string().email({ message: 'Invalid email address' }),
  city: z.string().min(2, { message: 'City is required' }),
  state: z.string().min(2, { message: 'State is required' }),
  businessType: z.string().min(1), // Passed via defaultValues
  requirement: z.string().min(1, { message: 'Please select position applied for' }),
  productInterested: z.string().min(1), // Passed via defaultValues
  message: z.string().min(15, { message: 'Please write a brief cover letter (min 15 chars)' }),
  budget: z.string().min(1), // Passed via defaultValues
  timeline: z.string().min(1), // Passed via defaultValues
  source: z.string().min(1, { message: 'Please select how you heard about this role' }),
  website_field: z.string().optional(),
});

export default function CareersPage() {
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof careerFormSchema>>({
    resolver: zodResolver(careerFormSchema),
    defaultValues: {
      companyName: 'Job Applicant',
      businessType: 'Candidate',
      productInterested: 'Careers Portal',
      budget: 'N/A',
      timeline: 'Immediate',
      website_field: '',
    },
  });

  const handleApplyNow = (jobTitle: string) => {
    setValue('requirement', `Applying for: ${jobTitle}`);
    const formSection = document.getElementById('apply-form-section');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const onSubmit = async (data: z.infer<typeof careerFormSchema>) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await submitContactForm(data);
      if (response.success) {
        setSubmitSuccess(true);
        reset();
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } else {
        setSubmitError(response.message || 'Validation error. Please verify input fields.');
      }
    } catch (err) {
      const error = err as Error;
      setSubmitError(error.message || 'Failed to submit application.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    { title: 'Advanced R&D Equipment', desc: 'Work inside fully equipped electronics development labs and thermal chambers in Mumbai.' },
    { title: 'Comprehensive Healthcare', desc: 'Family medical coverage, wellness incentives, and work-life balance policies.' },
    { title: 'Mentorship & Growth', desc: 'Collaborate directly under managing officers and learn high-voltage safety engineering.' },
    { title: 'Performance Bonuses', desc: 'Structured quarterly rewards aligned directly to project delivery milestones.' }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Banner */}
      <section className="bg-brand-dark text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1500"
            alt="Careers Banner"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 space-y-4 pt-10">
          <ScrollReveal variant="text-mask-left">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-brand-red">
              Join Our Team
            </h4>
          </ScrollReveal>
          <ScrollReveal variant="text-mask-left" delay={0.1}>
            <h1 className="font-serif font-black text-4xl md:text-6xl text-white">
              Careers at KARVIN
            </h1>
          </ScrollReveal>

        </div>
      </section>

      {/* Culture & Benefits */}
      <section className="py-20 max-w-7xl mx-auto px-6 md:px-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <ScrollReveal variant="text-mask-left">
              <h2 className="font-serif font-black text-3xl text-brand-dark leading-tight">
                A Culture Centered Around Engineering Integrity.
              </h2>
            </ScrollReveal>

            <ScrollReveal variant="slide-right" delay={0.2}>
              <div className="flex items-center gap-2.5 text-xs text-brand-gray font-sans font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-5 h-5 text-brand-red" /> An equal opportunity employer
              </div>
            </ScrollReveal>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((b, idx) => (
              <ScrollReveal key={idx} variant="slide-left" delay={idx * 0.1}>
                <div className="p-6 rounded-xl border border-brand-border bg-white shadow-sm space-y-2 h-full">
                  <h4 className="font-display font-bold text-sm text-brand-dark flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-red" /> {b.title}
                  </h4>

                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions List */}
      <section className="py-20 bg-brand-light-gray border-t border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="max-w-3xl mb-12 space-y-4">
            <ScrollReveal variant="text-mask-left">
              <h4 className="font-display font-bold text-xs uppercase tracking-widest text-brand-red">
                Openings
              </h4>
            </ScrollReveal>
            <ScrollReveal variant="text-mask-left" delay={0.1}>
              <h2 className="font-serif font-black text-3xl text-brand-dark">
                Explore Active Openings
              </h2>
            </ScrollReveal>
          </div>

          <div className="space-y-6 max-w-4xl">
            {JOB_OPENINGS.map((job, idx) => {
              const isSelected = selectedJobId === job.id;
              return (
                <ScrollReveal key={job.id} variant="slide-right" delay={idx * 0.05}>
                  <div
                    className="bg-white border border-brand-border rounded-2xl overflow-hidden shadow-sm transition-all animate-fade-in"
                  >
                    <button
                      onClick={() => setSelectedJobId(isSelected ? null : job.id)}
                      className="w-full text-left p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-brand-light-gray/50 transition-colors focus:outline-none cursor-pointer"
                    >
                      <div className="space-y-2">
                        <h3 className="font-display font-bold text-lg md:text-xl text-brand-dark hover:text-brand-red transition-colors">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-brand-gray font-sans font-semibold">
                          <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {job.department}</span>
                          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                          <span>Exp: {job.experience}</span>
                          <span>{job.type}</span>
                        </div>
                      </div>
                      <span className="text-xs font-display font-bold text-brand-red uppercase tracking-wider shrink-0">
                        {isSelected ? 'Collapse Details' : 'View Job Details'}
                      </span>
                    </button>

                    {isSelected && (
                      <div className="px-6 md:px-8 pb-8 pt-2 border-t border-brand-border/40 space-y-6 font-sans text-sm text-brand-gray">
                        <p>{job.description}</p>
                        
                        <div className="space-y-3">
                          <h4 className="font-display font-bold text-brand-dark uppercase tracking-wider text-xs">
                            Requirements
                          </h4>
                          <ul className="list-disc list-inside space-y-1.5 pl-2">
                            {job.requirements.map((req, idx) => (
                              <li key={idx}>{req}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-display font-bold text-brand-dark uppercase tracking-wider text-xs">
                            Responsibilities
                          </h4>
                          <ul className="list-disc list-inside space-y-1.5 pl-2">
                            {job.responsibilities.map((resp, idx) => (
                              <li key={idx}>{resp}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-4 border-t border-brand-border/40">
                          <Button onClick={() => handleApplyNow(job.title)}>
                            Apply For This Position
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply-form-section" className="py-20 max-w-4xl mx-auto px-6 scroll-mt-28">
        <div className="text-center mb-10 space-y-2">
          <ScrollReveal variant="text-mask">
            <h2 className="font-serif font-black text-2xl md:text-3xl text-brand-dark">
              Submit Your Application
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={0.1}>
            <p className="text-sm text-brand-gray font-sans">
              Please fill in your coordinates and copy in a brief cover letter.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal variant="fade-up" delay={0.2}>
          <div className="bg-white border border-brand-border p-8 rounded-2xl luxury-shadow">
            {submitSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center space-y-4"
              >
                <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <Check className="w-8 h-8 animate-bounce" />
                </div>
                <h4 className="font-display font-bold text-lg text-brand-dark">Application Written to Google Sheets</h4>
                <p className="text-sm text-brand-gray max-w-md font-sans">
                  We have saved your coordinates. Our HR representative will review your cover letter and contact you if your profile matches our requirements.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Honeypot */}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    placeholder="Jane Doe"
                    error={errors.name?.message}
                    {...register('name')}
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="9876543210"
                    error={errors.phone?.message}
                    {...register('phone')}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="jane@example.com"
                    error={errors.email?.message}
                    {...register('email')}
                  />
                  <Select
                    label="Position Applied For"
                    options={[
                      { label: '-- Select position --', value: '' },
                      { label: 'Senior Electronics Engineer (LED Drivers)', value: 'Applying for: Senior Electronics Engineer' },
                      { label: 'Senior Lighting Simulation Specialist (Dialux)', value: 'Applying for: Senior Lighting Simulation Specialist' },
                      { label: 'Technical Sales Representative', value: 'Applying for: Technical Sales Representative' },
                      { label: 'Other / General Inquiry', value: 'Applying for: Other Position' },
                    ]}
                    error={errors.requirement?.message}
                    {...register('requirement')}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="City"
                    placeholder="Mumbai"
                    error={errors.city?.message}
                    {...register('city')}
                  />
                  <Input
                    label="State"
                    placeholder="Maharashtra"
                    error={errors.state?.message}
                    {...register('state')}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="How did you hear about us?"
                    options={[
                      { label: '-- Select --', value: '' },
                      { label: 'LinkedIn Job Board', value: 'LinkedIn' },
                      { label: 'Company Website', value: 'Direct' },
                      { label: 'Employee Referral', value: 'Referral' },
                      { label: 'Other', value: 'Other' },
                    ]}
                    error={errors.source?.message}
                    {...register('source')}
                  />
                  <div className="flex flex-col gap-1.5 justify-end">
                    <span className="text-xs text-brand-gray font-sans font-semibold pb-1.5 flex items-center gap-1">
                      <Upload className="w-3.5 h-3.5" /> Resume attachment is managed during HR callback.
                    </span>
                  </div>
                </div>

                <Textarea
                  label="Cover Letter / Introduce Yourself"
                  placeholder="Explain why you are interested in joining KARVIN Power Systems..."
                  error={errors.message?.message}
                  {...register('message')}
                />

                <div className="pt-4 border-t border-brand-border flex justify-end">
                  <Button
                    type="submit"
                    loading={isSubmitting}
                    className="w-full sm:w-auto animate-pulse-slow"
                    icon={<Send className="w-4 h-4" />}
                  >
                    Submit Application
                  </Button>
                </div>
              </form>
            )}
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
