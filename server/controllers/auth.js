const { connect } = require("getstream");
const bcrypt = require("bcrypt");
const StreamChat = require("stream-chat").StreamChat;
const crypto = require("crypto");

require("dotenv").config();

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

const signup = async (req, res) => {
  try {
    const { fullName, username, password, phoneNumber, avatarURL } = req.body;

    const userId = crypto.randomBytes(16).toString("hex");

    const serverClient = connect(api_key, api_secret, app_id);

    const hashedPassword = await bcrypt.hash(password, 10);

    const token = serverClient.createUserToken(userId);

    res.status(200).json({
      token,
      fullName,
      username,
      userId,
      hashedPassword,
      phoneNumber,
      avatarURL,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const serverClient = connect(api_key, api_secret, app_id);

  const client = StreamChat.getInstance(api_key, api_secret);
  let user;
  try {
    user = await client.queryUsers({ name: username });
  } catch (error) {
    console.log(error);
  }
  if (!user) return res.status(500).json({ message: "network problem" });

  const { users } = user;

  if (!users.length) return res.status(500).json({ message: "User not found" });

  const success = await bcrypt.compare(password, users[0].hashedPassword);

  const token = serverClient.createUserToken(users[0].id);

  if (success) {
    res.status(200).json({
      token,
      fullName: users[0].fullName,
      username,
      userId: users[0].id,
      image: users[0].image,
    });
  } else {
    res.status(500).json({ message: "Incorrect password" });
  }
};

module.exports = { signup, login };
