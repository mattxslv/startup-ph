# AI Chatbot Setup Guide 🤖

## Overview
This is a **FREE** AI chatbot assistant that helps users with startup registration. It uses Google's Gemini API (free tier) to provide intelligent, context-aware responses.

## Features ✨
- 🆓 **Completely Free** - Uses Google Gemini free tier
- 💬 **Smart Conversations** - Understands context about startup registration
- 📱 **Floating Widget** - Non-intrusive chat button in bottom-right corner
- 🚀 **Quick Questions** - Predefined buttons for common questions
- 💾 **Conversation History** - Maintains context throughout the chat
- 🎯 **Context-Aware** - Knows about DTI, SEC, registration process, programs

## Setup Instructions

### Step 1: Get Your Free Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the API key

### Step 2: Add API Key to Environment

1. Open your `.env` file in the Laravel project
2. Add this line:
   ```bash
   GEMINI_API_KEY=your_api_key_here
   ```

### Step 3: Test the Chatbot

1. Restart your Docker containers (if using Docker):
   ```bash
   cd start-up-ws-main
   docker-compose restart
   ```

2. Go to your user frontend: `http://localhost:3000`

3. Look for the chat button in the bottom-right corner 💬

4. Click it and start chatting!

## Usage Limits (Free Tier)

Google Gemini API Free Tier:
- ✅ 15 requests per minute
- ✅ 1,500 requests per day  
- ✅ 1 million requests per month

This is MORE than enough for most startup portals!

## What the Chatbot Knows

The chatbot has been trained on:
- ✅ Startup registration process
- ✅ DTI vs SEC registration differences
- ✅ Required documents
- ✅ User types (Startup, Enabler, Visitor)
- ✅ Verification process
- ✅ Business classifications
- ✅ Development phases
- ✅ Common troubleshooting

## Try These Questions

Example questions you can ask:
- "What documents do I need to register?"
- "What's the difference between DTI and SEC?"
- "How long does verification take?"
- "What is a startup enabler?"
- "How do I upload my business permit?"
- "Can I register with only a SEC number?"

## Customization

### Update System Prompt
Edit `/app/Http/Controllers/ChatbotController.php` in the `getSystemPrompt()` method to:
- Add more knowledge
- Change tone/personality
- Add specific program information
- Include regional details

### Modify UI
Edit `/src/components/chatbot/ChatbotWidget.tsx` to:
- Change colors
- Adjust position
- Add more quick questions
- Modify layout

## API Endpoint

The chatbot uses this endpoint:
```
POST /api/v2/user/chatbot
```

Request body:
```json
{
  "message": "What documents do I need?",
  "conversation_history": [
    {"role": "user", "content": "Hello"},
    {"role": "assistant", "content": "Hi! How can I help?"}
  ]
}
```

Response:
```json
{
  "success": true,
  "message": "To register your startup, you'll need..."
}
```

## Troubleshooting

### Chatbot not responding?
1. Check if `GEMINI_API_KEY` is set in `.env`
2. Restart Laravel containers
3. Check Laravel logs: `docker-compose logs app`

### API quota exceeded?
- Free tier has daily limits
- Consider upgrading to paid tier if needed
- Or implement rate limiting per user

### Want better responses?
- Update the system prompt with more specific information
- Add more examples in the knowledge base
- Fine-tune temperature/topP parameters in `ChatbotController.php`

## Cost Estimate

For a government startup portal with moderate traffic:
- **Free tier is sufficient** for 99% of use cases
- If you exceed limits, Google Gemini Pro costs are very low:
  - ~$0.00025 per 1K characters (input)
  - ~$0.0005 per 1K characters (output)
  
Example: 10,000 conversations/month ≈ $5-10/month

## Alternative: Self-Hosted (100% Free)

If you want ZERO costs and complete privacy:
1. Install [Ollama](https://ollama.ai) on your server
2. Use open-source models (Llama 3.2, Mistral, Phi-3)
3. Update `ChatbotController.php` to call local Ollama API

Contact the development team if you want to switch to self-hosted!

---

**Built with ❤️ for Philippine Startups**
