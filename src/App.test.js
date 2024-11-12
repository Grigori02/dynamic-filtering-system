import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';


jest.mock('./const', () => ({
  mockData: [
    {
      id: 1,
      name: "Wireless Headphones",
      category: "Electronics",
      brand: "Brand A",
      price: 99.99,
      rating: 4.5,
      imageUrl: "https://example.com/images/headphones.jpg"
    },
    {
      id: 2,
      name: "Bluetooth Speaker",
      category: "Electronics",
      brand: "Brand B",
      price: 49.99,
      rating: 4.0,
      imageUrl: "https://example.com/images/speaker.jpg"
    }
  ],
  dataCountPerPage: 5
}));

jest.mock('react-spinners/ClipLoader', () => {
  return ({ loading }) => (loading ? <div data-testid="loader">Loading...</div> : null);
});

test('renders the product catalog and filter components correctly', async () => {
  render(<App />);

  expect(screen.getByText('Filters')).toBeInTheDocument();
  expect(screen.getByLabelText('Name:')).toBeInTheDocument();
  expect(screen.getByLabelText('Category:')).toBeInTheDocument();
  expect(screen.getByLabelText('Brand:')).toBeInTheDocument();
  expect(screen.getByText(/Price Range:/)).toBeInTheDocument();
  expect(screen.getByLabelText('Rating:')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();
    expect(screen.getByText('Bluetooth Speaker')).toBeInTheDocument();
  });

  expect(screen.getAllByRole('cardItem').length).toBeGreaterThan(0);
});

test('filters products by category', async () => {
  render(<App />);

  const categorySelect = screen.getByLabelText(/Category:/i);

  fireEvent.change(categorySelect, { target: { value: 'Electronics' } });

  await waitFor(() => {
    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();
    expect(screen.getByText('Bluetooth Speaker')).toBeInTheDocument();
  });

  fireEvent.change(categorySelect, { target: { value: 'Footwear' } });

  await waitFor(() => {
    expect(screen.queryByText('Wireless Headphones')).toBeNull();
    expect(screen.queryByText('Bluetooth Speaker')).toBeNull();
  });
});

test('filters products by brand', async () => {
  render(<App />);

  const brandSelect = screen.getByLabelText(/Brand:/i);

  fireEvent.change(brandSelect, { target: { value: 'Brand A' } });

  await waitFor(() => {
    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();
    expect(screen.queryByText('Bluetooth Speaker')).toBeNull();
  });
});

test('displays "No products found!" message when no products match the filters', async () => {
  render(<App />);
  const filterInput = screen.getByPlaceholderText('Name');
  fireEvent.change(filterInput, { target: { value: 'test Product name' } });

  const noProductsMessage = await screen.findByText('No products found!');
  expect(noProductsMessage).toBeInTheDocument();
});