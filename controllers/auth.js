const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const City = require('../models/City');
const keys = require('../config/keys');
const errorHandler = require('../utils/errorHandler');



module.exports.getById = async function(req, res) {
  try {
    const user = await User.findById(req.user.id);
    console.log(req.user.id);
    console.log(user);
    res.status(200).json(user);
  } catch (e) {
    errorHandler(res, e);
  }
};


module.exports.getAllcities = async function(req, res) {
  try {
    const cities = await City.find({});
//const count = await City.count({});
//console.log('Count Citit: ' + cities.length);
    if(cities.length > 0) {
      res.status(200).json(cities);
    } else {
      const citynames = [
        {name: 'Odessa'},
        {name: 'Kyiv'},
        {name: 'Kharkiv'},
        {name: 'Lviv'},
        {name: 'Dnipro'}];
        
        City.insertMany(citynames, {rawResult: false}).then(function(result){
          res.status(200).json(result);
        });


    }
    
  } catch (e) {
    errorHandler(res, e);
  }
};



module.exports.login = async function(req, res) {
  const candidate = await User.findOne({email: req.body.email});

  if (candidate) {
    // Проверка пароля, пользователь существует
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
    if (passwordResult) {
      // Генерация токена, пароли совпали
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id
      }, keys.jwt, {expiresIn: 60 * 60});

      res.status(200).json({
        token: `Bearer ${token}`
      });
    } else {
      // Пароли не совпали
      res.status(401).json({
        message: 'Пароли не совпадают. Попробуйте снова.'
      });
    }
  } else {
    // Пользователя нет, ошибка
    res.status(404).json({
      message: 'Пользователь с таким email не найден.'
    });
  }
};


module.exports.register = async function(req, res) {
  // email password
  const candidate = await User.findOne({email: req.body.email});

  if (candidate) {
    // Пользователь существует, нужно отправить ошибку
    res.status(409).json({
      message: 'Такой email уже занят. Попробуйте другой.'
    });
  } else {
    // Нужно создать пользователя
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt),
      city: req.body.city
    });

    try {
      await user.save();
      res.status(201).json(user);
    } catch(e) {
      errorHandler(res, e);
    }

  }
};