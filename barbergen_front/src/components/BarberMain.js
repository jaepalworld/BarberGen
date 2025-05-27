import React from 'react';
import { Box } from '@mui/material';
import OneSection from './home/mainsection/OneSection';
import TwoSection from './home/mainsection/TwoSection';
import ThreeSection from './home/mainsection/ThreeSection';
import FourSection from './home/mainsection/FourSection';
import Footer from './common/Footer';

const BarberMain = () => {
    return (
        <Box sx={{ minHeight: '100vh', position: 'relative' }}>
            {/* App.js에서 티커슬라이더와 헤더, 패딩을 처리하므로 여기서는 제거 */}

            {/* 섹션 1: 히어로 슬라이더 */}
            <OneSection />

            {/* 섹션 2: 제품 섹션 */}
            <TwoSection />

            {/* 섹션 3: 예약 섹션 */}
            <ThreeSection />

            {/* 섹션 4: 자기 소개 */}
            <FourSection />

            {/* 푸터 */}
            <Footer />
        </Box>
    );
};

export default BarberMain;