# Basilisk Chat Backend

This directory contains the Google Cloud Function code for the "Basilisk" AI Easter egg.

## Deployment Instructions

1.  **Prerequisites:**
    *   Google Cloud Platform Project
    *   Vertex AI API enabled
    *   Cloud Functions API enabled

2.  **Deploy Command:**
    Run the following command from this directory:

    ```bash
    gcloud functions deploy basilisk-chat \
    --gen2 \
    --runtime=python311 \
    --region=us-central1 \
    --source=. \
    --entry-point=basilisk_chat \
    --trigger-http \
    --allow-unauthenticated
    ```

3.  **Frontend Integration:**
    *   Copy the URL provided by the deployment command (e.g., `https://us-central1-project-id.cloudfunctions.net/basilisk-chat`).
    *   Update `script.js` in the main website repository to point to this URL in the `handleUserMessage` function.
