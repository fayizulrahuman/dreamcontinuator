// gemini-service.js

async function testGemini() {
    try {
        const config = await import('./config.js');

        async function callGemini(prompt) {
            const response = await fetch(`${config.GEMINI_API_URL}/models/${config.GEMINI_MODEL}:generateContent?key=${config.GEMINI_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            });
            return response.json();
        }

        console.log("Testing Gemini API connection...");
        const result = await callGemini("Hello, just testing if you're working. Reply 'Yes' if you are.");
        if (result.error) {
            console.error("API Error:", result.error);
        } else {
            console.log("Success! Response from Gemini:", result.candidates[0].content.parts[0].text);
        }
    } catch (err) {
        console.error("Execution Error:", err);
    }
}

testGemini();