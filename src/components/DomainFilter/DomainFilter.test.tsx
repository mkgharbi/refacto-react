import '@testing-library/jest-dom'
import { render, screen, within } from '@testing-library/react'
import DomainFilter from './DomainFilter.component'

describe('DomainFilter', () => {
  it('renders three select elements for countries, classifications, and subClassifications', () => {
    render(<DomainFilter domains={['US_OK-WOK', 'FR_NK-WOL', 'EN_BL-WOL']} />)
    expect(
      screen.getByRole('listbox', { name: 'countries' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('listbox', { name: 'classifications' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('listbox', { name: 'subClassifications' })
    ).toBeInTheDocument()
  })

  it('renders correct country options from domains', () => {
    render(<DomainFilter domains={['US_OK-WOK', 'FR_NK-WOL', 'EN_BL-WOL']} />)
    const countriesSelect = screen.getByRole('listbox', { name: 'countries' })
    expect(screen.getByText('US')).toBeInTheDocument()
    expect(screen.getByText('FR')).toBeInTheDocument()
    expect(screen.getByText('EN')).toBeInTheDocument()
    expect(within(countriesSelect).getAllByRole('option')).toHaveLength(3)
  })

  it('renders correct classification options from domains', () => {
    render(<DomainFilter domains={['US_OK-WOK', 'FR_NK-WOL', 'EN_BL-WOL']} />)
    const classificationsSelect = screen.getByRole('listbox', {
      name: 'classifications',
    })
    expect(screen.getByText('OK')).toBeInTheDocument()
    expect(screen.getByText('NK')).toBeInTheDocument()
    expect(screen.getByText('BL')).toBeInTheDocument()
    expect(within(classificationsSelect).getAllByRole('option')).toHaveLength(3)
  })

  it('renders correct subClassification options from domains', () => {
    render(<DomainFilter domains={['US_OK-WOK', 'FR_NK-WOL', 'EN_BL-WOL']} />)
    const subClassificationsSelect = screen.getByRole('listbox', {
      name: 'subClassifications',
    })
    expect(screen.getByText('WOK')).toBeInTheDocument()
    expect(screen.getByText('WOL')).toBeInTheDocument()
    expect(
      within(subClassificationsSelect).getAllByRole('option')
    ).toHaveLength(2)
  })

  it('renders empty selects when domains is an empty array', () => {
    render(<DomainFilter domains={[]} />)
    expect(
      within(screen.getByRole('listbox', { name: 'countries' })).queryAllByRole(
        'option'
      )
    ).toHaveLength(0)
    expect(
      within(
        screen.getByRole('listbox', { name: 'classifications' })
      ).queryAllByRole('option')
    ).toHaveLength(0)
    expect(
      within(
        screen.getByRole('listbox', { name: 'subClassifications' })
      ).queryAllByRole('option')
    ).toHaveLength(0)
  })

  it('renders empty selects when domains is undefined', () => {
    render(<DomainFilter />)
    expect(
      within(screen.getByRole('listbox', { name: 'countries' })).queryAllByRole(
        'option'
      )
    ).toHaveLength(0)
    expect(
      within(
        screen.getByRole('listbox', { name: 'classifications' })
      ).queryAllByRole('option')
    ).toHaveLength(0)
    expect(
      within(
        screen.getByRole('listbox', { name: 'subClassifications' })
      ).queryAllByRole('option')
    ).toHaveLength(0)
  })

  it('preserves order of first occurrence for countries', () => {
    render(<DomainFilter domains={['FRAB12', 'USCD34', 'FRAB56']} />)
    const countryOptions = within(
      screen.getByRole('listbox', { name: 'countries' })
    )
      .getAllByRole('option')
      .map((opt) => opt.textContent)
    expect(countryOptions).toEqual(['FR', 'US'])
  })

  it('updates options when domains prop changes', () => {
    const { rerender } = render(<DomainFilter domains={['FRAB12']} />)
    expect(screen.getByText('FR')).toBeInTheDocument()
    rerender(<DomainFilter domains={['USCD34']} />)
    expect(screen.getByText('US')).toBeInTheDocument()
    expect(screen.queryByText('FR')).not.toBeInTheDocument()
  })
})
