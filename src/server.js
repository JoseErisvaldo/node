import express from 'express';
import dotenv from 'dotenv';
import postsRoutes from './routes/postsRoutes.js';
import validateApiKeyMiddleware from './middlewares/validateApiKeyMiddleware.js';
import errorHandlingMiddleware from './middlewares/errorHandlingMiddleware.js';

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();
const port = 9000;

// Middleware para processar JSON
app.use(express.json());

// Middleware de validação de chave API
app.use(validateApiKeyMiddleware);

// Rota raiz para testar o servidor
app.get('/', (req, res) => {
  res.send('Servidor está rodando!');
});

// Rotas de posts
app.use('/posts', postsRoutes);

// Middleware de tratamento de erros
app.use(errorHandlingMiddleware);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
