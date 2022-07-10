import express from 'express';
import { StatusCodes } from 'http-status-codes';

//Criando o servidor para rodar na porta 3000 (Poderia ser qualquer numero de porta)
const app = express();
const PORT = process.env.PORT || 3000; //Tentar pegar em no arquivo de variáveis de ambiente o PORT (process.env.PORT), se não existir ele vai setar o valor default definido (3000)
let users = [
    { id: 1, name: 'Rafael Ribeiro', age: 31 },
    { id: 2, name: 'Gabriel Custódio', age: 27 },
];

//Definir que todas as nossas requests estarão enviando os objetos no formato .json
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

//Rota (Endpoint) de get de exemplo para acessar a raiz e ter acesso ao "trabalhando com servidor Express." 
app.get('/', (request, response) => {
    return response.send('<h1>Trabalhando com servidor Express.<h1>');
});

//Rota (Endpoint) de get para pegar a lista de usuários
app.get('/users', (request, response) => {
    return response.send(users);
});

//Rota (Endpoint) de get para pegar um usuário específico
app.get('/users/:userId', (request, response) => {
    const userId = request.params.userId;
    const user = users.find(user => {
        return (user.id === Number(userId));
    });
    return response.send(user);
});

//Rota (Endpoint) de post para inserir um novo usuário na lista e retornar esse usuário que foi criado
app.post('/users', (request, response) => {
    const newUser = request.body;

    users.push(newUser);

    return response.status(StatusCodes.CREATED).send(newUser);
});

//Rota (Endpoint) de put para atualizar os dados de um usuário específico
app.put('/users/:userId', (request, response) => {
    const userId = request.params.userId;
    const updateUser = request.body;

    users = users.map(user => {
        if(Number(userId) === user.id) {
            return updateUser;
        }
        return user;
    });

    return response.send(updateUser);
});

//Rota (Endpoint) de delete para deletar um usuário específico
app.delete('/users/:userId', (request, response) => {
    const userId = request.params.userId;
    
    users = users.filter((user) => user.id !== Number(userId));

    return response.status(StatusCodes.NO_CONTENT).send();
});