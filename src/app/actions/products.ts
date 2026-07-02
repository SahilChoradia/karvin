'use server';

import fs from 'fs';
import path from 'path';

export interface AddProductData {
  name: string;
  category: string;
  subCategory?: string;
  description: string;
  longDescription?: string;
  features: string[];
  specifications: {
    'Wattage Range'?: string;
    'Input Voltage'?: string;
    'Power Factor'?: string;
    'Luminous Efficacy'?: string;
    'IP Rating'?: string;
    'CRI'?: string;
    'CCT (Color Temp)'?: string;
    'Lifespan'?: string;
    'Surge Protection'?: string;
    'Housing Material'?: string;
    'Beam Angle'?: string;
    'Driver Details'?: string;
  };
  applications: string[];
  image?: string;
  downloadUrl?: string;
}

export async function addProduct(productData: AddProductData) {
  try {
    const dataFilePath = path.join(process.cwd(), 'src', 'lib', 'data.ts');
    
    if (!fs.existsSync(dataFilePath)) {
      return { success: false, message: 'Source data file not found.' };
    }

    const fileContent = fs.readFileSync(dataFilePath, 'utf8');

    // Generate unique slug and id
    const slug = productData.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const id = `kv-${slug}`;

    // Default values if empty
    const image = productData.image?.trim() || 'https://images.unsplash.com/photo-1507537362848-9c7e7303124e?auto=format&fit=crop&q=80&w=800';
    const downloadUrl = productData.downloadUrl?.trim() || '/catalogues/karvin-custom-catalog.pdf';

    // Format specifications safely
    const specEntries = Object.entries(productData.specifications)
      .filter(([, v]) => v !== undefined && v !== '')
      .map(([k, v]) => `      ${JSON.stringify(k)}: ${JSON.stringify(v)}`)
      .join(',\n');
    const specsFormatted = `{\n${specEntries}\n    }`;

    // Format new product block using JSON.stringify for absolute safety
    const newProductBlock = `  {
    id: ${JSON.stringify(id)},
    slug: ${JSON.stringify(slug)},
    name: ${JSON.stringify(productData.name)},
    category: ${JSON.stringify(productData.category)},
    subCategory: ${productData.subCategory ? JSON.stringify(productData.subCategory) : 'undefined'},
    description: ${JSON.stringify(productData.description)},
    longDescription: ${productData.longDescription ? JSON.stringify(productData.longDescription) : 'undefined'},
    features: ${JSON.stringify(productData.features)},
    specifications: ${specsFormatted},
    applications: ${JSON.stringify(productData.applications)},
    image: ${JSON.stringify(image)},
    downloadUrl: ${JSON.stringify(downloadUrl)}
  },`;

    // Locate insertion point in fileContent (PRODUCTS array start)
    const targetStr = 'export const PRODUCTS: Product[] = [';
    
    const normalizedContent = fileContent.replace(/\r\n/g, '\n');
    const targetIdx = normalizedContent.indexOf(targetStr);

    if (targetIdx === -1) {
      return { success: false, message: 'Could not find PRODUCTS array in data.ts.' };
    }

    // Insert block right after "["
    const insertionPoint = targetIdx + targetStr.length;
    const preContent = normalizedContent.substring(0, insertionPoint);
    const postContent = normalizedContent.substring(insertionPoint);

    const updatedNormalizedContent = `${preContent}\n${newProductBlock}${postContent}`;
    
    // Write back with CRLF line endings for compatibility
    const updatedContent = updatedNormalizedContent.replace(/\n/g, '\r\n');
    fs.writeFileSync(dataFilePath, updatedContent, 'utf8');

    return { success: true, slug };
  } catch (error) {
    console.error('Failed to add product:', error);
    return { success: false, message: (error as Error).message || 'An unknown error occurred.' };
  }
}
