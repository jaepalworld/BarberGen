import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, Avatar, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import PhoneIcon from '@mui/icons-material/Phone';
import WebIcon from '@mui/icons-material/Web';
import YouTubeIcon from '@mui/icons-material/YouTube';

// ThreeSection에서 가져온 SectionWrapper
const SectionWrapper = styled(Box)(({ theme }) => ({
    padding: theme.spacing(8, 0),
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

// ThreeSection에서 가져온 BackgroundImage
const BackgroundImage = styled(Box)(({ theme }) => ({
    position: 'absolute',
    left: 0,
    top: '20%',
    width: '25%',
    height: '70%',
    backgroundImage: 'url("/images/back1.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.25,
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

// 섹션 타이틀
const SectionTitle = styled(Typography)(({ theme }) => ({
    fontFamily: "'Didot', 'Playfair Display', 'Pretendard', serif",
    fontSize: '2rem',
    fontWeight: 500,
    textAlign: 'center',
    marginBottom: '3rem',
    color: '#000',
    letterSpacing: '0.05em',
    position: 'relative',
    fontStyle: 'italic',
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: -15,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '60px',
        height: '1px',
        backgroundColor: '#000',
    },
}));

// 팀 멤버 카드
const TeamCard = styled(Card)(({ theme }) => ({
    height: '100%',
    borderRadius: 15,
    boxShadow: 'none',
    border: '1px solid #eee',
    transition: 'all 0.4s ease',
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.95)', // 배경 투명도 추가
    backdropFilter: 'blur(10px)', // 배경 블러 효과
    '&:hover': {
        transform: 'translateY(-15px)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        '& .member-avatar': {
            transform: 'scale(1.1)',
        },
    },
}));

// 멤버 아바타
const MemberAvatar = styled(Avatar)(({ theme }) => ({
    width: 120,
    height: 120,
    margin: '0 auto 1.5rem',
    fontSize: '3rem',
    backgroundColor: '#000',
    color: '#fff',
    transition: 'transform 0.4s ease',
}));

// 멤버 이름
const MemberName = styled(Typography)(({ theme }) => ({
    fontSize: '1.5rem',
    fontWeight: 600,
    textAlign: 'center',
    marginBottom: '0.5rem',
    color: '#000',
    fontFamily: "'Montserrat', 'Pretendard', sans-serif",
}));

// 멤버 직책
const MemberRole = styled(Typography)(({ theme }) => ({
    fontSize: '1rem',
    textAlign: 'center',
    marginBottom: '1rem',
    color: '#666',
    fontFamily: "'Pretendard', sans-serif",
}));

// 멤버 설명
const MemberDescription = styled(Typography)(({ theme }) => ({
    fontSize: '0.95rem',
    lineHeight: 1.6,
    textAlign: 'center',
    color: '#777',
    marginBottom: '2rem',
    fontFamily: "'Pretendard', sans-serif",
}));

// 소셜 링크 컨테이너
const SocialLinks = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
}));

// 소셜 링크 버튼
const SocialButton = styled(IconButton)(({ theme }) => ({
    width: 45,
    height: 45,
    backgroundColor: '#f8f8f8',
    border: '1px solid #eee',
    transition: 'all 0.3s ease',
    '&:hover': {
        backgroundColor: '#000',
        color: '#fff',
        transform: 'translateY(-3px)',
    },
}));

const FourSection = () => {
    const teamMember = {
        name: '최재원',
        role: '풀스택 AI 개발자',
        description: '최신 AI 기술과 웹 개발 기술을 혁신적인 서비스를 개발하고 있습니다. 프론트엔드부터 AI까지, 완전한 솔루션을 만드는 풀스택 AI 개발자 최재원입니다.',
        phone: '010-3161-4032',
        velog: 'https://velog.io/@cjw4032/posts',
        youtube: 'https://www.youtube.com/@%EB%82%91%EB%8B%AC%EB%8B%AC%ED%95%98%EB%88%84',
        avatar: '/images/profile.jpg'  // 변경된 부분: team-member.jpg → profile.jpg
    };

    const handlePhoneClick = () => {
        window.location.href = `tel:${teamMember.phone}`;
    };

    const handleVelogClick = () => {
        window.open(teamMember.velog, '_blank');
    };

    const handleYoutubeClick = () => {
        window.open(teamMember.youtube, '_blank');
    };

    return (
        <SectionWrapper>
            {/* 백그라운드 이미지 추가 */}
            <BackgroundImage />

            {/* 추가 장식 요소 (ThreeSection과 동일) */}
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
                <SectionTitle variant="h2">DEVELOPER</SectionTitle>

                <Grid container justifyContent="center">
                    <Grid item xs={12} sm={8} md={6} lg={4}>
                        <TeamCard>
                            <CardContent sx={{ p: 4, textAlign: 'center' }}>
                                <MemberAvatar
                                    src={teamMember.avatar}
                                    className="member-avatar"
                                >
                                    {teamMember.name[0]}
                                </MemberAvatar>

                                <MemberName>
                                    {teamMember.name}
                                </MemberName>

                                <MemberRole>
                                    {teamMember.role}
                                </MemberRole>

                                <MemberDescription>
                                    {teamMember.description}
                                </MemberDescription>

                                <SocialLinks>
                                    <SocialButton
                                        onClick={handlePhoneClick}
                                        title="전화 연결"
                                    >
                                        <PhoneIcon />
                                    </SocialButton>

                                    <SocialButton
                                        onClick={handleVelogClick}
                                        title="Velog 블로그"
                                    >
                                        <WebIcon />
                                    </SocialButton>

                                    <SocialButton
                                        onClick={handleYoutubeClick}
                                        title="YouTube 채널"
                                    >
                                        <YouTubeIcon />
                                    </SocialButton>
                                </SocialLinks>
                            </CardContent>
                        </TeamCard>
                    </Grid>
                </Grid>
            </Container>
        </SectionWrapper>
    );
};

export default FourSection;