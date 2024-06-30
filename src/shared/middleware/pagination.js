export default function (req, res, next) {
  let page = +req.query.page || 0;
  let size = +req.query.size || 10;
  if (page < 0) {
    page = 0;
  }
  if (size < 1) {
    size = 1;
  }
  req["pagination"] = {
    page,
    size,
  };
  next();
}
