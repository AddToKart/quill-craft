// Dummy data generators for demonstration purposes

export const getDummyParaphrase = (text: string, mode: string): string => {
  const variations = {
    standard: [
      "This is a rephrased version of your original text.",
      "Here is your content rewritten in a natural way.",
      "Your text has been restructured while maintaining its core meaning.",
    ],
    fluency: [
      "This text flows more smoothly and reads more naturally.",
      "The improved version enhances readability and clarity.",
      "Here is a more fluid and polished version of your content.",
    ],
    humanize: [
      "This sounds more natural and human-like.",
      "Here is your content with a more authentic, personal touch.",
      "This version feels more genuine and conversational.",
    ],
    formal: [
      "This constitutes a formal reformulation of the provided content.",
      "The following represents a professional restatement of your text.",
      "This formal revision preserves the essential meaning of your original content.",
    ],
    academic: [
      "This scholarly reformulation maintains the intellectual rigor of your original text.",
      "The following academic revision preserves the analytical framework of your content.",
      "This scholarly restatement upholds the theoretical foundations of your work.",
    ],
    simple: [
      "Here is your text made clearer and easier to understand.",
      "This simplified version uses more straightforward language.",
      "Your content, rewritten in plain and simple terms.",
    ],
    creative: [
      "Behold! Your words transformed with creative flair.",
      "Your content, reimagined with artistic expression.",
      "Here is your text, painted with creative brushstrokes.",
    ],
    expand: [
      "This expanded version provides additional detail and context to your original text.",
      "Here is your content with more comprehensive explanations and supporting information.",
      "This extended version elaborates on your ideas with greater depth and clarity.",
    ],
    shorten: [
      "Here is a condensed version of your text.",
      "This shortened version captures the key points concisely.",
      "Your content, distilled to its essential elements.",
    ],
    custom: [
      "This customized version is tailored to your specific requirements.",
      "Here is your content adapted with advanced customization options.",
      "This version reflects your personalized preferences and style.",
    ],
  };

  const modeVariations =
    variations[mode as keyof typeof variations] || variations.standard;
  const baseText =
    modeVariations[Math.floor(Math.random() * modeVariations.length)];

  // Simple text transformation for demo
  const words = text.split(" ");
  const paraphrased = words
    .map((word) => {
      const synonyms: { [key: string]: string } = {
        quick: "fast",
        brown: "tan",
        jumps: "leaps",
        over: "above",
        lazy: "idle",
        good: "excellent",
        bad: "poor",
        big: "large",
        small: "tiny",
        happy: "joyful",
        sad: "melancholy",
      };

      return synonyms[word.toLowerCase()] || word;
    })
    .join(" ");

  return paraphrased.length > 20 ? paraphrased : baseText;
};

export const getDummyGrammarCheck = (text: string) => {
  const errors = [
    {
      start: text.indexOf("This are"),
      end: text.indexOf("This are") + 8,
      type: "grammar",
      message: "Subject-verb disagreement",
      original: "This are",
      suggestions: ["This is", "These are"],
    },
    {
      start: text.indexOf("a example"),
      end: text.indexOf("a example") + 9,
      type: "grammar",
      message: "Incorrect article usage",
      original: "a example",
      suggestions: ["an example"],
    },
    {
      start: text.indexOf("mistake"),
      end: text.indexOf("mistake") + 7,
      type: "grammar",
      message: "Should be plural",
      original: "mistake",
      suggestions: ["mistakes"],
    },
    {
      start: text.indexOf("erors"),
      end: text.indexOf("erors") + 5,
      type: "spelling",
      message: "Spelling error",
      original: "erors",
      suggestions: ["errors"],
    },
  ].filter((error) => error.start !== -1);

  return errors;
};

export const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹" },
  { code: "ru", name: "Russian", flag: "🇷🇺" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
  { code: "zh", name: "Chinese", flag: "🇨🇳" },
];

export const getDummyTranslation = (
  text: string,
  from: string,
  to: string
): string => {
  const translations: { [key: string]: { [key: string]: string } } = {
    en: {
      es: "Esta es una traducción de muestra de su texto al español.",
      fr: "Ceci est un exemple de traduction de votre texte en français.",
      de: "Dies ist eine Beispielübersetzung Ihres Textes ins Deutsche.",
      it: "Questa è una traduzione di esempio del vostro testo in italiano.",
    },
    es: {
      en: "This is a sample translation of your text to English.",
      fr: "Ceci est un exemple de traduction de votre texte en français.",
      de: "Dies ist eine Beispielübersetzung Ihres Textes ins Deutsche.",
    },
  };

  if (translations[from] && translations[from][to]) {
    return translations[from][to];
  }

  return `[Translated from ${languages.find((l) => l.code === from)?.name} to ${
    languages.find((l) => l.code === to)?.name
  }] ${text}`;
};

export const getDummySynonyms = (word: string): string[] => {
  const synonymsMap: { [key: string]: string[] } = {
    quick: ["fast", "rapid", "swift", "speedy", "hasty"],
    brown: ["tan", "bronze", "chestnut", "mahogany", "russet"],
    fox: ["vixen", "canine", "creature", "animal"],
    jumps: ["leaps", "bounds", "springs", "hops", "vaults"],
    over: ["above", "across", "beyond", "past"],
    lazy: ["idle", "sluggish", "lethargic", "inactive", "slothful"],
    dog: ["canine", "hound", "mutt", "pooch", "pup"],
    sentence: ["phrase", "statement", "clause", "passage"],
    often: ["frequently", "regularly", "commonly", "usually"],
    used: ["utilized", "employed", "applied", "adopted"],
    typing: ["keyboarding", "inputting", "entering", "writing"],
    practice: ["exercise", "training", "drill", "rehearsal"],
    good: ["excellent", "great", "fine", "wonderful", "superb"],
    bad: ["poor", "awful", "terrible", "horrible", "dreadful"],
    big: ["large", "huge", "enormous", "massive", "gigantic"],
    small: ["tiny", "little", "minute", "petite", "compact"],
    happy: ["joyful", "cheerful", "delighted", "content", "pleased"],
    sad: ["melancholy", "sorrowful", "dejected", "gloomy", "downcast"],
  };

  return synonymsMap[word.toLowerCase()] || [];
};

export const getDummySummary = (text: string, length: number): string => {
  const summaries = [
    "This text discusses the main concepts and provides key insights into the topic.",
    "The content covers essential points and delivers important information for readers.",
    "This summary captures the core message and highlights the most significant aspects.",
    "The text presents fundamental ideas and explores relevant themes throughout.",
    "This content examines key elements and provides valuable perspective on the subject matter.",
  ];

  const baseSummary = summaries[Math.floor(Math.random() * summaries.length)];

  if (length <= 30) {
    return baseSummary.split(".")[0] + ".";
  } else if (length <= 50) {
    return baseSummary;
  } else if (length <= 70) {
    return (
      baseSummary +
      " The analysis provides detailed context and explores multiple dimensions of the topic with thorough examination."
    );
  } else {
    return (
      baseSummary +
      " The comprehensive analysis delves deep into various aspects of the subject matter, providing extensive context, detailed explanations, and thorough examination of all relevant factors that contribute to a complete understanding of the topic at hand."
    );
  }
};

export const getDummyExtension = (text: string, level: string): string => {
  const extensions = {
    slight:
      "This expanded version adds supporting details and context to enhance understanding while maintaining the original flow and structure.",
    moderate:
      "This moderately extended version incorporates additional explanations, relevant examples, and contextual information that enriches the content while preserving the core message and intent of the original text.",
    detailed:
      "This comprehensively extended version provides extensive elaboration with detailed explanations, multiple relevant examples, background context, and supporting information that significantly enhances the depth and breadth of the original content while maintaining coherence and readability.",
    comprehensive:
      "This thoroughly extended version offers exhaustive coverage with comprehensive explanations, numerous detailed examples, extensive background context, supporting evidence, related concepts, and additional perspectives that transform the original content into a rich, multi-layered discussion that explores every aspect of the topic in considerable depth while ensuring clarity and engagement throughout the expanded narrative.",
  };

  const extension = extensions[level as keyof typeof extensions];
  return text + "\n\n" + extension;
};

export const getDummyHistory = () => [
  {
    id: "1",
    tool: "paraphrase",
    input: "The quick brown fox jumps over the lazy dog.",
    output: "The swift tan fox leaps above the idle canine.",
    timestamp: "2024-01-15T10:30:00Z",
    metadata: { tone: "standard", model: "normal" },
  },
  {
    id: "2",
    tool: "grammar",
    input: "This are a example of bad grammar.",
    output: "This is an example of bad grammar.",
    timestamp: "2024-01-15T09:15:00Z",
    metadata: { corrections: 2 },
  },
  {
    id: "3",
    tool: "translate",
    input: "Hello, how are you today?",
    output: "Hola, ¿cómo estás hoy?",
    timestamp: "2024-01-14T16:45:00Z",
    metadata: { from: "English", to: "Spanish" },
  },
  {
    id: "4",
    tool: "summarizer",
    input:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    output:
      "This text discusses standard placeholder content commonly used in design and publishing.",
    timestamp: "2024-01-14T14:20:00Z",
    metadata: { reduction: "75%" },
  },
  {
    id: "5",
    tool: "extender",
    input: "The weather is nice today.",
    output:
      "The weather is exceptionally pleasant today, with clear blue skies, gentle breezes, and comfortable temperatures that make it perfect for outdoor activities.",
    timestamp: "2024-01-14T11:10:00Z",
    metadata: { expansion: "moderate" },
  },
];
