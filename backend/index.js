const express = require("express");
const bodyParser = require("body-parser");
const Groq = require("groq-sdk");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

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
          Return ONLY the fully runnable program.
          Do not include comments, explanations, or code fences.
          Code:
          ${code}`
        },
      ],
    });

    app.post("/optimize", async (req, res) => {
      try {
        const { code } = req.body;
        if (!code) {
          return res.status(400).json({
            error: "Code is required"
          });
        }

        const response = await client.chat.completions.create({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content:
                "You are an expert code optimizer. Return only optimized code."
            },
            {
              role: "user",
              content: `
                Optimize the following code.
                Return ONLY the fully runnable program.
                Do not include comments, explanations, or code fences.
                After code provide before code time and space complexity and after time and space complexity
                ${code}
                `
            }
          ]
        });
        let optimizedCode =
          response.choices[0]?.message?.content ||
          "No optimized output generated.";
        optimizedCode = optimizedCode
          .replace(/```[a-zA-Z]*\n?/g, "")
          .replace(/```/g, "")
          .trim();
        res.json({
          optimizedCode
        });
      }
      catch (error) {
        console.error("OPTIMIZE ERROR:", error);
        res.status(500).json({
          error: error.message
        });
      }
    });
        

    let convertedCode =
      response.choices[0]?.message?.content || "⚠️ No output generated.";

    convertedCode = convertedCode
      .replace(/```[a-zA-Z]*\n?/g, "")
      .replace(/```/g, "")
      .trim();

    res.json({ convertedCode });

  } catch (error) {
    console.error("🔥 Backend error:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
