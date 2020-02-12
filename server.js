
const express = require("express")
let users = require("./users.js")

const server = express()

server.use(express.json())

server.get("/", (req, res) => {
    res.json({ message: "hello, world" })
})

server.get("/users", (req, res) => {
    res.json(users)
})

server.get("/users/:id", (req, res) => {
    const id = req.params.id
    const user = users.find(u => u.id == id)

    if (user) {
        res.json(user)
    } else {
        res.status(404).json({message: "User not found"})
    }
})

server.post("/users", (req, res) => {

    const newUser = {
        id: users.length + 1,
        name: req.body.name
    }

    users.push(newUser)

    res.status(201).json(newUser)
})

server.put("/users/:id", (req, res) => {
    
    const index = users.findIndex(u => u.id == req.params.id)

    if (req.body.name) {
        users[index].name = req.body.name
    }

    res.json(users[index])
})

server.delete("/users/:id", (req, res) => {
    const user = users.find(u => u.id == req.params.id)

    if (user) {

        users = users.filter(u => u.id != req.params.id)

        res.status(204).end()

    } else {
        res.status(404).json({ message: "User not Found "})
    }
})
server.listen(8000, () => {
    console.log("server startend at http://localhost:8000")
})