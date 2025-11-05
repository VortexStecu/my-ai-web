import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());

// Halaman utama
app.get("/", (req, res) => {
  res.send(`
    <h2>🤖 My AI Web is Online!</h2>
    <form action="/ask" method="post">
      <input name="question" placeholder="Tanya sesuatu..." style="width: 300px;">
      <button type="submit">Kirim</button>
    </form>
  `);
});

// API AI (contohnya pakai OpenAI)
app.post("/ask", async (req, res) => {
  const question = req.body.question || req.query.question;
  if (!question) return res.send("⚠️ Pertanyaan tidak boleh kosong!");

  const reply = await askOpenAI(question);
  res.send(`<h3>Pertanyaan:</h3> ${question}<br><h3>Jawaban:</h3> ${reply}`);
});

// Fungsi buat panggil OpenAI
async function askOpenAI(prompt) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }]
    })
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "❌ Gagal menjawab.";
}

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});