# DealFlow AI - API Key Configuration

## For Judges/Testers

You have two options to configure your Gemini API key:

### Option 1: Using the .env file (Recommended for Testing)
1. Open the `.env` file in the project root
2. Add your key: `VITE_GEMINI_API_KEY=your_key_here`
3. Restart the development server (`npm run dev`)

### Option 2: Using the Settings Page (Recommended for Users)
1. Start the application and navigate to **Settings**
2. Scroll to the **Gemini API Key** section
3. Paste your API key and click **Save Changes**
4. The key will be saved locally in your browser

## Getting a Gemini API Key
1. Visit [Google AI Studio](https://aistudio.google.com/apikey)
2. Click "Create API Key"
3. Copy the key (starts with `AIza...`)

## Priority
- If a key is set in **Settings**, it will be used first
- If no key is in Settings, the app will fall back to the `.env` file
- If neither is set, you'll see an error message

## Troubleshooting
- Open browser console (F12) to see which key source is being used
- Look for `[Gemini Service] API Key source:` messages
- If you see "Quota Exceeded", try a different API key
