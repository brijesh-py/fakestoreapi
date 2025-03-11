const adminService = require("../services/adminService");
const { asyncWrapper, response, setCookie } = require("../utils");

class AdminController {
  handleCreateAdmin = asyncWrapper(async (req, res) => {
    const { name, username, email, password } = req.body;
    const admin = await adminService.create({
      name,
      username,
      email,
      password,
    });
    return response(res, { statusCode: 201, admin });
  });

  handleLoginAdmin = asyncWrapper(async (req, res) => {
    const { username, password } = req.body;
    const admin = await adminService.login(username, password);
    const token = await setCookie(res, admin);
    return response(res, { statusCode: 200, admin, token });
  });

  handleGetAdmin = asyncWrapper(async (req, res) => {
    const { id } = req.auth;
    const admin = await adminService.getAdmin(id);
    return response(res, { statusCode: 200, admin });
  });

  handleUpdateAdmin = asyncWrapper(async (req, res) => {
    const { id } = req.auth;
    const { name, username, email } = req.body;
    const admin = await adminService.update(id, { name, username, email });
    return response(res, { statusCode: 200, admin });
  });

  handleDeleteAdmin = asyncWrapper(async (req, res) => {
    const { id } = req.auth;
    await adminService.destroy(id);
    res.clearCookie("token");
    return response(res, { statusCode: 200 });
  });
}

module.exports = new AdminController();
