import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// 키프레임 애니메이션 정의
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// 고정 배경 이미지가 있는 슬라이더 컨테이너
const SliderContainer = styled(Box)(({ theme }) => ({
    height: '100vh',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/back1.png)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed', // 배경 이미지를 고정
}));

// 슬라이드 이미지 - 선명하게 수정
const SlideImage = styled(Box)(({ theme, image, active }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    transform: active ? 'scale(1)' : 'scale(1.05)',
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover', // contain에서 cover로 변경
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    transition: 'opacity 0.8s cubic-bezier(0.4, 0.0, 0.2, 1), transform 1.2s ease-in-out',
    opacity: active ? 1 : 0, // 투명도를 100%로 변경
    zIndex: 1,
    '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // 오버레이를 더 밝게 (10%로 감소)
        zIndex: 2,
        transition: 'background-color 0.8s ease'
    }
}));

// 슬라이더 내부에 어두운 오버레이 추가
const SliderOverlay = styled(Box)({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 2,
});

// 메인 타이틀 컨테이너 (왼쪽 하단 위치)
const MainTitleContainer = styled(Box)(({ theme }) => ({
    position: 'absolute',
    bottom: 100, // 아래쪽에서 100px 위치
    left: 80, // 왼쪽에서 80px 위치
    zIndex: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
}));

// 메인 타이틀 스타일
const MainTitle = styled(Typography)(({ theme }) => ({
    color: '#ffffff',
    fontWeight: 600,
    fontSize: '4rem',
    fontFamily: "'Playfair Display', serif",
    letterSpacing: '0.02em',
    lineHeight: 1.2,
    textShadow: '0 2px 15px rgba(0, 0, 0, 0.4)',
    marginBottom: theme.spacing(1),
    animation: `${fadeIn} 1.2s ease-out forwards`,
    animationDelay: '0.3s',
    opacity: 0,
    position: 'relative',
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: -10,
        left: 0,
        width: '40%',
        height: 4,
        backgroundColor: theme.palette.primary.main,
    }
}));

// 서브 타이틀 스타일
const SubTitle = styled(Typography)(({ theme, delay }) => ({
    color: '#f0f0f0',
    fontWeight: 400,
    fontSize: '1.4rem',
    marginTop: theme.spacing(1),
    opacity: 0,
    animation: `${fadeIn} 1s ease-out forwards`,
    animationDelay: delay || '0.6s',
    textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
}));

const ContentWrapper = styled(Container)(({ theme, active }) => ({
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    zIndex: 10,
    color: '#fff',
    visibility: active ? 'visible' : 'hidden',
}));

const SlideTitle = styled(Typography)(({ theme, active }) => ({
    fontWeight: 700,
    marginBottom: theme.spacing(2),
    opacity: active ? 1 : 0,
    animation: active ? `${fadeIn} 1s ease-out forwards` : 'none',
    animationDelay: '0.5s',
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
}));

const SlideSubtitle = styled(Typography)(({ theme, active }) => ({
    maxWidth: 600,
    marginBottom: theme.spacing(4),
    opacity: active ? 1 : 0,
    animation: active ? `${fadeIn} 1s ease-out forwards` : 'none',
    animationDelay: '0.7s',
    textShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
}));

// 버튼 스타일 수정 - 어두운 고급스러운 색상으로 변경
const ActionButton = styled(Button)(({ theme, active }) => ({
    minWidth: 200,
    height: 54,
    opacity: 1,
    animationDelay: '0.9s',
    fontWeight: 500,
    fontSize: '1rem',
    background: 'linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%)', // 어두운 그라데이션
    color: '#ffffff',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
    textTransform: 'none',
    '&:hover': {
        background: 'linear-gradient(135deg, #3c3c3c 0%, #2a2a2a 100%)',
        boxShadow: '0 6px 25px rgba(0, 0, 0, 0.5)',
        transform: 'translateY(-2px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
    },
    '&:active': {
        transform: 'translateY(0px)',
        boxShadow: '0 3px 15px rgba(0, 0, 0, 0.4)',
    },
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
}));

// 버튼을 위한 컨테이너 추가 - 오른쪽 아래 배치
const ButtonContainer = styled(Box)(({ theme }) => ({
    position: 'absolute',
    bottom: 100, // 아래쪽에서 100px 위치
    right: 80, // 오른쪽에서 80px 위치
    zIndex: 20,
}));

const Indicators = styled(Box)(({ theme }) => ({
    position: 'absolute',
    bottom: 40,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    zIndex: 10,
}));

const Indicator = styled(Box)(({ theme, active }) => ({
    width: active ? 30 : 10,
    height: 10,
    backgroundColor: active ? theme.palette.primary.main : 'rgba(255, 255, 255, 0.5)',
    margin: '0 5px',
    borderRadius: 10,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
}));

// 슬라이더 데이터
const slides = [
    {
        id: 1,
        image: process.env.PUBLIC_URL + '/images/main1.jpg',
        actionText: '스타일 탐색하기',
    },
    {
        id: 2,
        image: process.env.PUBLIC_URL + '/images/main2.jpg',
        actionText: '상담 예약하기',
    },
    {
        id: 3,
        image: process.env.PUBLIC_URL + '/images/main3.jpg',
        actionText: '자세히 보기',
    },
];

const OneSection = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(true);
    // 이미지 미리 로드를 위한 상태 추가
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // 이미지 미리 로드
    useEffect(() => {
        const preloadImages = () => {
            // 배경 이미지도 미리 로드
            const backgroundImg = new Image();
            backgroundImg.src = `${process.env.PUBLIC_URL}/images/back1.png`;

            const imagePromises = [
                new Promise((resolve) => {
                    backgroundImg.onload = resolve;
                    backgroundImg.onerror = resolve;
                }),
                ...slides.map((slide) => {
                    return new Promise((resolve) => {
                        const img = new Image();
                        img.src = slide.image;
                        img.onload = resolve;
                        img.onerror = resolve; // 에러가 나도 계속 진행
                    });
                })
            ];

            Promise.all(imagePromises).then(() => {
                setImagesLoaded(true);
            });
        };

        preloadImages();
    }, []);

    // 슬라이드 자동 전환 - 이미지가 모두 로드된 후에만 시작
    useEffect(() => {
        if (!imagesLoaded) return;

        const interval = setInterval(() => {
            setIsAnimating(false);
            setTimeout(() => {
                setActiveSlide((prev) => (prev + 1) % slides.length);
                setIsAnimating(true);
            }, 100); // 전환 간격 축소
        }, 5000);

        return () => clearInterval(interval);
    }, [imagesLoaded]);

    // 수동 슬라이드 변경
    const handleSlideChange = (index) => {
        if (index !== activeSlide) {
            setIsAnimating(false);
            setTimeout(() => {
                setActiveSlide(index);
                setIsAnimating(true);
            }, 100); // 전환 간격 축소
        }
    };

    // 로딩 중일 때 표시할 내용
    if (!imagesLoaded) {
        return (
            <Box
                sx={{
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundImage: `url(${process.env.PUBLIC_URL}/images/back1.png)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <Box sx={{ backgroundColor: 'rgba(255,255,255,0.8)', padding: 3, borderRadius: 2 }}>
                    <Typography variant="h5">Loading...</Typography>
                </Box>
            </Box>
        );
    }

    return (
        <SliderContainer>
            {/* 고정 오버레이 */}
            <SliderOverlay />

            {/* 슬라이드 이미지 */}
            {slides.map((slide, index) => (
                <SlideImage
                    key={slide.id}
                    image={slide.image}
                    active={index === activeSlide}
                />
            ))}

            {/* 메인 타이틀 (왼쪽 하단에 배치) */}
            <MainTitleContainer>
                <MainTitle variant="h1">
                    BARBERGEN Dev Portfolio
                </MainTitle>
                <SubTitle variant="h5" delay="0.6s">
                    AI BarberGen
                </SubTitle>
                <SubTitle variant="h6" delay="0.9s">
                    당신만의 완벽한 스타일을 찾아드립니다
                </SubTitle>
            </MainTitleContainer>

            {/* 컨텐츠 */}
            {slides.map((slide, index) => (
                <ContentWrapper
                    key={slide.id}
                    maxWidth="lg"
                    active={index === activeSlide && isAnimating}
                >
                    <SlideTitle variant="h2" active={index === activeSlide && isAnimating}>
                        {slide.title}
                    </SlideTitle>
                    <SlideSubtitle variant="h5" active={index === activeSlide && isAnimating}>
                        {slide.subtitle}
                    </SlideSubtitle>
                </ContentWrapper>
            ))}

            {/* 버튼을 별도 컨테이너로 오른쪽 아래에 배치 */}
            <ButtonContainer>
                <ActionButton
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                    active={isAnimating}
                >
                    {slides[activeSlide].actionText}
                </ActionButton>
            </ButtonContainer>

            <Indicators>
                {slides.map((_, index) => (
                    <Indicator
                        key={index}
                        active={index === activeSlide}
                        onClick={() => handleSlideChange(index)}
                    />
                ))}
            </Indicators>
        </SliderContainer>
    );
};

export default OneSection;