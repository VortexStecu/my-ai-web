const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("✅ Railway deployment successful! Your AI is online 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});