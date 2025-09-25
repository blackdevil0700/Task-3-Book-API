// books-api.js
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory storage for books
let books = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
  { id: 3, title: "1984", author: "George Orwell" }
];

// Counter for generating unique IDs
let nextId = 4;

// Helper function to find book by ID
const findBookById = (id) => {
  return books.find(book => book.id === parseInt(id));
};

// Helper function to find book index by ID
const findBookIndexById = (id) => {
  return books.findIndex(book => book.id === parseInt(id));
};

// GET /books - Get all books
app.get('/books', (req, res) => {
  res.json({
    success: true,
    count: books.length,
    data: books
  });
});

// GET /books/:id - Get a specific book by ID
app.get('/books/:id', (req, res) => {
  const book = findBookById(req.params.id);
  
  if (!book) {
    return res.status(404).json({
      success: false,
      message: 'Book not found'
    });
  }
  
  res.json({
    success: true,
    data: book
  });
});

// POST /books - Add a new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  
  // Validation
  if (!title || !author) {
    return res.status(400).json({
      success: false,
      message: 'Title and author are required'
    });
  }
  
  // Create new book
  const newBook = {
    id: nextId++,
    title: title.trim(),
    author: author.trim()
  };
  
  books.push(newBook);
  
  res.status(201).json({
    success: true,
    message: 'Book created successfully',
    data: newBook
  });
});

// PUT /books/:id - Update a book by ID
app.put('/books/:id', (req, res) => {
  const bookIndex = findBookIndexById(req.params.id);
  
  if (bookIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Book not found'
    });
  }
  
  const { title, author } = req.body;
  
  // Validation
  if (!title || !author) {
    return res.status(400).json({
      success: false,
      message: 'Title and author are required'
    });
  }
  
  // Update book
  books[bookIndex] = {
    ...books[bookIndex],
    title: title.trim(),
    author: author.trim()
  };
  
  res.json({
    success: true,
    message: 'Book updated successfully',
    data: books[bookIndex]
  });
});

// PATCH /books/:id - Partially update a book by ID
app.patch('/books/:id', (req, res) => {
  const bookIndex = findBookIndexById(req.params.id);
  
  if (bookIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Book not found'
    });
  }
  
  const { title, author } = req.body;
  
  // Update only provided fields
  if (title !== undefined) {
    books[bookIndex].title = title.trim();
  }
  if (author !== undefined) {
    books[bookIndex].author = author.trim();
  }
  
  res.json({
    success: true,
    message: 'Book updated successfully',
    data: books[bookIndex]
  });
});
app.delete('/books/:id', (req, res) => {
  const bookIndex = findBookIndexById(req.params.id);
  
  if (bookIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Book not found'
    });
  }
  
  const deletedBook = books.splice(bookIndex, 1)[0];
  
  res.json({
    success: true,
    message: 'Book deleted successfully',
    data: deletedBook
  });
});
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Books API',
    version: '1.0.0',
    endpoints: {
      'GET /books': 'Get all books',
      'GET /books/:id': 'Get a specific book',
      'POST /books': 'Create a new book',
      'PUT /books/:id': 'Update a book (full update)',
      'PATCH /books/:id': 'Update a book (partial update)',
      'DELETE /books/:id': 'Delete a book'
    }
  });
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});
app.use((req, res) => {
  res.status(404).send("Not Found");
});
app.listen(PORT, () => {
  console.log(`🚀 Books API Server running on http://localhost:${PORT}`);
  console.log(`📚 Total books in memory: ${books.length}`);
  console.log(`📖 API Documentation available at: http://localhost:${PORT}`);
});