const express = require('express')
const bcrypt = require('bcrypt')
const { generateToken } = require('../utils/token')
const { findUserByUsername, createUser } = require('../queries/users')
const { authenticateToken } = require('../middlewares/authenticateToken')
const auth = express.Router();

// Login route
auth.post('/login', async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await findUserByUsername(username)

    if (!user) return res.status(401).json({ message: 'Invalid credentials' })

    const validPassword = await bcrypt.compare(password, user.password_hash)

    if (!validPassword)
      return res.status(401).json({ message: 'Invalid credentials' })

    const token = generateToken(user)
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    })
// also return user's info
// call query fx here that'll give specific info linked to that user based on username
// display in front end
    res.status(200).json({
      message: 'Logged in successfully',
      // user: user.username,
      // id: user.id,
      // email: user.email,
      user_details: {
        ...user, password_hash: 'restricted'
      }
    })
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ message: 'An error occurred during the login process.' })
  }
})

// Register route
auth.post('/register', async (req, res) => {
  const { username, password, email } = req.body
  try {
    // Check if user already exists
    const existingUser = await findUserByUsername(username)
    if (existingUser) {
      return res.status(409).json({ message: 'Username already taken' })
    }

    // Hash password
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Create user in the database
    const newUser = await createUser({
      username,
      passwordHash: hashedPassword,
      email,
    })

    // Generate token (optional, if you want to log the user in immediately)
    const token = generateToken(newUser)

    // Set token in HTTP-only cookie (optional, for immediate login)
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    })

    // Respond with success message (or token/user info if needed)
    res.status(201).json({ message: 'User registered successfully', newUser })
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ message: 'An error occurred during the registration process.' })
  }
})

auth.get('/logout', async (_req, res) => {
  try {
    res.clearCookie('token')
    res.status(200).json({ message: 'Logged out successfully' })
  } catch (err) {
    console.log(err)
  }
})

auth.get('/check-auth', authenticateToken, (req, res) => {
  // Assuming authenticateToken middleware adds user info to req.user

  if (req.user) {
    res.status(200).json({
      isAuthenticated: true,
      user: {
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
        subject: req.user.subject,
        // Include other user details you want to send back to the client
      },
    })
  } else {
    // If for some reason, req.user is not set, treat as not authenticated
    res.status(401).json({ isAuthenticated: false })
  }
})

module.exports = auth
