// loads in functions from app.js and tests them
const app = require("./app");
const supertest = require("supertest");
const request = supertest(app);

// returns a 200 status code if the request is successful
it(`should get all questions`, async () => {
    const response = await request.get("/api/generatequiz?topic=javascript&expertise=beginner&questionNum=5&questionStyle=normal");
    expect(response.status).toBe(200);
}, 15000); //timeout after 5 seconds so allows response to be made in time


//returns that the correct about of questions are returned 
it(`should get 5 questions`, async () => {
    const response = await request.get("/api/generatequiz?topic=javascript&expertise=beginner&questionNum=5&questionStyle=normal");
    expect(JSON.parse(response.text).length).toBe(5);
},15000); //timeout after 5 seconds so allows response to be made in time

//returns a 200 status code if the request is successful
it(`should get a score endpoint`, async () => {
    const response = await request.get("/api/scorequestion?question=What does const do in javascript&answer=it assigns a variable that you cannot change&questionStyle=a pirate&expertise=beginner");
    expect(response.status).toBe(200);
},15000); 

//returns correct or incorrect for answer  
it(`should get correct`, async () => {
    const response = await request.get("/api/scorequestion?question=What does const do in javascript&answer=it assigns a variable that you cannot change&questionStyle=a pirate&expertise=beginner");
    expect(JSON.parse(response.text)).toHaveProperty("result"); 
    expect(JSON.parse(response.text).result).toBe("Incorrect");
},17000); 

