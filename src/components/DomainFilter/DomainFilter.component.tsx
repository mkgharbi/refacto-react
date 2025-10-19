import { useMemo } from 'react';
import { getClassifications, getCountries, getSubClassifications } from '../../utils/domainUtils';

interface Props {
  domains?: string[]
}

const DomainFilter = (props: Props) => {
  const domains = useMemo(() => props?.domains ?? [], [props.domains]);

  const countries = useMemo(() => getCountries(domains), [domains]);
  const classifications = useMemo(() => getClassifications(domains), [domains]);
  const subClassifications = useMemo(() => getSubClassifications(domains), [domains]);

  return (
    <>
      <select name="countries" multiple aria-label="countries">
        {countries.map((country: string) => (
              <option value={country} key={country}>
                {country}
              </option>
            ))}
      </select>
      <select name="classifications" multiple aria-label="classifications">
        {classifications.map((classification: string) => (
              <option value={classification} key={classification}>
                {classification}
              </option>
            ))}
      </select>
      <select name="subClassifications" multiple aria-label="subClassifications">
        {subClassifications.map((subClassification: string) => (
              <option value={subClassification} key={subClassification}>
                {subClassification}
              </option>
            ))}
      </select>
    </>
  );
}

export default DomainFilter;
