import React from 'react';
import {
    Box, Typography, Container, Grid
} from '@mui/material';
import { styled } from '@mui/material/styles';

// 푸터
const FooterContainer = styled(Box)(({ theme }) => ({
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

const Footer = () => {
    return (
        <FooterContainer>
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
        </FooterContainer>
    );
};

export default Footer;