const Score = require('../models/scoreModel')

//add score
const score_create_post = (req, res) => {
    const score = new Score(req.body)
    score.save()
    .catch((err) => {
        console.log(err)
    }).then((savedDoc) => {
        res.send(savedDoc)
    })
}

//get top 100 scores
const score_index = (req, res) => {
    Score.find().sort({ score: -1}).limit(100)
        .then((result) => {
            res.send(result)
    })
}