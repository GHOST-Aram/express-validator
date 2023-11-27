import express from 'express'
import { 
    body,
    matchedData, 
    query, 
    validationResult 
} from 'express-validator'

const app = express()
app.use(express.json())

app.get('/hello', query('person').notEmpty().escape(), (req, res) =>{
    const result = validationResult(req)

    if(result.isEmpty()){
        const data = matchedData(req)
        res.send(`Hello, ${data.person}!`)
    } 
    else
        res.send({errors: result.array()})
})
const subscriberToNewsletter = (req, res) =>{
    /**subscribe to newsletter code */
}
app.post('/newsletter',
    body('email')
        .optional()
        .trim()
        .isEmail(),
    subscriberToNewsletter
)
const createEmailChain = () => body('email').isEmail()

app.post('/login', createEmailChain(), (req, res) =>{
    res.login()
})

app.post('/signup', createEmailChain(), (req, res) =>{
    /**register user */
})

// Nested request body
const requestBody = {
    "address": {
        "home": { "number": 25 },
        "work": { "number": 501 }
    },
    "siblings": [ 
        { "name": "Maria vo Bismark" } ,
        { "name": "Checky Bragface" }
    ]
}
// Accessing nested request body by wildcards
app.post('/update-user', 
    body('address.*.number').isInt(),
    body('siblings.*.name').notEmpty(),
    (req, res) => {

})

// deeply Nested request body
const teams = {
    "name": "Team name",
    "teams": [
        {   "name": "Subteam name", "teams": [] }
    ]
}

app.put('/update-chart', body('**.name').trim().notEmpty(),(req, res)=>{
    /**request handling code */
})
app.listen(3000)
