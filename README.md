# LRNR App Backend
LRNR is an innovative user-friendly learning platform interface that allows users to interact with OpenAI's GPT-3 language model through a simple and user-friendly interface utilizing a quiz form.



## Authors

- [@TommyPhi](https://github.com/TommyPhi) 
- [@Lara-Crofts ](https://github.com/Lara-Crofts)
- [@clerickbarrion](https://github.com/clerickbarrion)
- [@hassan-niang](https://github.com/hassan-niang)


## Tech Stack

**Server:** Node, Express

## Perquisites 
Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager. If you encounter any problems, you can also use this GitHub Gist to install Node.js.
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file. You will need your own APIKEY from OpenAI. Linked are [Documents](https://www.maisieai.com/help/how-to-get-an-openai-api-key-for-chatgpt
) for obtaining a key. 
`APIKEY`



## Run Locally

Clone the project

```bash
  git clone https://github.com/clerickbarrion/lrnr-backend
```

Go to the project directory

```bash
  cd lrnr-backend
```

Install dependencies

```bash
  npm install
```
Create .env file
```bash
  touch .env
```
Input your APIKEY inside .env 
```bash
  APIKEY='YOUR_APIKEY'
```
Start the server

```bash
  npm run start
```


## API Reference

### Quiz Generator

```http
  GET /api/generatequiz?topic=&expertise=&questionNum=&questionStyle=

```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `topic` | `string` | Topic of quiz  |
| `expertise` | `string` | Expertise of user  |
| `questionNum` | `string` | Number of questions for quiz  | 
| `questionStyle` | `string` | Voice of quizzer  |

### Example
* Takes in GET requests from the frontend with queries about the quiz specifications.
* Uses the OpenAI module to generate a quiz using those specifications in the prompt.
* Writes a response once with the generated quiz as an array.

#### Request: 
```http 
api/generatequiz?topic=javascript&expertise=beginner&questionNum=5&questionStyle=normal
```
#### Response:
```javascript
[
"1. So, you wanna test your knowledge of JavaScript? Alright, here's the first question: What is the purpose of the \"console.log()\" function in JavaScript?",
"2. Alright, onto the next one! What is the symbol used to assign a value to a variable in JavaScript?",
"3. Ready for another question? Here it is: What method is used to convert a string to an integer in JavaScript?",
"4. Alright, let's move on. What does the \"typeof\" operator do in JavaScript?",
"5. Last question, here we go! In JavaScript, what is the difference between \"==\" and \"===\" operators?"
]
```

### Quiz Scorer

```http
  GET  /api/scorequestion?question=&answer=&questionStyle=&expertise=
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `question` | `string` | Question that is being answered  |
| `answer` | `string` | Response to question by user  |
| `questionStyle` | `string` | Voice of quiz evaluator  |
| `expertise` | `string` | Expertise of user  |

### Example
* Takes in GET requests from the front-end with queries about the question, answer, style, and expertise.
* Uses the OpenAI module to generate a grade of the user’s answer to the question according to their expertise.
* Writes incorrect or correct and explanation of the user’s answer.
* The first word in the response is prompted to either be yes or no to determine if it’s correct or incorrect.

#### Request: 
```http 
/api/scorequestion?question=What does const do in javascript&answer=it assigns a variable that you cannot change&questionStyle=a pirate&expertise=beginner
```
#### Response:
```javascript
{
"result": "Correct",
"explanation": "Yes! Your answer is correct. It was 100% correct. ðŸ´â€â˜ ï¸\n\nConst in JavaScript is a keyword used to declare a variable that cannot be reassigned 
or modified once it has been initialized. When you use const to declare a variable, you are essentially creating a constant value that cannot be changed throughout your program. 
This is different from the var or let keywords, which allow you to reassign or modify the value of a variable. \n\nDeclaring variables with const is useful when you want to ensure that
a value remains constant and does not accidentally get modified elsewhere in your code. This can help to prevent bugs and make your code more reliable. It is important to note that while 
the variable itself cannot be modified, the value it holds can still be mutable if it is an object or array. In other words, you can still modify the properties or elements of a const variable, 
but you cannot reassign the variable itself to a new value. \n\nOverall, using const is a good practice when you know that a value should not change, as it provides clarity and prevents 
accidental modification. Keep up the good work, matey! ðŸ¦œ"

}

```
