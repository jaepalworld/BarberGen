import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { loginUser } from '../../../services/auth';
import KakaoLogin from './KakaoLogin';

// 메인 페이지 스타일과 동일한 섹션 래퍼
const SectionWrapper = styled('div')(({ theme }) => ({
    padding: '80px 0',
    position: 'relative',
    backgroundColor: '#f8f8f8',
    minHeight: 'calc(100vh - 117px)', // 티커슬라이더(45px) + 헤더(72px) 제외
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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

// 백그라운드 이미지 (메인 페이지와 동일)
const BackgroundImage = styled('div')(({ theme }) => ({
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

// 컨테이너
const Container = styled('div')(({ theme }) => ({
    maxWidth: '400px',
    width: '100%',
    padding: '0 24px',
    position: 'relative',
    zIndex: 1,
}));

// 로그인 카드
const LoginCard = styled('div')(({ theme }) => ({
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    padding: '40px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transition: 'all 0.4s ease',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
    }
}));

// 로고 타이틀 (메인 페이지와 동일)
const LogoTitle = styled('h1')(({ theme }) => ({
    fontFamily: "'Didot', 'Playfair Display', 'Pretendard', serif",
    fontSize: '2.5rem',
    fontWeight: 500,
    textAlign: 'center',
    marginBottom: '1rem',
    color: '#000',
    letterSpacing: '0.05em',
    fontStyle: 'italic',
    position: 'relative',
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: '-10px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '60px',
        height: '2px',
        backgroundColor: '#000',
    }
}));

// 섹션 타이틀
const SectionTitle = styled('h2')(({ theme }) => ({
    fontFamily: "'Montserrat', 'Pretendard', sans-serif",
    fontSize: '1.5rem',
    fontWeight: 500,
    textAlign: 'center',
    marginBottom: '30px',
    color: '#333',
    letterSpacing: '0.02em',
}));

// 폼 스타일
const Form = styled('form')(({ theme }) => ({
    width: '100%',
}));

// 입력 필드 그룹
const InputGroup = styled('div')(({ theme }) => ({
    marginBottom: '20px',
}));

// 라벨
const Label = styled('label')(({ theme }) => ({
    display: 'block',
    marginBottom: '8px',
    fontWeight: 500,
    color: '#333',
    fontFamily: "'Pretendard', sans-serif",
    fontSize: '0.9rem',
}));

// 입력 필드
const Input = styled('input')(({ theme }) => ({
    width: '100%',
    padding: '15px',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    fontSize: '16px',
    fontFamily: "'Pretendard', sans-serif",
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    '&:focus': {
        outline: 'none',
        borderColor: '#000',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        boxShadow: '0 0 0 2px rgba(0, 0, 0, 0.1)',
    }
}));

// 로그인 버튼
const LoginButton = styled('button')(({ theme, disabled }) => ({
    width: '100%',
    padding: '15px',
    backgroundColor: disabled ? '#ccc' : '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '500',
    fontFamily: "'Montserrat', 'Pretendard', sans-serif",
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    marginBottom: '20px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    '&:hover': {
        backgroundColor: disabled ? '#ccc' : '#333',
        transform: disabled ? 'none' : 'translateY(-2px)',
        boxShadow: disabled ? 'none' : '0 4px 12px rgba(0, 0, 0, 0.3)',
    }
}));

// 구분선
const Divider = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    margin: '25px 0',
    color: '#666',
    fontSize: '0.9rem',
    '&::before, &::after': {
        content: '""',
        flex: 1,
        height: '1px',
        backgroundColor: '#e0e0e0',
    },
    '&::before': {
        marginRight: '15px',
    },
    '&::after': {
        marginLeft: '15px',
    }
}));

// 링크 컨테이너
const LinkContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
    flexWrap: 'wrap',
    gap: '10px',
}));

// 링크 스타일
const StyledLink = styled(RouterLink)(({ theme }) => ({
    color: '#666',
    textDecoration: 'none',
    fontSize: '14px',
    fontFamily: "'Pretendard', sans-serif",
    transition: 'color 0.3s ease',
    '&:hover': {
        color: '#000',
        textDecoration: 'underline',
    }
}));

// 에러 메시지
const ErrorMessage = styled('div')(({ theme }) => ({
    backgroundColor: '#ffebee',
    color: '#c62828',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '20px',
    border: '1px solid #ffcdd2',
    fontSize: '14px',
    fontFamily: "'Pretendard', sans-serif",
}));

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { error: loginError } = await loginUser(email, password);

            if (loginError) {
                // Firebase 오류 메시지를 사용자 친화적으로 변환
                let errorMessage = '로그인 중 오류가 발생했습니다.';

                if (loginError.includes('invalid-email')) {
                    errorMessage = '유효하지 않은 이메일 형식입니다.';
                } else if (loginError.includes('user-disabled')) {
                    errorMessage = '이 계정은 비활성화되었습니다.';
                } else if (loginError.includes('user-not-found')) {
                    errorMessage = '등록되지 않은 이메일입니다.';
                } else if (loginError.includes('wrong-password')) {
                    errorMessage = '비밀번호가 올바르지 않습니다.';
                } else if (loginError.includes('too-many-requests')) {
                    errorMessage = '너무 많은 로그인 시도가 있었습니다. 잠시 후 다시 시도해주세요.';
                } else if (loginError.includes('invalid-credential')) {
                    errorMessage = '이메일 또는 비밀번호가 올바르지 않습니다.';
                }

                setError(errorMessage);
            } else {
                // 로그인 성공 시 홈으로 리다이렉트
                navigate('/');
            }
        } catch (err) {
            console.error(err);
            setError('로그인 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    // 카카오 로그인 성공 핸들러
    const handleKakaoLoginSuccess = (userData) => {
        console.log('카카오 로그인 성공:', userData);
        navigate('/');
    };

    // 카카오 로그인 실패 핸들러
    const handleKakaoLoginFailure = (error) => {
        console.error('카카오 로그인 실패:', error);
        setError('카카오 로그인에 실패했습니다.');
    };

    return (
        <SectionWrapper>
            {/* 백그라운드 이미지 */}
            <BackgroundImage />

            <Container>
                <LoginCard>
                    <LogoTitle>BARBERGEN</LogoTitle>
                    <SectionTitle>로그인</SectionTitle>

                    {error && <ErrorMessage>{error}</ErrorMessage>}

                    <Form onSubmit={handleSubmit}>
                        <InputGroup>
                            <Label>이메일 주소</Label>
                            <Input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="example@email.com"
                            />
                        </InputGroup>

                        <InputGroup>
                            <Label>비밀번호</Label>
                            <Input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="비밀번호를 입력하세요"
                            />
                        </InputGroup>

                        <LoginButton type="submit" disabled={loading}>
                            {loading ? '로그인 중...' : '로그인'}
                        </LoginButton>
                    </Form>

                    <Divider>또는</Divider>

                    {/* 카카오 로그인 버튼 */}
                    <KakaoLogin
                        buttonText="카카오로 로그인"
                        onLoginSuccess={handleKakaoLoginSuccess}
                        onLoginFailure={handleKakaoLoginFailure}
                    />

                    <LinkContainer>
                        <StyledLink to="/forgot-password">
                            비밀번호를 잊으셨나요?
                        </StyledLink>
                        <StyledLink to="/signup">
                            계정이 없으신가요? 회원가입
                        </StyledLink>
                    </LinkContainer>
                </LoginCard>
            </Container>
        </SectionWrapper>
    );
};

export default Login;