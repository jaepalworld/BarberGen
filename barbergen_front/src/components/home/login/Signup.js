import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { registerUser } from '../../../services/auth';
import KakaoLogin from './KakaoLogin';

// 메인 페이지 스타일과 동일한 섹션 래퍼
const SectionWrapper = styled('div')(({ theme }) => ({
    padding: '40px 0',
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
    maxWidth: '500px',
    width: '100%',
    padding: '0 24px',
    position: 'relative',
    zIndex: 1,
}));

// 회원가입 카드
const SignupCard = styled('div')(({ theme }) => ({
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
    marginBottom: '20px',
    color: '#333',
    letterSpacing: '0.02em',
}));

// 간편 가입 섹션
const QuickSignupSection = styled('div')(({ theme }) => ({
    marginBottom: '30px',
    textAlign: 'center',
}));

const QuickSignupTitle = styled('p')(({ theme }) => ({
    fontSize: '0.9rem',
    color: '#666',
    marginBottom: '15px',
    fontFamily: "'Pretendard', sans-serif",
}));

// 폼 스타일
const Form = styled('form')(({ theme }) => ({
    width: '100%',
}));

// 섹션 헤더
const SectionHeader = styled('h3')(({ theme }) => ({
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#333',
    marginBottom: '15px',
    marginTop: '25px',
    fontFamily: "'Montserrat', 'Pretendard', sans-serif",
    borderBottom: '1px solid #e0e0e0',
    paddingBottom: '5px',
}));

// 입력 필드 그룹
const InputGroup = styled('div')(({ theme }) => ({
    marginBottom: '15px',
}));

// 2열 입력 그룹
const TwoColumnGroup = styled('div')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
    marginBottom: '15px',
}));

// 라벨
const Label = styled('label')(({ theme, required }) => ({
    display: 'block',
    marginBottom: '6px',
    fontWeight: 500,
    color: '#333',
    fontFamily: "'Pretendard', sans-serif",
    fontSize: '0.85rem',
    '&::after': required ? {
        content: '" *"',
        color: '#d32f2f',
    } : {}
}));

// 입력 필드
const Input = styled('input')(({ theme, error }) => ({
    width: '100%',
    padding: '12px',
    borderRadius: '6px',
    border: `1px solid ${error ? '#d32f2f' : '#e0e0e0'}`,
    fontSize: '14px',
    fontFamily: "'Pretendard', sans-serif",
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    '&:focus': {
        outline: 'none',
        borderColor: error ? '#d32f2f' : '#000',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        boxShadow: `0 0 0 2px ${error ? 'rgba(211, 47, 47, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
    }
}));

// 셀렉트 필드
const Select = styled('select')(({ theme }) => ({
    width: '100%',
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #e0e0e0',
    fontSize: '14px',
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

// 비밀번호 강도 표시
const PasswordStrengthBar = styled('div')(({ theme, strength }) => ({
    height: '4px',
    borderRadius: '2px',
    backgroundColor: '#e0e0e0',
    marginTop: '8px',
    overflow: 'hidden',
    '&::before': {
        content: '""',
        display: 'block',
        height: '100%',
        width: `${(strength / 5) * 100}%`,
        backgroundColor: strength <= 1 ? '#f44336' : strength <= 3 ? '#ff9800' : '#4caf50',
        transition: 'all 0.3s ease',
    }
}));

const PasswordFeedback = styled('p')(({ theme, strength }) => ({
    fontSize: '0.75rem',
    marginTop: '5px',
    color: strength <= 1 ? '#f44336' : strength <= 3 ? '#ff9800' : '#4caf50',
    fontFamily: "'Pretendard', sans-serif",
}));

// 체크박스 그룹
const CheckboxGroup = styled('div')(({ theme }) => ({
    marginTop: '25px',
    marginBottom: '20px',
}));

const CheckboxItem = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '12px',
    gap: '10px',
}));

const Checkbox = styled('input')(({ theme }) => ({
    marginTop: '3px',
}));

const CheckboxLabel = styled('label')(({ theme }) => ({
    fontSize: '0.85rem',
    color: '#555',
    fontFamily: "'Pretendard', sans-serif",
    lineHeight: 1.4,
    cursor: 'pointer',
}));

const CheckboxLink = styled(RouterLink)(({ theme }) => ({
    color: '#666',
    textDecoration: 'none',
    marginLeft: '5px',
    '&:hover': {
        color: '#000',
        textDecoration: 'underline',
    }
}));

// 회원가입 버튼
const SignupButton = styled('button')(({ theme, disabled }) => ({
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
    textAlign: 'center',
    marginTop: '20px',
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

const Signup = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        phone: '',
        birthdate: '',
        gender: '',
        address: ''
    });
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [agreePrivacy, setAgreePrivacy] = useState(false);
    const [agreeMarketing, setAgreeMarketing] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [passwordFeedback, setPasswordFeedback] = useState('');
    const navigate = useNavigate();

    // 입력 필드 변경 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // 비밀번호 강도 검사
        if (name === 'password') {
            checkPasswordStrength(value);
        }
    };

    // 비밀번호 강도 검사 함수
    const checkPasswordStrength = (password) => {
        let strength = 0;
        let feedback = '';

        if (password.length >= 8) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[a-z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;

        if (strength === 0) feedback = '비밀번호를 입력해주세요.';
        else if (strength === 1) feedback = '매우 약한 비밀번호입니다.';
        else if (strength === 2) feedback = '약한 비밀번호입니다.';
        else if (strength === 3) feedback = '적절한 비밀번호입니다.';
        else if (strength === 4) feedback = '강한 비밀번호입니다.';
        else if (strength === 5) feedback = '매우 강한 비밀번호입니다!';

        setPasswordStrength(strength);
        setPasswordFeedback(feedback);
    };

    // 전화번호 포맷팅
    const formatPhoneNumber = (value) => {
        if (!value) return value;
        const phoneNumber = value.replace(/[^\d]/g, '');
        if (phoneNumber.length <= 3) return phoneNumber;
        else if (phoneNumber.length <= 7) return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
        else return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
    };

    const handlePhoneChange = (e) => {
        const formattedPhone = formatPhoneNumber(e.target.value);
        setFormData({ ...formData, phone: formattedPhone });
    };

    const allRequiredChecked = agreeTerms && agreePrivacy;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // 유효성 검사
        if (!formData.name.trim()) return setError('이름을 입력해주세요.');

        const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
        if (formData.phone && !phoneRegex.test(formData.phone.replace(/-/g, ''))) {
            return setError('유효한 전화번호 형식이 아닙니다.');
        }

        if (formData.password !== formData.confirmPassword) {
            return setError('비밀번호가 일치하지 않습니다.');
        }

        if (passwordStrength < 3) {
            return setError('더 강력한 비밀번호를 사용해주세요.');
        }

        if (!allRequiredChecked) {
            return setError('필수 약관에 동의해주세요.');
        }

        setLoading(true);

        try {
            const { user, error: registerError } = await registerUser(formData.email, formData.password, {
                name: formData.name,
                phone: formData.phone,
                birthdate: formData.birthdate,
                gender: formData.gender,
                address: formData.address,
                agreeMarketing: agreeMarketing
            });

            if (registerError) {
                let errorMessage = registerError;
                if (registerError.includes('email-already-in-use')) {
                    errorMessage = '이미 사용 중인 이메일 주소입니다.';
                } else if (registerError.includes('invalid-email')) {
                    errorMessage = '유효하지 않은 이메일 형식입니다.';
                } else if (registerError.includes('weak-password')) {
                    errorMessage = '비밀번호가 너무 약합니다.';
                }
                setError(errorMessage);
            } else {
                navigate('/');
            }
        } catch (err) {
            setError('회원가입 중 오류가 발생했습니다.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // 카카오 로그인 성공 핸들러
    const handleKakaoLoginSuccess = (userData) => {
        console.log('카카오 로그인 성공:', userData);
        navigate('/');
    };

    return (
        <SectionWrapper>
            <BackgroundImage />
            <Container>
                <SignupCard>
                    <LogoTitle>BARBERGEN</LogoTitle>
                    <SectionTitle>회원가입</SectionTitle>

                    <QuickSignupSection>
                        <QuickSignupTitle>간편 가입</QuickSignupTitle>
                        <KakaoLogin
                            buttonText="카카오로 회원가입"
                            onLoginSuccess={handleKakaoLoginSuccess}
                        />
                    </QuickSignupSection>

                    <Divider>또는 이메일로 가입</Divider>

                    {error && <ErrorMessage>{error}</ErrorMessage>}

                    <Form onSubmit={handleSubmit}>
                        <SectionHeader>기본 정보</SectionHeader>

                        <InputGroup>
                            <Label required>이메일 주소</Label>
                            <Input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="example@email.com"
                            />
                        </InputGroup>

                        <InputGroup>
                            <Label required>비밀번호</Label>
                            <Input
                                type="password"
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="8자 이상, 영문, 숫자, 특수문자 포함"
                            />
                            {formData.password && (
                                <>
                                    <PasswordStrengthBar strength={passwordStrength} />
                                    <PasswordFeedback strength={passwordStrength}>
                                        {passwordFeedback}
                                    </PasswordFeedback>
                                </>
                            )}
                        </InputGroup>

                        <InputGroup>
                            <Label required>비밀번호 확인</Label>
                            <Input
                                type="password"
                                name="confirmPassword"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                error={formData.password !== formData.confirmPassword && formData.confirmPassword !== ''}
                                placeholder="비밀번호를 다시 입력하세요"
                            />
                        </InputGroup>

                        <SectionHeader>개인 정보</SectionHeader>

                        <InputGroup>
                            <Label required>이름</Label>
                            <Input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="실명을 입력하세요"
                            />
                        </InputGroup>

                        <TwoColumnGroup>
                            <div>
                                <Label>전화번호</Label>
                                <Input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handlePhoneChange}
                                    placeholder="010-0000-0000"
                                />
                            </div>
                            <div>
                                <Label>성별</Label>
                                <Select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                >
                                    <option value="">선택 안함</option>
                                    <option value="male">남성</option>
                                    <option value="female">여성</option>
                                    <option value="other">기타</option>
                                </Select>
                            </div>
                        </TwoColumnGroup>

                        <TwoColumnGroup>
                            <div>
                                <Label>생년월일</Label>
                                <Input
                                    type="date"
                                    name="birthdate"
                                    value={formData.birthdate}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <Label>주소</Label>
                                <Input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="시/도"
                                />
                            </div>
                        </TwoColumnGroup>

                        <SectionHeader>약관 동의</SectionHeader>

                        <CheckboxGroup>
                            <CheckboxItem>
                                <Checkbox
                                    type="checkbox"
                                    id="agreeTerms"
                                    checked={agreeTerms}
                                    onChange={(e) => setAgreeTerms(e.target.checked)}
                                />
                                <CheckboxLabel htmlFor="agreeTerms">
                                    이용약관 동의 (필수)
                                    <CheckboxLink to="/terms">보기</CheckboxLink>
                                </CheckboxLabel>
                            </CheckboxItem>

                            <CheckboxItem>
                                <Checkbox
                                    type="checkbox"
                                    id="agreePrivacy"
                                    checked={agreePrivacy}
                                    onChange={(e) => setAgreePrivacy(e.target.checked)}
                                />
                                <CheckboxLabel htmlFor="agreePrivacy">
                                    개인정보 수집 및 이용 동의 (필수)
                                    <CheckboxLink to="/privacy">보기</CheckboxLink>
                                </CheckboxLabel>
                            </CheckboxItem>

                            <CheckboxItem>
                                <Checkbox
                                    type="checkbox"
                                    id="agreeMarketing"
                                    checked={agreeMarketing}
                                    onChange={(e) => setAgreeMarketing(e.target.checked)}
                                />
                                <CheckboxLabel htmlFor="agreeMarketing">
                                    마케팅 정보 수신 동의 (선택)
                                </CheckboxLabel>
                            </CheckboxItem>
                        </CheckboxGroup>

                        <SignupButton type="submit" disabled={loading || !allRequiredChecked}>
                            {loading ? '회원가입 중...' : '회원가입'}
                        </SignupButton>
                    </Form>

                    <LinkContainer>
                        <StyledLink to="/login">
                            이미 계정이 있으신가요? 로그인
                        </StyledLink>
                    </LinkContainer>
                </SignupCard>
            </Container>
        </SectionWrapper>
    );
};

export default Signup;