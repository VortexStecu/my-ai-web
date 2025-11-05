import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

// ✅ route utama biar gak "Not Found"
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>My AI Web</title>
      </head>
      <body style="font-family: sans-serif; background: #0f0f0f; color: #fff; text-align: center;">
        <h2>🤖 My AI Web is Online!</h2>
        <form action="/ask" method="get">
          <input name="question" placeholder="Tanya sesuatu..." style="width: 300px; padding: 8px;">
          <button type="submit" style="padding: 8px;">Kirim</button>
        </form>
      </body>
    </html>
  `);
});

// ✅ route AI-nya
app.get("/ask", async (req, res) => {
  const question = req.query.question;
  if (!question) return res.send("⚠️ Pertanyaan tidak boleh kosong!");

  const reply = await askOpenAI(question);
  res.send(`<h3>Pertanyaan:</h3> ${question}<br><h3>Jawaban:</h3> ${reply}`);
});

async function askOpenAI(prompt) {
  try {
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
    return data.choices?.[0]?.message?.content || "❌ Tidak ada jawaban dari AI.";
  } catch (err) {
    return "⚠️ Gagal terhubung ke OpenAI API.";
  }
}

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});