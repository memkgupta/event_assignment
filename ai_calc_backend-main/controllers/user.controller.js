import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const JWT_SECRET = process.env.JWT_SECRET;

// Signup Function
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
};

// Login Function
//TODO: Create a login function 
//1. Define a User model with an email property and a password property that is hashed using a secure hashing algorithm like bcrypt.
//2. Implement a function to find a user by their email address. This function should query the database for a user with the provided email address and return the user object if found.
//3. Implement a function to compare a provided password with a hashed password. This function should use a library like bcrypt to compare the two strings and return true if they match, and false otherwise.
//4. Implement a function to generate a JSON Web Token (JWT). This function should take the user ID as input and generate a JWT that is signed with a secret key and has an expiration time.
//5. In the login function, handle any potential errors that may occur during the login process, such as errors connecting to the database or errors hashing passwords.
//6. In the login function, return a meaningful error message to the client if the login fails, such as "Invalid email or password".
//7. In the login function, return a success message and the JWT token to the client if the login is successful. The response should also include the user's email address, name, and ID.

// Get Current User Details
export const getMe = async (req, res) => {
  try {
    console.log(req.user)
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({id:user._id,email:user.email,name:user.name});
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
};

// Update User Details
export const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ message: 'User updated successfully.', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
};
