import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
    return (
        <Box sx={{ bgcolor: "#f0f4f8", color: "#1b5e20", py: 3 }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                    JACS - Asociación de Apoyo a la Salud Mental
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    © 2024 JACS. Todos los derechos reservados.
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                    <IconButton sx={{ color: "#1b5e20" }} aria-label="Facebook" href="https://facebook.com" target="_blank">
                        <Facebook />
                    </IconButton>
                    <IconButton sx={{ color: "#1b5e20" }} aria-label="Twitter" href="https://twitter.com" target="_blank">
                        <Twitter />
                    </IconButton>
                    <IconButton sx={{ color: "#1b5e20" }} aria-label="Instagram" href="https://instagram.com" target="_blank">
                        <Instagram />
                    </IconButton>
                    <IconButton sx={{ color: "#1b5e20" }} aria-label="LinkedIn" href="https://linkedin.com" target="_blank">
                        <LinkedIn />
                    </IconButton>
                </Box>
                <Typography variant="body2">
                    Apoyando tu salud mental con dedicación y cuidado.
                </Typography>
            </Box>
        </Box>
    );
}

export default Footer;
