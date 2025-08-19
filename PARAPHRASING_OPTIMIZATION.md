# QuillCraft Paraphrasing System - Fine-Tuned Configuration

## Overview

This document outlines the optimized configuration for QuillCraft's paraphrasing tool, including model purposes, mode definitions, and best practices for achieving high-quality results.

## Model Hierarchy & Purposes

### 1. Lite Model - OpenAI GPT OSS 20B

- **Purpose**: Fast, consistent basic paraphrasing
- **Temperature**: 0.3 (low for consistency)
- **Max Tokens**: 1024
- **Best For**:
  - Quick rewrites for social media
  - Simple sentence restructuring
  - Basic vocabulary changes
  - Time-sensitive tasks
- **Strengths**: Speed, reliability, low resource usage
- **Limitations**: Less creative, simpler vocabulary choices

### 2. Normal Model - GLM-4.5 Air

- **Purpose**: Balanced quality and performance for everyday use
- **Temperature**: 0.4 (balanced creativity)
- **Max Tokens**: 2048
- **Best For**:
  - Standard content paraphrasing
  - Blog posts and articles
  - General business communication
  - Educational content
- **Strengths**: Good balance of quality and speed
- **Limitations**: May struggle with highly technical content

### 3. Heavy Model - Gemini 2.5 Flash

- **Purpose**: High-quality paraphrasing with advanced understanding
- **Temperature**: 0.5 (creative but controlled)
- **Max Tokens**: 3072
- **Best For**:
  - Complex technical documents
  - Academic papers
  - Professional reports
  - Nuanced content requiring context awareness
- **Strengths**: Deep understanding, context preservation
- **Limitations**: Slower processing, higher resource usage

### 4. Pro Model - Gemini 2.5 Flash Pro

- **Purpose**: Premium quality with maximum creativity and precision
- **Temperature**: 0.6 (highest creativity)
- **Max Tokens**: 4096
- **Best For**:
  - Creative writing projects
  - Marketing copy requiring flair
  - Complex documents with multiple styles
  - Premium client work
- **Strengths**: Exceptional quality, creative expression
- **Limitations**: Slowest processing, premium feature

## Paraphrasing Modes - Detailed Specifications

### Standard Mode

- **Objective**: Neutral, clear rewriting
- **Temperature Adjustment**: Base temperature
- **Use Cases**: General content, documentation, neutral communications
- **Quality Metrics**: Clarity, readability, meaning preservation

### Fluency Mode

- **Objective**: Improve flow and natural sound
- **Temperature Adjustment**: Base temperature
- **Use Cases**: Awkward phrasing, non-native writing, flow issues
- **Quality Metrics**: Readability score improvement, sentence flow

### Humanize Mode

- **Objective**: Convert robotic/AI text to natural language
- **Temperature Adjustment**: +0.1 from base (slightly more creative)
- **Use Cases**: AI-generated content, robotic writing, personal touch needed
- **Quality Metrics**: Natural language patterns, conversational tone

### Formal Mode

- **Objective**: Professional, business-appropriate language
- **Temperature Adjustment**: -0.2 from base (more conservative)
- **Use Cases**: Business documents, professional emails, corporate communications
- **Quality Metrics**: Professional vocabulary, formal structure

### Academic Mode

- **Objective**: Scholarly writing with precise terminology
- **Temperature Adjustment**: -0.2 from base (consistent, precise)
- **Use Cases**: Research papers, academic essays, scholarly articles
- **Quality Metrics**: Academic vocabulary, citation preservation, logical structure

### Simple Mode

- **Objective**: Easy-to-understand language
- **Temperature Adjustment**: -0.3 from base (very consistent)
- **Use Cases**: Complex content simplification, broader audience reach
- **Quality Metrics**: Reading level reduction, vocabulary simplification

### Creative Mode

- **Objective**: Engaging, vivid language with flair
- **Temperature Adjustment**: +0.2 from base (more creative)
- **Use Cases**: Marketing copy, creative writing, engaging content
- **Quality Metrics**: Engagement level, creative expression, vivid language

### Expand Mode

- **Objective**: Add detail, context, and explanations
- **Temperature Adjustment**: Base temperature
- **Use Cases**: Brief content needing elaboration, explanatory content
- **Quality Metrics**: Length increase, detail addition, context enhancement

### Shorten Mode

- **Objective**: Condense while preserving key information
- **Temperature Adjustment**: -0.1 from base (focused)
- **Use Cases**: Long content, summaries, concise communication
- **Quality Metrics**: Length reduction, information retention, conciseness

### Custom Mode

- **Objective**: Advanced techniques adapted to content type
- **Temperature Adjustment**: Base temperature with context awareness
- **Use Cases**: Special requirements, mixed approaches, expert applications
- **Quality Metrics**: Context-appropriate optimization

## Synonym Strength Levels

### Low (0-30%)

- **Approach**: Minimal word replacement (10-20% of words)
- **Focus**: Basic sentence restructuring
- **Best For**: Maintaining original style, slight variations
- **Risk**: May be too similar to original

### Medium (31-70%)

- **Approach**: Moderate synonym replacement (30-50% of words)
- **Focus**: Sentence restructuring with vocabulary changes
- **Best For**: Standard paraphrasing needs, balanced approach
- **Risk**: May lose some original nuance

### High (71-100%)

- **Approach**: Extensive synonym replacement (60-80% of words)
- **Focus**: Complete restructuring while preserving meaning
- **Best For**: Maximum variation, avoiding plagiarism detection
- **Risk**: May alter meaning if not carefully controlled

## Quality Validation System

### Automatic Checks

1. **Identity Check**: Ensures output differs from input
2. **Length Validation**: Prevents truncated or overly brief results
3. **Mode Compliance**: Verifies mode-specific requirements (expand/shorten)
4. **Prefix Detection**: Catches AI-generated introductory phrases
5. **Content Integrity**: Maintains factual information and context

### Error Codes

- `PARAPHRASE_QUALITY_ERROR`: Quality validation failed
- `VALIDATION_ERROR`: Input validation failed
- `PARAPHRASE_ERROR`: AI service error
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `SERVER_ERROR`: Internal system error

## Best Practices for Optimal Results

### Model Selection Guidelines

1. **Lite**: Simple, quick tasks under 500 words
2. **Normal**: Standard content 500-2000 words
3. **Heavy**: Complex content, technical documents
4. **Pro**: Premium quality, creative projects

### Mode Selection Guidelines

1. **Standard**: When unsure, default choice
2. **Fluency**: For improving readability
3. **Humanize**: For AI-generated content
4. **Formal/Academic**: For professional/scholarly content
5. **Simple**: For complex content simplification
6. **Creative**: For marketing and engaging content
7. **Expand/Shorten**: For length adjustment needs
8. **Custom**: For advanced users with specific needs

### Synonym Strength Recommendations

- **Low (10-30%)**: Maintaining style, slight variation
- **Medium (40-60%)**: Standard paraphrasing (recommended default)
- **High (70-90%)**: Maximum variation, plagiarism avoidance

## Performance Optimization

### Temperature Optimization

- Formal/Academic modes: Reduced temperature for consistency
- Creative mode: Increased temperature for flair
- Simple mode: Minimal temperature for clarity
- Other modes: Base temperature with fine-tuning

### Token Management

- Progressive token allocation based on model tier
- Content-aware token limits to prevent truncation
- Quality vs. efficiency balance

### Error Recovery

- Automatic retry with adjusted parameters
- Fallback to lower-tier models if primary fails
- Quality validation with re-processing if needed

This optimized system ensures that each model and mode serves a specific purpose while maintaining high-quality results across all use cases.
