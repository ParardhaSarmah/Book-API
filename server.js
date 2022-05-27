const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
const port = 3000;
const dbString = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(dbString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(process.env.PORT || port, () => {
  console.log(`Listening on port ${port}`);
});
