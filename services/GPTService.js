const axios = require('axios');

const apiKey =  process.env.apiKey; 

const prompt = "כתיבת הקוד בעברית";

const fetchGPTResponse = async (prompt) => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/engines/davinci-codex/completions',
            {
                prompt: prompt,
                max_tokens: 100, // Adjust this value as needed
                temperature: 0.5,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
            }
        );

        const completion = response.data.choices[0].text.trim();
        console.log("GPT Response:", completion);
    } catch (error) {
        console.error("Error fetching GPT response:", error.response ? error.response.data : error.message);
    }
};

fetchGPTResponse(prompt);
