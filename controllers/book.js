const Book = require('../models/Book')
const errorHandler = require('../utils/errorHandler')

module.exports.getByAuthorId = async function(req, res) {
  try {
    const books = await Book.find({
      author: req.params.authorId,
      user: req.user.id
    })
    res.status(200).json(books)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.create = async function(req, res) {
  try {
    const book = await new Book({
      name: req.body.name,
      cost: req.body.cost,
      author: req.body.author,
      user: req.user.id
    }).save()
    res.status(201).json(book)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.remove = async function(req, res) {
  try {
    await Book.remove({_id: req.params.id})
    res.status(200).json({
      message: 'Книга была удалена.'
    })
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.update = async function(req, res) {
  try {
    const book = await Book.findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {new: true}
    )
    res.status(200).json(book)
  } catch (e) {
    errorHandler(res, e)
  }
}