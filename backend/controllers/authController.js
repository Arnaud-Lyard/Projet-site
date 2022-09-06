const jwt = require('jsonwebtoken')

const db = require("../models");
const User = db.user;
const Role = db.role;

const bcrypt = require('bcrypt')


const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(404).json({ error: "Veuillez renseigner tous les champs." });
  }

  User.findOne({
    email: email,
  }).populate("roles", "-__v")
    .exec( async (err, user) => {
      if (err) {
        res.status(500).json({message: err})
        return;
      }
      if (!user) {
        return res.status(404).json({ error: "Veuillez saisir des identifiants valides." });
      }
      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        return res.status(401).json({ error: "Mot de passe incorrect." });
      }

      var authorities = [];
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
        // create a token
      const token = createToken(user._id)

      res.status(200).json({email, token, authorities})
    })
  }

// signup a user
const signupUser = async (req, res) => {
  const {email, password, passwordConfirm} = req.body

  if (password !== passwordConfirm) {
    return res.status(401).json({error: 'Les deux mots de passes ne sont pas identiques'})
  }

  try {
    const user = await User.signup(email, password)
    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          user.roles = roles.map(role => role._id);
          user.save();
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        user.roles = [role._id];
        user.save();
      });
    }

    // create a token
    const token = createToken(user._id)

    res.status(201).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { signupUser, loginUser }