const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

// ✅ MongoDB 연결
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB 연결 성공"))
  .catch((err) => console.error("❌ MongoDB 연결 실패", err));

// ✅ 정적 파일 서비스 설정
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ Mongoose 모델 불러오기
const User = require("./models/User");

// ✅ 회원가입
app.post("/api/signup", async (req, res) => {
  const { username, password } = req.body;

  const existing = await User.findOne({ username });
  if (existing) {
    return res.status(400).json({ message: "이미 존재하는 사용자입니다." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();

  res.status(201).json({ message: "회원가입 성공" });
});

// ✅ 로그인 상태 변수 (임시)
let currentUser = null;

// ✅ 로그인
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }); // 🔄 DB에서 찾기
  if (!user) {
    return res.status(401).json({ message: "존재하지 않는 사용자입니다." });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: "비밀번호가 틀렸습니다." });
  }

  currentUser = user.username;
  res.json({ message: "로그인 성공", username: user.username });
});

// ✅ 로그아웃
app.post("/api/logout", (req, res) => {
  currentUser = null;
  res.json({ message: "로그아웃 성공" });
});

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
