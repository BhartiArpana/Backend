import 'dotenv/config'
import readline from 'readline/promises'
import { ChatMistralAI } from "@langchain/mistralai"
import {HumanMessage,tool,createAgent} from 'langchain'
import { sendEmail } from './mail.service.js'
import * as z from "zod"

const sendEmailTool = tool(
    sendEmail,
    {
        name: "sendEmailTool",
    description: "Send email to this email",
    schema: z.object({
      to: z.string().describe("Email address of the recipient"),
      subject: z.string().describe("Subject of the email"),
      html: z.string().describe("HTML content of the email"),
      
    }),
    }
)
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

const model = new ChatMistralAI({
    model:'mistral-small-latest'
})
const message = []
const agent = createAgent({
  model,
  tools: [sendEmailTool]
});

while(true){
    const userInput = await rl.question("You : ")
    message.push(new HumanMessage(userInput))
    const response = await agent.invoke({
        messages:message
    })
    message.push(response.messages[response.messages.length-1])
   
    console.log(response.messages[response.messages.length-1].content);
    
}