const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
  res.send('로그인 페이지');
});

router.post('/login', (req, res) => {
  const { username } = req.body;
  res.send(`로그인 시도: ${username}`);
});

module.exports = router;
