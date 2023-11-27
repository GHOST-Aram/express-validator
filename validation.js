import express from 'express'
import { matchedData, query, validationResult } from 'express-validator'

const app = express()
app.use(express.json())

// Validate, sanitize, and send back data.
app.get('/hello', query('person').notEmpty().escape(), (req, res) =>{
    const result = validationResult(req)
    if(result.isEmpty()){
        const data = matchedData(req)
        res.send(`Hello, ${data.person}`)
    }
    else
        res.send({errors: result.array()})

})
app.listen(3000)