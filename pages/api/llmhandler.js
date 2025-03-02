const axios = require('axios');

/**
 * Queries the LLM running inside the TEE.
 * @param {string} prompt - The input text to send to the model.
 * @returns {Promise<string>} - The model's response.
 */
async function queryLLM(prompt) {
    try {
        const response = await axios.post('http://localhost:5000/generate', { prompt });
        return response.data.text; // Adjust based on your API response format
    } catch (error) {
        console.error("Error querying LLM:", error);
        return "Error generating response.";
    }
}

module.exports = { queryLLM };
