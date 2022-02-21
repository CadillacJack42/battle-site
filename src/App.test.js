import { render, screen } from '@testing-library/react';
import FakeTestFile from './fakeTestFile';
// import Nav from './routes/Nav';

test('renders learn react link', () => {
  render(<FakeTestFile />);
  const linkElement = screen.getByText(/fakeTEstFile/i);
  expect(linkElement).toBeInTheDocument();
});
