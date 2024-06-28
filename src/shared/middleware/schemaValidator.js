import ValidationException from "../../error/ValidationException.js";

export default function (schema) {
  return async function (req, res, next) {
    const result = await schema.run(req);
    if (result.length > 0) {
      const validationErrors = {};
      result.forEach((resultWithContext) => {
        if (!resultWithContext.isEmpty()) {
          const error = resultWithContext.array()[0];
          validationErrors[error.path] = error.msg;
        }
      });
      if (Object.keys(validationErrors).length > 0) {
        return next(new ValidationException(validationErrors));
      }
    }
    next();
  };
}
