import React, { useState } from 'react';

const Dressup = () => {
    const [isARActive, setIsARActive] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('tops');
    const [selectedItem, setSelectedItem] = useState(null);
    const [savedOutfits, setSavedOutfits] = useState([]);

    const categories = [
        { id: 'tops', name: '상의', icon: '👕' },
        { id: 'bottoms', name: '하의', icon: '👖' },
        { id: 'dresses', name: '원피스', icon: '👗' },
        { id: 'outerwear', name: '아우터', icon: '🧥' },
        { id: 'shoes', name: '신발', icon: '👠' },
        { id: 'accessories', name: '액세서리', icon: '👜' }
    ];

    const items = {
        tops: [
            { id: 1, name: '화이트 블라우스', price: '₩45,000', image: '/images/white-blouse.jpg', brand: 'ZARA' },
            { id: 2, name: '스트라이프 셔츠', price: '₩38,000', image: '/images/stripe-shirt.jpg', brand: 'UNIQLO' },
            { id: 3, name: '니트 스웨터', price: '₩55,000', image: '/images/knit-sweater.jpg', brand: 'H&M' },
            { id: 4, name: '캐주얼 티셔츠', price: '₩25,000', image: '/images/casual-tee.jpg', brand: 'GAP' }
        ],
        bottoms: [
            { id: 5, name: '데님 진', price: '₩65,000', image: '/images/denim-jeans.jpg', brand: 'LEVI\'S' },
            { id: 6, name: '슬랙스', price: '₩48,000', image: '/images/slacks.jpg', brand: 'ZARA' },
            { id: 7, name: '플리츠 스커트', price: '₩42,000', image: '/images/pleats-skirt.jpg', brand: 'UNIQLO' }
        ],
        dresses: [
            { id: 8, name: '플로럴 원피스', price: '₩75,000', image: '/images/floral-dress.jpg', brand: 'MANGO' },
            { id: 9, name: '미니 드레스', price: '₩58,000', image: '/images/mini-dress.jpg', brand: 'ZARA' }
        ]
    };

    const containerStyle = {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
        padding: '2rem 0'
    };

    const headerStyle = {
        textAlign: 'center',
        marginBottom: '2rem',
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
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 2rem',
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '2rem'
    };

    const arViewStyle = {
        backgroundColor: '#000',
        borderRadius: '20px',
        height: '600px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        boxShadow: '0 15px 50px rgba(0,0,0,0.3)'
    };

    const cameraPlaceholderStyle = {
        width: '100%',
        height: '100%',
        background: isARActive ?
            'linear-gradient(45deg, #667eea 0%, #764ba2 100%)' :
            'linear-gradient(45deg, #2d3748 0%, #4a5568 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        color: '#fff',
        position: 'relative'
    };

    const arControlsStyle = {
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '1rem'
    };

    const controlButtonStyle = {
        padding: '1rem',
        borderRadius: '50%',
        border: 'none',
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: '#fff',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)',
        fontSize: '1.2rem'
    };

    const sidebarStyle = {
        backgroundColor: '#fff',
        borderRadius: '20px',
        padding: '1.5rem',
        height: 'fit-content',
        boxShadow: '0 15px 50px rgba(0,0,0,0.2)'
    };

    const categoryTabsStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        marginBottom: '1.5rem'
    };

    const categoryTabStyle = (isActive) => ({
        padding: '0.5rem 1rem',
        borderRadius: '20px',
        border: 'none',
        backgroundColor: isActive ? '#ff9a9e' : '#f7fafc',
        color: isActive ? '#fff' : '#4a5568',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        fontSize: '0.9rem',
        fontWeight: '500'
    });

    const itemGridStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
        maxHeight: '400px',
        overflowY: 'auto'
    };

    const itemCardStyle = (isSelected) => ({
        border: isSelected ? '3px solid #ff9a9e' : '1px solid #e2e8f0',
        borderRadius: '10px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        backgroundColor: '#fff',
        transform: isSelected ? 'scale(1.05)' : 'scale(1)'
    });

    const itemImageStyle = {
        width: '100%',
        height: '120px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#f7fafc'
    };

    const itemInfoStyle = {
        padding: '0.8rem'
    };

    const startARButtonStyle = {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#fff',
        border: 'none',
        padding: '1rem 2rem',
        borderRadius: '30px',
        fontSize: '1.1rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        margin: '1rem 0',
        width: '100%',
        boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)'
    };

    const savedOutfitsStyle = {
        marginTop: '2rem',
        padding: '1rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '15px'
    };

    const mobileViewStyle = {
        display: 'none',
        '@media (maxWidth: 768px)': {
            display: 'block'
        }
    };

    const handleStartAR = () => {
        setIsARActive(!isARActive);
        if (!isARActive) {
            alert('AR 카메라를 활성화합니다. 카메라 권한을 허용해주세요.');
        }
    };

    const handleItemSelect = (item) => {
        setSelectedItem(item);
        if (isARActive) {
            alert(`${item.name}을(를) 가상으로 착용합니다.`);
        }
    };

    const handleSaveOutfit = () => {
        if (selectedItem) {
            setSavedOutfits([...savedOutfits, selectedItem]);
            alert('현재 착용 중인 아이템이 저장되었습니다!');
        }
    };

    const currentItems = items[selectedCategory] || [];

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <h1 style={titleStyle}>AR 가상 피팅</h1>
                <p style={subtitleStyle}>
                    첨단 AR 기술로 실제로 입어보지 않고도 완벽한 핏을 확인해보세요
                </p>
            </div>

            <div style={contentStyle}>
                {/* AR 뷰 영역 */}
                <div style={arViewStyle}>
                    <div style={cameraPlaceholderStyle}>
                        {!isARActive ? (
                            <>
                                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📸</div>
                                <h3 style={{ margin: '0 0 1rem 0' }}>AR 카메라 준비 완료</h3>
                                <p style={{ textAlign: 'center', margin: '0', opacity: 0.8 }}>
                                    카메라를 활성화하여<br />가상 피팅을 시작하세요
                                </p>
                            </>
                        ) : (
                            <>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👤</div>
                                <h3 style={{ margin: '0 0 1rem 0' }}>AR 피팅 활성화</h3>
                                <p style={{ textAlign: 'center', margin: '0', opacity: 0.8 }}>
                                    {selectedItem ?
                                        `${selectedItem.name} 착용 중` :
                                        '아이템을 선택해보세요'
                                    }
                                </p>
                                {selectedItem && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '20px',
                                        right: '20px',
                                        backgroundColor: 'rgba(255,255,255,0.9)',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '20px',
                                        color: '#2d3748',
                                        fontWeight: '600'
                                    }}>
                                        {selectedItem.name}
                                    </div>
                                )}
                            </>
                        )}

                        <div style={arControlsStyle}>
                            <button
                                style={controlButtonStyle}
                                onClick={handleSaveOutfit}
                                title="착용 저장"
                            >
                                💾
                            </button>
                            <button
                                style={controlButtonStyle}
                                onClick={() => alert('사진을 촬영했습니다!')}
                                title="사진 촬영"
                            >
                                📷
                            </button>
                            <button
                                style={controlButtonStyle}
                                onClick={() => setSelectedItem(null)}
                                title="아이템 제거"
                            >
                                🗑️
                            </button>
                        </div>
                    </div>
                </div>

                {/* 사이드바 - 아이템 선택 */}
                <div style={sidebarStyle}>
                    <button
                        style={startARButtonStyle}
                        onClick={handleStartAR}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                        }}
                    >
                        {isARActive ? 'AR 종료' : 'AR 시작하기'}
                    </button>

                    <h3 style={{ margin: '0 0 1rem 0', color: '#2d3748' }}>카테고리</h3>
                    <div style={categoryTabsStyle}>
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                style={categoryTabStyle(selectedCategory === category.id)}
                                onClick={() => setSelectedCategory(category.id)}
                            >
                                <span style={{ marginRight: '0.3rem' }}>{category.icon}</span>
                                {category.name}
                            </button>
                        ))}
                    </div>

                    <h3 style={{ margin: '1.5rem 0 1rem 0', color: '#2d3748' }}>아이템</h3>
                    <div style={itemGridStyle}>
                        {currentItems.map((item) => (
                            <div
                                key={item.id}
                                style={itemCardStyle(selectedItem?.id === item.id)}
                                onClick={() => handleItemSelect(item)}
                            >
                                <div
                                    style={{
                                        ...itemImageStyle,
                                        backgroundImage: `url(${item.image})`
                                    }}
                                />
                                <div style={itemInfoStyle}>
                                    <div style={{
                                        fontSize: '0.8rem',
                                        fontWeight: '600',
                                        marginBottom: '0.2rem',
                                        color: '#2d3748'
                                    }}>
                                        {item.name}
                                    </div>
                                    <div style={{
                                        fontSize: '0.7rem',
                                        color: '#718096',
                                        marginBottom: '0.2rem'
                                    }}>
                                        {item.brand}
                                    </div>
                                    <div style={{
                                        fontSize: '0.8rem',
                                        fontWeight: '600',
                                        color: '#ff9a9e'
                                    }}>
                                        {item.price}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 저장된 착용 목록 */}
                    {savedOutfits.length > 0 && (
                        <div style={savedOutfitsStyle}>
                            <h4 style={{ margin: '0 0 0.5rem 0', color: '#2d3748' }}>
                                💾 저장된 착용 ({savedOutfits.length})
                            </h4>
                            {savedOutfits.slice(-3).map((outfit, index) => (
                                <div key={index} style={{
                                    fontSize: '0.8rem',
                                    color: '#4a5568',
                                    marginBottom: '0.2rem'
                                }}>
                                    • {outfit.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dressup;