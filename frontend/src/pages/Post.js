import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography, Paper, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import { io } from 'socket.io-client';
import PostCard from '../components/PostCard';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const socket = io('/', {
    reconnection: true
});

const Post = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [postAddLike, setPostAddLike] = useState([]);
    const [postRemoveLike, setPostRemoveLike] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('title');

    const showPosts = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/api/posts/show');
            setPosts(data.posts);
            setLoading(false);
        } catch (error) {
            console.log(error.response.data.error);
        }
    };

    useEffect(() => {
        showPosts();
    }, []);

    useEffect(() => {
        socket.on('add-like', (newPosts) => {
            setPostAddLike(newPosts);
            setPostRemoveLike([]);
        });
        socket.on('remove-like', (newPosts) => {
            setPostRemoveLike(newPosts);
            setPostAddLike([]);
        });
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSortByChange = (event) => {
        setSortBy(event.target.value);
    };

    let uiPosts = postAddLike.length > 0 ? postAddLike : postRemoveLike.length > 0 ? postRemoveLike : posts;

    const filteredPosts = uiPosts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        moment(post.createdAt).format('MMMM DD, YYYY').toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.likes.length.toString().includes(searchTerm.toLowerCase())
    );

    const sortedPosts = filteredPosts.sort((a, b) => {
        if (sortBy === 'title') {
            return a.title.localeCompare(b.title);
        } else if (sortBy === 'date') {
            return moment(a.createdAt).valueOf() - moment(b.createdAt).valueOf();
        } else if (sortBy === 'likes') {
            return b.likes.length - a.likes.length;
        }
        return 0;
    });

    return (
        <>
            <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh' }}>
                <Navbar />
                <Container sx={{ pt: 5, pb: 5, minHeight: '83vh' }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h4" sx={{ mb: 3 }}>
                            Actividades Realizadas
                        </Typography>
                        <Paper sx={{ p: 2, mb: 3 }}>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                Aquí puedes ver las actividades y eventos recientes que hemos organizado para promover la conciencia sobre la prevención del suicidio.
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <TextField
                                    label="Buscar"
                                    variant="outlined"
                                    fullWidth
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    sx={{ mr: 2 }}
                                />
                                <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                                    <InputLabel>Ordenar por</InputLabel>
                                    <Select
                                        value={sortBy}
                                        onChange={handleSortByChange}
                                        label="Ordenar por"
                                    >
                                        <MenuItem value="title">Nombre</MenuItem>
                                        <MenuItem value="date">Fecha</MenuItem>
                                        <MenuItem value="likes">Likes</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Grid container spacing={2}>
                                {loading ? (
                                    <Loader />
                                ) : (
                                    sortedPosts.map((post, index) => (
                                        <Grid item xs={12} sm={6} md={4} key={index}>
                                            <PostCard
                                                id={post._id}
                                                title={post.title}
                                                content={post.content}
                                                image={post.image ? post.image.url : ''}
                                                subheader={moment(post.createdAt).format('MMMM DD, YYYY')}
                                                comments={post.comments.length}
                                                likes={post.likes.length}
                                                likesId={post.likes}
                                                showPosts={showPosts}
                                            />
                                        </Grid>
                                    ))
                                )}
                            </Grid>
                        </Paper>
                    </Box>
                </Container>
                <Footer />
            </Box>
        </>
    );
};

export default Post;
