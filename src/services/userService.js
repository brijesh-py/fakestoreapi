const User = require("../models/User");
const argon2 = require("argon2");
const { DBError } = require("../utils");
const { USER_MESSAGES } = require("../constants/messages");

class UserService {
  sanitize(user) {
    return {
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user?.role || "user",
    };
  }

  async hashPassword(password) {
    return await argon2.hash(password);
  }

  async comparePassword(hashedPassword, password) {
    return await argon2.verify(hashedPassword, password);
  }

  async create(userData) {
    const { name, username, email, password } = userData;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      const prop = username === existingUser.username ? username : email;
      throw new DBError(USER_MESSAGES.CONFLICT_USER(prop));
    }

    const passwordHash = await this.hashPassword(password);
    const user = await User.create({
      name,
      username,
      email,
      password: passwordHash,
    });
    return this.sanitize(user);
  }

  async login(username, password) {
    const user = await User.findOne({ username });
    if (!user) {
      throw new DBError(USER_MESSAGES.INVALID_CREDENTIALS);
    }

    const isValid = await this.comparePassword(user.password, password);
    if (!isValid) {
      throw new DBError(USER_MESSAGES.INVALID_CREDENTIALS);
    }
    return this.sanitize(user);
  }

  async getUser(id) {
    const user = await User.findById(id);
    if (!user) {
      throw new DBError(USER_MESSAGES.UNAUTHORIZED);
    }
    return this.sanitize(user);
  }

  async getAllUsers({ query = "", page = 1, limit = 10 }) {
    const regex = new RegExp(query, "i");
    const offset = (page - 1) * limit;

    const users = await User.find({
      $or: [{ name: regex }, { username: regex }, { email: regex }],
    })
      .limit(limit)
      .skip(offset);
    return {
      users: users.map((user) => this.sanitize(user)),
      count: users.length,
    };
  }

  async update(id, userData) {
    const user = await User.findById(id);
    if (!user) {
      throw new DBError(USER_MESSAGES.UNAUTHORIZED);
    }
    const updatedUser = await User.findByIdAndUpdate(id, userData, {
      new: true,
    });
    return this.sanitize(updatedUser);
  }

  async destroy(id) {
    const user = await User.findById(id);
    if (!user) {
      throw new DBError(USER_MESSAGES.UNAUTHORIZED);
    }
    await User.findByIdAndDelete(id);
    return { success: true };
  }
}

module.exports = new UserService();
