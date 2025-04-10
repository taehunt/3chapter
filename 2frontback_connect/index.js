const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors()); // CORS 허용
app.use(express.static(path.join(__dirname, "public"))); // 정적 파일 제공

app.get("/api/message", (req, res) => {
  res.json({ message: "서버에서 전송된 메시지입니다 👋" });
});

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
