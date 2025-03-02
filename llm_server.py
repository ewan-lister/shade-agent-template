from flask import Flask, request, jsonify
from transformers import pipeline

# Initialize Flask app
app = Flask(__name__)

# Load GPT-2 model using Hugging Face's pipeline for text generation
model_name = "EleutherAI/gpt-neo-1.3B"  # One of the larger models in the GPT-Neo family
generator = pipeline("text-generation", model=model_name)

@app.route("/query", methods=["POST"])
def query_llm():
    data = request.get_json()  # Get the JSON data from the request
    prompt = data.get("prompt", "")  # Get the prompt from the JSON payload
    
    # If the prompt is valid, generate text
    if prompt:
        # Adjust these parameters to improve the output
        response = generator(prompt, 
                              max_length=150,        # Increased max length
                              num_return_sequences=1,  # Generate one response
                              temperature=0.7,         # Lower temperature for more deterministic output
                              top_k=50,                # Limit top-k for more focused output
                              top_p=0.9)               # Use nucleus sampling
        return jsonify({"response": response[0]["generated_text"]})
    else:
        return jsonify({"error": "No prompt provided"}), 400  # If no prompt is provided, return an error


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)  # Run the Flask app on port 5000
