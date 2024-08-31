import { fetchFromSupabase } from '../services/supabaseService.js';

// Controlador para listar todos os posts
export const getAllPosts = async (req, res, next) => {
  try {
    const data = await fetchFromSupabase(`${process.env.SUPABASE_URL}/rest/v1/posts?select=*`);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

// Controlador para listar um post específico
export const getPostById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await fetchFromSupabase(`${process.env.SUPABASE_URL}/rest/v1/posts?id=eq.${id}`);
    res.status(200).json(data[0] || { message: 'Post not found' });
  } catch (error) {
    next(error);
  }
};

// Controlador para criar um novo post
export const createPost = async (req, res, next) => {
  const { title, content } = req.body;
  try {
    const data = await fetchFromSupabase(`${process.env.SUPABASE_URL}/rest/v1/posts`, {
      method: 'POST',
      body: JSON.stringify({ title, content }),
    });
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

// Controlador para atualizar um post existente
export const updatePost = async (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const data = await fetchFromSupabase(`${process.env.SUPABASE_URL}/rest/v1/posts?id=eq.${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ title, content }),
    });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

// Controlador para deletar um post específico
export const deletePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    await fetchFromSupabase(`${process.env.SUPABASE_URL}/rest/v1/posts?id=eq.${id}`, {
      method: 'DELETE',
    });
    res.status(204).send(); // No Content
  } catch (error) {
    next(error);
  }
};
