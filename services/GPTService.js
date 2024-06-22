const axios = require('axios');

const apiKey = process.env.API_KEY; 

const prompt = "כתיבת הקוד בעברית";

const fetchGPTResponse = async (prompt) => {
    console.log("in fetchGPTResponse");
    console.log("API Key:", process.env.API_KEY);

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions', // Updated endpoint for chat models
            {
                model: 'gpt-3.5-turbo', // Updated model name
                messages: [{ role: 'user', content: prompt }], // Updated request format
                max_tokens: 10, // Adjust this value as needed
                temperature: 0.5,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
            }
        );

        const completion = response.data.choices[0].message.content.trim();
        console.log("GPT Response:", completion);
    } catch (error) {
        console.error("Error fetching GPT response:", error.response ? error.response.data : error.message);
    }
};

fetchGPTResponse(prompt);
module.exports = fetchGPTResponse;
