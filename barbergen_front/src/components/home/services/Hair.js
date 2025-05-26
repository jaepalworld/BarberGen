import React, { useState } from 'react';

const Hair = () => {
    const [selectedFaceShape, setSelectedFaceShape] = useState('');
    const [selectedStyle, setSelectedStyle] = useState('');
    const [selectedGender, setSelectedGender] = useState('');

    const faceShapes = [
        { id: 'round', name: '둥근형', icon: '⭕' },
        { id: 'oval', name: '계란형', icon: '🥚' },
        { id: 'square', name: '사각형', icon: '⬜' },
        { id: 'heart', name: '하트형', icon: '💖' },
        { id: 'long', name: '긴 얼굴형', icon: '📏' }
    ];

    const hairStyles = [
        { id: 'casual', name: '캐주얼', image: '/images/hair-casual.jpg' },
        { id: 'formal', name: '포멀', image: '/images/hair-formal.jpg' },
        { id: 'trendy', name: '트렌디', image: '/images/hair-trendy.jpg' },
        { id: 'classic', name: '클래식', image: '/images/hair-classic.jpg' }
    ];

    const recommendations = [
        { name: '레이어드 컷', image: '/images/layered.jpg', match: '95%' },
        { name: '볼륨 펌', image: '/images/volume-perm.jpg', match: '88%' },
        { name: '시스루 뱅', image: '/images/see-through.jpg', match: '82%' }
    ];

    const containerStyle = {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
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
        color: '#2d3748',
        marginBottom: '1rem',
        fontFamily: "'Playfair Display', serif"
    };

    const subtitleStyle = {
        fontSize: '1.2rem',
        color: '#718096',
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
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
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
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
    };

    const optionCardStyle = (isSelected) => ({
        padding: '1.5rem',
        border: isSelected ? '3px solid #4299e1' : '2px solid #e2e8f0',
        borderRadius: '15px',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        backgroundColor: isSelected ? '#ebf8ff' : '#fff',
        transform: isSelected ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: isSelected ? '0 10px 25px rgba(66, 153, 225, 0.3)' : '0 4px 15px rgba(0,0,0,0.1)'
    });

    const iconStyle = {
        fontSize: '2rem',
        marginBottom: '0.5rem',
        display: 'block'
    };

    const analyzeButtonStyle = {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
        boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)'
    };

    const recommendationGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem'
    };

    const recommendationCardStyle = {
        backgroundColor: '#fff',
        borderRadius: '15px',
        overflow: 'hidden',
        boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s ease'
    };

    const recommendationImageStyle = {
        width: '100%',
        height: '200px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#f7fafc'
    };

    const recommendationContentStyle = {
        padding: '1.5rem'
    };

    const matchBadgeStyle = {
        background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
        color: '#fff',
        padding: '0.3rem 1rem',
        borderRadius: '20px',
        fontSize: '0.9rem',
        fontWeight: '600',
        display: 'inline-block',
        marginBottom: '0.5rem'
    };

    const handleAnalyze = () => {
        // 분석 로직 구현
        alert('AI가 당신의 얼굴형과 스타일을 분석 중입니다...');
    };

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <h1 style={titleStyle}>AI 헤어 추천</h1>
                <p style={subtitleStyle}>
                    당신의 얼굴형과 라이프스타일에 완벽하게 어울리는 헤어스타일을 AI가 추천해드립니다
                </p>
            </div>

            <div style={contentStyle}>
                {/* 성별 선택 */}
                <div style={sectionStyle}>
                    <h2 style={sectionTitleStyle}>
                        <span>👤</span> 성별을 선택해주세요
                    </h2>
                    <div style={{ ...gridStyle, gridTemplateColumns: 'repeat(2, 1fr)' }}>
                        {['남성', '여성'].map((gender) => (
                            <div
                                key={gender}
                                style={optionCardStyle(selectedGender === gender)}
                                onClick={() => setSelectedGender(gender)}
                            >
                                <span style={iconStyle}>{gender === '남성' ? '👨' : '👩'}</span>
                                <div style={{ fontWeight: '600' }}>{gender}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 얼굴형 선택 */}
                <div style={sectionStyle}>
                    <h2 style={sectionTitleStyle}>
                        <span>🎯</span> 얼굴형을 선택해주세요
                    </h2>
                    <div style={gridStyle}>
                        {faceShapes.map((shape) => (
                            <div
                                key={shape.id}
                                style={optionCardStyle(selectedFaceShape === shape.id)}
                                onClick={() => setSelectedFaceShape(shape.id)}
                            >
                                <span style={iconStyle}>{shape.icon}</span>
                                <div style={{ fontWeight: '600' }}>{shape.name}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 스타일 선택 */}
                <div style={sectionStyle}>
                    <h2 style={sectionTitleStyle}>
                        <span>✨</span> 원하는 스타일을 선택해주세요
                    </h2>
                    <div style={gridStyle}>
                        {hairStyles.map((style) => (
                            <div
                                key={style.id}
                                style={optionCardStyle(selectedStyle === style.id)}
                                onClick={() => setSelectedStyle(style.id)}
                            >
                                <div
                                    style={{
                                        ...iconStyle,
                                        height: '100px',
                                        backgroundImage: `url(${style.image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        borderRadius: '10px',
                                        backgroundColor: '#f7fafc',
                                        marginBottom: '1rem'
                                    }}
                                />
                                <div style={{ fontWeight: '600' }}>{style.name}</div>
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
                        e.target.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.6)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
                    }}
                >
                    AI 헤어스타일 분석하기
                </button>

                {/* 추천 결과 */}
                {selectedFaceShape && selectedStyle && selectedGender && (
                    <div style={sectionStyle}>
                        <h2 style={sectionTitleStyle}>
                            <span>💡</span> 당신을 위한 헤어스타일 추천
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
                                        <div style={matchBadgeStyle}>{rec.match} 일치</div>
                                        <h3 style={{
                                            fontSize: '1.3rem',
                                            fontWeight: '600',
                                            color: '#2d3748',
                                            margin: '0'
                                        }}>
                                            {rec.name}
                                        </h3>
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

export default Hair;