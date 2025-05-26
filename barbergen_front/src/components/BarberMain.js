import React from 'react';
import { Box } from '@mui/material';
import OneSection from './home/mainsection/OneSection';
import TwoSection from './home/mainsection/TwoSection';
import ThreeSection from './home/mainsection/ThreeSection';
import FourSection from './home/mainsection/FourSection';
import FiveSection from './home/mainsection/FiveSection';
import SixSection from './home/mainsection/SixSection';
import SevenSection from './home/mainsection/SevenSection';
import TickerSlider from './TickerSlider';
import Header from './common/Header';
import Footer from './common/Footer';

const BarberMain = () => {
    return (
        <Box sx={{ minHeight: '100vh', position: 'relative', paddingTop: '45px' }}>
            {/* 티커 슬라이더 */}
            <TickerSlider />

            {/* 헤더 */}
            <Header />

            {/* 섹션 1: 히어로 슬라이더 */}
            <OneSection />

            {/* 섹션 2: 제품 섹션 */}
            <TwoSection />

            {/* 섹션 3: 예약 섹션 */}
            <ThreeSection />

            {/* 섹션 4: 서비스 소개 */}
            <FourSection />

            {/* 섹션 5: 고객 후기 */}
            <FiveSection />

            {/* 섹션 6: 팀 소개 */}
            <SixSection />

            {/* 섹션 7: 갤러리 */}
            <SevenSection />

            {/* 푸터 */}
            <Footer />
        </Box>
    );
};

export default BarberMain;