export const transform = (raw: any): TAddress => ({
  code: raw?.code || '',
  region_code: raw?.region_code || '',
  province_code: raw?.province_code || '',
  name: raw?.name || '',
  municipality_code: raw?.municipality_code || '',
  barangay_code: raw?.barangay_code || '',
});
