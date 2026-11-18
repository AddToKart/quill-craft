# didi-humanizer - Setup and Development Guide

AI text humanizer and detector bypass engine engineered specifically to beat **ZeroGPT**, **GPTZero**, **Turnitin**, and **CopyLeaks**.

## 🚀 Quick Start

### 1. Configure Your AI Subscription

You can connect **any OpenAI-compatible AI provider** (OpenAI, OpenRouter, DeepSeek, Groq, local Ollama, vLLM, etc.):

Edit [`backend/.env`](file:///d:/code_ni_kurt/quill-craft/backend/.env):

```env
# Custom AI Subscription
AI_BASE_URL=https://api.openai.com/v1
AI_MODEL_NAME=gpt-4o-mini
AI_API_KEY=your_actual_api_key_here

PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

> [!TIP]
> You can also configure or change your Base URL, Model Name, and API Key directly in the web UI using the **AI Settings** button (gear icon in the top header).

### 2. Services Already Running

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:3001](http://localhost:3001)

### 3. How ZeroGPT & GPTZero Bypass Works

1. **Extreme Burstiness Injection**: AI text uses uniform sentence lengths (~18 words). didi-humanizer aggressively varies sentence lengths (mixing 3-word punchy sentences with 30-word multi-clause complex sentences).
2. **Perplexity Elevation**: Eliminates predictable statistical token sequences and introduces natural human idioms, active voice, and spontaneous rhythm.
3. **AI Blacklist Filtering**: Strictly purges typical AI marker words: `delve`, `tapestry`, `testament`, `beacon`, `foster`, `crucial`, `paramount`, `pivotal`, `furthermore`, `moreover`, `it is important to note`, `realm`, etc.
4. **Real-time AI Detection Analyzer**: Live feedback score estimating Human vs. AI probability.
