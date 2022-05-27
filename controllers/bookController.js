const book = require("./../models/bookModel");
exports.getBookDetails = async (req, res) => {
  console.log(req.params.title);
  try {
    const bookData = await book.findOne({ name: req.params.title });
    console.log(bookData);
    if (bookData !== null) {
      bookData
        .validate()
        .then((msg) => {
          console.log("No errors");
          res.status(200).json({
            status: true,
            details: bookData,
          });
        })
        .catch((err) => {
          console.log(`Errors found : ${err}`);
          res.status(404).json({
            status: false,
            details: null,
          });
        });
    } else {
      res.status(404).json({
        status: false,
        details: null,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: false,
      details: null,
    });
  }
};
exports.ratingCheck = async (req, res) => {
  let username = req.params.username,
    bookName = req.params.book;
  console.log(username, book);
  try {
    const bookData = await book.findOne({ name: bookName });
    const bookList = await book.find();
    console.log(bookData);
    if (bookData !== null) {
      bookData
        .validate()
        .then((msg) => {
          console.log("No errors");
          if (bookData.raters.includes(username)) {
            res.status(200).json({
              status: true,
              rating: bookData.rating,
              bookList: bookList,
            });
          } else {
            res.status(404).json({
              status: false,
              rating: null,
              bookList: bookList,
            });
          }
        })
        .catch((err) => {
          console.log(`Errors found : ${err}`);
          res.status(404).json({
            status: false,
            rating: null,
            bookList: bookList,
          });
        });
    } else {
      res.status(404).json({
        status: false,
        rating: null,
        bookList: bookList,
      });
    }
  } catch (error) {
    res.status(404).json({
      status: false,
      rating: null,
      bookList: bookList,
    });
  }
};
exports.rateBook = async (req, res) => {
  let rate = parseInt(req.params.rate);
  let username = req.params.username;
  let bookName = req.params.book;
  console.log(username, book, rate);
  try {
    const newBook = await book.findOne({ name: bookName });
    console.log("newbook :" + newBook.rating);
    newBook.rating =
      (newBook.rating * newBook.ratersNumber + rate) /
      (newBook.ratersNumber + 1);
    newBook.raters.push(username);
    newBook.ratersNumber += 1;
    // IF WE NEED TO STOP SAME USER FROM RATING MULTIPLE TIMES
    // if (!newBook.raters.includes(username)) {
    //   newBook.raters.push(username);
    //   newBook.ratersNumber += 1;
    // }
    newBook
      .validate()
      .then((msg) => {
        console.log("No errors");
        newBook.save();
        res.status(200).json({
          status: true,
        });
      })
      .catch((err) => {
        console.log(`Errors found : ${err}`);
        res.status(400).json({
          status: false,
        });
      });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: false,
    });
  }
};
