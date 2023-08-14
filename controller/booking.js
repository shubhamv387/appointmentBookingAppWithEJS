const { Error } = require("sequelize");
const User = require("../model/users");

exports.getUsers = (req, res, next) => {
  //   console.log(req.body);
  User.findAll()
    .then((users) => {
      res.render("index", {
        users: users,
        pageTitle: "All Users",
        path: "/",
      });
    })
    .catch((err) => console.log(err.message));
};

exports.newUser = (req, res, next) => {
  res.render("add-user", {
    pageTitle: "Add User",
    path: "/add-user",
    editing: false,
  });
};

exports.postAddUser = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  User.create({
    name: name.trim(),
    email: email,
    phone: phone.trim(),
  })
    .then(() => {
      console.log("user created");
      res.render("add-user", {
        pageTitle: "All Users",
        path: "/add-user",
        editing: false,
      });
    })
    .catch((err) => console.log(err.message));
};

exports.getEditUser = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const userId = req.params.userId;

  User.findAll({ where: { id: userId } })
    .then((user) => {
      if (!user[0]) {
        return res.redirect("/");
      }
      res.render("add-user", {
        editing: editMode,
        pageTitle: "Edit User",
        path: "/add-user",
        user: user[0],
      });
    })
    .catch((err) => console.log(err.message));
};

exports.postEditUser = (req, res, next) => {
  const userId = req.body.userId;
  const updateName = req.body.name;
  const updateEmail = req.body.email;
  const updatePhone = req.body.phone;
  const oldEmail = req.body.oldEmail;

  if (updateEmail === oldEmail) {
    User.update(
      {
        name: updateName.trim(),
        email: updateEmail,
        phone: updatePhone.trim(),
      },
      { where: { id: userId } }
    )
      .then(() => {
        console.log("user updated");
        res.redirect("/");
      })
      .catch((err) => console.log(err.message));
  } else {
    User.findAll({ where: { email: updateEmail } })
      .then((user) => {
        // console.log(user[0]);
        if (user[0]) {
          console.log("Email Already Exists!");
          res
            .status(400)
            .send(
              "<h1>Email Already Exists!</h1><p>Go back and change the email</p>"
            );
          // res.redirect(`/edit-user/${userId}?edit=true`);
        } else {
          User.update(
            {
              name: updateName.trim(),
              email: updateEmail,
              phone: updatePhone.trim(),
            },
            { where: { id: userId } }
          )
            .then(() => {
              console.log("user updated");
              res.redirect("/");
            })
            .catch((err) => console.log(err.message));
        }
      })
      .catch((err) => console.log(err.message));
  }
};

exports.deleteUser = (req, res, next) => {
  const userId = req.body.userId;
  User.destroy({ where: { id: userId } })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.log(err.message));
};
