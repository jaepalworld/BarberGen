import React, { useState } from 'react';
import {
    Box, Typography, Container, Button, AppBar, Toolbar
} from '@mui/material';
import { styled } from '@mui/material/styles';

// 헤더 AppBar 스타일
const StyledAppBar = styled(AppBar)(({ theme, scrolled }) => ({
    background: scrolled ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 1)',
    boxShadow: scrolled ? '0px 2px 10px rgba(0, 0, 0, 0.08)' : 'none',
    color: theme.palette.text.primary,
    transition: 'all 0.3s ease',
    visibility: 'visible',
    opacity: 1,
    transform: 'translateY(0)',
    position: 'fixed',
    top: '45px', // 티커슬라이더 높이에 맞게 조정
    left: 0,
    right: 0,
    zIndex: 1000,
    backdropFilter: scrolled ? 'blur(8px)' : 'none',
    height: '72px',
}));

// 로고 타이포그래피
const Logo = styled(Typography)(({ theme }) => ({
    fontWeight: 500,
    fontSize: '1.5rem',
    color: '#000',
    letterSpacing: '0.12em',
    textDecoration: 'none',
    fontFamily: "'Didot', 'Playfair Display', 'Pretendard', serif",
    fontStyle: 'italic',
    textTransform: 'uppercase',
}));

// 네비게이션 아이템
const NavItem = styled(Button)(({ theme }) => ({
    margin: theme.spacing(0, 2.2),
    padding: '8px 18px',
    fontWeight: 400,
    fontSize: '0.9rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#000',
    backgroundColor: 'transparent',
    border: 'none',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    fontFamily: "'Montserrat', 'Pretendard', sans-serif",
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '0',
        height: '1px',
        background: '#000',
        transition: 'width 0.3s ease',
    },
    '&:hover': {
        backgroundColor: 'transparent',
        '&::after': {
            width: '100%',
        }
    }
}));

const Header = () => {
    const [scrolled, setScrolled] = useState(false);

    // Add scroll event listener to detect when the user scrolls
    React.useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    return (
        <StyledAppBar position="fixed" elevation={0} scrolled={scrolled ? 1 : 0}>
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ height: '72px', minHeight: '72px', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '33%' }}>
                        <NavItem disableRipple>HOME</NavItem>
                        <NavItem disableRipple>ABOUT</NavItem>
                        <NavItem disableRipple>SALON</NavItem>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '33%' }}>
                        <Logo variant="h6">BARBERGEN</Logo>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '33%' }}>
                        <NavItem disableRipple>LOGIN</NavItem>
                        <NavItem disableRipple>JOIN</NavItem>
                    </Box>
                </Toolbar>
            </Container>
        </StyledAppBar>
    );
};

export default Header;