// components/BarberMain.js
import React, { useState } from 'react';
import {
    Box, Typography, Container, Button, Grid, Card,
    CardMedia, CardContent, AppBar, Toolbar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import HeroSlider from './HeroSlider';
import TickerSlider from './TickerSlider';

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

// 제품 카드
const ProductCard = styled(Card)(({ theme }) => ({
    borderRadius: 0,
    overflow: 'hidden',
    boxShadow: 'none',
    border: '1px solid #eee',
    transition: 'all 0.3s ease',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.05)',
    },
}));

// 제품 이미지
const ProductImage = styled(CardMedia)(({ theme }) => ({
    height: 280,
    transition: 'transform 0.5s ease',
    '&:hover': {
        transform: 'scale(1.03)',
    },
}));

// 제품 컨텐츠
const ProductContent = styled(CardContent)(({ theme }) => ({
    padding: '1.5rem',
    flex: 1,
}));

// 카테고리 라벨
const CategoryLabel = styled(Typography)(({ theme }) => ({
    fontSize: '0.75rem',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: '#777',
    marginBottom: '0.5rem',
}));

// 제품 이름
const ProductName = styled(Typography)(({ theme }) => ({
    fontSize: '1.1rem',
    fontWeight: 600,
    marginBottom: '0.5rem',
    color: '#000',
    fontFamily: "'Montserrat', 'Pretendard', sans-serif",
}));

// 제품 가격
const ProductPrice = styled(Typography)(({ theme }) => ({
    fontSize: '1rem',
    fontWeight: 500,
    color: '#000',
    marginBottom: '1.2rem',
}));

// 액션 버튼
const ActionButton = styled(Button)(({ theme }) => ({
    borderRadius: 0,
    padding: '0.6rem 1.5rem',
    textTransform: 'uppercase',
    fontWeight: 400,
    fontSize: '0.8rem',
    letterSpacing: '0.12em',
    border: '1px solid #000',
    backgroundColor: '#000',
    color: '#fff',
    '&:hover': {
        backgroundColor: 'transparent',
        color: '#000',
    },
}));

// 섹션 타이틀
const SectionTitle = styled(Typography)(({ theme }) => ({
    fontFamily: "'Didot', 'Playfair Display', 'Pretendard', serif",
    fontSize: '2rem',
    fontWeight: 500,
    textAlign: 'center',
    marginBottom: '3rem',
    color: '#000',
    letterSpacing: '0.05em',
    position: 'relative',
    fontStyle: 'italic',
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: -15,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '60px',
        height: '1px',
        backgroundColor: '#000',
    },
}));

// 푸터
const Footer = styled(Box)(({ theme }) => ({
    backgroundColor: '#000',
    color: '#fff',
    padding: '4rem 0 2rem',
}));

// 푸터 로고
const FooterLogo = styled(Typography)(({ theme }) => ({
    fontFamily: "'Didot', 'Playfair Display', 'Pretendard', serif",
    fontWeight: 500,
    fontSize: '1.8rem',
    marginBottom: '1.5rem',
    color: '#fff',
    fontStyle: 'italic',
    letterSpacing: '0.12em',
}));

// 푸터 텍스트
const FooterText = styled(Typography)(({ theme }) => ({
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '0.9rem',
    lineHeight: 1.8,
    marginBottom: '1rem',
}));

// 푸터 링크
const FooterLink = styled(Typography)(({ theme }) => ({
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '0.9rem',
    lineHeight: 2,
    cursor: 'pointer',
    transition: 'color 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    '&:hover': {
        color: '#fff',
    },
}));

// 저작권 텍스트
const Copyright = styled(Typography)(({ theme }) => ({
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: '0.85rem',
    marginTop: '3rem',
    textAlign: 'center',
    letterSpacing: '0.05em',
}));

const BarberMain = () => {
    const [scrolled, setScrolled] = useState(false);
    const [cartItems, setCartItems] = useState(0);

    // 제품 데이터
    const products = [
        {
            id: 1,
            name: '프리미엄 스타일링 왁스',
            price: '24,900원',
            image: 'https://via.placeholder.com/400x300?text=스타일링+왁스',
            category: '스타일링'
        },
        {
            id: 2,
            name: '매트 포마드',
            price: '32,000원',
            image: 'https://via.placeholder.com/400x300?text=포마드',
            category: '스타일링'
        },
        {
            id: 3,
            name: '헤어 오일 트리트먼트',
            price: '28,000원',
            image: 'https://via.placeholder.com/400x300?text=헤어+오일',
            category: '케어'
        },
        {
            id: 4,
            name: '프로페셔널 트리머',
            price: '125,000원',
            image: 'https://via.placeholder.com/400x300?text=트리머',
            category: '도구'
        }
    ];

    return (
        <Box sx={{ minHeight: '100vh', position: 'relative', paddingTop: '45px' }}>
            {/* 티커 슬라이더 */}
            <TickerSlider />

            {/* 헤더 */}
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

            {/* 히어로 슬라이더 */}
            <HeroSlider />

            {/* 제품 섹션 */}
            <Box sx={{ py: 8, backgroundColor: '#fff' }}>
                <Container maxWidth="lg">
                    <SectionTitle variant="h2">BEST SELLERS</SectionTitle>

                    <Grid container spacing={4}>
                        {products.map((product) => (
                            <Grid item xs={12} sm={6} md={3} key={product.id}>
                                <ProductCard>
                                    <ProductImage
                                        image={product.image}
                                        title={product.name}
                                    />
                                    <ProductContent>
                                        <CategoryLabel>{product.category}</CategoryLabel>
                                        <ProductName>{product.name}</ProductName>
                                        <ProductPrice>{product.price}</ProductPrice>
                                        <ActionButton variant="contained" fullWidth>
                                            ADD TO CART
                                        </ActionButton>
                                    </ProductContent>
                                </ProductCard>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* 예약 섹션 */}
            <Box sx={{ py: 8, backgroundColor: '#f8f8f8' }}>
                <Container maxWidth="md">
                    <SectionTitle variant="h2">FIND YOUR STYLE</SectionTitle>
                    <Typography sx={{
                        textAlign: 'center',
                        maxWidth: '700px',
                        margin: '0 auto 2rem',
                        color: '#555',
                        fontFamily: "'Montserrat', 'Pretendard', sans-serif",
                        fontSize: '1rem',
                        lineHeight: 1.8
                    }}>
                        전문 바버의 손길로 완성되는 스타일링을 경험해보세요. BarberGen에서는 당신의 얼굴형과 스타일에 맞는 최적의 헤어스타일을 제안해드립니다.
                    </Typography>
                    <Box sx={{ textAlign: 'center' }}>
                        <ActionButton variant="contained" size="large">
                            APPOINTMENT
                        </ActionButton>
                    </Box>
                </Container>
            </Box>

            {/* 푸터 */}
            <Footer>
                <Container maxWidth="lg">
                    <Grid container spacing={6}>
                        <Grid item xs={12} md={4}>
                            <FooterLogo variant="h5">BARBERGEN</FooterLogo>
                            <FooterText>
                                최고의 헤어 스타일을 위한 최선의 선택. 프리미엄 바버샵 BarberGen에서 새로운 스타일링을 경험해보세요.
                            </FooterText>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography sx={{
                                color: '#fff',
                                marginBottom: '1.5rem',
                                fontSize: '0.9rem',
                                fontWeight: 500,
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase'
                            }}>
                                QUICK LINKS
                            </Typography>
                            <FooterLink>PRODUCTS</FooterLink>
                            <FooterLink>GALLERY</FooterLink>
                            <FooterLink>BOOKING</FooterLink>
                            <FooterLink>STYLISTS</FooterLink>
                            <FooterLink>TERMS</FooterLink>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography sx={{
                                color: '#fff',
                                marginBottom: '1.5rem',
                                fontSize: '0.9rem',
                                fontWeight: 500,
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase'
                            }}>
                                CONTACT
                            </Typography>
                            <FooterText>
                                서울특별시 강남구 테헤란로 123
                            </FooterText>
                            <FooterText>
                                연락처: 02-123-4567
                            </FooterText>
                            <FooterText>
                                이메일: info@barbergen.com
                            </FooterText>
                            <FooterText>
                                영업시간: 평일 10:00 ~ 20:00 / 주말 11:00 ~ 19:00
                            </FooterText>
                        </Grid>
                    </Grid>
                    <Copyright>
                        &copy; {new Date().getFullYear()} BARBERGEN. ALL RIGHTS RESERVED.
                    </Copyright>
                </Container>
            </Footer>
        </Box>
    );
};

export default BarberMain;