require("dotenv").config();

const nodemailer = require("nodemailer");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// the users in the app ( has some demo users)
const users = [
  {
    id: 1,
    name: "Eilmar Shaba",
    username: "eilmar",
    email: "cqv4124@autuni.ac.nz",
  },
  {
    id: 2,
    name: "Moses Loni",
    username: "moses",
    email: "jqp8369@autuni.ac.nz",
  },
  {
    id: 3,
    name: "Lana Smith",
    username: "lana",
    email: "jgt2603@autuni.ac.nz",
  },
  {
    id: 4,
    name: "Soyeon Im",
    username: "soyeon",
    email: "hpr7339@autuni.ac.nz",
  },
];

let friendRequests = [];
let friends = [];

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendInviteEmail = async (toEmail, invitedUserName) => {
  await transporter.sendMail({
    from: `"FitFuel" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "New friend request on FitFuel",
    text: `Hey ${invitedUserName}, 

you have received a friend request on FitFuel! 

Open the app to accept or decline it.

Thanks,
The FitFuel Team`,
  });
};

// test route
app.get("/", (req, res) => {
  res.send("FitFuel backend is running");
});

// gett all demo users
app.get("/users", (req, res) => {
  res.json(users);
});

// sending friend request
app.post("/friend-request", async (req, res) => {
  const { searchText } = req.body;

  if (!searchText) {
    return res.status(400).json({
      message: "Please enter a username or email.",
    });
  }

  const user = users.find(
    (u) =>
      u.username.toLowerCase() === searchText.toLowerCase() ||
      u.email.toLowerCase() === searchText.toLowerCase(),
  );

  if (!user) {
    return res.status(404).json({
      message: "No user found with that username or email.",
    });
  }

  const alreadyFriend = friends.find((f) => f.id === user.id);

  if (alreadyFriend) {
    return res.status(400).json({
      message: "This user is already your friend.",
    });
  }

  const alreadyRequested = friendRequests.find((r) => r.id === user.id);

  if (alreadyRequested) {
    return res.status(400).json({
      message: "Friend request already sent.",
    });
  }

  friendRequests.push(user);

  try {
    await sendInviteEmail(user.email, user.name);

    res.json({
      message: "Friend request sent and email delivered.",
      request: user,
    });
  } catch (error) {
    console.log("Email failed:", error.message);

    res.json({
      message: "Friend request saved, but email could not be sent.",
      request: user,
    });
  }
});

// get pending friend requests
app.get("/friend-requests", (req, res) => {
  res.json(friendRequests);
});

// accept friend request
app.post("/friend-request/accept", (req, res) => {
  const { userId } = req.body;

  const request = friendRequests.find((r) => r.id === userId);

  if (!request) {
    return res.status(404).json({
      message: "Friend request not found.",
    });
  }

  friends.push(request);
  friendRequests = friendRequests.filter((r) => r.id !== userId);

  res.json({
    message: "Friend request accepted.",
    friend: request,
  });
});

// decline friend request
app.post("/friend-request/decline", (req, res) => {
  const { userId } = req.body;

  friendRequests = friendRequests.filter((r) => r.id !== userId);

  res.json({
    message: "Friend request declined.",
  });
});

// get friends list
app.get("/friends", (req, res) => {
  res.json(friends);
});

// reset demo data
app.post("/reset", (req, res) => {
  friendRequests = [];
  friends = [];

  res.json({
    message: "Demo data reset.",
  });
});

app.listen(PORT, () => {
  console.log(`FitFuel backend running on http://localhost:${PORT}`);
});
