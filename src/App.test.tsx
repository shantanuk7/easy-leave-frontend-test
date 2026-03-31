import { render, screen } from '@testing-library/react';
import App from './App';
import { describe, test } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

const renderApp = () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
};

describe('App Component', () => {
  test('renders App component content', () => {
    renderApp();

    expect(screen.getByText(/easyleave/i)).toBeInTheDocument();
    expect(screen.getByText(/sign in with google/i)).toBeInTheDocument();
  });
});
