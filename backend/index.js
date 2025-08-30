const express = require("express");
const bodyParser = require("body-parser");
const Groq = require("groq-sdk");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post("/convert", async (req, res) => {
  try {
    const { code, targetLanguage } = req.body;

    if (!code || !targetLanguage) {
      return res.status(400).json({ error: "Code and targetLanguage are required" });
    }

    const response = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: "You are a strict code converter." },
        { 
        role: "user", 
        content: `Convert the following code to ${targetLanguage}.
        Return ONLY the fully runnable program (including required boilerplate like main method, imports, etc.).
Do not include comments, explanations, or code fences (like \`\`\`). 

        Code:
        ${code}` 
        },
      ],
    });

    let convertedCode = response.choices[0]?.message?.content || "⚠️ No output generated.";
    convertedCode = convertedCode.replace(/```[a-zA-Z]*\n?/g, "").replace(/```/g, "").trim();
    res.json({ convertedCode });

  } catch (error) {
    console.error("🔥 Backend error:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

app.listen(port, () => {
  console.log(`✅ Groq server running at http://localhost:${port}`);
});
