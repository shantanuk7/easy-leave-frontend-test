import { render, screen } from '@testing-library/react';
import { describe, test } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

const renderApp = () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );
};

describe('Home Component', () => {
  test('renders Home component content', () => {
    renderApp();

    expect(screen.getByText(/easyleave/i)).toBeInTheDocument();
    expect(screen.getByText(/sign in with google/i)).toBeInTheDocument();
  });
});
