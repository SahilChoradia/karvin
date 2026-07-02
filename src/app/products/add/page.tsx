'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, Check, AlertCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { addProduct, type AddProductData } from '@/app/actions/products';
import { PRODUCTS } from '@/lib/data';

export default function AddProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Extract unique categories for selection
  const [existingCategories, setExistingCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [newCategoryName, setNewCategoryName] = useState<string>('');
  const [isCustomCategory, setIsCustomCategory] = useState(false);

  useEffect(() => {
    const cats = Array.from(new Set(PRODUCTS.map((p) => p.category))).filter(Boolean);
    setExistingCategories(cats);
    if (cats.length > 0) {
      setSelectedCategory(cats[0]);
    } else {
      setIsCustomCategory(true);
    }
  }, []);

  const handleCategorySelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedCategory(val);
    if (val === 'CUSTOM_NEW') {
      setIsCustomCategory(true);
    } else {
      setIsCustomCategory(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const formData = new FormData(e.currentTarget);
    
    const name = formData.get('name') as string;
    const category = isCustomCategory ? newCategoryName.trim() : selectedCategory;
    const subCategory = formData.get('subCategory') as string;
    const description = formData.get('description') as string;
    const longDescription = formData.get('longDescription') as string;
    const image = formData.get('image') as string;
    const downloadUrl = formData.get('downloadUrl') as string;

    // Process lists (features & applications) split by newline
    const featuresRaw = formData.get('features') as string;
    const features = featuresRaw
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const applicationsRaw = formData.get('applications') as string;
    const applications = applicationsRaw
      .split('\n')
      .map((a) => a.trim())
      .filter(Boolean);

    if (!name || !category || !description) {
      setErrorMsg('Product Name, Category, and Description are required fields.');
      setIsSubmitting(false);
      return;
    }

    const specifications = {
      'Wattage Range': formData.get('spec_wattage') as string || undefined,
      'Input Voltage': formData.get('spec_voltage') as string || undefined,
      'Power Factor': formData.get('spec_pf') as string || undefined,
      'Luminous Efficacy': formData.get('spec_efficacy') as string || undefined,
      'IP Rating': formData.get('spec_ip') as string || undefined,
      'CRI': formData.get('spec_cri') as string || undefined,
      'CCT (Color Temp)': formData.get('spec_cct') as string || undefined,
      'Lifespan': formData.get('spec_lifespan') as string || undefined,
      'Surge Protection': formData.get('spec_surge') as string || undefined,
      'Housing Material': formData.get('spec_material') as string || undefined,
      'Beam Angle': formData.get('spec_beam') as string || undefined,
      'Driver Details': formData.get('spec_driver') as string || undefined,
    };

    const payload: AddProductData = {
      name,
      category,
      subCategory: subCategory || undefined,
      description,
      longDescription: longDescription || undefined,
      features,
      specifications,
      applications,
      image: image || undefined,
      downloadUrl: downloadUrl || undefined,
    };

    try {
      const result = await addProduct(payload);
      if (result.success) {
        setSuccessMsg(`Successfully added product: "${name}". Redirecting...`);
        // Refresh router caching to fetch new static data
        router.refresh();
        setTimeout(() => {
          router.push(`/products/${result.slug}`);
        }, 2000);
      } else {
        setErrorMsg(result.message || 'Failed to add the product.');
      }
    } catch {
      setErrorMsg('An unexpected error occurred during submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectOptions = [
    ...existingCategories.map((c) => ({ label: c, value: c })),
    { label: '+ Add New Category...', value: 'CUSTOM_NEW' },
  ];

  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6 md:px-8 space-y-8">
        
        {/* Back Link */}
        <div className="flex items-center justify-between border-b border-brand-border/60 pb-6">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-display font-bold text-brand-gray hover:text-brand-red transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Catalog
          </Link>
          <div className="text-xs text-brand-gray font-sans">
            Add New Product
          </div>
        </div>

        {/* Header Title */}
        <div className="space-y-2">
          <h1 className="font-serif font-black text-3xl md:text-5xl text-brand-dark tracking-tight">
            Add Catalog Product
          </h1>
          <p className="text-sm text-brand-gray font-sans">
            Submit a new luminaire or lighting fixture to the KARVIN product catalog. The product will be dynamically compiled into the systems catalog.
          </p>
        </div>

        {/* Status Messages */}
        {errorMsg && (
          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-sans">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>{errorMsg}</div>
          </div>
        )}
        {successMsg && (
          <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm font-sans">
            <Check className="w-5 h-5 shrink-0 mt-0.5" />
            <div>{successMsg}</div>
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-10">
          
          {/* General Information Section */}
          <div className="bg-brand-light-gray/60 p-6 md:p-8 rounded-2xl border border-brand-border space-y-6">
            <h3 className="font-display font-bold text-base text-brand-dark uppercase tracking-wider border-b border-brand-border/60 pb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-brand-red rounded-full" /> General Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Product Name *"
                name="name"
                placeholder="e.g. Lumina Premium street light"
                required
              />
              <Input
                label="Subcategory (Optional)"
                name="subCategory"
                placeholder="e.g. High Bay / Low Bay"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-sans font-medium text-brand-dark">
                  Category *
                </label>
                <select
                  value={selectedCategory}
                  onChange={handleCategorySelectChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-brand-dark transition-all focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red appearance-none cursor-pointer"
                >
                  {selectOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {isCustomCategory && (
                <Input
                  label="New Category Name *"
                  name="customCategory"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="e.g. Garden Lights"
                  required
                />
              )}
            </div>

            <Textarea
              label="Short Description *"
              name="description"
              placeholder="Provide a concise 1-2 sentence description for lists and search indexing..."
              required
            />

            <Textarea
              label="Long Description (Optional)"
              name="longDescription"
              placeholder="Provide an in-depth product summary highlighting materials, engineering background, and core technical details..."
            />
          </div>

          {/* Technical Specifications Section */}
          <div className="bg-brand-light-gray/60 p-6 md:p-8 rounded-2xl border border-brand-border space-y-6">
            <h3 className="font-display font-bold text-base text-brand-dark uppercase tracking-wider border-b border-brand-border/60 pb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-brand-red rounded-full" /> Technical Specifications
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Wattage Range" name="spec_wattage" placeholder="e.g. 100W / 150W / 200W" />
              <Input label="Input Voltage" name="spec_voltage" placeholder="e.g. 140V - 300V AC, 50Hz" />
              <Input label="Power Factor" name="spec_pf" placeholder="e.g. > 0.98" />
              <Input label="Luminous Efficacy" name="spec_efficacy" placeholder="e.g. 160 lm/W" />
              <Input label="IP Rating" name="spec_ip" placeholder="e.g. IP65" />
              <Input label="CRI" name="spec_cri" placeholder="e.g. > 80" />
              <Input label="CCT (Color Temp)" name="spec_cct" placeholder="e.g. 3000K / 5700K" />
              <Input label="Lifespan" name="spec_lifespan" placeholder="e.g. 50,000 Hours" />
              <Input label="Surge Protection" name="spec_surge" placeholder="e.g. 10kV external, 6kV internal" />
              <Input label="Housing Material" name="spec_material" placeholder="e.g. High Pressure Die-Cast Aluminum" />
              <Input label="Beam Angle" name="spec_beam" placeholder="e.g. 60° / 90° / 120°" />
              <Input label="Driver Details" name="spec_driver" placeholder="e.g. KARVIN Constant Current Driver" />
            </div>
          </div>

          {/* Details & Copywriting Section */}
          <div className="bg-brand-light-gray/60 p-6 md:p-8 rounded-2xl border border-brand-border space-y-6">
            <h3 className="font-display font-bold text-base text-brand-dark uppercase tracking-wider border-b border-brand-border/60 pb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-brand-red rounded-full" /> Advantages & Applications
            </h3>

            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-sans font-medium text-brand-dark">
                  Product Advantages (One per line)
                </label>
                <span className="text-xs text-brand-gray">Highlight primary product benefits. Enter each feature on a new line.</span>
              </div>
              <textarea
                name="features"
                rows={4}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-brand-dark transition-all placeholder:text-gray-400 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red min-h-[100px]"
                placeholder="e.g.&#10;In-house engineered LED driver with 6kV internal surge protection&#10;Advanced thermal management with copper heat-pipe technology"
              />
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-sans font-medium text-brand-dark">
                  Typical Applications (One per line)
                </label>
                <span className="text-xs text-brand-gray">Specify installation areas. Enter each application on a new line.</span>
              </div>
              <textarea
                name="applications"
                rows={4}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-brand-dark transition-all placeholder:text-gray-400 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red min-h-[100px]"
                placeholder="e.g.&#10;Automotive Assembly Plants&#10;Heavy Manufacturing Units"
              />
            </div>
          </div>

          {/* Attachments Section */}
          <div className="bg-brand-light-gray/60 p-6 md:p-8 rounded-2xl border border-brand-border space-y-6">
            <h3 className="font-display font-bold text-base text-brand-dark uppercase tracking-wider border-b border-brand-border/60 pb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-brand-red rounded-full" /> Assets & Attachments
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Image URL (Optional)"
                name="image"
                placeholder="e.g. https://images.unsplash.com/... or leave blank for placeholder"
              />
              <Input
                label="Datasheet PDF Download URL (Optional)"
                name="downloadUrl"
                placeholder="e.g. /catalogues/karvin-catalog.pdf"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-4 border-t border-brand-border/60 pt-8">
            <Link href="/products">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              icon={isSubmitting ? undefined : <Plus className="w-4 h-4" />}
            >
              {isSubmitting ? 'Adding Luminaire...' : 'Add Product to Catalog'}
            </Button>
          </div>

        </form>

      </div>
    </div>
  );
}
