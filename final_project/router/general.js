const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {

      if (isValid(username)) {
        users.push({"username" : username, "password" : password});
        return res.status(200).json({message: "User registered successfully"});
    } else {
        return res.status(404).json({message:"Username already exists"});
        }
    } else {
    return res.status(404).json({message:"Please enter Username and/or Password"});
  }
});

// Get the book list available in the shop
public_users.get('/users',function (req, res) {
    //Write your code here
    res.send(users);
  });

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  const keys = Object.keys(books);
  let matchingBooks = [];

  keys.forEach((key) => {
    if (books[key].author === author) {
        matchingBooks.push(books[key]);
    } 
  });

  if (matchingBooks.length > 0) {
    res.send(matchingBooks);
  } else {
res.status(404).json({message:"No books found by given author"});
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  const keys = Object.keys(books);
  let matchingBooks = [];

  keys.forEach((key) => {
    if (books[key].title === title) {
        matchingBooks.push(books[key]);
    } 
  });

  if (matchingBooks.length > 0) {
    res.send(matchingBooks);
  } else {
res.status(404).json({message:"No books found by given title"});
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  if (books[isbn]){
      res.send(books[isbn].reviews);
  } else {
    res.status(404).json({message : "No book available with given ISBN"})
  }
});

module.exports.general = public_users;
