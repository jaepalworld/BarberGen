import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChange, getUserProfile } from '../services/auth';

const AuthContext = createContext();

// AuthContext를 사용하기 위한 커스텀 훅
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChange(async (user) => {
            try {
                setCurrentUser(user);

                if (user) {
                    // 사용자가 로그인한 경우 프로필 정보 가져오기
                    const { data, error } = await getUserProfile(user.uid);
                    if (error) {
                        console.error('Failed to fetch user profile:', error);
                        setError(error);
                    } else {
                        setUserProfile(data);
                    }
                } else {
                    // 사용자가 로그아웃한 경우
                    setUserProfile(null);
                }
            } catch (err) {
                console.error('Auth state change error:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        });

        return unsubscribe;
    }, []);

    // 프로필 업데이트 함수
    const updateProfile = (newProfileData) => {
        setUserProfile(prev => ({
            ...prev,
            ...newProfileData
        }));
    };

    // 에러 클리어 함수
    const clearError = () => {
        setError(null);
    };

    // 로그아웃 함수
    const logout = async () => {
        try {
            setLoading(true);
            const { logoutUser } = await import('../services/auth');
            await logoutUser();
            setCurrentUser(null);
            setUserProfile(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const value = {
        currentUser,
        userProfile,
        loading,
        error,
        updateProfile,
        clearError,
        logout,
        // 편의를 위한 computed values
        isAuthenticated: !!currentUser,
        isEmailVerified: currentUser?.emailVerified || false,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};