const express = require('express')
const app = express()
const bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


var DB = {
    logins: [
        {
            usuario: 'Carlos',
            email: 'carlos@gmail.com',
            senha: '4548455jk'
        },
        {
            usuario: 'João',
            email: 'joaojgb@gmail.com',
            senha: '45845uyhg'
        },
        {
            usuario: 'Maria',
            email: 'maria598@gmail.com',
            senha: '565968kjh'
        },
        {
            usuario: 'Fabio',
            email: 'fabiojh23@gmail.com',
            senha: '57878hg'
        }
    ]
}

app.get("/logins", (req, res) => {
    res.statusCode = 200
    res.json(DB.logins)
})

app.get("/login/:usuario", (req, res) => {

    var login = DB.logins.find(l => l.usuario == req.params.usuario)

    if (login != undefined) {
        res.statusCode = 200
        res.json(login)
    } else {
        res.sendStatus(404)
    }
})

app.post("/login", (req, res) => {

    var { usuario, email, senha } = req.body

    DB.logins.push({
        usuario,
        email,
        senha
    })

    res.sendStatus(200)

})

app.put("/login/:usuario", (req, res) => {

    var login = DB.logins.find(l => l.usuario == req.params.usuario)

    if (login != undefined) {

        var { email, senha } = req.body

        if (email != undefined)
            login.email = email

        if (senha != undefined)
            login.senha = senha
        res.sendStatus(200)

    } else {
        res.sendStatus(404)
    }
})

app.delete("/login/:usuario", (req, res) => {

    var index = DB.logins.findIndex(l => l.usuario == req.params.usuario)

    if (index == -1)
        res.sendStatus(404)
    else {
        DB.logins.splice(index, 1)
        res.sendStatus(200)
    }

})



app.listen(3000, () => {
    console.log("API iniciada...")
})