// - The below are going to be the default values, eventually this will move to a UI component so it can be easily changed by the user
// - To enable + use Ollama models, ensure inference and/or embeddings model are downloaded and ollama is running https://ollama.com/library 
// - Icons within UI are not yet dynamic, to change currently, you must change the img src path in the UI component
// - IMPORTANT: when Ollama Embeddings + Ollama inference enabled at the same time, this can cause time-to-first-token to be quite long
// - IMPORTANT: Follow-up questions are not yet implrmented with Ollama models, only OpenAI compatible models that use  {type: "json_object"}

export const config = {
    searchProvider: 'serper',
    textChunkSize: 1000, 
    textChunkOverlap: 400,
    numberOfSimilarityResults: 4,
    numberOfPagesToScan: 10, 
    useFunctionCalling: true, 
    useRateLimiting: false, 
};

export const fixedParams = {
    // CHAT_TASKS: With source 
    explore: 'The user wants to understand the functionalities of the repo. Only include code snippets from repo context if necessary.',
    debug: 'The user wants to debug an error or bug encountered while using the repo.', 
    solve: 'The user wants to write code using the repo to solve a specific problem, addressing the given conditions and edge cases.',
    verify: 'The user has written code using the repo, but it is not working as expected and wants to understand why.',

    // CHAT_TASKS: Free chat 
    exploreFree : 'The user wants to understand how to solve a particular coding task.',
    debugFree : 'The user wants to debug an error or bug they have encountered.',
    solveFree : 'The user wants to write code to solve a specific problem, addressing the given conditions and edge cases.',
    verifyFree : 'The user has written the code, but it is not working as expected and wants to understand why.',

    // CHAT_REPO_TASKS_AUGMENT_CONTEXT
    exploreAugmentContext: 'Understand their requirement and the functionality they want to understand better, primarily relying on the provided context to explain it to them. Use examples from the repo to explain the functionality.',
    debugAugmentContext: 'Understand their code snippet and error message/bug, primarily relying on the provided context to address it.',
    solveAugmentContext: 'Understand their objectives, the edge cases they want to address, and other requirements, primarily relying on the provided context to address it.',
    verifyAugmentContext: 'Understand their code snippet, expected behavior, and actual behavior, primarily relying on the provided context to address it.',

    // CHAT_REPO_TASKS_AUGMENT_WO_CONTEXT
    exploreAugment: 'Understand their requirement and the functionality they want to understand better. Use examples to explain.',
    debugAugment: 'Understand their code snippet and error message/bug to address it.',
    solveAugment: 'Understand their objectives, the edge cases they want to address, and other requirements to address it.',
    verifyAugment: 'Understand their code snippet, expected behavior, and actual behavior to address it.',

    // KNOW_REPO_OPTIONS
    newcomer: "The user is new to the repo.",
    familiar: "The user is familiar with the repo.",
    expert: "The user is an expert in the repo.",

    // CODER_OPTIONS
    novice: "The user is a novice coder.",
    codeComfortable: "The user is comfortable writing code.",
    experienced: "The user is an experienced coder.",

    // FLUFFY_RESPONSE_OPTIONS
    concise: "The user prefers concise answers. Keep it as succint as possible. Provide code where necessary. Keep the answer within 2500 tokens if possible.",
    detailed: "The user prefers detailed answers. Provide a comprehensive explanation. Provide code where necessary. Keep the answer within 2500 tokens if possible.",
    indepth: "The user prefers in-depth answers. Provide a detailed explanation with examples. Provide code where necessary. Keep the answer within 2500 tokens if possible.",
    conciseToken: 500,
    detailedToken: 1250,
    indepthToken: 2000,

    // LANGUAGES_OPTIONS
    language: "The user knows the following programming languages: ",
    languageend: " and is comfortable writing code in these languages. Choose the most relevant language based on the context provided by the repository's code files.",
};

