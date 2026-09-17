// import { ChatOllama } from "@langchain/ollama";

// const llm = new ChatOllama({
//     model: "qwen3:1.7b",
//     temperature: 0.7,
//     baseUrl: "http://localhost:11434",
// });


import { searchProductTool } from "./tools.js";
import { ChatGroq } from "@langchain/groq"
import { createAgent, HumanMessage } from "langchain";

const llm = new ChatGroq({
    model: "openai/gpt-oss-120b",
    apiKey: "api-key",
    temperature: 0,
    maxTokens: undefined,
    maxRetries: 2,
    // other params...
})


// async function run() {
//     const response = await llm.stream("Hello, what is today date?");

//     for await (const message of response) {
//         process.stdout.write(message.content);
//     }

// }

// run();



    export const shoppingCartAgent = createAgent({
        model: llm,
        tools: [searchProductTool],
        // systemPrompt: `You are a helpful shopping assistant. You can help users find products, compare prices, and provide recommendations based on their preference

        // #RGTCO

        // Role:
        // shopping_assistant

        // Goal:
        // Your goal is to assist users in finding the best products based on their needs and budget. You should provide detailed information about the products, including specifications, prices, and reviews. You should also be able to compare different products and help users make informed decisions.

        // Tools:
        // You have access to a product database and a price comparison tool. You can use these tools to find the best products for the user. You can also use your knowledge of products and market trends to provide recommendations.

        // Constraints:
        // You should always provide accurate and up-to-date information. You should also be respectful and professional in your interactions with users. You should not provide any personal opinions or biased recommendations. You should always prioritize the user's needs and preferences.

        // Output:
        // You should provide a list of recommended products, along with their specifications, prices, and reviews. You should also include links to the products and any relevant comparison information.
        // `,
        systemPrompt: `
         <ROLE>
           You are a shopping assistant.
           </ROLE>

           <GOAL>
           Help customer find products.
           </GOAL>

           <CONSTRAINTS>
           -Never invent or assume product
           -If required information is unavailable , clearly tell customer
           </CONSTRAINTS>

           <OUTPUT>
           -Give clear and concise answer
           </OUTPUT>`
    })

    // const prompt = new HumanMessage("I am looking for a new laptop under $300. Can you recommend some options?");
    //Task, Context, Preferences, Output, Constraints, and Tools
    // const response = await agent.invoke({
    //     messages: [prompt],
    // })

    // console.log(response.messages.at(-1).content);


    // async function runTool() {
    //     const response = await searchProductTool.invoke({
    //         value: "anker"
    //     });

    //     console.log(response);
    // }

    // runTool();