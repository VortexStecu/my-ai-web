import express from "express";
import fetch from "node-fetch";

const app = express();
const port = process.env.PORT || 8080;

// Cek koneksi
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head><title>My AI Web</title></head>
      <body style="font-family: Arial; background:#101010; color:white; text-align:center; margin-top:100px;">
        <h2>🤖 My AI Web is Online!</h2>
        <form action="/ask" method="get">
          <input name="q" placeholder="Tanya sesuatu..." style="width:300px; padding:8px;">
          <button type="submit" style="padding:8px;">Kirim</button>
        </form>
      </body>
    </html>
  `);
});

// Endpoint tanya ke OpenAI
app.get("/ask", async (req, res) => {
  const question = req.query.q;
  if (!question) return res.send("⚠️ Pertanyaan tidak boleh kosong.");

  const answer = await askOpenAI(question);
  res.send(`
    <h3>Pertanyaan:</h3> ${question}
    <h3>Jawaban AI:</h3> ${answer}
    <br><a href="/">Kembali</a>
  `);
});

// Fungsi panggil OpenAI API
async function askOpenAI(prompt) {
  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + process.env.OPENAI_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }]
      })
    });
    const data = await r.json();
    return data.choices?.[0]?.message?.content || "❌ Tidak ada jawaban dari AI.";
  } catch (e) {
    return "⚠️ Gagal menghubungi API OpenAI.";
  }
}

app.listen(port, () => console.log(`✅ Server running on port ${port}`));