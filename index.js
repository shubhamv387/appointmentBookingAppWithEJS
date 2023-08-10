const express = require("express");

const sequelize = require("./utils/database");
const app = express();

const path = require("path");

const bodyParser = require("body-parser");

const errorController = require("./controller/404");

const bookingRouter = require("./router/booking");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(process.cwd(), "public")));

app.use(bookingRouter);

app.use(errorController.get404);

sequelize
  .sync()
  .then((res) => {
    app.listen(3000, () => {
      //   console.log(res);
      console.log("Server is running ");
    });
  })
  .catch((err) => console.log(err.message));
