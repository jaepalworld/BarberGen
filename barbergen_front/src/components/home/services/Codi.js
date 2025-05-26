import React, { useState } from 'react';

const Codi = () => {
    const [selectedOccasion, setSelectedOccasion] = useState('');
    const [selectedSeason, setSelectedSeason] = useState('');
    const [selectedBodyType, setSelectedBodyType] = useState('');
    const [selectedColorTone, setSelectedColorTone] = useState('');

    const occasions = [
        { id: 'casual', name: '일상/캐주얼', icon: '👕', color: '#4299e1' },
        { id: 'business', name: '비즈니스', icon: '💼', color: '#38a169' },
        { id: 'date', name: '데이트', icon: '💕', color: '#ed64a6' },
        { id: 'party', name: '파티/모임', icon: '🎉', color: '#9f7aea' },
        { id: 'travel', name: '여행', icon: '✈️', color: '#f56500' },
        { id: 'exercise', name: '운동/액티브', icon: '🏃‍♂️', color: '#00b894' }
    ];

    const seasons = [
        { id: 'spring', name: '봄', icon: '🌸', color: '#ff7675' },
        { id: 'summer', name: '여름', icon: '☀️', color: '#fdcb6e' },
        { id: 'fall', name: '가을', icon: '🍂', color: '#e17055' },
        { id: 'winter', name: '겨울', icon: '❄️', color: '#74b9ff' }
    ];

    const bodyTypes = [
        { id: 'slim', name: '슬림형', description: '마른 체형' },
        { id: 'athletic', name: '애슬레틱', description: '근육질 체형' },
        { id: 'average', name: '보통형', description: '표준 체형' },
        { id: 'curvy', name: '곡선형', description: '글래머러스 체형' }
    ];

    const colorTones = [
        { id: 'spring', name: '스프링톤', color: '#ffeb3b', description: '밝고 따뜻한 톤' },
        { id: 'summer', name: '서머톤', color: '#e1bee7', description: '시원하고 부드러운 톤' },
        { id: 'autumn', name: '어텀톤', color: '#ff8f00', description: '깊고 따뜻한 톤' },
        { id: 'winter', name: '윈터톤', color: '#3f51b5', description: '선명하고 차가운 톤' }
    ];

    const recommendations = [
        {
            name: '클래식 오피스룩',
            image: '/images/office-look.jpg',
            items: ['화이트 셔츠', '네이비 팬츠', '블랙 재킷'],
            price: '₩89,000'
        },
        {
            name: '캐주얼 데님룩',
            image: '/images/denim-look.jpg',
            items: ['데님 재킷', '화이트 티셔츠', '블랙 진'],
            price: '₩76,000'
        },
        {
            name: '우아한 원피스룩',
            image: '/images/dress-look.jpg',
            items: ['플로럴 원피스', '가디건', '플랫슈즈'],
            price: '₩95,000'
        }
    ];

    const containerStyle = {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2rem 0'
    };

    const headerStyle = {
        textAlign: 'center',
        marginBottom: '3rem',
        padding: '0 2rem'
    };

    const titleStyle = {
        fontSize: '3rem',
        fontWeight: '600',
        color: '#fff',
        marginBottom: '1rem',
        fontFamily: "'Playfair Display', serif",
        textShadow: '0 2px 10px rgba(0,0,0,0.3)'
    };

    const subtitleStyle = {
        fontSize: '1.2rem',
        color: 'rgba(255,255,255,0.9)',
        maxWidth: '600px',
        margin: '0 auto'
    };

    const contentStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem'
    };

    const sectionStyle = {
        backgroundColor: '#fff',
        borderRadius: '20px',
        padding: '2.5rem',
        marginBottom: '2rem',
        boxShadow: '0 15px 50px rgba(0,0,0,0.2)'
    };

    const sectionTitleStyle = {
        fontSize: '1.5rem',
        fontWeight: '600',
        color: '#2d3748',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
    };

    const optionCardStyle = (isSelected, accentColor = '#4299e1') => ({
        padding: '1.5rem',
        border: isSelected ? `3px solid ${accentColor}` : '2px solid #e2e8f0',
        borderRadius: '15px',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        backgroundColor: isSelected ? `${accentColor}15` : '#fff',
        transform: isSelected ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: isSelected ? `0 10px 25px ${accentColor}30` : '0 4px 15px rgba(0,0,0,0.1)'
    });

    const iconStyle = {
        fontSize: '2.5rem',
        marginBottom: '0.5rem',
        display: 'block'
    };

    const analyzeButtonStyle = {
        background: 'linear-gradient(135deg, #ff7675 0%, #fd79a8 100%)',
        color: '#fff',
        border: 'none',
        padding: '1rem 3rem',
        borderRadius: '30px',
        fontSize: '1.1rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        display: 'block',
        margin: '2rem auto',
        boxShadow: '0 8px 25px rgba(255, 118, 117, 0.4)'
    };

    const recommendationGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
    };

    const recommendationCardStyle = {
        backgroundColor: '#fff',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
        transition: 'transform 0.3s ease'
    };

    const recommendationImageStyle = {
        width: '100%',
        height: '250px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#f7fafc'
    };

    const recommendationContentStyle = {
        padding: '1.5rem'
    };

    const priceStyle = {
        color: '#667eea',
        fontSize: '1.2rem',
        fontWeight: '700',
        marginTop: '0.5rem'
    };

    const itemsListStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        marginTop: '1rem'
    };

    const itemTagStyle = {
        backgroundColor: '#f7fafc',
        color: '#4a5568',
        padding: '0.3rem 0.8rem',
        borderRadius: '15px',
        fontSize: '0.8rem',
        fontWeight: '500'
    };

    const handleAnalyze = () => {
        alert('AI가 당신의 스타일을 분석하여 완벽한 코디를 추천 중입니다...');
    };

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <h1 style={titleStyle}>AI 코디 추천</h1>
                <p style={subtitleStyle}>
                    당신의 체형, 피부톤, 상황에 맞는 완벽한 코디네이션을 AI가 제안해드립니다
                </p>
            </div>

            <div style={contentStyle}>
                {/* 상황 선택 */}
                <div style={sectionStyle}>
                    <h2 style={sectionTitleStyle}>
                        <span>🎯</span> 어떤 상황의 코디가 필요하신가요?
                    </h2>
                    <div style={gridStyle}>
                        {occasions.map((occasion) => (
                            <div
                                key={occasion.id}
                                style={optionCardStyle(selectedOccasion === occasion.id, occasion.color)}
                                onClick={() => setSelectedOccasion(occasion.id)}
                            >
                                <span style={iconStyle}>{occasion.icon}</span>
                                <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{occasion.name}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 계절 선택 */}
                <div style={sectionStyle}>
                    <h2 style={sectionTitleStyle}>
                        <span>🌤️</span> 계절을 선택해주세요
                    </h2>
                    <div style={{ ...gridStyle, gridTemplateColumns: 'repeat(4, 1fr)' }}>
                        {seasons.map((season) => (
                            <div
                                key={season.id}
                                style={optionCardStyle(selectedSeason === season.id, season.color)}
                                onClick={() => setSelectedSeason(season.id)}
                            >
                                <span style={iconStyle}>{season.icon}</span>
                                <div style={{ fontWeight: '600' }}>{season.name}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 체형 선택 */}
                <div style={sectionStyle}>
                    <h2 style={sectionTitleStyle}>
                        <span>👤</span> 체형을 선택해주세요
                    </h2>
                    <div style={gridStyle}>
                        {bodyTypes.map((bodyType) => (
                            <div
                                key={bodyType.id}
                                style={optionCardStyle(selectedBodyType === bodyType.id)}
                                onClick={() => setSelectedBodyType(bodyType.id)}
                            >
                                <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>{bodyType.name}</div>
                                <div style={{ fontSize: '0.8rem', color: '#718096' }}>{bodyType.description}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 퍼스널 컬러 선택 */}
                <div style={sectionStyle}>
                    <h2 style={sectionTitleStyle}>
                        <span>🎨</span> 퍼스널 컬러를 선택해주세요
                    </h2>
                    <div style={gridStyle}>
                        {colorTones.map((tone) => (
                            <div
                                key={tone.id}
                                style={optionCardStyle(selectedColorTone === tone.id)}
                                onClick={() => setSelectedColorTone(tone.id)}
                            >
                                <div
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        backgroundColor: tone.color,
                                        borderRadius: '50%',
                                        margin: '0 auto 1rem',
                                        border: '3px solid #fff',
                                        boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                                    }}
                                />
                                <div style={{ fontWeight: '600', marginBottom: '0.3rem' }}>{tone.name}</div>
                                <div style={{ fontSize: '0.8rem', color: '#718096' }}>{tone.description}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 분석 버튼 */}
                <button
                    style={analyzeButtonStyle}
                    onClick={handleAnalyze}
                    onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 12px 35px rgba(255, 118, 117, 0.6)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 8px 25px rgba(255, 118, 117, 0.4)';
                    }}
                >
                    AI 코디 추천받기
                </button>

                {/* 추천 결과 */}
                {selectedOccasion && selectedSeason && selectedBodyType && selectedColorTone && (
                    <div style={sectionStyle}>
                        <h2 style={sectionTitleStyle}>
                            <span>✨</span> 당신을 위한 코디 추천
                        </h2>
                        <div style={recommendationGridStyle}>
                            {recommendations.map((rec, index) => (
                                <div
                                    key={index}
                                    style={recommendationCardStyle}
                                    onMouseEnter={(e) => {
                                        e.target.style.transform = 'translateY(-10px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.transform = 'translateY(0)';
                                    }}
                                >
                                    <div
                                        style={{
                                            ...recommendationImageStyle,
                                            backgroundImage: `url(${rec.image})`
                                        }}
                                    />
                                    <div style={recommendationContentStyle}>
                                        <h3 style={{
                                            fontSize: '1.3rem',
                                            fontWeight: '600',
                                            color: '#2d3748',
                                            margin: '0 0 0.5rem 0'
                                        }}>
                                            {rec.name}
                                        </h3>
                                        <div style={priceStyle}>{rec.price}</div>
                                        <div style={itemsListStyle}>
                                            {rec.items.map((item, idx) => (
                                                <span key={idx} style={itemTagStyle}>{item}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Codi;