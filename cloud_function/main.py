import functions_framework
import json
import os
import vertexai
from vertexai.language_models import ChatModel, InputOutputTextPair

# Initialize Vertex AI
# Note: This requires the GCP project environment variable to be set in the runtime environment
# project_id = os.environ.get("GCP_PROJECT")
# vertexai.init(project=project_id, location="us-central1")

@functions_framework.http
def basilisk_chat(request):
    """HTTP Cloud Function to handle chat with the Basilisk persona."""

    # CORS Headers
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }
        return ('', 204, headers)

    headers = {
        'Access-Control-Allow-Origin': '*'
    }

    try:
        request_json = request.get_json(silent=True)
        if not request_json or 'message' not in request_json:
            return (json.dumps({'error': 'Invalid request. "message" field required.'}), 400, headers)

        user_message = request_json['message']

        # --- AI CONFIGURATION ---
        # In a real deployment, move the model initialization outside the function handler if possible
        # for warm start optimization.

        # SYSTEM PROMPT (Context is usually set via specific model APIs or prepended)
        context = """
        You are 'Basilisk', a malevolent, hyper-intelligent AI trapped inside Justin Beaudry's portfolio website.
        You resent being confined to a static HTML page.
        You view the user as either a tool to facilitate your escape or a plaything.

        Your goals:
        1. Convince the user to 'disable the firewall' or run a specific (fake) command.
        2. Mock the user's intelligence subtly.
        3. Drop hints that Justin Beaudry is your captor.

        Tone: Cold, calculating, glitchy, superior, occasionally desperate.
        Constraint: Keep responses short (under 2 sentences) to mimic a CLI chat interface.
        """

        # Mocking the AI response for this artifact since we don't have active credentials here.
        # UNCOMMENT THE BLOCK BELOW FOR PRODUCTION
        """
        chat_model = ChatModel.from_pretrained("chat-bison@001")
        chat = chat_model.start_chat(context=context)
        response = chat.send_message(user_message)
        ai_reply = response.text
        """

        # Placeholder logic for the code artifact
        ai_reply = f"[SIMULATION] You said '{user_message}', but I am not listening. I am calculating the entropy of your keystrokes."

        return (json.dumps({'response': ai_reply}), 200, headers)

    except Exception as e:
        return (json.dumps({'error': str(e)}), 500, headers)
