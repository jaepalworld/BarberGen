// 통합된 카카오톡 채널 상담 기능
import React, { useState, useEffect } from 'react';
import {
    Button,
    CircularProgress,
    Typography,
    Box,
    Alert,
    Modal,
    Paper,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const KakaoChannelChat = ({
    buttonText = '카카오톡 상담',
    isButton = true,
    iconSize = { width: 60, height: 60 },
    onSuccess,
    onFailure
}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isKakaoSDKLoaded, setIsKakaoSDKLoaded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [kakaoUser, setKakaoUser] = useState(null);

    // 환경변수에서 채널 ID 가져오기
    const channelPublicId = process.env.REACT_APP_KAKAO_CHANNEL_ID;

    // 카카오 사용자 정보 확인
    useEffect(() => {
        const checkKakaoUser = () => {
            // 로컬 스토리지에서 카카오 사용자 정보 확인
            const storedUser = localStorage.getItem('kakaoUser');
            if (storedUser) {
                setKakaoUser(JSON.parse(storedUser));
            }
        };

        checkKakaoUser();

        // 사용자 로그인 이벤트 리스너 (다른 컴포넌트에서 로그인 시 감지)
        const handleUserLogin = () => {
            checkKakaoUser();
        };

        window.addEventListener('userLogin', handleUserLogin);
        return () => window.removeEventListener('userLogin', handleUserLogin);
    }, []);

    // 카카오 SDK 확인 및 로드
    useEffect(() => {
        console.log("Kakao SDK 초기 상태:", window.Kakao ? "존재" : "없음");

        // 이미 SDK가 로드되고 초기화되어 있으면 사용
        if (window.Kakao && window.Kakao.isInitialized()) {
            console.log("이미 초기화된 Kakao SDK 발견");
            setIsKakaoSDKLoaded(true);
            return;
        }

        // SDK가 로드되어 있지만 초기화되지 않은 경우
        if (window.Kakao && !window.Kakao.isInitialized()) {
            console.log("SDK 로드됨, 초기화 필요");
            initializeKakaoSDK();
            return;
        }

        // SDK가 아예 없는 경우 로드
        loadKakaoSDK();
    }, []);

    // 카카오 SDK 로드
    const loadKakaoSDK = () => {
        const script = document.createElement('script');
        script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
        script.async = true;

        script.onload = () => {
            console.log('카카오 SDK 스크립트 로드 완료');
            initializeKakaoSDK();
        };

        script.onerror = () => {
            setError('카카오 SDK를 로드하는데 실패했습니다');
            console.error('카카오 SDK 로드 실패');
        };

        document.body.appendChild(script);
    };

    // 카카오 SDK 초기화
    const initializeKakaoSDK = () => {
        try {
            // 통일된 API 키 사용 (KakaoLogin과 동일)
            const apiKey = process.env.REACT_APP_KAKAO_LOGIN_API_KEY || process.env.REACT_APP_KAKAO_API_KEY;

            console.log("API 키:", apiKey ? "설정됨" : "없음");
            console.log("채널 ID:", channelPublicId ? "설정됨" : "없음");

            if (!apiKey) {
                console.error('카카오 API 키가 설정되지 않았습니다.');
                setError('카카오 API 키가 설정되지 않았습니다.');
                return;
            }

            if (!channelPublicId) {
                console.error('카카오 채널 ID가 설정되지 않았습니다.');
                setError('카카오 채널 ID가 설정되지 않았습니다.');
                return;
            }

            // 이미 초기화되어 있으면 초기화하지 않음
            if (!window.Kakao.isInitialized()) {
                window.Kakao.init(apiKey);
                console.log('Kakao SDK 초기화 완료:', window.Kakao.isInitialized());
            }

            setIsKakaoSDKLoaded(true);
        } catch (err) {
            console.error('Kakao SDK 초기화 실패:', err);
            setError('카카오 SDK 초기화에 실패했습니다.');
        }
    };

    // 모달 열기
    const openModal = () => {
        setIsModalOpen(true);
        setError('');
    };

    // 카카오톡 채널 상담 시작
    const startKakaoChat = () => {
        // 채널 ID 확인
        if (!channelPublicId) {
            setError('채널 ID가 설정되지 않았습니다.');
            return;
        }

        // SDK 로드 확인
        if (!window.Kakao) {
            console.error('Kakao SDK가 로드되지 않았습니다');
            setError('카카오 SDK가 로드되지 않았습니다.');
            return;
        }

        // SDK 초기화 확인
        if (!window.Kakao.isInitialized()) {
            console.error('Kakao SDK가 초기화되지 않았습니다');
            setError('카카오 SDK가 초기화되지 않았습니다.');
            return;
        }

        // Channel 객체 확인
        if (!window.Kakao.Channel) {
            console.error('Kakao.Channel 객체가 없습니다');
            setError('카카오 채널 기능을 불러올 수 없습니다.');
            return;
        }

        setLoading(true);

        try {
            console.log("사용할 채널 ID:", channelPublicId);
            console.log("현재 로그인 상태:", window.Kakao.Auth.getAccessToken() ? "로그인됨" : "로그인안됨");

            // 카카오톡 채널 상담 시작
            window.Kakao.Channel.chat({
                channelPublicId: channelPublicId
            });

            if (onSuccess) {
                onSuccess();
            }

            setIsModalOpen(false);
        } catch (err) {
            console.error('카카오 채널 상담 시작 에러:', err);

            // 더 구체적인 에러 메시지 제공
            let errorMessage = '카카오톡 채널 상담을 시작할 수 없습니다.';

            if (err.message && err.message.includes('not found')) {
                errorMessage = '채널을 찾을 수 없습니다. 채널 ID와 채널 공개 상태를 확인해주세요.';
            }

            setError(errorMessage);

            if (onFailure) {
                onFailure(err);
            }
        } finally {
            setLoading(false);
        }
    };

    // 필수 설정이 없으면 경고 표시
    if (!channelPublicId) {
        return (
            <Alert severity="warning">
                REACT_APP_KAKAO_CHANNEL_ID가 설정되지 않았습니다. .env 파일을 확인해주세요.
            </Alert>
        );
    }

    // 버튼 모드
    if (isButton) {
        return (
            <>
                <Button
                    fullWidth
                    variant="contained"
                    onClick={openModal}
                    disabled={loading || !isKakaoSDKLoaded}
                    sx={{
                        backgroundColor: '#FEE500',
                        color: '#000000',
                        '&:hover': {
                            backgroundColor: '#E6CF00',
                        },
                        '&:disabled': {
                            backgroundColor: '#FEE50099',
                        }
                    }}
                >
                    {loading ? (
                        <CircularProgress size={24} />
                    ) : (
                        <>
                            <img
                                src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_small.png"
                                alt="카카오"
                                style={{ width: '20px', height: '20px', marginRight: '8px' }}
                            />
                            {buttonText}
                        </>
                    )}
                </Button>

                {/* 채널 상담 모달 */}
                <Modal
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    aria-labelledby="kakao-channel-modal"
                >
                    <Paper sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        p: 4,
                        outline: 'none',
                        textAlign: 'center'
                    }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <IconButton onClick={() => setIsModalOpen(false)}>
                                <CloseIcon />
                            </IconButton>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                            <Typography variant="h6" component="h2" sx={{ color: '#3A1D1D', fontWeight: 'bold' }}>
                                <span style={{
                                    backgroundColor: '#FEE500',
                                    color: '#3A1D1D',
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    marginRight: '8px'
                                }}>
                                    TALK
                                </span>
                                카카오톡 채널 상담
                            </Typography>
                        </Box>

                        {error && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {error}
                            </Alert>
                        )}

                        {/* 카카오 사용자 정보 표시 */}
                        {kakaoUser && (
                            <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                {kakaoUser.photoURL && (
                                    <img
                                        src={kakaoUser.photoURL}
                                        alt="프로필"
                                        style={{ width: '60px', height: '60px', borderRadius: '50%', marginBottom: '10px' }}
                                    />
                                )}
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                    {kakaoUser.name || '사용자'}님
                                </Typography>
                                {kakaoUser.email && (
                                    <Typography variant="body2" sx={{ color: '#666' }}>
                                        {kakaoUser.email}
                                    </Typography>
                                )}
                            </Box>
                        )}

                        <Typography sx={{ mb: 2 }}>
                            카카오톡으로 상담을 시작합니다
                        </Typography>
                        <Typography sx={{ mb: 4, fontSize: '0.9rem', color: '#666' }}>
                            Mobile / PC 카카오톡으로 상담 시작을 알리는
                            메시지가 발송되었으니 확인해 주세요.
                        </Typography>

                        <Box>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{
                                    backgroundColor: '#FEE500',
                                    color: '#3A1D1D',
                                    '&:hover': { backgroundColor: '#E6CF00' }
                                }}
                                onClick={startKakaoChat}
                                disabled={loading || !isKakaoSDKLoaded}
                            >
                                {loading ? <CircularProgress size={24} /> : '상담 시작하기'}
                            </Button>
                        </Box>
                    </Paper>
                </Modal>
            </>
        );
    } else {
        // 아이콘 모드
        return (
            <>
                <IconButton
                    onClick={openModal}
                    disabled={loading || !isKakaoSDKLoaded}
                    sx={{
                        backgroundColor: '#FEE500',
                        color: '#3A1D1D',
                        borderRadius: '50%',
                        width: iconSize.width,
                        height: iconSize.height,
                        margin: '8px 0',
                        '&:hover': { backgroundColor: '#E6CF00' }
                    }}
                >
                    {loading ? (
                        <CircularProgress size={24} color="inherit" />
                    ) : (
                        <Typography variant="caption" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                            TALK
                        </Typography>
                    )}
                </IconButton>

                {/* 아이콘 모드용 모달 */}
                <Modal
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    aria-labelledby="kakao-channel-modal"
                >
                    <Paper sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        p: 4,
                        outline: 'none',
                        textAlign: 'center'
                    }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <IconButton onClick={() => setIsModalOpen(false)}>
                                <CloseIcon />
                            </IconButton>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                            <Typography variant="h6" component="h2" sx={{ color: '#3A1D1D', fontWeight: 'bold' }}>
                                <span style={{
                                    backgroundColor: '#FEE500',
                                    color: '#3A1D1D',
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    marginRight: '8px'
                                }}>
                                    TALK
                                </span>
                                카카오톡 채널 상담
                            </Typography>
                        </Box>

                        {error && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {error}
                            </Alert>
                        )}

                        {/* 카카오 사용자 정보 표시 */}
                        {kakaoUser && (
                            <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                {kakaoUser.photoURL && (
                                    <img
                                        src={kakaoUser.photoURL}
                                        alt="프로필"
                                        style={{ width: '60px', height: '60px', borderRadius: '50%', marginBottom: '10px' }}
                                    />
                                )}
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                    {kakaoUser.name || '사용자'}님
                                </Typography>
                                {kakaoUser.email && (
                                    <Typography variant="body2" sx={{ color: '#666' }}>
                                        {kakaoUser.email}
                                    </Typography>
                                )}
                            </Box>
                        )}

                        <Typography sx={{ mb: 2 }}>
                            카카오톡으로 상담을 시작합니다
                        </Typography>
                        <Typography sx={{ mb: 4, fontSize: '0.9rem', color: '#666' }}>
                            Mobile / PC 카카오톡으로 상담 시작을 알리는
                            메시지가 발송되었으니 확인해 주세요.
                        </Typography>

                        <Box>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{
                                    backgroundColor: '#FEE500',
                                    color: '#3A1D1D',
                                    '&:hover': { backgroundColor: '#E6CF00' }
                                }}
                                onClick={startKakaoChat}
                                disabled={loading || !isKakaoSDKLoaded}
                            >
                                {loading ? <CircularProgress size={24} /> : '상담 시작하기'}
                            </Button>
                        </Box>
                    </Paper>
                </Modal>
            </>
        );
    }
};

export default KakaoChannelChat;