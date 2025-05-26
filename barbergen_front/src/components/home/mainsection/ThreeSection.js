import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Container, Button, Grid } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

// LookbookSection에서 가져온 애니메이션
const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// 무한 슬라이드 애니메이션 (오른쪽에서 왼쪽으로)
const infiniteSlide = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

// LookbookSection 스타일 요소들 적용
const SectionWrapper = styled(Box)(({ theme }) => ({
    padding: theme.spacing(12, 0),
    position: 'relative',
    backgroundColor: '#f8f8f8',
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.05), transparent)',
    }
}));

// 백그라운드 이미지 추가
const BackgroundImage = styled(Box)(({ theme }) => ({
    position: 'absolute',
    left: 0,
    top: '20%',
    width: '25%',
    height: '70%',
    backgroundImage: 'url("/images/back1.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.25, // 0.08 → 0.25로 진하게
    zIndex: 0,
    borderRadius: '0 16px 16px 0',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
    '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        width: '40%',
        height: '100%',
        background: 'linear-gradient(to right, rgba(248,248,248,0), rgba(248,248,248,1))',
    }
}));

// 액션 버튼 - 애니메이션 추가
const ActionButton = styled(Button)(({ theme, animate }) => ({
    borderRadius: 0,
    padding: '0.8rem 2rem',
    textTransform: 'uppercase',
    fontWeight: 500,
    fontSize: '0.9rem',
    letterSpacing: '0.15em',
    border: '2px solid #000',
    backgroundColor: '#000',
    color: '#fff',
    opacity: animate ? 1 : 0,
    transform: animate ? 'translateY(0)' : 'translateY(30px)',
    transition: 'all 0.8s ease',
    transitionDelay: '1.2s',
    '&:hover': {
        backgroundColor: 'transparent',
        color: '#000',
        transform: 'translateY(-3px)',
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
    },
}));

// 섹션 타이틀 - 애니메이션 추가
const SectionTitle = styled(Typography)(({ theme, animate }) => ({
    fontFamily: "'Didot', 'Playfair Display', 'Pretendard', serif",
    fontSize: '2.5rem',
    fontWeight: 500,
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#000',
    letterSpacing: '0.05em',
    position: 'relative',
    fontStyle: 'italic',
    opacity: animate ? 1 : 0,
    animation: animate ? `${slideUp} 1s ${theme.transitions.easing.easeOut}` : 'none',
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: -15,
        left: '50%',
        transform: 'translateX(-50%)',
        width: animate ? '80px' : '0px',
        height: '2px',
        backgroundColor: '#000',
        transition: 'width 0.8s ease',
        transitionDelay: '0.4s',
    },
}));

// 설명 텍스트 - 애니메이션 추가
const DescriptionText = styled(Typography)(({ theme, animate }) => ({
    textAlign: 'center',
    maxWidth: '700px',
    margin: '0 auto 4rem',
    color: '#555',
    fontFamily: "'Montserrat', 'Pretendard', sans-serif",
    fontSize: '1.1rem',
    lineHeight: 1.8,
    opacity: animate ? 1 : 0,
    animation: animate ? `${slideInFromRight} 1s ${theme.transitions.easing.easeOut}` : 'none',
    animationDelay: '0.3s',
    animationFillMode: 'forwards',
}));

// 슬라이더 컨테이너
const SliderContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    height: '320px', // 200px → 320px로 증가
    marginBottom: '3rem',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
}));

// 슬라이더 트랙
const SliderTrack = styled(Box)(({ theme, animate }) => ({
    display: 'flex',
    width: 'fit-content',
    height: '100%',
    animation: animate ? `${infiniteSlide} 30s linear infinite` : 'none',
}));

// 슬라이더 이미지 카드
const SliderImageCard = styled(Box)(({ theme }) => ({
    width: '300px',
    height: '320px', // 200px → 320px로 증가
    margin: '0 8px',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '8px',
    flexShrink: 0,
    '&:hover': {
        '& img': {
            transform: 'scale(1.05)',
        }
    }
}));

const SliderImage = styled('img')(({ theme }) => ({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
}));

// 이미지 오버레이
const ImageOverlay = styled(Box)(({ theme }) => ({
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
    color: 'white',
    padding: '1rem',
    transform: 'translateY(100%)',
    transition: 'transform 0.3s ease',
    '&:hover': {
        transform: 'translateY(0)',
    }
}));

// 바버샵 스타일 이미지 데이터
const barberImages = [
    {
        id: 1,
        image: '/images/t1.jpg',
        title: 'Classic Cut',
        description: '클래식한 남성 헤어컷'
    },
    {
        id: 2,
        image: '/images/t2.jpg',
        title: 'Modern Fade',
        description: '모던 페이드 스타일'
    },
    {
        id: 3,
        image: '/images/t3.jpg',
        title: 'Beard Styling',
        description: '수염 스타일링'
    },
    {
        id: 4,
        image: '/images/t4.jpg',
        title: 'Vintage Look',
        description: '빈티지 룩'
    },
    {
        id: 5,
        image: '/images/t5.jpg',
        title: 'Textured Cut',
        description: '텍스처 컷'
    },
    {
        id: 6,
        image: '/images/t6.jpg',
        title: 'Pompadour',
        description: '포마드 스타일'
    },
    {
        id: 7,
        image: '/images/t7.jpg',
        title: 'Trendy Style',
        description: '트렌디 스타일'
    },
];

const ThreeSection = () => {
    const [animate, setAnimate] = useState(false);
    const [animateSlider, setAnimateSlider] = useState(false);
    const sectionRef = useRef(null);

    // 스크롤 감지 및 애니메이션 활성화
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    setAnimate(true);
                    // 슬라이더는 조금 더 늦게 시작
                    setTimeout(() => {
                        setAnimateSlider(true);
                    }, 800);
                }
            },
            {
                root: null,
                threshold: 0.2,
                rootMargin: '-50px',
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <SectionWrapper ref={sectionRef}>
            {/* 백그라운드 이미지 */}
            <BackgroundImage />

            {/* 추가 장식 요소 */}
            <Box sx={{
                position: 'absolute',
                left: 0,
                top: '10%',
                width: '200px',
                height: '200px',
                opacity: 0.03,
                backgroundImage: 'url("/images/scissors-icon.svg")',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                filter: 'blur(1px)',
                transform: 'rotate(-15deg)',
            }} />

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <SectionTitle variant="h2" animate={animate}>
                            FIND YOUR STYLE
                        </SectionTitle>

                        <DescriptionText animate={animate}>
                            전문 바버의 손길로 완성되는 스타일링을 경험해보세요. BarberGen에서는 당신의 얼굴형과 스타일에 맞는 최적의 헤어스타일을 제안해드립니다.
                        </DescriptionText>

                        {/* 무한 슬라이더 */}
                        <SliderContainer>
                            <SliderTrack animate={animateSlider}>
                                {/* 첫 번째 이미지 세트 */}
                                {barberImages.map((image) => (
                                    <SliderImageCard key={`first-${image.id}`}>
                                        <SliderImage
                                            src={image.image}
                                            alt={image.title}
                                            onError={(e) => {
                                                // 이미지 로드 실패시 플레이스홀더
                                                e.target.src = `https://via.placeholder.com/300x200/333/fff?text=${encodeURIComponent(image.title)}`;
                                            }}
                                        />
                                        <ImageOverlay
                                            sx={{
                                                [`${SliderImageCard}:hover &`]: {
                                                    transform: 'translateY(0)',
                                                }
                                            }}
                                        >
                                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                                                {image.title}
                                            </Typography>
                                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                                {image.description}
                                            </Typography>
                                        </ImageOverlay>
                                    </SliderImageCard>
                                ))}

                                {/* 복제된 이미지 세트 (무한 반복용) */}
                                {barberImages.map((image) => (
                                    <SliderImageCard key={`clone-${image.id}`}>
                                        <SliderImage
                                            src={image.image}
                                            alt={image.title}
                                            onError={(e) => {
                                                e.target.src = `https://via.placeholder.com/300x200/333/fff?text=${encodeURIComponent(image.title)}`;
                                            }}
                                        />
                                        <ImageOverlay
                                            sx={{
                                                [`${SliderImageCard}:hover &`]: {
                                                    transform: 'translateY(0)',
                                                }
                                            }}
                                        >
                                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                                                {image.title}
                                            </Typography>
                                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                                {image.description}
                                            </Typography>
                                        </ImageOverlay>
                                    </SliderImageCard>
                                ))}
                            </SliderTrack>
                        </SliderContainer>

                        <Box sx={{ textAlign: 'center' }}>
                            <ActionButton
                                variant="contained"
                                size="large"
                                animate={animate}
                            >
                                APPOINTMENT
                            </ActionButton>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </SectionWrapper>
    );
};

export default ThreeSection;