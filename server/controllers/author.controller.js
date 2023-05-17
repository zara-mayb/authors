const Author = require('../models/author.model');
//READ ALL
module.exports.findAll = (req, res) => {
  Author.find()
    .then((allDaAuthors) => {
      res.json( allDaAuthors )
    })
    .catch((err) => {
      res.json(err)
    });
}
//READ ONE
module.exports.findOne = (req, res) => {
  Author.findById( req.params.id )
    .then(oneSingleAuthor => {
      res.json( oneSingleAuthor )
    })
    .catch((err) => {
      res.json(err)
    });
}
//CREATE
module.exports.create = (req, res) => {
  Author.create(req.body)
    .then(newlyCreatedAuthor => {
      res.json(newlyCreatedAuthor)
    })
    .catch((err) => {
      console.log("SERVER ERROR")
      res.status(400).json(err)
    });
}
//UPDATE ONE
module.exports.update = (req, res) => {
  Author.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  )
    .then(updatedAuthor => {
      res.json( updatedAuthor )
    })
    .catch((err) => {
      res.status(400).json(err)
    });
}
//DELETE ONE
module.exports.delete = (req, res) => {
  Author.findByIdAndDelete( req.params.id )
    .then(result => {
      res.json( result )
    })
    .catch((err) => {
      res.json(err)
    });
}