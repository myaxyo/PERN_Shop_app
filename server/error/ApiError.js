function ApiError(status, message) {
  (this.status = status), (this.message = message);
}

const badRequest = (message) => {
  return new ApiError(404, message);
};
const internal = (message) => {
  return new ApiError(500, message);
};
const forbidden = (message) => {
  return new ApiError(403, message);
};

module.exports = { ApiError, badRequest, internal, forbidden };
