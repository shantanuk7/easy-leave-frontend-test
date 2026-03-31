import { render, screen } from '@testing-library/react';
import Login from './Login';
import { describe, expect, test } from 'vitest';

const renderComponent = () => {
  render(<Login />);
};

describe('Login Component', () => {
  test('renders EasyLeave title', () => {
    renderComponent();
    expect(screen.getByText('EasyLeave')).toBeInTheDocument();
  });

  test('renders Google sign in link with correct href and Google Logo', () => {
    render(<Login />);

    expect(screen.getByText(/easyleave/i)).toBeInTheDocument();
    expect(screen.getByText(/sign in with google/i)).toBeInTheDocument();

    const image = screen.getByAltText('Google Logo');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'GoogleLogo.png');
  });
});
