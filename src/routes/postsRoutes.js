import express from 'express';
import { getAllPosts, getPostById, createPost, updatePost, deletePost } from '../controllers/postsController.js';

const router = express.Router();

// Rota para listar todos os posts
router.get('/', getAllPosts);

// Rota para listar um post específico
router.get('/:id', getPostById);

// Rota para criar um novo post
router.post('/', createPost);

// Rota para atualizar um post existente
router.put('/:id', updatePost);

// Rota para deletar um post específico
router.delete('/:id', deletePost);

export default router;
