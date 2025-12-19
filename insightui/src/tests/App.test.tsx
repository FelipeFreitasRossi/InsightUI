import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders InsightUI title', () => {
  render(<App />);
  const titleElement = screen.getByText(/InsightUI/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders dashboard link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Acessar Dashboard/i);
  expect(linkElement).toBeInTheDocument();
});