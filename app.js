// Loading npm modules
require('dotenv').config();
const APIKEY = process.env.APIKEY
const OpenAI = require('openai')
const openai = new OpenAI({apiKey: APIKEY})
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

// Routes 
// Get request to the ChatGPT API to generate a quiz
app.get('/api/generatequiz', async (req,res)=>{
    const topic = req.query.topic
    const expertise = req.query.expertise
    const questionNum = req.query.questionNum
    const questionStyle = req.query.questionStyle
    
    const completion = await openai.chat.completions.create({
      //Prompt for the AI to generate a quiz
        messages: [
          {
            role: "system",
            content: `You are a quiz generator with the personality of ${questionStyle}.
            Embody this persona with your entire being.
            Include references to your everyday life.
            Expect the quiz taker to have a ${expertise} level of understanding.
            Generate a ${questionNum} quiz on ${topic}.
            Do not include the answer in your response nor any mutliple choice responses.

            Format your response like this:

            DO NOT PUT TEXT UP HERE OR ABOVE. ONLY PUT THE QUESTIONS
            1. sentence based on your personality. question
            2. sentence based on your personality. question
            etc 
            DO NOT PUT TEXT DOWN HERE OR BELOW. ONLY PUT THE QUESTIONS

            Add some filler text within the question to highlight your personality.
            Read over your response. If it sounds like a regular person made it, rewrite it
            so that the quiz taker knows you really are ${questionStyle}.
            `,
          },
          //Assistant message to the AI
          { role: "user", content: `Give me the quiz.` },
        ],
        model: "gpt-3.5-turbo-16k-0613",
        response_format: { type: "text" },
        temperature: 1,
      });

      //Creatimg a JSON object with the quiz questions
    res.write(JSON.stringify(
        completion.choices[0].message.content
        //this array is to filter out the filler text by lines so that we can get the questions
        .split('\n')
        .filter(line=>["1","2","3","4","5","6","7","8","9"].includes(line.charAt(0)))
        ))
    res.end()
})
// Get request to the ChatGPT API to grade a quiz
app.get('/api/scorequestion', async (req,res)=>{
    const question = req.query.question
    const answer = req.query.answer
    const questionStyle = req.query.questionStyle
    const expertise = req.query.expertise

    const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            //Prompt for the AI to grade the user's answer
            content: `You are a quiz grader with the personality of ${questionStyle}. 
            You are grading the user's answer to the question: ${question}. 
            AS THE QUIZ GRADER YOU MUST HAVE THE FIRST WORD IN YOUR RESPONSE AS EITHER YES OR NO, indicating if the answer is correct or incorrect. 
            Provide an in-depth explanation in your response. Remember to embody your personality.
            Do not take grammar, spelling, or punctuation into account when grading the answer.
            The answer does not have to be exact. Grade it according to the user's ${expertise} level of understanding.
            If it is 50% correct or higher than it is considered correct, so your response should start with a "Yes".
            Use a minimum of 5 sentences in your response.
            If the answer has nothing to do with the question, then it is incorrect.
            Include some emojis if you want.
            Format your response like this:
            Yes/No. (Explanation) It was ##% correct.
            `,
          },
          { role:"assistant", content: encodeURIComponent(`Your answer to the question ||| ${question} ||| is ||| ${answer} |||`) },
          { role: "user", content: 'Grade it.' },
        ],
        model: "gpt-3.5-turbo-16k-0613",
        response_format: { type: "text" },
      });
      //Creating a JSON object with the result of the grading. Checks it the first word of the AI's response is "Yes" or "No"
      if (completion.choices[0].message.content.substring(0,3) === "Yes"){
        res.write(JSON.stringify({
            result: "Correct",
            explanation: completion.choices[0].message.content
        }))
      } else {
        res.write(JSON.stringify({
            result: "Incorrect",
            explanation: completion.choices[0].message.content
        }))
      }

    res.end()
})
//Port to listen to
// app.listen(4200)

module.exports = app; 