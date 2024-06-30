const AVAILABLE_DIRECTIONS = ["asc", "desc"];
export default function (req, res, next) {
  let page = +req.query.page || 0;
  let size = +req.query.size || 10;
  if (page < 0) {
    page = 0;
  }
  if (size < 1) {
    size = 1;
  }
  const sort = req.query.sort || "";
  let direction = "desc";
  if (
    req.query.direction &&
    AVAILABLE_DIRECTIONS.indexOf(req.query.direction.toLowerCase()) > -1
  ) {
    direction = req.query.direction;
  }
  req["pagination"] = {
    page,
    size,
    sort,
    direction,
  };
  next();
}
