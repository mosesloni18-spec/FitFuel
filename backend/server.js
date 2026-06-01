require("dotenv").config();

const nodemailer = require("nodemailer");
const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const DATA_FILE = "./data.json";

// the users in the app ( has some demo users)
const defaultData = {
  users: [
    {
      id: 1,
      name: "Eilmar Shaba",
      username: "eilmar",
      email: "cqv4124@autuni.ac.nz",
      password: "123",
      points: 50,
    },
    {
      id: 2,
      name: "Moses Loni",
      username: "moses",
      email: "jqp8369@autuni.ac.nz",
      password: "123",
      points: 75,
    },
    {
      id: 3,
      name: "Lana Smith",
      username: "lana",
      email: "jgt2603@autuni.ac.nz",
      password: "123",
      points: 100,
    },
    {
      id: 4,
      name: "Soyeon Im",
      username: "soyeon",
      email: "hpr7339@autuni.ac.nz",
      password: "123",
      points: 125,
    },
  ],
  friendRequests: [],
  friends: [],
};

// loading saved data
const loadData = () => {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2));
  }

  const fileData = fs.readFileSync(DATA_FILE);
  return JSON.parse(fileData);
};

// saving data
const saveData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendInviteEmail = async (toEmail, invitedUserName, fromUserName) => {
  const result = await transporter.sendMail({
    from: `"FitFuel" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "New friend request on FitFuel",
    text: `Hey ${invitedUserName}, 

${fromUserName} has sent you a friend request on FitFuel! 

Open the app to accept or decline it.

Thanks,
The FitFuel Team`,
  });

  console.log("Email accepted:", result.accepted);
  console.log("Email rejected:", result.rejected);
  console.log("Email response:", result.response);

  return result;
};

// test route
app.get("/", (req, res) => {
  res.send("FitFuel backend is running");
});

// create account
app.post("/register", (req, res) => {
  const { name, username, email, password } = req.body;

  if (!name || !username || !email || !password) {
    return res.status(400).json({
      message: "Please fill in all fields.",
    });
  }

  const data = loadData();

  const usernameTaken = data.users.find(
    (user) => user.username.toLowerCase() === username.toLowerCase(),
  );

  if (usernameTaken) {
    return res.status(400).json({
      message: "Username is already taken.",
    });
  }

  const emailTaken = data.users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase(),
  );

  if (emailTaken) {
    return res.status(400).json({
      message: "Email is already used.",
    });
  }

  const newUser = {
    id: Date.now(),
    name,
    username,
    email,
    password,
    points: 0,
  };

  data.users.push(newUser);
  saveData(data);

  res.json({
    message: "Account created successfully.",
    user: newUser,
  });
});

// login account
app.post("/login", (req, res) => {
  const { loginText, password } = req.body;

  if (!loginText || !password) {
    return res.status(400).json({
      message: "Please enter your username/email and password.",
    });
  }

  const data = loadData();

  const user = data.users.find(
    (u) =>
      (u.username.toLowerCase() === loginText.toLowerCase() ||
        u.email.toLowerCase() === loginText.toLowerCase()) &&
      u.password === password,
  );

  if (!user) {
    return res.status(401).json({
      message: "Incorrect username/email or password.",
    });
  }

  res.json({
    message: "Login successful.",
    user,
  });
});

// gett all demo users
app.get("/users", (req, res) => {
  const data = loadData();

  res.json(data.users);
});

// gett users that are not current user
app.get("/users/:currentUserId", (req, res) => {
  const currentUserId = Number(req.params.currentUserId);
  const data = loadData();

  const users = data.users.filter((user) => user.id !== currentUserId);

  res.json(users);
});

// get leaderboard users
app.get("/leaderboard", (req, res) => {
  const data = loadData();

  const leaderboard = data.users
    .map((user) => ({
      id: user.id,
      name: user.name,
      username: user.username,
      points: user.points || 0,
    }))
    .sort((a, b) => b.points - a.points);

  res.json(leaderboard);
});

// sending friend request
app.post("/friend-request", async (req, res) => {
  const { fromUserId, searchText } = req.body;

  if (!fromUserId || !searchText) {
    return res.status(400).json({
      message: "Missing user or search text.",
    });
  }

  const data = loadData();

  const fromUser = data.users.find((user) => user.id === Number(fromUserId));

  if (!fromUser) {
    return res.status(404).json({
      message: "Logged in user not found.",
    });
  }

  const user = data.users.find(
    (u) =>
      u.username.toLowerCase() === searchText.toLowerCase() ||
      u.email.toLowerCase() === searchText.toLowerCase(),
  );

  if (!user) {
    return res.status(404).json({
      message: "No user found with that username or email.",
    });
  }

  if (user.id === fromUser.id) {
    return res.status(400).json({
      message: "You cannot send a request to yourself.",
    });
  }

  const alreadyFriend = data.friends.find(
    (f) =>
      (f.userA === fromUser.id && f.userB === user.id) ||
      (f.userA === user.id && f.userB === fromUser.id),
  );

  if (alreadyFriend) {
    return res.status(400).json({
      message: "This user is already your friend.",
    });
  }

  const alreadyRequested = data.friendRequests.find(
    (r) =>
      r.fromUserId === fromUser.id &&
      r.toUserId === user.id &&
      r.status === "pending",
  );

  if (alreadyRequested) {
    return res.status(400).json({
      message: "Friend request already sent.",
    });
  }

  const newRequest = {
    id: Date.now(),
    fromUserId: fromUser.id,
    toUserId: user.id,
    status: "pending",
  };

  try {
    console.log("Sending friend request from:", fromUser.username);
    console.log("Sending friend request to:", user.username);
    console.log("Sending email to:", user.email);

    await sendInviteEmail(user.email, user.name, fromUser.name);

    data.friendRequests.push(newRequest);
    saveData(data);

    res.json({
      message: "Friend request sent and email delivered.",
      request: newRequest,
    });
  } catch (error) {
    console.log("Email failed:", error.message);

    res.status(500).json({
      message: "Email could not be sent, so request was not saved.",
    });
  }
});

// get pending friend requests
app.get("/friend-requests/:userId", (req, res) => {
  const userId = Number(req.params.userId);
  const data = loadData();

  const requests = data.friendRequests
    .filter(
      (request) => request.toUserId === userId && request.status === "pending",
    )
    .map((request) => {
      const fromUser = data.users.find(
        (user) => user.id === request.fromUserId,
      );

      return {
        id: request.id,
        fromUser,
      };
    });

  res.json(requests);
});

// accept friend request
app.post("/friend-request/accept", (req, res) => {
  const { requestId } = req.body;

  const data = loadData();

  const request = data.friendRequests.find(
    (request) => request.id === Number(requestId),
  );

  if (!request) {
    return res.status(404).json({
      message: "Friend request not found.",
    });
  }

  request.status = "accepted";

  data.friends.push({
    id: Date.now(),
    userA: request.fromUserId,
    userB: request.toUserId,
  });

  saveData(data);

  res.json({
    message: "Friend request accepted.",
  });
});

// decline friend request
app.post("/friend-request/decline", (req, res) => {
  const { requestId } = req.body;

  const data = loadData();

  const request = data.friendRequests.find(
    (request) => request.id === Number(requestId),
  );

  if (!request) {
    return res.status(404).json({
      message: "Friend request not found.",
    });
  }

  request.status = "declined";
  saveData(data);

  res.json({
    message: "Friend request declined.",
  });
});

// get friends list
app.get("/friends/:userId", (req, res) => {
  const userId = Number(req.params.userId);
  const data = loadData();

  const friends = data.friends
    .filter((friend) => friend.userA === userId || friend.userB === userId)
    .map((friend) => {
      const friendId = friend.userA === userId ? friend.userB : friend.userA;

      return data.users.find((user) => user.id === friendId);
    });

  res.json(friends);
});

// reset demo data
app.post("/reset", (req, res) => {
  saveData(defaultData);

  res.json({
    message: "Demo data reset.",
  });
});

app.listen(PORT, () => {
  console.log(`FitFuel backend running on http://localhost:${PORT}`);
});
