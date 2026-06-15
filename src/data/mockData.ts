import { Prompt, HistoryEntry } from '../types'

export const CATEGORIES = [
  'Customer Support',
  'Content Writing',
  'Code Generation',
  'Data Analysis',
  'Marketing',
  'Sales',
  'Research',
  'Summarization',
  'Translation',
  'Education',
]

export const mockPrompts: Prompt[] = [
  {
    id: 'p1',
    name: 'Customer Support Agent',
    description: 'A helpful customer support agent that handles common inquiries with empathy and efficiency.',
    category: 'Customer Support',
    tags: ['support', 'customer-facing', 'empathy'],
    content: `You are a helpful and empathetic customer support agent for {{company_name}}.

Your role is to:
- Greet customers warmly and professionally
- Listen carefully to their concerns
- Provide accurate, helpful information
- Escalate complex issues when necessary
- Always maintain a positive, solution-focused attitude

When responding:
1. Acknowledge the customer's concern
2. Provide a clear, concise solution
3. Offer additional help if needed
4. End with a warm closing

Customer message: {{customer_message}}`,
    isFavorite: true,
    status: 'published',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-03-10'),
    version: 3,
    author: 'Nita Patel',
  },
  {
    id: 'p2',
    name: 'Blog Post Generator',
    description: 'Generates SEO-optimized blog posts on any topic with proper structure and engaging content.',
    category: 'Content Writing',
    tags: ['blog', 'seo', 'content', 'writing'],
    content: `Write a comprehensive, SEO-optimized blog post about {{topic}}.

Requirements:
- Length: {{word_count}} words
- Tone: {{tone}} (professional/casual/technical)
- Target audience: {{audience}}
- Include: Introduction, 3-5 main sections, conclusion
- Add relevant subheadings (H2, H3)
- Include a compelling call-to-action at the end
- Naturally incorporate these keywords: {{keywords}}

Format the output in Markdown.`,
    isFavorite: true,
    status: 'published',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-03-08'),
    version: 2,
    author: 'Nita Patel',
  },
  {
    id: 'p3',
    name: 'Code Review Assistant',
    description: 'Reviews code for bugs, security issues, performance problems, and best practices.',
    category: 'Code Generation',
    tags: ['code-review', 'security', 'performance', 'best-practices'],
    content: `You are an expert code reviewer with deep knowledge of {{language}} and software engineering best practices.

Review the following code and provide detailed feedback on:

1. **Bugs & Logic Errors**: Identify any bugs or logic errors
2. **Security Issues**: Highlight potential security vulnerabilities
3. **Performance**: Suggest performance optimizations
4. **Code Quality**: Comment on readability, naming conventions, and structure
5. **Best Practices**: Point out deviations from {{language}} best practices

For each issue found, provide:
- Severity: Critical / High / Medium / Low
- Description of the issue
- Suggested fix with code example

Code to review:
\`\`\`{{language}}
{{code}}
\`\`\``,
    isFavorite: false,
    status: 'published',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-03-05'),
    version: 4,
    author: 'Nita Patel',
  },
  {
    id: 'p4',
    name: 'Meeting Summarizer',
    description: 'Transforms meeting transcripts into structured summaries with action items.',
    category: 'Summarization',
    tags: ['meeting', 'summary', 'action-items', 'productivity'],
    content: `Analyze the following meeting transcript and create a structured summary.

Output format:
## Meeting Summary
**Date**: [extract from transcript]
**Attendees**: [list all mentioned participants]
**Duration**: [estimate if mentioned]

## Key Discussion Points
[3-5 bullet points of main topics discussed]

## Decisions Made
[List any decisions or agreements reached]

## Action Items
| Task | Owner | Due Date |
|------|-------|----------|
[Extract all action items with owners and deadlines]

## Next Steps
[Upcoming meetings or follow-ups mentioned]

Transcript:
{{transcript}}`,
    isFavorite: false,
    status: 'published',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-28'),
    version: 1,
    author: 'Nita Patel',
  },
  {
    id: 'p5',
    name: 'Product Description Writer',
    description: 'Creates compelling product descriptions for e-commerce that drive conversions.',
    category: 'Marketing',
    tags: ['ecommerce', 'marketing', 'product', 'conversion'],
    content: `Write a compelling product description for {{product_name}}.

Product details:
- Category: {{category}}
- Key features: {{features}}
- Target customer: {{target_customer}}
- Price point: {{price}}
- Unique selling proposition: {{usp}}

Create:
1. A punchy headline (max 10 words)
2. A compelling subheadline (max 20 words)
3. 3-4 sentence product description highlighting benefits over features
4. 5 bullet points of key features
5. A persuasive call-to-action

Tone: {{tone}}
Brand voice: {{brand_voice}}`,
    isFavorite: true,
    status: 'published',
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-03-01'),
    version: 2,
    author: 'Nita Patel',
  },
  {
    id: 'p6',
    name: 'SQL Query Builder',
    description: 'Draft prompt for generating complex SQL queries from natural language descriptions.',
    category: 'Code Generation',
    tags: ['sql', 'database', 'query', 'draft'],
    content: `Convert the following natural language description into a SQL query.

Database schema:
{{schema}}

Query requirements:
{{requirements}}

Guidelines:
- Use standard SQL syntax compatible with {{database_type}}
- Optimize for performance
- Add comments explaining complex parts
- Include error handling where appropriate

Natural language request: {{nl_request}}`,
    isFavorite: false,
    status: 'draft',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-12'),
    version: 1,
    author: 'Nita Patel',
  },
  {
    id: 'p7',
    name: 'Competitor Analysis Report',
    description: 'Archived template for generating competitive analysis reports.',
    category: 'Research',
    tags: ['research', 'competitive', 'analysis', 'archived'],
    content: `Conduct a comprehensive competitive analysis for {{company}} against its top competitors.

Analysis framework:
1. **Company Overview**: Mission, products, market position
2. **SWOT Analysis**: Strengths, Weaknesses, Opportunities, Threats
3. **Product Comparison**: Feature-by-feature comparison
4. **Pricing Strategy**: Pricing tiers and value proposition
5. **Marketing Approach**: Channels, messaging, positioning
6. **Customer Reviews**: Common praise and complaints
7. **Strategic Recommendations**: Actionable insights

Competitors to analyze: {{competitors}}
Focus area: {{focus_area}}`,
    isFavorite: false,
    status: 'archived',
    createdAt: new Date('2023-11-15'),
    updatedAt: new Date('2024-01-05'),
    version: 2,
    author: 'Nita Patel',
  },
]

export const mockHistory: HistoryEntry[] = [
  {
    id: 'h1',
    promptId: 'p1',
    version: 1,
    content: 'You are a customer support agent. Help customers with their inquiries.',
    summary: 'Initial version created',
    author: 'Nita Patel',
    timestamp: new Date('2024-01-15T10:00:00'),
  },
  {
    id: 'h2',
    promptId: 'p1',
    version: 2,
    content: 'You are a helpful customer support agent for {{company_name}}. Greet customers and help with inquiries professionally.',
    summary: 'Added company variable, improved tone guidelines',
    author: 'Nita Patel',
    timestamp: new Date('2024-02-20T14:30:00'),
  },
  {
    id: 'h3',
    promptId: 'p1',
    version: 3,
    content: 'Full current version...',
    summary: 'Added structured response format, empathy guidelines, escalation rules',
    author: 'Nita Patel',
    timestamp: new Date('2024-03-10T09:15:00'),
  },
  {
    id: 'h4',
    promptId: 'p2',
    version: 1,
    content: 'Write a blog post about {{topic}}.',
    summary: 'Initial version',
    author: 'Nita Patel',
    timestamp: new Date('2024-02-01T11:00:00'),
  },
  {
    id: 'h5',
    promptId: 'p2',
    version: 2,
    content: 'Full current version...',
    summary: 'Added SEO requirements, keyword integration, Markdown format',
    author: 'Nita Patel',
    timestamp: new Date('2024-03-08T16:00:00'),
  },
]

export const MOCK_LLM_RESPONSES = [
  `Thank you for reaching out to us! I understand your concern and I'm here to help.

Based on the information you've provided, here's what I recommend:

1. **First, let's clarify the issue**: It seems like you're experiencing [the described problem]. This is actually a common situation we help customers with.

2. **Here's the solution**: You can resolve this by following these steps:
   - Navigate to your account settings
   - Click on "Manage Subscription"
   - Select the option that best fits your needs

3. **Additional resources**: I've also linked our help documentation that covers this topic in detail.

Is there anything else I can help you with today? I want to make sure you have everything you need!`,

  `# The Complete Guide to Modern Web Development

## Introduction

In today's rapidly evolving digital landscape, web development has transformed from simple HTML pages to complex, interactive applications that power our daily lives...

## Key Technologies in 2024

### Frontend Frameworks
React, Vue, and Angular continue to dominate the landscape, each offering unique advantages for different use cases...

### Backend Solutions
Node.js, Python with FastAPI, and Go have emerged as the preferred choices for high-performance backend development...

## Best Practices

1. **Component-Based Architecture**: Break your UI into reusable components
2. **State Management**: Use appropriate state management solutions
3. **Performance Optimization**: Implement lazy loading and code splitting

## Conclusion

The web development ecosystem continues to evolve rapidly. Staying updated with the latest trends while mastering the fundamentals will set you up for success.`,

  `## Code Review Analysis

### Strengths
- Clean, readable code structure
- Consistent naming conventions
- Good separation of concerns

### Critical Issues
1. **SQL Injection Vulnerability** (Line 23): User input is directly concatenated into the SQL query. Use parameterized queries instead.

### Medium Issues
2. **Missing Error Handling** (Line 45): The async operation lacks a try-catch block, which could cause unhandled promise rejections.
3. **Memory Leak Risk** (Line 67): Event listener is added but never removed. Add cleanup in componentWillUnmount.

### Suggestions
- Consider extracting the validation logic into a separate utility function
- Add JSDoc comments to public methods
- Consider using TypeScript for better type safety`,

  `Based on your input, here's a structured analysis:

**Summary**: The provided content covers several important aspects that are worth examining in detail.

**Key Findings**:
- The approach is methodologically sound with clear objectives
- There are opportunities to strengthen the core arguments
- Additional data points would enhance the overall credibility

**Recommendations**:
1. Expand on the primary thesis with supporting evidence
2. Consider alternative perspectives to strengthen your position
3. Add quantitative metrics where possible

This analysis represents a thorough examination of the provided material.`,
]
