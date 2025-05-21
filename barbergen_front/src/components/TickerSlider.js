// components/TickerSlider.js
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const TickerContainer = styled(Box)(({ theme }) => ({
    width: '100% !important',
    overflow: 'hidden !important',
    backgroundColor: '#222222 !important',
    color: '#f5f5f5 !important',
    height: '45px !important',
    display: 'flex !important',
    alignItems: 'center !important',
    position: 'fixed !important',
    top: '0 !important',
    left: '0 !important',
    right: '0 !important',
    zIndex: '1200 !important',
    borderBottom: '1px solid rgba(255,255,255,0.08) !important',
}));

const TickerContent = styled(Box)(({ theme }) => ({
    display: 'flex !important',
    width: '100% !important',
    justifyContent: 'space-between !important',
    alignItems: 'center !important',
    padding: '0 !important',
    height: '100% !important',
}));

const TickerItem = styled(Box)(({ isActive }) => ({
    padding: '0 16px !important',
    fontSize: '1rem !important',
    letterSpacing: '0.15em !important',
    textTransform: 'uppercase !important',
    fontWeight: isActive ? '600 !important' : '400 !important',
    whiteSpace: 'nowrap !important',
    textAlign: 'center !important',
    fontFamily: "'Montserrat', 'Pretendard', sans-serif !important",
    transition: 'all 0.8s ease-in-out !important',
    color: isActive ? '#ffffff !important' : 'rgba(255,255,255,0.6) !important',
    textShadow: isActive ? '0 0 10px rgba(255,255,255,0.3) !important' : 'none !important',
    opacity: isActive ? '1 !important' : '0.4 !important',
}));

const TickerItemsWrapper = styled(Box)({
    display: 'flex !important',
    width: '100% !important',
    justifyContent: 'space-between !important',
    padding: '0 20px !important',
});

const TickerSlider = () => {
    const [isOddActive, setIsOddActive] = useState(true);

    // 모든 항목들을 하나의 배열로 관리
    const allItems = [
        "COMFYUI", // 홀수 위치 1
        "FASTAPI", // 짝수 위치 2
        "FIREBASE", // 홀수 위치 3
        "REACT", // 짝수 위치 4
        "PYTHON", // 홀수 위치 5
        "BarberGen" // 짝수 위치 6 - AI_TPO를 BarberGen으로 변경
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setIsOddActive(prev => !prev);
        }, 4000); // 4초마다 전환

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <TickerContainer>
            <TickerContent>
                <TickerItemsWrapper>
                    {allItems.map((item, index) => {
                        const isOddIndex = index % 2 === 0;
                        const isActive = isOddIndex ? isOddActive : !isOddActive;

                        return (
                            <TickerItem key={index} isActive={isActive}>
                                {item}
                            </TickerItem>
                        );
                    })}
                </TickerItemsWrapper>
            </TickerContent>
        </TickerContainer>
    );
};

export default TickerSlider;