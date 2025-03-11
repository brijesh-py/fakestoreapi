const { asyncWrapper } = require("../utils");
const schema = require("./schema");

const validate = (schema, source = "body") =>
  asyncWrapper(async (req, res, next) => {
    await schema.parseAsync(req[source]);
    next();
  });

module.exports = { validate, schema };
