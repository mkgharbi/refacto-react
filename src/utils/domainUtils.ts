/**
 * Extracts the country code from a domain string.
 * @param domain - The domain string (e.g., 'US_OK-WOK')
 * @returns The country code (e.g., 'US')
 */
export function extractCountry(domain: string): string {
  return domain.substring(0, 2);
}

/**
 * Extracts the classification from a domain string.
 * @param domain - The domain string (e.g., 'US_OK-WOK')
 * @returns The classification (e.g., 'OK')
 */
export function extractClassification(domain: string): string {
  return domain.substring(3, 5);
}

/**
 * Extracts the sub-classification from a domain string.
 * @param domain - The domain string (e.g., 'US_OK-WOK')
 * @returns The sub-classification (e.g., 'WOK')
 */
export function extractSubClassification(domain: string): string {
  return domain.substring(6);
}

/**
 * Returns a list of unique country codes from a list of domains.
 */
export function getCountries(domains: string[]): string[] {
  const result: string[] = [];
  for (let i = 0; i < domains.length; i++) {
    const country = extractCountry(domains[i]);
    if (!result.includes(country)) {
      result.push(country);
    }
  }
  return result;
}

/**
 * Returns a list of unique classifications from a list of domains.
 */
export function getClassifications(domains: string[]): string[] {
  const result: string[] = [];
  for (let i = 0; i < domains.length; i++) {
    const classification = extractClassification(domains[i]);
    result.push(classification);
  }
  return Array.from(new Set(result));
}

/**
 * Returns a list of unique sub-classifications from a list of domains.
 */
export function getSubClassifications(domains: string[]): string[] {
  const result: string[] = [];
  for (let i = 0; i < domains.length; i++) {
    const subClassification = extractSubClassification(domains[i]);
    if (!result.includes(subClassification)) {
      result.push(subClassification);
    }
  }
  return result;
}
