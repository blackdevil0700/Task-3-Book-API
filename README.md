# 📚 Books API (Node.js + Express)

A simple **REST API** built with **Node.js** and **Express** to manage a list of books.  
Supports **CRUD operations** (Create, Read, Update, Delete) using in-memory storage (no database).  

---

## 🚀 Features
- Get all books  
- Add a new book  
- Update a book by ID  
- Delete a book by ID  
- JSON responses  
- Error handling (404, 400, etc.)  

---

## 🛠 Tools & Technologies
- [Node.js](https://nodejs.org/)  
- [Express](https://expressjs.com/)  
- [Postman](https://www.postman.com/) (for testing)  
- [Visual Studio Code](https://code.visualstudio.com/)  

---

## ⚡ Setup & Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR-USERNAME/books-api.git
   cd books-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the server:
   ```bash
   node server.js
   ```

4. Server will start at:
   ```
   http://localhost:3000
   ```

---

## 📌 API Endpoints

### ✅ Get all books
**GET** `/books`  
Response:
```json
[
  { "id": 1, "title": "1984", "author": "George Orwell" },
  { "id": 2, "title": "The Alchemist", "author": "Paulo Coelho" }
]
```

---

### ✅ Add a new book
**POST** `/books`  
Body (JSON):
```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin"
}
```

Response:
```json
{
  "id": 3,
  "title": "Clean Code",
  "author": "Robert C. Martin"
}
```

---

### ✅ Update a book
**PUT** `/books/:id`  
Body (JSON):
```json
{
  "title": "Nineteen Eighty-Four"
}
```

Response:
```json
{
  "id": 1,
  "title": "Nineteen Eighty-Four",
  "author": "George Orwell"
}
```

---

### ✅ Delete a book
**DELETE** `/books/:id`  
Response:
```json
{
  "message": "Deleted successfully",
  "deletedBook": [
    { "id": 2, "title": "The Alchemist", "author": "Paulo Coelho" }
  ]
}
```

---

## 🧪 Testing with Postman
1. Open Postman.  
2. Test each endpoint (`GET`, `POST`, `PUT`, `DELETE`) with the URLs above.  
3. Send JSON in **raw → application/json** format for POST/PUT.  

---

## 🎯 Learning Outcome
- Basics of REST API design  
- Express routing  
- Handling HTTP methods  
- Working with JSON in Node.js  
- API testing using Postman  
