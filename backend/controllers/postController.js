const Post = require('../models/postModel');
const ErrorResponse = require('../utils/errorResponse');

// Crear un post
exports.createPost = async (req, res, next) => {
    const { title, content, postedBy, image } = req.body;

    try {
        const post = await Post.create({
            title,
            content,
            postedBy,
            image,
        });

        res.status(201).json({
            success: true,
            post,
        });
    } catch (error) {
        next(error);
    }
};

// Mostrar todos los posts
exports.showPost = async (req, res, next) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            posts,
        });
    } catch (error) {
        next(error);
    }
};

// Mostrar un solo post
exports.showSinglePost = async (req, res, next) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);

        if (!post) {
            throw new ErrorResponse('Post no encontrado', 404);
        }

        res.status(200).json({
            success: true,
            post,
        });
    } catch (error) {
        next(error);
    }
};

// Actualizar un post
exports.updatePost = async (req, res, next) => {
    const { id } = req.params;
    const { title, content, image } = req.body;

    try {
        const post = await Post.findById(id);

        if (!post) {
            throw new ErrorResponse('Post no encontrado', 404);
        }

        post.title = title || post.title;
        post.content = content || post.content;
        post.image = image || post.image;

        await post.save();

        res.status(200).json({
            success: true,
            post
        });

    } catch (error) {
        next(error);
    }
};

// Eliminar un post
exports.deletePost = async (req, res, next) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);

        if (!post) {
            throw new ErrorResponse('Post no encontrado', 404);
        }

        await post.remove();

        res.status(200).json({
            success: true,
            message: 'Post eliminado correctamente'
        });

    } catch (error) {
        next(error);
    }
};

// Agregar un comentario a un post
exports.addComment = async (req, res, next) => {
    const { id } = req.params;
    const { text, postedBy } = req.body;

    try {
        const post = await Post.findById(id);

        if (!post) {
            throw new ErrorResponse('Post no encontrado', 404);
        }

        post.comments.push({ text, postedBy });
        await post.save();

        res.status(200).json({
            success: true,
            post
        });

    } catch (error) {
        next(error);
    }
};

// Agregar un like a un post
exports.addLike = async (req, res, next) => {
    const { id } = req.params;
    const { userId } = req.body;

    try {
        const post = await Post.findById(id);

        if (!post) {
            throw new ErrorResponse('Post no encontrado', 404);
        }

        if (!post.likes.includes(userId)) {
            post.likes.push(userId);
            await post.save();
        }

        res.status(200).json({
            success: true,
            post
        });

    } catch (error) {
        next(error);
    }
};

// Remover un like de un post
exports.removeLike = async (req, res, next) => {
    const { id } = req.params;
    const { userId } = req.body;

    try {
        const post = await Post.findById(id);

        if (!post) {
            throw new ErrorResponse('Post no encontrado', 404);
        }

        post.likes = post.likes.filter(like => like.toString() !== userId);
        await post.save();

        res.status(200).json({
            success: true,
            post
        });

    } catch (error) {
        next(error);
    }
};
