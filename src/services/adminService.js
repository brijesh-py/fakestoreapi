const argon2 = require("argon2");
const Admin = require("../models/Admin");
const { DBError } = require("../utils");
const { USER_MESSAGES } = require("../constants/messages");

class AdminService {
  sanitize(admin) {
    return {
      id: admin._id,
      name: admin.name,
      username: admin.username,
      email: admin.email,
      role: admin?.role || "admin",
    };
  }

  async hashPassword(password) {
    return await argon2.hash(password);
  }

  async comparePassword(hashedPassword, password) {
    return await argon2.verify(hashedPassword, password);
  }
  async create(adminData) {
    const { username, email } = adminData;
    const existingAdmin = await Admin.findOne({
      $or: [{ username }, { email }],
    });
    if (existingAdmin) {
      const prop = username === existingAdmin.username ? username : email;
      throw new DBError(USER_MESSAGES.CONFLICT_USER(prop));
    }

    const password = await this.hashPassword(adminData.password);
    const admin = await Admin.create({ ...adminData, password });
    return this.sanitize(admin);
  }

  async login(username, password) {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      throw new DBError(USER_MESSAGES.INVALID_CREDENTIALS);
    }
    const isValid = await this.comparePassword(admin.password, password);
    if (!isValid) {
      throw new DBError(USER_MESSAGES.INVALID_CREDENTIALS);
    }
    return this.sanitize(admin);
  }

  async getAdmin(id) {
    const admin = await Admin.findById(id);
    if (!admin) {
      throw new DBError(USER_MESSAGES.UNAUTHORIZED);
    }
    return this.sanitize(admin);
  }

  async update(id, adminData) {
    const admin = await Admin.findById(id);
    if (!admin) {
      throw new DBError(USER_MESSAGES.UNAUTHORIZED);
    }
    const updatedAdmin = await Admin.findByIdAndUpdate(id, adminData, {
      new: true,
    });
    return this.sanitize(updatedAdmin);
  }

  async destroy(id, password) {
    const admin = await Admin.findById(id);
    if (!admin) {
      throw new DBError(USER_MESSAGES.UNAUTHORIZED);
    }
    const isValid = await this.comparePassword(admin.password, password);
    if (!isValid) {
      throw new DBError(USER_MESSAGES.UNAUTHORIZED);
    }
    await Admin.findByIdAndDelete(id);
    return { success: true };
  }
}

module.exports = new AdminService();
