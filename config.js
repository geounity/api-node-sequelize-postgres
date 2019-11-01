module.exports = {
  db:
    "mongodb+srv://seba:LuisAlbertoSpinettaYGustavoCerati@cluster0-uzzv1.mongodb.net/test?retryWrites=true&w=majority",
  dev: process.env.NODE_ENV !== "production",
  host: process.env.HOST || "http://localhost",
  port: process.env.PORT || 8080
};
