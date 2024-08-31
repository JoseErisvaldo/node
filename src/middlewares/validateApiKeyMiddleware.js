const validateApiKeyMiddleware = (req, res, next) => {
  if (!process.env.SUPABASE_KEY) {
    return res.status(401).json({ message: 'API key is missing' });
  }
  next();
};

export default validateApiKeyMiddleware;
