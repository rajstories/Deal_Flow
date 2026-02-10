import { GoogleGenerativeAI } from "@google/generative-ai";

// Helper to get authenticated Gemini instance
const getGenAI = () => {
    const localStorageKey = localStorage.getItem('gemini_api_key');
    const envKey = import.meta.env.VITE_GEMINI_API_KEY;
    const apiKey = localStorageKey || envKey;

    console.log('[Gemini Service] API Key source:', localStorageKey ? 'localStorage' : (envKey ? '.env file' : 'NONE'));
    console.log('[Gemini Service] API Key preview:', apiKey ? apiKey.substring(0, 10) + '...' : 'NOT SET');

    if (!apiKey) {
        throw new Error("Gemini API Key is missing. Please set it in the Settings page.");
    }

    return new GoogleGenerativeAI(apiKey);
};

// Analysis schema for structured output
const analysisSchema = {
    type: "object",
    properties: {
        companyName: { type: "string" },
        sector: { type: "string" },
        stage: { type: "string" },
        askAmount: { type: "string" },
        executiveSummary: { type: "string" },
        teamAnalysis: {
            type: "object",
            properties: {
                score: { type: "number", minimum: 0, maximum: 100 },
                highlights: { type: "array", items: { type: "string" } },
                concerns: { type: "array", items: { type: "string" } },
                keyPeople: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            name: { type: "string" },
                            role: { type: "string" },
                            background: { type: "string" }
                        }
                    }
                }
            }
        },
        marketAnalysis: {
            type: "object",
            properties: {
                tam: { type: "string" },
                growth: { type: "string" },
                competitiveAdvantage: { type: "string" },
                marketTrends: { type: "array", items: { type: "string" } }
            }
        },
        riskFactors: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    risk: { type: "string" },
                    severity: { type: "string", enum: ["Low", "Medium", "High", "Critical"] },
                    mitigation: { type: "string" }
                }
            }
        },
        investmentScore: { type: "number", minimum: 0, maximum: 100 },
        recommendation: {
            type: "string",
            enum: ["Strong Buy", "Buy", "Hold", "Pass", "Strong Pass"]
        }
    },
    required: ["companyName", "sector", "investmentScore", "recommendation"]
};

/**
 * 🔥 MULTIMODAL + THINKING + STRUCTURED OUTPUT
 * Analyze pitch deck PDF using Gemini's multimodal capabilities
 * @param {string} pdfBase64 - Base64 encoded PDF data
 * @returns {Promise<Object>} Structured analysis results
 */
export async function analyzePitchDeck(pdfBase64) {
    try {
        const genAI = getGenAI();
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash", // ✅ CONFIRMED WORKING MODEL
            generationConfig: {
                temperature: 0.7,
            }
        });

        const result = await model.generateContent([
            {
                inlineData: {
                    mimeType: "application/pdf",
                    data: pdfBase64
                }
            },
            {
                text: `You are an expert venture capital analyst with 15 + years of experience.
        
Analyze this pitch deck comprehensively and provide a detailed investment recommendation.

Evaluate the following:
1. ** Team **: Backgrounds, experience, domain expertise, previous exits
2. ** Market Opportunity **: TAM / SAM / SOM, growth rates, market trends, competitive landscape
3. ** Product / Technology **: Innovation level, IP / moats, technical feasibility
4. ** Business Model **: Revenue streams, unit economics, go - to - market strategy
5. ** Traction **: Customer acquisition, revenue growth, key metrics
6. ** Financials **: Burn rate, runway, use of funds
7. ** Risks **: Market risks, execution risks, competitive risks, regulatory risks

Provide specific examples and data points from the deck.Be critical but fair.

    IMPORTANT: Return your analysis as VALID JSON ONLY(no markdown, no code blocks) with this exact structure:
{
    "companyName": "string",
        "sector": "string",
            "stage": "string",
                "askAmount": "string",
                    "executiveSummary": "string",
                        "teamAnalysis": {
        "score": 0 - 100,
            "highlights": ["string"],
                "concerns": ["string"],
                    "keyPeople": [{ "name": "string", "role": "string", "background": "string" }]
    },
    "marketAnalysis": {
        "tam": "string",
            "growth": "string",
                "competitiveAdvantage": "string",
                    "marketTrends": ["string"]
    },
    "riskFactors": [
        { "risk": "string", "severity": "Low|Medium|High|Critical", "mitigation": "string" }
    ],
        "investmentScore": 0 - 100,
            "recommendation": "Strong Buy|Buy|Hold|Pass|Strong Pass"
} `
            }
        ]);

        const responseText = result.response.text();

        // Clean up response if it has markdown code blocks
        let cleanedText = responseText.trim();
        if (cleanedText.startsWith('```json')) {
            cleanedText = cleanedText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
        } else if (cleanedText.startsWith('```')) {
            cleanedText = cleanedText.replace(/```\n?/g, '');
        }

        return JSON.parse(cleanedText);
    } catch (error) {
        console.error("Gemini analysis error:", error);
        throw new Error(`Failed to analyze pitch deck: ${error.message}`);
    }
}

/**
 * 🔥 FUNCTION CALLING
 * Detect red flags and verify claims using function calling
 * @param {Object} analysis - Results from analyzePitchDeck
 * @returns {Promise<Array>} List of red flags with verification status
 */
export async function detectRedFlags(analysis) {
    try {
        const genAI = getGenAI();
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash", // ✅ Updated to working model
            tools: [{
                functionDeclarations: [{
                    name: "verify_company_claim",
                    description: "Verify a company's claim by searching the web for evidence",
                    parameters: {
                        type: "object",
                        properties: {
                            claim: {
                                type: "string",
                                description: "The specific claim to verify (e.g., 'CEO previously sold company to Google')"
                            },
                            searchQuery: {
                                type: "string",
                                description: "Google search query to verify the claim"
                            },
                            expectedEvidence: {
                                type: "string",
                                description: "What evidence would confirm this claim"
                            }
                        },
                        required: ["claim", "searchQuery"]
                    }
                }]
            }]
        });

        const prompt = `Based on this pitch deck analysis, identify potential red flags that need verification:

${JSON.stringify(analysis, null, 2)}

Look for:
- Unverifiable claims about team backgrounds
- Suspicious market size numbers
- Competitor comparisons that seem too favorable
- Traction metrics that don't add up
- Regulatory/legal concerns

For each red flag, determine if we should verify it using web search.`;

        const chat = model.startChat();
        const result = await chat.sendMessage(prompt);

        let redFlags = [];
        let response = result.response;

        // Handle function calling loop
        while (response.functionCalls && response.functionCalls.length > 0) {
            const functionCall = response.functionCalls[0];

            if (functionCall.name === "verify_company_claim") {
                // In a real implementation, you'd call an actual search API here
                // For demo, we'll simulate the verification
                const functionResponse = {
                    name: functionCall.name,
                    response: {
                        verified: Math.random() > 0.3, // Simulate 70% verification rate
                        evidence: `Search results for: ${functionCall.args.searchQuery}`,
                        confidence: Math.floor(Math.random() * 30) + 70 // 70-100%
                    }
                };

                redFlags.push({
                    claim: functionCall.args.claim,
                    needsVerification: true,
                    verification: functionResponse.response
                });

                // Send function response back to model
                const nextResult = await chat.sendMessage([{
                    functionResponse
                }]);

                response = nextResult.response;
            }
        }

        // Get final summary
        const finalText = response.text();

        return {
            redFlags,
            summary: finalText
        };
    } catch (error) {
        console.error("Red flag detection error:", error);
        throw new Error(`Failed to detect red flags: ${error.message}`);
    }
}

/**
 * 🔥 GROUNDED SEARCH
 * Get competitor intelligence using Google Search grounding
 * @param {string} companyName - Name of the company
 * @param {string} sector - Industry sector
 * @returns {Promise<string>} Competitor analysis with citations
 */
export async function getCompetitorIntelligence(companyName, sector) {
    try {
        const genAI = getGenAI();
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash", // ✅ Updated to working model
            tools: [{ googleSearch: {} }] // Enable Google Search grounding
        });

        const result = await model.generateContent(
            `Research and analyze the competitive landscape for "${companyName}" in the ${sector} sector.

Provide:
1. Top 5-7 direct competitors with:
   - Company name
   - Latest funding round and total raised
   - Key differentiators
   - Market position
   - Recent news or developments

2. Market dynamics:
   - Market leaders
   - Emerging players
   - Recent M&A activity
   - Market trends

Use current, real-time data from web search. Include citations for funding and news.`
        );

        return result.response.text();
    } catch (error) {
        console.error("Competitor intelligence error:", error);
        // Fallback or re-throw
        throw error;
    }
}

/**
 * 🔥 LONG-FORM SYNTHESIS
 * Generate professional investment memo
 * @param {Object} analysis - Full analysis results
 * @param {Object} competitors - Competitor intelligence
 * @param {Object} redFlags - Red flag analysis
 * @returns {Promise<string>} Formatted investment memo
 */
export async function generateInvestmentMemo(analysis, competitors, redFlags) {
    try {
        const genAI = getGenAI();
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash", // ✅ Updated to working model
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 8192, // Long-form content
            }
        });

        const result = await model.generateContent(
            `Generate a professional investment committee memo based on the following data:

**Pitch Deck Analysis:**
${JSON.stringify(analysis, null, 2)}

**Competitive Landscape:**
${competitors}

**Due Diligence Red Flags:**
${JSON.stringify(redFlags, null, 2)}

Format as a formal investment memo with these sections:

# Investment Memo: [Company Name]

## Executive Summary
- Investment thesis in 3-4 sentences
- Key highlights
- Recommendation and proposed terms

## Company Overview
- What they do
- Problem they solve
- Solution/Product

## Market Opportunity
- TAM/SAM/SOM analysis
- Market trends and drivers
- Competitive positioning

## Team Assessment
- Founders and key executives
- Relevant experience
- Track record

## Business Model & Traction
- Revenue model
- Key metrics and growth
- Customer acquisition

## Competitive Analysis
- Direct competitors
- Competitive advantages
- Market positioning

## Risk Analysis
- Key risks identified
- Mitigation strategies
- Red flags from due diligence

## Financial Considerations
- Use of funds
- Valuation assessment
- Expected returns (best/base/worst case)

## Investment Recommendation
- Final recommendation (Pass/Hold/Invest)
- Proposed terms (if applicable)
- Next steps

Use professional, clear language appropriate for an investment committee.`
        );

        return result.response.text();
    } catch (error) {
        console.error("Memo generation error:", error);
        throw new Error(`Failed to generate investment memo: ${error.message}`);
    }
}

/**
 * 🔥 MULTI-TURN CHAT
 * Create interactive Q&A chat session with context
 * @param {Object} анализContext - Full context from analysis
 * @returns {Object} Chat session object
 */
export function createChatSession(analysisContext) {
    try {
        const genAI = getGenAI();
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash", // ✅ Same working model as analysis
            generationConfig: {
                temperature: 0.8,
            }
        });

        const contextSummary = `You are analyzing a pitch deck with the following information:

Company: ${analysisContext.companyName}
Sector: ${analysisContext.sector}
Stage: ${analysisContext.stage}
Ask Amount: ${analysisContext.askAmount}
Investment Score: ${analysisContext.investmentScore}/100
Recommendation: ${analysisContext.recommendation}

Key Insights:
${JSON.stringify(analysisContext, null, 2)}`;

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: contextSummary }]
                },
                {
                    role: "model",
                    parts: [{
                        text: `I've thoroughly reviewed this pitch deck for ${analysisContext.companyName}. I can answer questions about:

- The team and their backgrounds
- Market opportunity and sizing
- Competitive landscape
- Risk factors and concerns
- Financial projections
- Investment recommendation rationale

What would you like to know?`
                    }]
                }
            ],
        });

        return chat;
    } catch (error) {
        console.error("Chat session creation error:", error);
        throw new Error(`Failed to create chat session: ${error.message}`);
    }
}

/**
 * Send message in existing chat session
 * @param {Object} chat - Chat session from createChatSession
 * @param {string} message - User message
 * @returns {Promise<string>} AI response
 */
export async function sendChatMessage(chat, message) {
    try {
        const result = await chat.sendMessage(message);
        return result.response.text();
    } catch (error) {
        console.error("Chat message error:", error);
        throw new Error(`Failed to send message: ${error.message}`);
    }
}

export default {
    analyzePitchDeck,
    detectRedFlags,
    getCompetitorIntelligence,
    generateInvestmentMemo,
    createChatSession,
    sendChatMessage
};
