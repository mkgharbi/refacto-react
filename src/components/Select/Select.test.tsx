import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import Select from "./Select";

describe('Select', () => {
  it('renders with given options and name', () => {
    render(<Select name="test-select" options={["A", "B", "C"]} multiple aria-label="test-select" />);
    const select = screen.getByRole('listbox', { name: 'test-select' });
    expect(select).toBeInTheDocument();
    expect(select).toHaveAttribute('multiple');
    expect(select).toHaveAttribute('name', 'test-select');
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
  });

  it('renders no options if options array is empty', () => {
    render(<Select name="empty-select" options={[]} multiple aria-label="empty-select" />);
    const select = screen.getByRole('listbox', { name: 'empty-select' });
    expect(select).toBeInTheDocument();
    expect(within(select).queryAllByRole('option')).toHaveLength(0);
  });
});
