'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Button from '@/components/ui/Button';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { submitContactForm } from '@/app/actions/contact';

// We define a lighter schema for quick product inquiry
const productInquirySchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  companyName: z.string().min(2, { message: 'Company name must be at least 2 characters' }),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 digits' }),
  email: z.string().email({ message: 'Invalid email address' }),
  city: z.string().min(2, { message: 'City is required' }),
  state: z.string().min(2, { message: 'State is required' }),
  businessType: z.string().min(1, { message: 'Required' }),
  requirement: z.string().min(1), // Passed via defaultValues
  productInterested: z.string().min(1), // Passed via defaultValues
  message: z.string().min(10, { message: 'Please provide some details (min 10 chars)' }),
  budget: z.string().min(1, { message: 'Required' }),
  timeline: z.string().min(1, { message: 'Required' }),
  source: z.string().min(1), // Passed via defaultValues
  website_field: z.string().optional(),
});

interface InquiryModalProps {
  productName: string;
}

export default function ProductInquiryModal({ productName }: InquiryModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof productInquirySchema>>({
    resolver: zodResolver(productInquirySchema),
    defaultValues: {
      productInterested: productName,
      requirement: 'Product Specific Inquiry',
      source: 'Website Product Detail',
      website_field: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof productInquirySchema>) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await submitContactForm(data);
      if (response.success) {
        setSubmitSuccess(true);
        reset();
        setTimeout(() => {
          setSubmitSuccess(false);
          setIsOpen(false);
        }, 3000);
      } else {
        setSubmitError(response.message || 'Validation error. Please verify the fields.');
      }
    } catch (err) {
      const error = err as Error;
      setSubmitError(error.message || 'Failed to submit request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className="w-full sm:w-auto">
        Request Technical Quote
      </Button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-brand-dark/75 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-brand-border p-6 bg-brand-light-gray">
                <div>
                  <h3 className="font-sans font-bold text-lg text-brand-dark">
                    Inquire: {productName}
                  </h3>
                  <p className="text-xs text-brand-gray">
                    Our technical representatives will configure specifications and submit estimates.
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-brand-border text-brand-gray hover:text-brand-dark cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {submitSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center space-y-4"
                  >
                    <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                      <Check className="w-8 h-8 animate-bounce" />
                    </div>
                    <h4 className="font-sans font-bold text-lg text-brand-dark">Quote Request Logged</h4>
                    <p className="text-sm text-brand-gray max-w-sm">
                      Thank you! Your quote request for **{productName}** has been written to our Google Sheet. An engineer will follow up shortly.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Honeypot field for bot spam prevention */}
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
                        placeholder="John Doe"
                        error={errors.name?.message}
                        {...register('name')}
                      />
                      <Input
                        label="Company Name"
                        placeholder="ABC Industries"
                        error={errors.companyName?.message}
                        {...register('companyName')}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Email Address"
                        type="email"
                        placeholder="john@company.com"
                        error={errors.email?.message}
                        {...register('email')}
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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Select
                        label="Business Type"
                        options={[
                          { label: '-- Select --', value: '' },
                          { label: 'Architect / Consultant', value: 'Architect / Consultant' },
                          { label: 'Industrial Client', value: 'Industrial Client' },
                          { label: 'Contractor (EPC)', value: 'Contractor' },
                          { label: 'Retailer / Dealer', value: 'Retailer / Dealer' },
                          { label: 'Government Dept.', value: 'Government' },
                        ]}
                        error={errors.businessType?.message}
                        {...register('businessType')}
                      />
                      <Select
                        label="Estimated Budget"
                        options={[
                          { label: '-- Select --', value: '' },
                          { label: 'Under ₹1 Lakh', value: 'Under 1L' },
                          { label: '₹1 Lakh - ₹5 Lakhs', value: '1L - 5L' },
                          { label: '₹5 Lakhs - ₹20 Lakhs', value: '5L - 20L' },
                          { label: 'Above ₹20 Lakhs', value: 'Above 20L' },
                        ]}
                        error={errors.budget?.message}
                        {...register('budget')}
                      />
                      <Select
                        label="Project Timeline"
                        options={[
                          { label: '-- Select --', value: '' },
                          { label: 'Immediate (< 15 days)', value: 'Immediate' },
                          { label: 'Within 30 Days', value: '1 Month' },
                          { label: '1 to 3 Months', value: '1-3 Months' },
                          { label: 'Planning Stage', value: 'Planning' },
                        ]}
                        error={errors.timeline?.message}
                        {...register('timeline')}
                      />
                    </div>

                    <Textarea
                      label="Inquiry & Specification Requirements"
                      placeholder="Specify your height constraints, target lux levels, quantity requirements, etc."
                      error={errors.message?.message}
                      {...register('message')}
                    />

                    <div className="pt-4 border-t border-brand-border flex justify-end gap-3">
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => setIsOpen(false)}
                        disabled={isSubmitting}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        loading={isSubmitting}
                        icon={<Send className="w-4 h-4" />}
                      >
                        Submit Technical Inquiry
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
