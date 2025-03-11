const userService = require("../services/userService");
const { asyncWrapper, response, setCookie } = require("../utils");

class UserController {
  handleCreateUser = asyncWrapper(async (req, res) => {
    const { name, username, email, password } = req.body;
    const user = await userService.create({ name, username, email, password });
    return response(res, { statusCode: 201, user });
  });

  handleUpdateUser = asyncWrapper(async (req, res) => {
    const { id } = req.auth;
    const { name, username, email } = req.body;
    const user = await userService.update(id, { name, username, email });
    response(res, { statusCode: 200, user });
  });

  handleDeleteUser = asyncWrapper(async (req, res) => {
    const { id } = req.auth;
    await userService.destroy(id);
    response(res, { statusCode: 200 });
  });

  handleLoginUser = asyncWrapper(async (req, res) => {
    const { username, password } = req.body;
    const user = await userService.login(username, password);
    const token = await setCookie(res, user);
    response(res, { statusCode: 200, user, token });
  });

  handleLogoutUser = asyncWrapper(async (req, res) => {
    res.clearCookie("token");
    response(res, { statusCode: 200 });
  });

  handleGetUser = asyncWrapper(async (req, res) => {
    const { id } = req.auth;
    const user = await userService.getUser(id);
    response(res, { statusCode: 200, user });
  });

  handleGetAllUsers = asyncWrapper(async (req, res) => {
    const { query="", page, limit } = req.query;
    const { users, count } = await userService.getAllUsers({ query, page, limit });
    response(res, { statusCode: 200, users, count });
  });
}

module.exports = new UserController();
