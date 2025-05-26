import React, { useState, useEffect } from 'react';

const Random = () => {
    const [currentOutfit, setCurrentOutfit] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [favoriteOutfits, setFavoriteOutfits] = useState([]);
    const [selectedMood, setSelectedMood] = useState('any');
    const [generationCount, setGenerationCount] = useState(0);

    const moods = [
        { id: 'any', name: '상관없음', icon: '🎲', color: '#a78bfa' },
        { id: 'casual', name: '캐주얼', icon: '😎', color: '#60a5fa' },
        { id: 'elegant', name: '우아한', icon: '✨', color: '#f472b6' },
        { id: 'sporty', name: '스포티', icon: '⚡', color: '#34d399' },
        { id: 'vintage', name: '빈티지', icon: '🕰️', color: '#fbbf24' },
        { id: 'minimalist', name: '미니멀', icon: '⚪', color: '#94a3b8' }
    ];

    const outfitDatabase = {
        casual: [
            {
                top: { name: '화이트 기본 티셔츠', image: '/images/white-tee.jpg' },
                bottom: { name: '데님 진', image: '/images/blue-jeans.jpg' },
                shoes: { name: '화이트 스니커즈', image: '/images/white-sneakers.jpg' },
                accessory: { name: '캔버스 백팩', image: '/images/canvas-backpack.jpg' },
                mood: 'casual',
                season: '사계절',
                style: '편안한 일상룩'
            },
            {
                top: { name: '스트라이프 롱슬리브', image: '/images/stripe-long.jpg' },
                bottom: { name: '카키 치노팬츠', image: '/images/khaki-chino.jpg' },
                shoes: { name: '브라운 로퍼', image: '/images/brown-loafer.jpg' },
                accessory: { name: '레더 크로스백', image: '/images/leather-cross.jpg' },
                mood: 'casual',
                season: '봄/가을',
                style: '세미 캐주얼'
            }
        ],
        elegant: [
            {
                top: { name: '실크 블라우스', image: '/images/silk-blouse.jpg' },
                bottom: { name: '하이웨이스트 팬츠', image: '/images/high-waist.jpg' },
                shoes: { name: '블랙 힐', image: '/images/black-heels.jpg' },
                accessory: { name: '체인 핸드백', image: '/images/chain-bag.jpg' },
                mood: 'elegant',
                season: '사계절',
                style: '오피스 엘레강스'
            },
            {
                top: { name: '미디 원피스', image: '/images/midi-dress.jpg' },
                bottom: null,
                shoes: { name: '누드 펌프스', image: '/images/nude-pumps.jpg' },
                accessory: { name: '펄 목걸이', image: '/images/pearl-necklace.jpg' },
                mood: 'elegant',
                season: '봄/여름',
                style: '페미닌 드레시'
            }
        ],
        sporty: [
            {
                top: { name: '스포츠 크롭탑', image: '/images/sport-crop.jpg' },
                bottom: { name: '레깅스', image: '/images/leggings.jpg' },
                shoes: { name: '런닝화', image: '/images/running-shoes.jpg' },
                accessory: { name: '스포츠 백팩', image: '/images/sport-backpack.jpg' },
                mood: 'sporty',
                season: '사계절',
                style: '액티브 스포츠'
            }
        ],
        vintage: [
            {
                top: { name: '빈티지 데님 재킷', image: '/images/vintage-denim.jpg' },
                bottom: { name: '플리츠 미디스커트', image: '/images/pleats-midi.jpg' },
                shoes: { name: '마틴 부츠', image: '/images/martin-boots.jpg' },
                accessory: { name: '빈티지 선글라스', image: '/images/vintage-sunglass.jpg' },
                mood: 'vintage',
                season: '가을/겨울',
                style: '레트로 시크'
            }
        ],
        minimalist: [
            {
                top: { name: '베이직 니트', image: '/images/basic-knit.jpg' },
                bottom: { name: '와이드 팬츠', image: '/images/wide-pants.jpg' },
                shoes: { name: '미니멀 플랫', image: '/images/minimal-flat.jpg' },
                accessory: { name: '심플 토트백', image: '/images/simple-tote.jpg' },
                mood: 'minimalist',
                season: '사계절',
                style: '미니멀 시크'
            }
        ]
    };

    const containerStyle = {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        padding: '2rem 0'
    };

    const headerStyle = {
        textAlign: 'center',
        marginBottom: '3rem',
        padding: '0 2rem'
    };

    const titleStyle = {
        fontSize: '3.5rem',
        fontWeight: '700',
        color: '#fff',
        marginBottom: '1rem',
        fontFamily: "'Playfair Display', serif",
        textShadow: '0 4px 20px rgba(0,0,0,0.4)',
        animation: 'glow 2s ease-in-out infinite alternate'
    };

    const subtitleStyle = {
        fontSize: '1.3rem',
        color: 'rgba(255,255,255,0.9)',
        maxWidth: '700px',
        margin: '0 auto',
        lineHeight: '1.6'
    };

    const contentStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem'
    };

    const moodSelectorStyle = {
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderRadius: '25px',
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: '0 15px 50px rgba(0,0,0,0.2)',
        backdropFilter: 'blur(10px)'
    };

    const moodGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1rem',
        marginTop: '1rem'
    };

    const moodButtonStyle = (isSelected, accentColor) => ({
        padding: '1rem',
        border: isSelected ? `3px solid ${accentColor}` : '2px solid #e2e8f0',
        borderRadius: '15px',
        backgroundColor: isSelected ? `${accentColor}20` : '#fff',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        textAlign: 'center',
        transform: isSelected ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: isSelected ? `0 8px 25px ${accentColor}40` : '0 4px 15px rgba(0,0,0,0.1)'
    });

    const generateButtonStyle = {
        background: isGenerating ?
            'linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3)' :
            'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
        backgroundSize: '400% 400%',
        animation: isGenerating ? 'rainbow 2s ease infinite' : 'none',
        color: '#fff',
        border: 'none',
        padding: '1.5rem 4rem',
        borderRadius: '50px',
        fontSize: '1.3rem',
        fontWeight: '700',
        cursor: isGenerating ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s ease',
        display: 'block',
        margin: '2rem auto',
        boxShadow: '0 10px 30px rgba(255, 107, 107, 0.4)',
        textTransform: 'uppercase',
        letterSpacing: '1px'
    };

    const outfitDisplayStyle = {
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderRadius: '25px',
        padding: '2.5rem',
        marginBottom: '2rem',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        backdropFilter: 'blur(10px)'
    };

    const outfitGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2rem',
        marginBottom: '2rem'
    };

    const itemCardStyle = {
        backgroundColor: '#fff',
        borderRadius: '15px',
        overflow: 'hidden',
        boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s ease'
    };

    const itemImageStyle = {
        width: '100%',
        height: '200px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#f8f9fa'
    };

    const itemInfoStyle = {
        padding: '1rem'
    };

    const outfitMetaStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '15px',
        marginTop: '1.5rem'
    };

    const actionButtonsStyle = {
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        marginTop: '1.5rem'
    };

    const actionButtonStyle = (bgColor) => ({
        padding: '0.8rem 2rem',
        border: 'none',
        borderRadius: '25px',
        backgroundColor: bgColor,
        color: '#fff',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
    });

    const statsStyle = {
        textAlign: 'center',
        color: '#fff',
        fontSize: '1.1rem',
        fontWeight: '600',
        marginBottom: '1rem',
        textShadow: '0 2px 10px rgba(0,0,0,0.3)'
    };

    const favoriteGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '1rem',
        maxHeight: '300px',
        overflowY: 'auto'
    };

    const favoriteCardStyle = {
        backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '1rem',
        fontSize: '0.9rem',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
    };

    const getAllOutfits = () => {
        return Object.values(outfitDatabase).flat();
    };

    const getOutfitsByMood = (mood) => {
        if (mood === 'any') return getAllOutfits();
        return outfitDatabase[mood] || [];
    };

    const generateRandomOutfit = () => {
        setIsGenerating(true);

        setTimeout(() => {
            const availableOutfits = getOutfitsByMood(selectedMood);
            if (availableOutfits.length > 0) {
                const randomIndex = Math.floor(Math.random() * availableOutfits.length);
                setCurrentOutfit(availableOutfits[randomIndex]);
                setGenerationCount(prev => prev + 1);
            }
            setIsGenerating(false);
        }, 2000);
    };

    const addToFavorites = () => {
        if (currentOutfit && !favoriteOutfits.find(fav => fav === currentOutfit)) {
            setFavoriteOutfits([...favoriteOutfits, currentOutfit]);
            alert('즐겨찾기에 추가되었습니다! ⭐');
        }
    };

    const shareOutfit = () => {
        if (currentOutfit) {
            alert('SNS 공유 기능이 곧 제공됩니다! 📱');
        }
    };

    useEffect(() => {
        // 페이지 로드 시 첫 번째 랜덤 코디 생성
        const timer = setTimeout(() => {
            generateRandomOutfit();
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div style={containerStyle}>
            <style>
                {`
                    @keyframes glow {
                        from { text-shadow: 0 4px 20px rgba(0,0,0,0.4); }
                        to { text-shadow: 0 4px 30px rgba(255,255,255,0.6), 0 0 40px rgba(255,255,255,0.4); }
                    }
                    @keyframes rainbow {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                `}
            </style>

            <div style={headerStyle}>
                <h1 style={titleStyle}>🎲 랜덤 코디 메이커</h1>
                <p style={subtitleStyle}>
                    예상치 못한 새로운 스타일 조합을 발견해보세요!<br />
                    AI가 무작위로 추천하는 특별한 코디를 만나보세요
                </p>
                <div style={statsStyle}>
                    지금까지 {generationCount}개의 코디를 생성했어요! 🎉
                </div>
            </div>

            <div style={contentStyle}>
                {/* 무드 선택 */}
                <div style={moodSelectorStyle}>
                    <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: '600',
                        color: '#2d3748',
                        marginBottom: '1rem',
                        textAlign: 'center'
                    }}>
                        🎨 어떤 무드의 코디를 원하시나요?
                    </h2>
                    <div style={moodGridStyle}>
                        {moods.map((mood) => (
                            <div
                                key={mood.id}
                                style={moodButtonStyle(selectedMood === mood.id, mood.color)}
                                onClick={() => setSelectedMood(mood.id)}
                            >
                                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{mood.icon}</div>
                                <div style={{ fontWeight: '600', color: '#2d3748' }}>{mood.name}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 랜덤 생성 버튼 */}
                <button
                    style={generateButtonStyle}
                    onClick={generateRandomOutfit}
                    disabled={isGenerating}
                    onMouseEnter={(e) => {
                        if (!isGenerating) {
                            e.target.style.transform = 'translateY(-3px)';
                            e.target.style.boxShadow = '0 15px 40px rgba(255, 107, 107, 0.6)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!isGenerating) {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 10px 30px rgba(255, 107, 107, 0.4)';
                        }
                    }}
                >
                    {isGenerating ? '🎲 코디 생성 중...' : '🎲 새로운 코디 생성하기'}
                </button>

                {/* 생성된 코디 표시 */}
                {currentOutfit && (
                    <div style={outfitDisplayStyle}>
                        <h2 style={{
                            fontSize: '2rem',
                            fontWeight: '600',
                            color: '#2d3748',
                            textAlign: 'center',
                            marginBottom: '2rem'
                        }}>
                            ✨ 오늘의 랜덤 코디
                        </h2>

                        <div style={outfitGridStyle}>
                            <div style={itemCardStyle}>
                                <div
                                    style={{
                                        ...itemImageStyle,
                                        backgroundImage: `url(${currentOutfit.top.image})`
                                    }}
                                />
                                <div style={itemInfoStyle}>
                                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#2d3748' }}>상의</h4>
                                    <p style={{ margin: '0', color: '#4a5568' }}>{currentOutfit.top.name}</p>
                                </div>
                            </div>

                            {currentOutfit.bottom && (
                                <div style={itemCardStyle}>
                                    <div
                                        style={{
                                            ...itemImageStyle,
                                            backgroundImage: `url(${currentOutfit.bottom.image})`
                                        }}
                                    />
                                    <div style={itemInfoStyle}>
                                        <h4 style={{ margin: '0 0 0.5rem 0', color: '#2d3748' }}>하의</h4>
                                        <p style={{ margin: '0', color: '#4a5568' }}>{currentOutfit.bottom.name}</p>
                                    </div>
                                </div>
                            )}

                            <div style={itemCardStyle}>
                                <div
                                    style={{
                                        ...itemImageStyle,
                                        backgroundImage: `url(${currentOutfit.shoes.image})`
                                    }}
                                />
                                <div style={itemInfoStyle}>
                                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#2d3748' }}>신발</h4>
                                    <p style={{ margin: '0', color: '#4a5568' }}>{currentOutfit.shoes.name}</p>
                                </div>
                            </div>

                            <div style={itemCardStyle}>
                                <div
                                    style={{
                                        ...itemImageStyle,
                                        backgroundImage: `url(${currentOutfit.accessory.image})`
                                    }}
                                />
                                <div style={itemInfoStyle}>
                                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#2d3748' }}>액세서리</h4>
                                    <p style={{ margin: '0', color: '#4a5568' }}>{currentOutfit.accessory.name}</p>
                                </div>
                            </div>
                        </div>

                        <div style={outfitMetaStyle}>
                            <div>
                                <strong>스타일:</strong> {currentOutfit.style}
                            </div>
                            <div>
                                <strong>시즌:</strong> {currentOutfit.season}
                            </div>
                            <div>
                                <strong>무드:</strong> {moods.find(m => m.id === currentOutfit.mood)?.name}
                            </div>
                        </div>

                        <div style={actionButtonsStyle}>
                            <button
                                style={actionButtonStyle('#ff6b6b')}
                                onClick={addToFavorites}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'translateY(0)';
                                }}
                            >
                                ⭐ 즐겨찾기
                            </button>
                            <button
                                style={actionButtonStyle('#4ecdc4')}
                                onClick={shareOutfit}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'translateY(0)';
                                }}
                            >
                                📱 공유하기
                            </button>
                            <button
                                style={actionButtonStyle('#a78bfa')}
                                onClick={generateRandomOutfit}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'translateY(0)';
                                }}
                            >
                                🎲 다시 생성
                            </button>
                        </div>
                    </div>
                )}

                {/* 즐겨찾기 코디 */}
                {favoriteOutfits.length > 0 && (
                    <div style={outfitDisplayStyle}>
                        <h2 style={{
                            fontSize: '1.5rem',
                            fontWeight: '600',
                            color: '#2d3748',
                            marginBottom: '1rem'
                        }}>
                            ⭐ 즐겨찾기 코디 ({favoriteOutfits.length})
                        </h2>
                        <div style={favoriteGridStyle}>
                            {favoriteOutfits.map((outfit, index) => (
                                <div key={index} style={favoriteCardStyle}>
                                    <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
                                        {outfit.style}
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: '#718096' }}>
                                        {outfit.top.name} + {outfit.bottom?.name || '원피스'} + {outfit.shoes.name}
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

export default Random;