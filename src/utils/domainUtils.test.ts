import {
    extractClassification,
    extractCountry,
    extractSubClassification,
    getClassifications,
    getCountries,
    getSubClassifications,
} from './domainUtils';

describe('domainUtils', () => {
  const domains = [
    'US_OK-WOK',
    'FR_NK-WOL',
    'FR_OK-NPP',
    'EN_NK-NRP',
    'EN_BL-WOL',
  ];

  it('extractCountry returns correct country code', () => {
    expect(extractCountry('US_OK-WOK')).toBe('US');
    expect(extractCountry('FR_NK-WOL')).toBe('FR');
  });

  it('extractClassification returns correct classification', () => {
    expect(extractClassification('US_OK-WOK')).toBe('OK');
    expect(extractClassification('FR_NK-WOL')).toBe('NK');
  });

  it('extractSubClassification returns correct sub-classification', () => {
    expect(extractSubClassification('US_OK-WOK')).toBe('WOK');
    expect(extractSubClassification('FR_NK-WOL')).toBe('WOL');
  });

  it('getCountries returns unique country codes in order', () => {
    expect(getCountries(domains)).toEqual(['US', 'FR', 'EN']);
  });

  it('getClassifications returns unique classifications in order', () => {
    expect(getClassifications(domains)).toEqual(['OK', 'NK', 'BL']);
  });

  it('getSubClassifications returns unique sub-classifications in order', () => {
    expect(getSubClassifications(domains)).toEqual(['WOK', 'WOL', 'NPP', 'NRP']);
  });
});
