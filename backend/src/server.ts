import express from 'express'
import cors from 'cors' //only need at development  time
import { sample_foods, sample_tags ,sample_users } from './data'
import jwt from 'jsonwebtoken'


const app = express() //equal to calling express
//anable express to support json
app.use(express.json())
app.use(cors({
    //add the cors to the express application
    credentials :true,
    origin:["http://localhost:4200"]
    //request from an address to diferent address ,-----localhost:4200
                                                //------localhost:5000
}))

app.get("/api/foods" , (req ,res)=>{
    //load food on client side
    res.send(sample_foods)
})
//address -- /api/foods , and its needs a, handler to  handle this request ,normally it has 2 input parameters  Request ansd Response and the body of the function


//-------addressOfApi------//routeParameter ,we can get inside the function
app.get("/api/foods/search/:searchTerm" ,(req ,res)=>{
    const searchTerm = req.params.searchTerm
    const foods = sample_foods.filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()))
    //now we have filtered food on the server and we just need to send it to the client by writing  response.send.foods

    res.send(foods)
})

//define api with get api method
app.get("/api/foods/tag",(req, res)=>{
    res.send(sample_tags)
})

app.get("/api/foods/tag/:tagName",(req,res)=>{
    const tagName =req.params.tagName
    const foods =  sample_foods.filter(food => food.tags?.includes(tagName))
    //now return the food using response.send
    res.send(foods)
})

app.post("/api/users/login",(req, res)=>{
    // const body = req.body
    // const user = sample_users.find(user => user.email=== body.email && user.password === body.password) //this is the body we send to the server as json

    //OR
    const {email,password} =req.body
    const user =sample_users.find(user => user.email=== email && user.password === password) //this is the body we send to the server as json

    //next check if user is availabe and not null or undefined ,then send succsesssull respond to the client     that contain user and the token value
    if(user) 
        res.send(generateTokenResponse(user))
    else
        res.status(400).send("Username or Password is not valid!")//400 is a bad request
    //token is an encrypted text that will be sent to the client and need to be saved so the client should sent it with each request,then server could decrypt and understatnd that which user is doing that request .ie, Authentication and Authorization



})//for request and request and response we define a function

  const generateTokenResponse = (user:any)=>{ //process of generating token is called signing
     const token = jwt.sign(
        {email:user.email ,isAdmin:user.isAdmin},"someRandomText",{expiresIn:"30d"}) //first parameter what we wann encode, second parameter is we need to pass a secret key ,normally privatekey should kept at the env file
        //last parameter is options ,....so this token will generate using the above function and will be expires in 30 days

        //now we have the token
        user.token= token
        return user

  }

const port = 5000
app.listen(port, ()=>{
    console.log("Website served on http://localhost:"+port)
})

//get food by its id ,that we used in the foodpage
app.get("/api/foods/:foodId" ,(req, res)=>{
    const foodId =req.params.foodId
    const foods =  sample_foods.find(food => food.id == (foodId))
    res.send(foods)
})

//website will serve on localhost:5000 after listening done at this time if  was a javascript then we could write  node server.js inside the terminal and run our termonal application  but since its a typescript aplication first its should conevrt it to javascript ,  for that install ts-node
//this is the part one of connecting the angular project to  the backend
// after part 2 all the content of the foodpage willgonna come from the the server not from the front end data.ts