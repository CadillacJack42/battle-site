import { render, screen } from '@testing-library/react';
// import App from './App';q
import Nav from './routes/Nav';

test('renders learn react link', () => {
  render(<Nav />);
  const linkElement = screen.getByText(/do you have what it takes/i);
  expect(linkElement).toBeInTheDocument();
});
