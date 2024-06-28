export default function (error, req, res, _next) {
  const { status, message, validationErrors } = error;

  res.status(status || 500).send({
    path: req.originalUrl,
    timestamp: new Date().getTime(),
    message: message || "Internal error",
    validationErrors,
  });
}
