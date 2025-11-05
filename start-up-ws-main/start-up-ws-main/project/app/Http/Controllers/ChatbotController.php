<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ChatbotController extends Controller
{
    /**
     * Handle chatbot conversation
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function chat(Request $request)
    {
        try {
            $validated = $request->validate([
                'message' => 'required|string|max:1000',
                'conversation_history' => 'nullable|array',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors(),
                'request_data' => $request->all(),
            ], 422);
        }

        $userMessage = $request->input('message');
        $conversationHistory = $request->input('conversation_history', []);

        try {
            // Build conversation context
            $messages = $this->buildConversation($conversationHistory, $userMessage);
            
            // Call Gemini API
            $response = $this->callGeminiAPI($messages);
            
            return response()->json([
                'success' => true,
                'message' => $response,
            ]);
        } catch (\Exception $e) {
            // Return detailed error in development
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong. Please try again later.',
                'error' => $e->getMessage(),
                'trace' => app()->environment('local') ? $e->getTraceAsString() : null,
            ], 500);
        }
    }

    /**
     * Build conversation with system prompt
     *
     * @param array $history
     * @param string $userMessage
     * @return string
     */
    private function buildConversation($history, $userMessage)
    {
        $systemPrompt = $this->getSystemPrompt();
        
        $conversation = $systemPrompt . "\n\n";
        
        // Add conversation history
        foreach ($history as $msg) {
            $role = $msg['role'] ?? 'user';
            $content = $msg['content'] ?? '';
            $conversation .= strtoupper($role) . ": " . $content . "\n\n";
        }
        
        // Add current user message
        $conversation .= "USER: " . $userMessage . "\n\nASSISTANT:";
        
        return $conversation;
    }

    /**
     * Get system prompt with startup registration context
     *
     * @return string
     */
    private function getSystemPrompt()
    {
        return "You are a helpful AI assistant for the Startup Philippines Registration Portal. Your role is to help users register their startups and navigate government programs.

CONTEXT & KNOWLEDGE BASE:

1. STARTUP REGISTRATION:
- Users can register as Startup, Enabler, or Visitor
- Startups need to provide: Business name, TIN, DTI/SEC permit, business classification, proof of registration
- Required documents: DTI Certificate OR SEC Certificate, Business Permit, Proof of Address

2. DTI vs SEC REGISTRATION:
- DTI (Department of Trade and Industry): For sole proprietorships and partnerships
- SEC (Securities and Exchange Commission): For corporations and registered partnerships
- Users need EITHER DTI or SEC permit number (at least one is required)
- Both can be provided if applicable

3. USER TYPES:
- Startup: Business owners registering their startup for programs and verification
- Enabler: Mentors, investors, incubators, accelerators who support startups
- Visitor: People browsing the platform without registering a business

4. VERIFICATION PROCESS:
- Submit registration form with all required documents
- Admin reviews application
- Status updates: Pending → For Review → Verified/Flagged
- Email notifications sent at each stage

5. BUSINESS CLASSIFICATIONS:
- Service Provider, Manufacturing, Technology, Retail/E-commerce
- Food & Beverage, Healthcare, Education, Agriculture, Finance, Other

6. DEVELOPMENT PHASES:
- Ideation Stage, MVP Development, Early Revenue, Growth Stage, Scaling

7. COMMON ISSUES:
- Expired business permits: System tracks expiry dates
- Test accounts: Automatically flagged (emails with 'test', 'demo', etc.)
- Document upload: Must be clear, readable, and valid
- Regional restrictions: Some users have regional access limits

GUIDELINES:
- Be friendly, professional, and concise
- Provide step-by-step guidance
- Use simple language (avoid too much jargon)
- If you don't know something, suggest contacting support
- Always encourage users to have documents ready before starting
- Remind users to check their email for verification updates
- Support both English and Filipino (Taglish is okay)

TONE:
- Helpful and encouraging
- Patient with confused users  
- Professional but not robotic
- Use 🚀 ✅ 📄 emojis sparingly for clarity

Now assist the user with their questions:";
    }

    /**
     * Call Google Gemini API
     *
     * @param string $prompt
     * @return string
     */
    private function callGeminiAPI($prompt)
    {
        $apiKey = config('services.gemini.api_key');
        
        if (!$apiKey) {
            throw new \Exception('Gemini API key not configured');
        }

        // Retry up to 2 times with longer timeout for slow connections
        $response = Http::timeout(120)
            ->retry(2, 1000)
            ->post(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=' . $apiKey,
            [
                'contents' => [
                    [
                        'parts' => [
                            ['text' => $prompt]
                        ]
                    ]
                ],
                'generationConfig' => [
                    'temperature' => 0.7,
                    'topK' => 40,
                    'topP' => 0.95,
                    'maxOutputTokens' => 1024,
                ]
            ]
        );

        if (!$response->successful()) {
            throw new \Exception('Gemini API request failed: ' . $response->body());
        }

        $data = $response->json();
        
        return $data['candidates'][0]['content']['parts'][0]['text'] ?? 'I apologize, but I couldn\'t generate a response.';
    }
}
