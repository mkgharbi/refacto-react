import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getClassifications, getCountries, getSubClassifications } from '../../utils/domainUtils';
import { getDomains } from '../../redux/domains/selectors';
import Select from '../Select/Select';

const DomainFilter = () => {
  const domains = useSelector(getDomains);

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
