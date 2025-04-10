const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let comments = []; // 메모리에 댓글 저장

// 댓글 저장
app.post("/api/comments", (req, res) => {
  const { username, text } = req.body;
  if (!username || !text) {
    return res.status(400).json({ message: "입력값이 누락되었습니다." });
  }

  const newComment = {
    id: Date.now(),
    username,
    text,
    createdAt: new Date().toISOString(),
  };
  comments.push(newComment);
  res.status(201).json(newComment);
});

// 댓글 목록 조회
app.get("/api/comments", (req, res) => {
  res.json(comments);
});

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
