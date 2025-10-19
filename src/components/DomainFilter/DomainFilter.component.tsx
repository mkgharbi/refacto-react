import { useMemo } from 'react';
import { getClassifications, getCountries, getSubClassifications } from '../../utils/domainUtils';
import Select from '../Select/Select';

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
      <Select name="countries" options={countries} multiple aria-label="countries" />
      <Select name="classifications" options={classifications} multiple aria-label="classifications" />
      <Select name="subClassifications" options={subClassifications} multiple aria-label="subClassifications" />
    </>
  );
}

export default DomainFilter;
