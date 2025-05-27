import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Box, Typography, Container, Button, AppBar, Toolbar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAuth } from '../../contexts/AuthContext';

// 헤더 AppBar 스타일 - 기존 스타일 유지
const StyledAppBar = styled(AppBar)(({ theme, scrolled }) => ({
    background: scrolled ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 1)',
    boxShadow: scrolled ? '0px 2px 10px rgba(0, 0, 0, 0.08)' : 'none',
    color: '#000', // 기존 색상 유지
    transition: 'all 0.3s ease',
    visibility: 'visible',
    opacity: 1,
    transform: 'translateY(0)',
    position: 'fixed',
    top: '45px', // 티커슬라이더 높이만큼 아래로 조정
    left: 0,
    right: 0,
    zIndex: 1000,
    backdropFilter: scrolled ? 'blur(8px)' : 'none',
    height: '72px',
}));

// 로고 타이포그래피 - 기존 스타일 유지
const Logo = styled(Typography)({
    fontWeight: 500,
    fontSize: '1.5rem',
    color: '#000',
    letterSpacing: '0.12em',
    textDecoration: 'none',
    fontFamily: "'Didot', 'Playfair Display', 'Pretendard', serif",
    fontStyle: 'italic',
    textTransform: 'uppercase',
});

// 네비게이션 아이템 - 기존 스타일 유지
const NavItem = styled(Button)({
    margin: '0 17.6px', // theme.spacing(0, 2.2) 대신 직접 값 사용
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
    minWidth: 'auto', // MUI 기본값 덮어쓰기
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
});

const Header = () => {
    const [scrolled, setScrolled] = useState(false);

    // AuthContext 사용 - 에러 처리 추가
    let currentUser = null;
    let logout = null;

    try {
        const auth = useAuth();
        currentUser = auth.currentUser;
        logout = auth.logout;
    } catch (error) {
        console.log('AuthContext not available, user will see login/join buttons');
    }

    const navigate = useNavigate();

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

    // 로그아웃 핸들러
    const handleLogout = async () => {
        try {
            if (logout) {
                await logout();
            }
            // 카카오 로그인도 확인해서 로그아웃
            const kakaoUser = localStorage.getItem('kakaoUser');
            if (kakaoUser) {
                localStorage.removeItem('kakaoUser');
                if (window.Kakao && window.Kakao.Auth.getAccessToken()) {
                    window.Kakao.Auth.logout(() => {
                        console.log('카카오 로그아웃 성공');
                    });
                }
            }
            navigate('/');
        } catch (error) {
            console.error('로그아웃 오류:', error);
        }
    };

    // 카카오 로그인 상태도 확인
    const kakaoUser = localStorage.getItem('kakaoUser');
    const isLoggedIn = currentUser || kakaoUser;

    return (
        <StyledAppBar position="fixed" elevation={0} scrolled={scrolled ? 1 : 0}>
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ height: '72px', minHeight: '72px', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '33%' }}>
                        <NavItem component={Link} to="/" disableRipple>HOME</NavItem>
                        <NavItem disableRipple>ABOUT</NavItem>
                        <NavItem disableRipple>SALON</NavItem>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '33%' }}>
                        <Logo
                            variant="h6"
                            component={Link}
                            to="/"
                            sx={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            BARBERGEN
                        </Logo>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '33%' }}>
                        {isLoggedIn ? (
                            // 로그인 상태일 때
                            <>
                                <NavItem component={Link} to="/mypage" disableRipple>
                                    MYPAGE
                                </NavItem>
                                <NavItem onClick={handleLogout} disableRipple>
                                    LOGOUT
                                </NavItem>
                            </>
                        ) : (
                            // 비로그인 상태일 때
                            <>
                                <NavItem component={Link} to="/login" disableRipple>
                                    LOGIN
                                </NavItem>
                                <NavItem component={Link} to="/signup" disableRipple>
                                    JOIN
                                </NavItem>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </StyledAppBar>
    );
};

export default Header;