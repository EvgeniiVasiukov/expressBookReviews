const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');

const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  }


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (!doesExist(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop

public_users.get('/books',function (req, res) {

    const get_books = new Promise((resolve, reject) => {
        resolve(res.send(JSON.stringify({books}, null, 4)));
      });

      get_books.then(() => console.log("Promise for Task 10 resolved"));

  });

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    const get_books_by_isbn = new Promise((resolve, reject) => {
        resolve(res.send(books[isbn])
      });

      get_books.then(() => console.log("Promise for Task 11 resolved"));
  
 });
  
// Get book details based on author
router.get('/author/:author', function (req, res) {
    getBooksByAuthor(req.params.author)
        .then(booksByAuthor => {
            res.json(booksByAuthor);
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});

// Function to get books by author using Promises
function getBooksByAuthor(author) {
    return new Promise((resolve, reject) => {
        let booksByAuthor = [];
        let isbns = Object.keys(books);

        isbns.forEach((isbn) => {
            if (books[isbn]["author"] === author) {
                booksByAuthor.push({
                    "isbn": isbn,
                    "title": books[isbn]["title"],
                    "reviews": books[isbn]["reviews"]
                });
            }
        });

        if (booksByAuthor.length > 0) {
            resolve({ booksByAuthor });
        } else {
            reject('No books found for the author');
        }
    });
}

module.exports = router;

// Get all books based on title
router.get('/title/:title', function (req, res) {
    getBooksByTitle(req.params.title)
        .then(booksByTitle => {
            res.json(booksByTitle);
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});

// Function to get books by title using Promises
function getBooksByTitle(title) {
    return new Promise((resolve, reject) => {
        let booksByTitle = [];
        let isbns = Object.keys(books);

        isbns.forEach((isbn) => {
            if (books[isbn]["title"] === title) {
                booksByTitle.push({
                    "isbn": isbn,
                    "author": books[isbn]["author"],
                    "reviews": books[isbn]["reviews"]
                });
            }
        });

        if (booksByTitle.length > 0) {
            resolve({ booksByTitle });
        } else {
            reject('No books found for the title');
        }
    });
}

module.exports = router;

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    const reviews = books[isbn]["reviews"];
    res.send(reviews)
});

module.exports.general = public_users;
