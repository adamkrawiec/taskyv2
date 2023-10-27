const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  console.log(`Time: ${Date.now()} - ${req.method}: ${req.path}`);
  next();
});

router.get('/', (req, res) => {
  res.json({
    message: 'Hello there'
  });
});

module.exports = router;
