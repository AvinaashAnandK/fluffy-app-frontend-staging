import { BugOff, EqualNot, FileQuestion, MessageCircle, Shrub, Sprout, Trees, View, GitBranch } from "lucide-react";
import { PiDotsNine, PiDotsSix, PiDotsThree, PiGitDiff, PiLeafLight, PiShootingStar } from "react-icons/pi";
import { WiSnowflakeCold, WiStars,  } from "react-icons/wi";

export const MAX_COUNTS = {
    FREE: {
      CHAT: 5,
      REPO: 2,
    },
    BETA: {
      CHAT: 100,
      REPO: 10,
    },
    ENT: {
      CHAT: 1000,
      REPO: 100,
    },
  };
  
export const EMAIL_USER_TYPES: { [key: string]: string } = {
    // Specific email address mappings
    'avinaash96@gmail.com': 'BETA',
    'lodhapratik9@gmail.com': 'ENT',
};

export const DOMAIN_USER_TYPES: { [key: string]: string } = {
  // Domain-based mappings
  'neodocs.in': 'ENT',
  'iima.ac.in': 'ENT',
  
  // Specific email address mappings
  'avinaash96@gmail.com': 'BETA',
  'lodhapratik9@gmail.com': 'ENT',
};

export const DEFAULT_USER_TYPE = 'FREE';

export const explore_repo_filters = [
  { name: "Audio", searchfield: "audio" },
  { name: "Coding", searchfield: "coding" },
  { name: "Databases", searchfield: "db" },
  { name: "Gaming", searchfield: "gaming" },
  { name: "Graphs / Network", searchfield: "graphs" },
  { name: "Healthcare", searchfield: "healthcare" },
  { name: "Image Analysis", searchfield: "image" },
  { name: "NLP", searchfield: "nlp" },
  { name: "Robotics", searchfield: "robotics" },
  { name: "Security", searchfield: "security" },
  { name: "Speech", searchfield: "speech" },
  { name: "Time Series", searchfield: "timeseries" },
  { name: "Others", searchfield: "others" },
];

// Section: What do you want to do with the repo?
export const CHAT_REPO_TASKS = [
  {
    key: "explore",
    title: "Explore mode",
    description: "Understand the repo.",
    icon: View,
    prompt: "",
    placeholderText1: "Enter your question to understand repo better.",
  },
  {
    key: "solve",
    title: "Answer mode",
    description: "Get answers to your questions.",
    icon: FileQuestion,
    prompt: "",
    placeholderText1: "Enter your expected outcome.",
    placeholderText2: "Enter the edge-cases / conditions you want to address.",
  },
  {
    key: "debug",
    title: "Resolve mode",
    description: "Something bugging you?",
    icon: BugOff,
    prompt: "",
    placeholderText1: "Enter your code snippet.",
    placeholderText2: "Paste / describe the error.",
  },
  {
    key: "verify",
    title: "Debug mode",
    description: "Expected outcome != Actual outcome?",
    icon: PiGitDiff,
    prompt: "",
    placeholderText1: "Enter your code snippet.",
    placeholderText2: "Enter the expected outcome.",
    placeholderText3: "Enter the actual outcome.",
  },
];

// Section: How well do you know the repo?
export const KNOW_REPO_OPTIONS = [
  {
    key: "newcomer",
    title: "Newcomer",
    icon: WiSnowflakeCold,
    prompt: "",
  },
  {
    key: "familiar",
    title: "Familiar",
    icon: PiShootingStar,
    prompt: "",
  },
  {
    key: "expert",
    title: "Expert",
    icon: WiStars,
    prompt: "",
  }
];

// Section: Are you a...
export const CODER_OPTIONS = [
  {
    key: "novice",
    title: "Novice",
    icon: PiLeafLight,
    prompt: "",
  },
  {
    key: "codeComfortable",
    title: "Comfortable",
    icon: Shrub,
    prompt: "",
  },
  {
    key: "experienced",
    title: "Experienced",
    icon: Trees,
    prompt: "",
  },
];

// Section: Fluffy's response should be...
export const FLUFFY_RESPONSE_OPTIONS =[
{
  key: "concise",
  title: "Concise",
  icon: PiDotsThree,
  prompt: "",
},
{
  key: "detailed",
  title: "Detailed",
  icon: PiDotsSix,
  prompt: "",
},
{
  key: "indepth",
  title: "Indepth",
  icon: PiDotsNine,
  prompt: "",
}
];

// Section: You know...
export const LANGUAGES_OPTIONS = [
  {
    key: "Python",
    title: "Python",
  },
  {
    key: "javacript",
    title: "JS",
  },
  {
    key: "typescript",
    title: "TS",
  },
  {
    key: "java",
    title: "Java",
  },
  {
    key: "C#",
    title: "C#",
  },
  {
    key: "R",
    title: "R",
  },
  {
    key: "ruby",
    title: "Ruby",
  },
  {
    key: "php",
    title: "PHP",
  },
  {
    key: "others",
    title: "Others",
  },
];


