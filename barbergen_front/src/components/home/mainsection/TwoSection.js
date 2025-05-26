import React, { useState } from 'react';

const TwoSection = () => {
    // 서비스 데이터
    const services = [
        {
            id: 1,
            name: '헤어 추천',
            description: '얼굴형과 스타일에 맞는 최적의 헤어스타일을 추천해드립니다.',
            longDescription: '얼굴형과 개인의 라이프스타일을 분석하여 가장 어울리는 헤어스타일을 제안해드립니다. AI 기술을 활용한 정확한 분석으로 완벽한 스타일링을 경험해보세요.',
            image: '/images/hair.jpg',
            category: 'AI 서비스',
            navigateTo: 'Hair.js'
        },
        {
            id: 2,
            name: '코디 추천',
            description: '개인의 취향과 상황에 맞는 완벽한 코디네이션을 제안해드립니다.',
            longDescription: '개인의 체형, 피부톤, 취향을 종합적으로 분석하여 상황별 최적의 코디네이션을 추천해드립니다. 트렌드와 개성을 모두 고려한 스타일링을 만나보세요.',
            image: '/images/codi.jpg',
            category: 'AI 서비스',
            navigateTo: 'Codi.js'
        },
        {
            id: 3,
            name: '옷 입혀보기',
            description: '가상으로 다양한 옷을 입어보고 어울리는 스타일을 확인해보세요.',
            longDescription: 'AR 기술을 활용하여 실제로 입어보지 않고도 다양한 의상을 체험할 수 있습니다. 구매 전 미리 확인하고 완벽한 스타일을 완성해보세요.',
            image: '/images/look.jpg',
            category: 'AR 서비스',
            navigateTo: 'Dressup.js'
        },
        {
            id: 4,
            name: '랜덤 코디',
            description: '새로운 스타일 발견을 위한 랜덤 코디네이션 추천 서비스입니다.',
            longDescription: '예상치 못한 새로운 스타일 조합을 발견할 수 있는 랜덤 코디 서비스입니다. 일상에서 벗어난 참신한 스타일링으로 새로운 나를 만나보세요.',
            image: '/images/random.jpg',
            category: 'AI 서비스',
            navigateTo: 'Random.js'
        }
    ];

    // 현재 호버된 서비스 상태
    const [hoveredService, setHoveredService] = useState(services[0]);

    // 페이지 이동 함수
    const handleCardClick = (navigateTo) => {
        // React Router를 사용하는 경우
        // navigate(`/${navigateTo.replace('.js', '')}`);

        // 또는 간단히 페이지 이동
        window.location.href = `/${navigateTo.replace('.js', '')}`;

        // 개발 환경에서는 콘솔로 확인
        console.log(`Navigating to: ${navigateTo}`);
    };

    // Material-UI 스타일을 모방한 스타일 객체들
    const sectionWrapperStyle = {
        padding: '64px 0',
        position: 'relative',
        backgroundColor: '#fff',
        overflow: 'hidden',
    };

    const backgroundImageStyle = {
        position: 'absolute',
        left: 0,
        top: '10%',
        width: '25%',
        height: '70%',
        backgroundImage: 'url("/images/back1.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.25,
        zIndex: 0,
        borderRadius: '0 16px 16px 0',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
    };

    const backgroundImageAfter = {
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        width: '40%',
        height: '100%',
        background: 'linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,1))',
    };

    const containerStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        position: 'relative',
        zIndex: 1,
    };

    const sectionTitleStyle = {
        fontFamily: "'Didot', 'Playfair Display', 'Pretendard', serif",
        fontSize: '2.5rem',
        fontWeight: 500,
        textAlign: 'center',
        marginBottom: '4rem',
        color: '#000',
        letterSpacing: '0.05em',
        position: 'relative',
        fontStyle: 'italic',
        zIndex: 1,
    };

    const titleAfterStyle = {
        content: '""',
        position: 'absolute',
        bottom: '-20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80px',
        height: '2px',
        backgroundColor: '#000',
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '32px',
    };

    const leftColumnStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    };

    const getSmallCardStyle = (isHovered) => ({
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: isHovered ? '0 8px 32px rgba(0, 0, 0, 0.2)' : '0 4px 16px rgba(0, 0, 0, 0.1)',
        border: 'none',
        transition: 'all 0.3s ease',
        height: '120px',
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        zIndex: 1,
        width: '100%',
        cursor: 'pointer',
        transform: isHovered ? 'translateY(-3px) scale(1.02)' : 'translateY(0) scale(1)',
        backgroundColor: '#fff',
    });

    const smallCardImageStyle = {
        width: '120px',
        height: '120px',
        transition: 'transform 0.3s ease',
        flexShrink: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#f5f5f5',
    };

    const smallCardContentStyle = {
        padding: '16px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    };

    const smallCategoryLabelStyle = {
        fontSize: '0.6rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: '#666',
        marginBottom: '0.3rem',
        background: 'linear-gradient(135deg, #f5f5f5, #e0e0e0)',
        padding: '0.1rem 0.4rem',
        borderRadius: '10px',
        display: 'inline-block',
        width: 'fit-content',
    };

    const smallProductNameStyle = {
        fontSize: '0.9rem',
        fontWeight: 600,
        marginBottom: '0.3rem',
        color: '#000',
        fontFamily: "'Montserrat', 'Pretendard', sans-serif",
        lineHeight: 1.3,
    };

    const smallProductDescriptionStyle = {
        fontSize: '0.7rem',
        color: '#666',
        lineHeight: 1.4,
        fontFamily: "'Pretendard', sans-serif",
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
    };

    const previewCardStyle = {
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
        border: 'none',
        height: '600px',
        position: 'sticky',
        top: '32px',
        transition: 'all 0.4s ease',
        background: '#ffffff',
        cursor: 'pointer',
    };

    const getPreviewCardHoverStyle = (isHovered) => ({
        ...previewCardStyle,
        transform: isHovered ? 'translateY(-5px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: isHovered ? '0 25px 80px rgba(0, 0, 0, 0.15)' : '0 20px 60px rgba(0, 0, 0, 0.1)',
    });

    const previewImageStyle = {
        height: '400px',
        transition: 'transform 0.6s ease',
        position: 'relative',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top',
        backgroundColor: '#f8f9fa',
    };

    const previewImageAfterStyle = {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '80px',
        background: 'linear-gradient(to top, rgba(255,255,255,0.95), rgba(255,255,255,0.3), transparent)',
    };

    const previewContentStyle = {
        padding: '32px',
        height: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    };

    const largeCategoryLabelStyle = {
        fontSize: '0.8rem',
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
        color: '#666',
        marginBottom: '12px',
        background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
        padding: '6px 14px',
        borderRadius: '25px',
        display: 'inline-block',
        width: 'fit-content',
    };

    const largeProductNameStyle = {
        fontSize: '2.2rem',
        fontWeight: 500,
        marginBottom: '20px',
        color: '#000',
        fontFamily: "'Montserrat', 'Pretendard', sans-serif",
        lineHeight: 1.1,
        letterSpacing: '-0.01em',
    };

    const largeProductDescriptionStyle = {
        fontSize: '1rem',
        color: '#555',
        lineHeight: 1.7,
        fontFamily: "'Pretendard', sans-serif",
        fontWeight: 400,
    };

    const mobileGridStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '32px',
    };

    // 반응형 체크
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [isPreviewHovered, setIsPreviewHovered] = useState(false);

    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div style={sectionWrapperStyle}>
            {/* 백그라운드 이미지 */}
            <div style={backgroundImageStyle}>
                <div style={backgroundImageAfter}></div>
            </div>

            <div style={containerStyle}>
                <div style={sectionTitleStyle}>
                    OUR SERVICES
                    <div style={titleAfterStyle}></div>
                </div>

                <div style={isMobile ? mobileGridStyle : gridStyle}>
                    {/* 왼쪽: 작은 서비스 카드들 */}
                    <div style={leftColumnStyle}>
                        {services.map((service) => (
                            <div
                                key={service.id}
                                style={getSmallCardStyle(hoveredService.id === service.id)}
                                onMouseEnter={() => setHoveredService(service)}
                                onMouseLeave={() => {
                                    // 마우스가 벗어나면 첫 번째 서비스로 돌아가지 않고 현재 상태 유지
                                }}
                            >
                                <div
                                    style={{
                                        ...smallCardImageStyle,
                                        backgroundImage: `url(${service.image})`,
                                    }}
                                />
                                <div style={smallCardContentStyle}>
                                    <div style={smallCategoryLabelStyle}>{service.category}</div>
                                    <div style={smallProductNameStyle}>{service.name}</div>
                                    <div style={smallProductDescriptionStyle}>
                                        {service.description}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 오른쪽: 큰 프리뷰 카드 */}
                    <div>
                        <div
                            style={getPreviewCardHoverStyle(isPreviewHovered)}
                            onClick={() => handleCardClick(hoveredService.navigateTo)}
                            onMouseEnter={() => setIsPreviewHovered(true)}
                            onMouseLeave={() => setIsPreviewHovered(false)}
                        >
                            <div
                                style={{
                                    ...previewImageStyle,
                                    backgroundImage: `url(${hoveredService.image})`,
                                }}
                            >
                                <div style={previewImageAfterStyle}></div>
                            </div>
                            <div style={previewContentStyle}>
                                <div style={largeCategoryLabelStyle}>{hoveredService.category}</div>
                                <div style={largeProductNameStyle}>{hoveredService.name}</div>
                                <div style={largeProductDescriptionStyle}>
                                    {hoveredService.longDescription}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TwoSection;