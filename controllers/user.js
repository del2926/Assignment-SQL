const bcrypt = require("bcryptjs");

const models = require("../models");

const jwt = require("jsonwebtoken");

exports.registerUser = (req, res, next) => {
  const username = req.body.username;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const gender = req.body.gender;
  const birthDate = req.body.birthDate;
  const email = req.body.email;
  const password = req.body.password;
  const profilePic = req.body.profilePic;
  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      return models.user.create({
        username: username,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        birthDate: birthDate,
        email: email,
        password: hashedPassword,
        profilePic: profilePic,
      });
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => console.log(err));
};

exports.loginUser = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let user;
  models.user
    .findOne({ where: { email: email } })
    .then((user) => {
      if (!user) {
        res.statusCode = 404;
        res.send({ message: "No such user exists!" });
      } else {
        if (user.isBlock) {
          res.statusCode = 401;
          res.send({ message: "You've been blocked!" });
        }
        console.log(user);
        user = user;
        return bcrypt.compare(password, user.password);
      }
    })
    .then((isMatch) => {
      if (isMatch) {
        console.log("Password is a match!");
        const userData = {
          userId: user,
        };
        const token = jwt.sign(userData, "secret");
        res.send({ token: token });
      } else {
        console.log("Password is not a match!");
      }
    })
    .catch((err) => console.log(err));
};

exports.userList = (req, res, next) => {
  models.user
    .findAll({ attributes: { exclude: ["password", "profilePic"] } })
    .then((users) => {
      res.send(users);
    })
    .catch((err) => console.log(err));
};

exports.userProfile = (req, res, next) => {
  models.user
    .findOne({
      where: { id: 2 },
      attributes: {
        exclude: [
          "id",
          "isAdmin",
          "isActive",
          "isBlock",
          "createdAt",
          "updatedAt",
        ],
      },
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => console.log(err));
};

exports.updateProfile = (req, res, next) => {
  const updatedUsername = req.body.username;
  const updatedFirstName = req.body.firstName;
  const updatedLastName = req.body.lastName;
  const updatedGender = req.body.gender;
  const updatedBirthDate = req.body.birthDate;
  const updatedEmail = req.body.email;
  const updatedPassword = req.body.password;
  const updatedProfilePic = req.body.profilePic;
  models.user
    .findOne({ where: { id: 3 } })
    .then((user) => {
      bcrypt.hash(updatedPassword, 12).then((updatedHashedPassword) => {
        user.username = updatedUsername;
        user.firstName = updatedFirstName;
        user.lastName = updatedLastName;
        user.gender = updatedGender;
        user.birthDate = updatedBirthDate;
        user.email = updatedEmail;
        user.password = updatedHashedPassword;
        user.profilePic = updatedProfilePic;
        user.save();
        console.log(user);
      });
    })
    .catch((err) => console.log(err));
};

exports.blockUser = (req, res, next) => {
  models.user
    .findOne({ where: { id: 2 } })
    .then((user) => {
      user.isBlock = true;
      user.save();
      console.log(user);
    })
    .catch((err) => console.log(err));
};

exports.deleteUser = (req, res, next) => {
  models.user
    .destroy({ where: { id: 3 } })
    .then((user) => {
      res.statusCode = 404;
      res.send({ message: "No such user exists!" });
    })
    .catch((err) => console.log(err));
};
