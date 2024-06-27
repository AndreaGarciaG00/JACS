import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogoutAction } from '../redux/actions/userAction';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Definir un tema personalizado con diferentes tipografías
const theme = createTheme({
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif"',
        h6: {
            fontFamily: '"Arial Black", Gadget, sans-serif',
            fontSize: '1.8rem',
        },
        body1: {
            fontFamily: '"Open Sans", sans-serif',
        },
    },
});

// Páginas disponibles en la barra de navegación
const pages = ['Home', 'Podcast', 'Información', 'Aplicar', 'Post', 'Eventos'];

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.signIn);

    const [drawerOpen, setDrawerOpen] = useState(false);

    // Función para cerrar/abrir el Drawer
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    // Función para logout del usuario
    const logOutUser = () => {
        dispatch(userLogoutAction());
        setTimeout(() => {
            window.location.reload(true);
            navigate('/');
        }, 500);
    };

    // Contenido del Drawer
    const list = (
        <Box sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {pages.map((text) => (
                    <ListItem button key={text}>
                        <ListItemText>
                            <RouterLink to={text === 'Home' ? '/' : text === 'Aplicar' ? '/apply' : `/${text.toLowerCase()}`}
                                style={{ color: 'inherit', textDecoration: 'none' }}>
                                <Typography variant="body1" sx={{ lineHeight: '1rem' }}>
                                    {text}
                                </Typography>
                            </RouterLink>
                        </ListItemText>
                    </ListItem>
                ))}
                {userInfo && userInfo.role === 'admin' && (
                    <ListItem button>
                        <ListItemText>
                            <RouterLink to="/admin/dashboard" style={{ color: 'inherit', textDecoration: 'none' }}>
                                <Typography variant="body1" sx={{ lineHeight: '1rem', color: '#1976d2' }}>
                                    Admin Dashboard
                                </Typography>
                            </RouterLink>
                        </ListItemText>
                    </ListItem>
                )}
            </List>
            <Divider />
            <List>
                {userInfo ? (
                    <ListItem button onClick={logOutUser}>
                        <ListItemText>
                            <Typography variant="body1" sx={{ color: '#e53935' }}>
                                Log Out
                            </Typography>
                        </ListItemText>
                    </ListItem>
                ) : (
                        <>
                            <ListItem button>
                                <ListItemText>
                                    <RouterLink to="/login" style={{ color: 'inherit', textDecoration: 'none' }}>
                                        <Typography variant="body1" sx={{ lineHeight: '1rem' }}>
                                            Login
                                        </Typography>
                                    </RouterLink>
                                </ListItemText>
                            </ListItem>
                            <ListItem button>
                                <ListItemText>
                                    <RouterLink to="/register" style={{ color: 'inherit', textDecoration: 'none' }}>
                                        <Typography variant="body1" sx={{ lineHeight: '1rem' }}>
                                            Registrarse
                                        </Typography>
                                    </RouterLink>
                                </ListItemText>
                            </ListItem>
                        </>
                    )}
            </List>
        </Box >
    );

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static" sx={{ bgcolor: '#228b22' }}>
                <Container>
                    <Toolbar disableGutters>
                        {/* Botón de menú */}
                        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                        {/* Título */}
                        <Typography variant="h6" noWrap component={RouterLink} to="/" sx={{
                            mr: 2, display: 'flex', fontFamily: '"Arial Black", Gadget, sans-serif',
                            fontWeight: 700, letterSpacing: '.2rem', color: '#ffffff', textDecoration: 'none',
                        }}>
                            JACS
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: 'flex' }}></Box>
                        <Box sx={{ display: 'flex' }}>
                            {/* Avatar */}
                            {userInfo && (
                                <Tooltip title="Open settings">
                                    <IconButton onClick={toggleDrawer(true)} sx={{ p: 0, mr: 1 }}>
                                        <Avatar alt="User Avatar" src={userInfo.image} />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </Box>
                        {/* Drawer */}
                        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                            {list}
                        </Drawer>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
};

export default Navbar;
