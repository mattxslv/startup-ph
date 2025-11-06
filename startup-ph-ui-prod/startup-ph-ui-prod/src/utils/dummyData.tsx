import { TStartup } from '@/feature/startup/types';

export const generateDummyStartups = (page: number, limit: number) => {
  const startIndex = (page - 1) * limit;
  const totalItems = 100; // Total dummy items available

  const dummyStartups: TStartup[] = Array.from({ length: limit }).map((_, index) => ({
    id: String(startIndex + index + 1),
    name: `Startup ${startIndex + index + 1}`,
    logo_url: `https://picsum.photos/200/200?random=${startIndex + index + 1}`,
    description: `This is a description for Startup ${
      startIndex + index + 1
    }. They are doing amazing things in technology and innovation.`,
    founder_name: `Founder ${startIndex + index + 1}`,
    founding_year: String(2020 + (index % 4)),
    address_label: `Address ${startIndex + index + 1}`,
    region_code: `R${(index % 16) + 1}`,
    province_code: `P${(index % 81) + 1}`,
    municipality_code: `M${(index % 144) + 1}`,
    barangay_code: `B${(index % 42000) + 1}`,
    street: `Street ${startIndex + index + 1}`,
    street_two: `Building ${startIndex + index + 1}`,
    postal_code: String(1000 + (index % 1000)),
    short_description: `Short description for Startup ${startIndex + index + 1}`,
    social_website_url: `https://startup${startIndex + index + 1}.com`,
    social_instagram_url: `https://instagram.com/startup${startIndex + index + 1}`,
    social_facebook_url: `https://facebook.com/startup${startIndex + index + 1}`,
    social_linkedin_url: `https://linkedin.com/company/startup${startIndex + index + 1}`,
    business_classification: ['Tech', 'Innovation', 'Software'][index % 3],
    development_phase: ['Seed', 'Early Stage', 'Growth', 'Mature'][index % 4],
    sectors: [],
    tin: `${123456789 + index}`,
    permit_number: `PERMIT-${2023}-${1000 + index}`,
    registration_no: `REG-${2023}-${2000 + index}`,
    proof_of_registration_url: `https://example.com/proof${index + 1}.pdf`,
    assessment_tags: [],
    business_name: `Business ${startIndex + index + 1} Corp.`,
    remarks: `Additional notes for Startup ${startIndex + index + 1}`,
    corporation_name: `Corporation ${startIndex + index + 1}`,
    dti_permit_number: `DTI-${2023}-${4000 + index}`,
    sec_permit_number: `SEC-${2023}-${5000 + index}`,
    fundings: [],
    has_funding: 1,
    startup_number: `SN-${2023}-${3000 + index}`,
    display_address: `${startIndex + index + 1} Tech Street, Innovation City`,
    business_certificate_expiration_date: '',
    business_mobile_no: '',
    slug: '',
    status: 'UNVERIFIED',
  }));

  return {
    list: dummyStartups,
    meta: {
      current_page: page,
      from: startIndex + 1,
      last_page: Math.ceil(totalItems / limit),
      per_page: limit,
      to: Math.min(startIndex + limit, totalItems),
      total: totalItems,
    },
  };
};
