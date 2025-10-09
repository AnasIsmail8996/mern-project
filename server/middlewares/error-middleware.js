const errorMiddleware = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "BACKEND ERROR";
  const extraDetails = err.extraDetails || ["ERROR FROM EXTRADETAILS BACKEND ERROR"];

  return res.status(status).json({ message, extraDetails });
};

export { errorMiddleware };
