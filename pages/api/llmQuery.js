// pages/api/llmQuery.js
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { prompt } = req.body;

            // Ensure that the request contains a valid prompt
            if (!prompt) {
                return res.status(400).json({ error: 'Prompt is required' });
            }

            // Call the LLM API (adjust the URL and port accordingly)
            const llmResponse = await fetch('http://localhost:5000/generate-text', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            // Check if the response is OK and handle the response as JSON
            if (!llmResponse.ok) {
                const error = await llmResponse.json();
                return res.status(500).json({ error: error.error || 'Failed to query LLM' });
            }

            // Parse the JSON response from the LLM server
            const data = await llmResponse.json();
            
            // Forward the response back to the frontend
            res.status(200).json({ response: data.response || 'No response from LLM' });
        } catch (e) {
            console.error('Error querying LLM:', e);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}

