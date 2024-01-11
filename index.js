const express = require("express");
const app = express();
const port = 3000;

const USER = [];

app.post("/register", (req, res) => {
  const { email, password, confirmPassword } = req.body;
  const user = USER.find((user) => user.email === email);
  if (user) {
    res.status(403).json({ message: "User already exists." });
  } else {
    if (!(password === confirmPassword)) {
      res
        .status(403)
        .json({ message: "Password and Confirmed password don't match" });
    } else {
      res.json({ message: "User created successfully" });
    }
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.headers;
  const correctEmail = USER.find((user) => user.email === email);
  const correctPassword = USER.find((user) => user.password === password);
  if (correctEmail && correctPassword) {
    res.json({ message: "User signed in successfully." });
  } else {
    if (correctEmail) {
      res.status(401).json({ message: "Incorrect password" });
    }
    res.status(403).json({ message: "Invalid username or password" });
  }
});

app.post("/forgot", (req, res) => {
  const { email } = req.body;
  const user = USER.find((user) => user.email === email);
  if (user) {
    res.json({ message: "Password reset link sent successfully" });
  } else {
    res.status(403).json({ message: "User does not exist" });
  }
});

app.put("/reset/:email", (req, res) => {
  const { newPassword, confirmNewPassword } = req.body;
  const email = req.params.email;
  const user = USER.find((user) => user.email === email);
  if (user) {
    if (newPassword === confirmNewPassword) {
      user.password = newPassword; // directly storing without hashing the password
      res.json({ message: "Password reset successfully" });
    } else {
      res
        .status(403)
        .json({ message: "Password and Confirm Password don't match" });
    }
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

app.get("userInfo/:email", (req, res) => {
  const email = req.params.email;
  const user = USER.find((user) => user.email === email);
  if (user) {
    res.json(user);
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
