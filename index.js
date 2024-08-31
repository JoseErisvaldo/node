import express from 'express';

const app = express();
const port = 9000;

// Middleware para logar as requisições
const loggerMiddleware = (req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next(); // chama o próximo middleware ou rota
};

// Middleware para validação da chave API
const validateApiKeyMiddleware = (req, res, next) => {
  if (!process.env.SUPABASE_KEY) {
    return res.status(401).json({ message: 'API key is missing' });
  }
  next();
};

// Middleware de tratamento de erros
const errorHandlingMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
};

// Adiciona o middleware de log
app.use(loggerMiddleware);

// Adiciona o middleware de validação da API Key
app.use(validateApiKeyMiddleware);

// Rota principal
app.get('/', async (req, res, next) => {
  try {
    const response = await fetch(
      `${process.env.SUPABASE_URL}/rest/v1/posts?select=*`,
      {
        headers: {
          apikey: process.env.SUPABASE_KEY || '',
          Authorization: `Bearer ${process.env.SUPABASE_KEY || ''}`,
        },
      }
    );

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ message: 'Error fetching data from Supabase' });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    next(error); // passa o erro para o middleware de tratamento de erros
  }
});

// Adiciona o middleware de tratamento de erros no final
app.use(errorHandlingMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
