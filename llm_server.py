from flask import Flask, request, jsonify
from transformers import pipeline

# Initialize the LLM model (example with GPT-2)
model = pipeline('text-generation', model='gpt2')

app = Flask(__name__)

@app.route('/generate-text', methods=['POST'])
def generate_text():
    try:
        # Parse JSON data from request
        data = request.json
        prompt = data.get('prompt', '')

        # Check if prompt is empty
        if not prompt:
            return jsonify({'error': 'Prompt is required'}), 400

        # Generate response from the LLM
        response = model(prompt, max_length=100, num_return_sequences=1)
        
        # We may want to ensure the response structure is clean, just the generated text
        result = response[0]['generated_text']

        return jsonify({'response': result})

    except Exception as e:
        # Catch any exceptions and return a meaningful error message
        return jsonify({'error': 'Internal Server Error', 'details': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)  # Running inside TEE
