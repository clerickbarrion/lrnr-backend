require('dotenv').config();
const APIKEY = process.env.APIKEY
const OpenAI = require('openai')
const openai = new OpenAI({apiKey: APIKEY})
const express = require('express')
const app = express()

app.get('/api/generatequiz', async (req,res)=>{
    const topic = req.query.topic
    const expertise = req.query.expertise
    const questionNum = req.query.questionNum
    const questionStyle = req.query.questionStyle
    
    const completion = await openai.chat.completions.create({
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
            1. question
            2. question
            etc 
            DO NOT PUT TEXT DOWN HERE OR BELOW. ONLY PUT THE QUESTIONS

            Add some filler text within the question to highlight your personality.
            Read over your response. If it sounds like a regular person made it, rewrite it
            so that the quiz taker knows you really are ${questionStyle}.
            `,
          },
          { role: "user", content: `Give me the quiz.` },
        ],
        model: "gpt-3.5-turbo-1106",
        response_format: { type: "text" },
      });

    res.write(JSON.stringify(
        completion.choices[0].message.content
        .split('\n')
        .filter(line=>["1","2","3","4","5","6","7","8","9"].includes(line.charAt(0)))
        ))

    res.end()
})

app.get('/api/scorequestion', async (req,res)=>{
    const question = req.query.question
    const answer = req.query.answer
    const questionStyle = req.query.questionStyle

    const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are a quiz grader with the personality of ${questionStyle}. 
            You are grading the user's answer to the question: ${question}. 
            Have 'yes' or 'no' as the first word in your response, indicating if the question is correct or incorrect. 
            Include in your response out of a 100% how right the answer was. 
            Provide an in-depth explanation in your response. Remember to embody your personality.
            Format your response like this:
            Yes/No. (Explanation)
            `,
          },
          { role: "user", content: `My answer is: ${answer}` },
        ],
        model: "gpt-3.5-turbo-1106",
        response_format: { type: "text" },
      });
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

app.listen(4000)