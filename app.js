const express = require('express')
const app = express()
const CharacterAI = require("node_characterai");


app.get('/api/generatequiz', async (req,res)=>{
    const topic = req.query.topic
    const expertise = req.query.expertise
    const questionNum = req.query.questionNum
    const questionStyle = req.query.questionStyle
    const prompt = `You are now ${questionStyle}. Embody this personality to the max.
    Generate a ${questionNum} quiz on ${topic}. 
    Expect the quiz taker to have a ${expertise} level of understanding.
    Do not include the answer in your response.
    Separate each question with a --`
    // send prompt to chatgpt
    // const quiz = await fetch(`chatgptapi?prompt=${prompt}`).then(res=>res.json()).then(quiz=>quiz)
    // res.write(JSON.stringify(quiz.split('--')))
    
    ///
        const characterAI = new CharacterAI();
        // Authenticating as a guest (use `.authenticateWithToken()` to use an account)
        await characterAI.authenticateWithToken('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkVqYmxXUlVCWERJX0dDOTJCa2N1YyJ9.eyJpc3MiOiJodHRwczovL2NoYXJhY3Rlci1haS51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMTE5NDM4NDY5MjkyNDI2NjEyMjgiLCJhdWQiOlsiaHR0cHM6Ly9hdXRoMC5jaGFyYWN0ZXIuYWkvIiwiaHR0cHM6Ly9jaGFyYWN0ZXItYWkudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTcwNTY3NDQyNiwiZXhwIjoxNzA4MjY2NDI2LCJhenAiOiJkeUQzZ0UyODFNcWdJU0c3RnVJWFloTDJXRWtucVp6diIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwifQ.X_dwd-9iM_M8CcMc8C009yBndBIUuQ7qgfji_Z9sF3J3Sk_kQ46xKBkKQJWmHboDUE7fQQ3BT9Anf5C0m1xqiC--FMFFmqLWlPKFkhS04WMS4iTes6pHtlq_MHCOLZSEXj-vB6jwCasum8zrPImZlDX61lmaipWgICmj8pkRrhX3B63jP2QnBUIAJm_UTXugLNPzdW0lR1sToSsrh60i-BS3QESGzGEatBszuK_XGnefkp0G21H37hnHNfiRikN91GGWDyxnZQnQEqquZkqEKqcuOJc_0nVzCxYDcbaUm_Ar47U-1PlSjke4oVCmyx4wWzf9-RCc7_RXR1LdAYKLdA','eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkVqYmxXUlVCWERJX0dDOTJCa2N1YyJ9.eyJnaXZlbl9uYW1lIjoiQ2xlcmljayIsImZhbWlseV9uYW1lIjoiQmFycmlvbiIsIm5pY2tuYW1lIjoiY2xlcmlja2JhcnJpb24iLCJuYW1lIjoiQ2xlcmljayBCYXJyaW9uIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0tlUHZDT1FISDEtTU52VXd5RHNOc3hyV2VlZUdzd0ZIU3FfWW9PMXBleT1zOTYtYyIsImxvY2FsZSI6ImVuIiwidXBkYXRlZF9hdCI6IjIwMjQtMDEtMTlUMTQ6Mjc6MDUuMTYzWiIsImVtYWlsIjoiY2xlcmlja2JhcnJpb25AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOi8vY2hhcmFjdGVyLWFpLnVzLmF1dGgwLmNvbS8iLCJhdWQiOiJkeUQzZ0UyODFNcWdJU0c3RnVJWFloTDJXRWtucVp6diIsImlhdCI6MTcwNTY3NDQyNiwiZXhwIjoxNzA5Mjc0NDI2LCJzdWIiOiJnb29nbGUtb2F1dGgyfDExMTk0Mzg0NjkyOTI0MjY2MTIyOCIsInNpZCI6InFoUXFPc2MtVlMtWkRuNy0xM2hBeEpYeV96NW1VTk8tIiwibm9uY2UiOiJkV2xZZWxkNWFrMXlUa2RCU3pWT2FYSTFjV0ZFUjJOWGNFOHpRbEpUWkZkUGNURnllV1ppUkdnd1p3PT0ifQ.DH3hqwIaLygPapnX96b4UGi3NPgmnGgEBJnSLdanuXK362rlMPRuUgOnVmOBbs9kYVnnrqe3-NtCj00zttoOTKuPAX3dgZDXGyvdmX2nbrQGPEVKgrUo7Do6eWX-ZhXN-4tR1_5F4rcA39RQxk-DSILAIc_jJJTXHpx7NfbuHnBML7lEe5v9_t37Xvq9aXXc93g9ybDZDnVp3Ey-p19kC2yrVWdxGck1f3L0jVkux_PU3oJ5xpqJIN9D1KWwwdauq_8pUTQ9CftqfMsedDtgTfyIGCtEEHUaMIDjh6Z2lShGyLxdzYO9FQj9_7peYV_LymSfWzaaQ8AyxxCXJuSvpw')
      
        // Place your character's id here
        const characterId = "0FGHpcylr6O0l46xHrTMzRGnqAU6beVz0k3i294wbUQ";
      
        const chat = await characterAI.createOrContinueChat(characterId);
      
        // Send a message
        const response = await chat.sendAndAwaitResponse(prompt, true);

        res.write(JSON.stringify(response.text))
      
    ///
    res.end()
})

app.get('/api/scorequestion', async (req,res)=>{
    const question = req.query.question
    const answer = req.query.answer
    const prompt = `Is "${answer}" the right answer to the question "${question}"?
    Have 'yes' or 'no' as the first word in your response.`
    // send prompt to chatgpt
    // const grade = await fetch(`chatgptapi?prompt=${prompt}`).then(res=>res.json()).then(grade=>grade)
    // res.write(JSON.stringify(grade))
})

app.listen(3000)