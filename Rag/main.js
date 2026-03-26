import 'dotenv/config'
import { PDFParse } from 'pdf-parse'
import fs from 'fs'
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import {MistralAIEmbeddings} from '@langchain/mistralai'
import { Pinecone } from '@pinecone-database/pinecone'

// const buffer = fs.readFileSync("./test.pdf");
const MISTRAL_API_KEY=process.env.MISTRAL_API_KEY
const pc = new Pinecone({ apiKey:process.env.PINECONE_API_KEY });
const index = pc.index('rag')

// const parser = new PDFParse({ data: buffer });
// const data = await parser.getText();
const embeddings = new MistralAIEmbeddings({
  model: "mistral-embed",
  apiKey:MISTRAL_API_KEY
});
// console.log(result.text);

// const split=new RecursiveCharacterTextSplitter({ chunkSize: 50, chunkOverlap: 0 })
// const texts =await split.splitText(data.text)
// console.log(texts);

// const docs =await embeddings.embedDocuments(texts)
// console.log(docs);

// const result = await index.upsert({
//     records:docs.map((doc,i)=>({
//         id:`doc-${i}`,
//         values:doc,
//         metadata:{
//             text:texts[i]
//         }
//     }))
// })

// console.log(result);

const query = await embeddings.embedQuery('explain frontend technology')
const results = await index.query({
    vector: query,
    topK: 10,
    includeMetadata: true
});
console.log(JSON.stringify(results))

