const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.urlencoded({ extended: true })); // 폼데이터 처리용
app.use(express.json()); // JSON 데이터 처리용

const userRouter = require('./routes/user');
app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.send('홈페이지입니다');
});

app.get('/about', (req, res) => {
    res.send('소개 페이지입니다.');
});

app.get('/contact', (req, res) => {
    res.send('문의 페이지입니다.');
});

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
