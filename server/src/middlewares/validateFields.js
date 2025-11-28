// src/middlewares/validateFields.js
const { fail } = require("../helpers/responseHelper");

// fields: array of field names that must exist on req.body (non-empty)
function requireFields(fields) {
  return (req, res, next) => {
    const missing = [];
    fields.forEach((f) => {
      if (
        req.body[f] === undefined ||
        req.body[f] === null ||
        req.body[f] === ""
      ) {
        missing.push(f);
      }
    });
    if (missing.length) {
      return fail(
        res,
        "MISSING_FIELDS",
        "Required fields missing",
        missing,
        400
      );
    }
    return next();
  };
}

module.exports = { requireFields };
