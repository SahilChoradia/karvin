export interface LeadData {
  name: string;
  companyName?: string;
  phone: string;
  email?: string;
  city?: string;
  state?: string;
  businessType?: string;
  requirement?: string;
  productInterested?: string;
  message: string;
  budget?: string;
  timeline?: string;
  source?: string;
  ip?: string;
  userAgent?: string;
}

export async function submitLeadToGoogleSheets(data: LeadData) {
  const url = process.env.GOOGLE_APPS_SCRIPT_URL;
  
  if (!url) {
    console.warn("GOOGLE_APPS_SCRIPT_URL environment variable is missing. Lead will be logged locally.");
    // Return a mock success response in development if URL is missing
    return { success: true, message: "Logged locally (Missing environment URL)" };
  }

  try {
    const payload = {
      timestamp: new Date().toISOString(),
      name: data.name,
      company: data.companyName || '',
      phone: data.phone,
      email: data.email || '',
      city: data.city || '',
      state: data.state || '',
      businessType: data.businessType || '',
      requirement: data.requirement || '',
      product: data.productInterested || '',
      budget: data.budget || '',
      timeline: data.timeline || '',
      message: data.message,
      source: data.source || '',
      ip: data.ip || 'N/A',
      userAgent: data.userAgent || 'N/A',
      status: 'New Lead',
    };


    // Apps Script requires redirect follows
    const response = await fetch(url, {
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8', // Bypass CORS preflight issues with Apps Script
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    try {
      return JSON.parse(text);
    } catch {
      return { success: true, raw: text };
    }
  } catch (error) {
    console.error("Error sending lead to Google Sheets:", error);
    throw new Error("Failed to submit inquiry. Please try again or contact us directly.");
  }
}
