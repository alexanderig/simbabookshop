const Author = require('../models/Author')
const Book = require('../models/Book')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function(req, res) {
  try {
    const authors = await Author.find({user: req.user.id})
    res.status(200).json(authors)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.getById = async function(req, res) {
  try {
    const author = await Author.findById(req.params.id)
    res.status(200).json(author)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.remove = async function(req, res) {
  try {
    await Author.remove({_id: req.params.id})
    await Book.remove({author: req.params.id})
    res.status(200).json({
      message: 'Автор удален.'
    })
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.create = async function(req, res) {
  const author = new Author({
    name: req.body.name,
    user: req.user.id,
    imageSrc: req.file ? req.file.path : ''
  })

  try {
    await author.save()
    res.status(201).json(author)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.update = async function(req, res) {
  const updated = {
    name: req.body.name
  }

  if (req.file) {
    updated.imageSrc = req.file.path
  }

  try {
    const author = await Author.findOneAndUpdate(
      {_id: req.params.id},
      {$set: updated},
      {new: true}
    )
    res.status(200).json(author)
  } catch (e) {
    errorHandler(res, e)
  }
}