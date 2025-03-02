const errorMiddleware = async (err, req, res, next) => {
  console.error(err.stack); // Log error stack trace (useful for debugging)

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorMiddleware;
