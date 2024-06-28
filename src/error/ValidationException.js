export default function (validationErrors) {
  this.status = 400;
  this.message = "Invalid Request";
  this.validationErrors = validationErrors;
}
