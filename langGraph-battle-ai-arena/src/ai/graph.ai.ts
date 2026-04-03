import {END, START, StateGraph,StateSchema, type GraphNode} from '@langchain/langgraph'
import * as z from 'zod'
import {cohereModel,mistralaiModel,geminiModel} from './model.ai.js'
import { createAgent ,HumanMessage,providerStrategy,ProviderStrategy} from 'langchain'

const state = new StateSchema({
    problem:z.string().default(''),
    solution_1:z.string().default(''),
    solution_2:z.string().default(''),
    judge:z.object({
        solution_1_reasoning:z.string().default(''),
        solution_2_reasonging:z.string().default(''),
        solution_1_score:z.number().default(0),
        solution_2_score:z.number().default(0)
    })
})

const solutionNode:GraphNode< typeof state> =async(state)=> {
     const [mistralResponse,cohereResponse] =await Promise.all([
         mistralaiModel.invoke(state.problem),
         cohereModel.invoke(state.problem)
     ])
     return {
        solution_1:mistralResponse.text,
        solution_2:cohereResponse.text,
     }
}

const judgeNode:GraphNode< typeof state > = async(state)=>{

    const judge = createAgent({
        model:geminiModel,
        responseFormat:providerStrategy(z.object({
            solution_1_score:z.number().min(0).max(10),
            solution_2_score:z.number().min(0).max(10),
            solution_1_reasoning:z.string(),
            solution_2_reasoning:z.string()
        })),
        systemPrompt:`You are a judge and your task is evaluate the answer of two different ai and give score between 1 to 10 with reasoning for the score.`
    })

    const judgeResponse = await judge.invoke({
        messages:[
            new HumanMessage(`
                problem:${state.problem}
                solution 1:${state.solution_1}
                solution 2:${state.solution_2}
                please evaluate the solution  and provide and reasoning.
                `)
        ]
    })

    const {
        solution_1_score,
        solution_2_score,
        solution_1_reasoning,
        solution_2_reasoning
    } = judgeResponse.structuredResponse

    return {
        judge:{
            solution_1_score,
            solution_2_score,
            solution_1_reasoning,
            solution_2_reasoning
        }
    }
}


const graph = new StateGraph(state)
.addNode('solution',solutionNode)
.addNode('Judge',judgeNode)
.addEdge(START,'solution')
.addEdge("solution",'Judge')
.addEdge('Judge',END)
.compile()

export default async function (problem:string){
    const result = await graph.invoke({
        problem:problem
    })
    return result
}