// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// Replace with your OpenAI API key and endpoint
const OPENAI_API_KEY = 'your-api-key';
const OPENAI_API_ENDPOINT = 'https://api.openai.com/v1/engines/davinci/completions';

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      OPENAI_API_ENDPOINT,
      {
        prompt: message,
        max_tokens: 50, // Adjust as needed
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing the request');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
