import { useMemo } from 'react';

interface Props {
  domains?: string[]
}

const DomainFilter = (props: Props) => {
  const domains = useMemo(() => props?.domains ?? [], [props.domains]);

  const countries = useMemo<string[]>(() => {
    const result: string[] = [];
    for (let i = 0; i < domains.length; i++) {
      const country = domains[i].substring(0, 2);
      if (!result.includes(country)) {
        result.push(country);
      }
    }
    return result;
  }, [domains]);

  const classifications = useMemo<string[]>(() => {
    const result: string[] = [];
    for (let i = 0; i < domains.length; i++) {
      const classification = domains[i].substring(3, 5);
      result.push(classification);
    }
    return Array.from(new Set(result));
  }, [domains]);

  const subClassifications = useMemo<string[]>(() => {
    const result: string[] = [];
    for (let i = 0; i < domains.length; i++) {
      const subClassification = domains[i].substring(6);
      if (!result.includes(subClassification)) {
        result.push(subClassification);
      }
    }
    return result;
  }, [domains]);

  return (
    <>
      <select name="countries" multiple aria-label="countries">
            {countries.map((country) => (
              <option value={country} key={country}>
                {country}
              </option>
            ))}
          </select>
      <select name="classifications" multiple aria-label="classifications">
            {classifications.map((classification) => (
              <option value={classification} key={classification}>
                {classification}
              </option>
            ))}
          </select>
      <select name="subClassifications" multiple aria-label="subClassifications">
            {subClassifications.map((subClassification) => (
              <option value={subClassification} key={subClassification}>
                {subClassification}
              </option>
            ))}
          </select>
        </>
  );
}

export default DomainFilter;
