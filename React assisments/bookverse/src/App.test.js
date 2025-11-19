import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

const mockBooks = [
  {
    id: 1,
    title: 'Mock Book',
    author: 'Mock Author',
    price: 9.99,
    image: 'https://placehold.co/400x600',
    authorBio: 'Bio',
    authorTopBooks: ['One', 'Two', 'Three'],
    description: 'Test description',
    year: 2000,
    pages: 123,
    genres: ['Test'],
  },
];

test('renders BookVerse heading', async () => {
  const mockService = {
    list: jest.fn().mockResolvedValue(mockBooks),
    create: jest.fn(),
  };

  render(
    <MemoryRouter initialEntries={['/home']}>
      <App bookServiceOverride={mockService} />
    </MemoryRouter>
  );

  const heading = await screen.findByText(/BookVerse Library/i);
  expect(heading).toBeInTheDocument();
  expect(mockService.list).toHaveBeenCalledTimes(1);
});
