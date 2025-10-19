import { configureStore } from '@reduxjs/toolkit'
import '@testing-library/jest-dom'
import { render, screen, within } from '@testing-library/react'
import { act } from 'react'
import { Provider } from 'react-redux'
import { receiveDomains } from '../../redux/domains/actions'
import rootReducer from '../../redux/reducer'
import DomainFilter from './DomainFilter'

describe('DomainFilter', () => {
  const renderWithDomains = (domains?: string[]) => {
    const store = configureStore({ reducer: rootReducer, preloadedState: { domains: domains ?? [] } as any })
    return {
      store,
      ...render(
        <Provider store={store}>
          <DomainFilter />
        </Provider>
      ),
    }
  }

  it('renders three select elements for countries, classifications, and subClassifications', () => {
    renderWithDomains(['US_OK-WOK', 'FR_NK-WOL', 'EN_BL-WOL'])
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
    renderWithDomains(['US_OK-WOK', 'FR_NK-WOL', 'EN_BL-WOL'])
    const countriesSelect = screen.getByRole('listbox', { name: 'countries' })
    expect(screen.getByText('US')).toBeInTheDocument()
    expect(screen.getByText('FR')).toBeInTheDocument()
    expect(screen.getByText('EN')).toBeInTheDocument()
    expect(within(countriesSelect).getAllByRole('option')).toHaveLength(3)
  })

  it('renders correct classification options from domains', () => {
    renderWithDomains(['US_OK-WOK', 'FR_NK-WOL', 'EN_BL-WOL'])
    const classificationsSelect = screen.getByRole('listbox', {
      name: 'classifications',
    })
    expect(screen.getByText('OK')).toBeInTheDocument()
    expect(screen.getByText('NK')).toBeInTheDocument()
    expect(screen.getByText('BL')).toBeInTheDocument()
    expect(within(classificationsSelect).getAllByRole('option')).toHaveLength(3)
  })

  it('renders correct subClassification options from domains', () => {
    renderWithDomains(['US_OK-WOK', 'FR_NK-WOL', 'EN_BL-WOL'])
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
    renderWithDomains([])
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
    renderWithDomains()
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
    renderWithDomains(['FRAB12', 'USCD34', 'FRAB56'])
    const countryOptions = within(
      screen.getByRole('listbox', { name: 'countries' })
    )
      .getAllByRole('option')
      .map((opt) => opt.textContent)
    expect(countryOptions).toEqual(['FR', 'US'])
  })

  it('updates options when domains prop changes', async () => {
    const { store } = renderWithDomains(['FRAB12'])
    await screen.findByText('FR')
    act(() => {
      store.dispatch(receiveDomains(['USCD34']))
    })
    await screen.findByText('US')
    expect(screen.queryByText('FR')).not.toBeInTheDocument()
  })
})
