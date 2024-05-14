
const express = require('express');
const app = express();


app.use(express.json());

app.post('/v1/login', (req, res) => {
    const { email, password } = req.body;
    if(email === 'teste@teste.com' && password === 'password') {
        res.sendStatus(200);
    } else {
        res.status(401).send({ message: 'Credenciais inválidas' });
    }
});

app.post('/v1/register', (req, res) => {
    const { email, password } = req.body;
    if(email === 'teste@teste.com' && password === 'password') {
        res.sendStatus(200);
    } else {
        res.status(400).send({ message: 'E-mail já cadastrado' });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

