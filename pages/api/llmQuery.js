export default async function handler(req, res) {
    if (req.method === "POST") {
        const { prompt } = req.body;

        try {
            // Forward the request to the Python model server running on localhost:5000
            const response = await fetch("http://localhost:5000/query", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt }),
            });

            const data = await response.json();

            if (response.ok) {
                res.status(200).json({ response: data.response });
            } else {
                res.status(400).json({ error: data.error || "Error with LLM" });
            }
        } catch (e) {
            console.error("Error in LLM query:", e);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
}
