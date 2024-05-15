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

app.get('/v1/eventos', (req, res) => {
    if(req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        if(token === 'tokenValido') {
            res.send(eventos);
        } else {
            res.status(401).send({ message: 'Token inválido' });
        }
    } else {
        res.status(401).send({ message: 'Token não enviado' });
    }
});

app.post('/v1/evento', (req, res) => {
    if(req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        if(token === 'tokenValido') {
            const { nome, data, descricao } = req.body;
            eventos.push({ id: eventos.length + 1, nome, data, descricao });
            res.sendStatus(200);
        } else {
            res.status(401).send({ message: 'Token inválido' });
        }
    } else {
        res.status(401).send({ message: 'Token não enviado' });
    }
});

app.put('/v1/evento/:id', (req, res) => {
    if(req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        if(token === 'tokenValido') {
            const { nome, data, descricao } = req.body;
            const index = eventos.findIndex(evento => evento.id === parseInt(req.params.id));
            if(index !== -1) {
                eventos[index] = { id: parseInt(req.params.id), nome, data, descricao };
                res.sendStatus(200);
            } else {
                res.status(404).send({ message: 'Evento não encontrado' });
            }
        } else {
            res.status(401).send({ message: 'Token inválido' });
        }
    } else {
        res.status(401).send({ message: 'Token não enviado' });
    }
});

app.delete('/v1/evento/:id', (req, res) => {
    if(req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        if(token === 'tokenValido') {
            const index = eventos.findIndex(evento => evento.id === parseInt(req.params.id));
            if(index !== -1) {
                eventos.splice(index, 1);
                res.sendStatus(200);
            } else {
                res.status(404).send({ message: 'Evento não encontrado' });
            }
        } else {
            res.status(401).send({ message: 'Token inválido' });
        }
    } else {
        res.status(401).send({ message: 'Token não enviado' });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

