import { createBook, fetchBookById, fetchBooks } from '../api/booksApi';

const normalizeBook = (book) => ({
  authorBio:
    book.authorBio ||
    `${book.author} is a featured BookVerse author. Add a bio to highlight their work!`,
  authorTopBooks: book.authorTopBooks?.length ? book.authorTopBooks : [book.title],
  description: book.description || 'No description provided yet.',
  genres: book.genres?.length ? book.genres : ['General'],
  image: book.image || 'https://placehold.co/400x600?text=Book+Cover',
  pages: book.pages || 250,
  price: Number(book.price),
  title: book.title,
  author: book.author,
  year: book.year || new Date().getFullYear(),
  id: book.id,
});

const bookService = {
  list: async () => {
    const books = await fetchBooks();
    return books.map(normalizeBook);
  },
  get: async (id) => {
    const book = await fetchBookById(id);
    return normalizeBook(book);
  },
  create: async (book) => {
    const response = await createBook(book);
    return normalizeBook(response);
  },
};

export default bookService;
