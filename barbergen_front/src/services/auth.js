import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
    updatePassword,
    reauthenticateWithCredential,
    EmailAuthProvider
} from 'firebase/auth';
import { doc, setDoc, getDoc, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

// 회원가입
export const registerUser = async (email, password, additionalData = {}) => {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const user = result.user;

        // 사용자 프로필 업데이트
        if (additionalData.name) {
            await updateProfile(user, {
                displayName: additionalData.name
            });
        }

        // Firestore에 사용자 정보 저장
        await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            email: user.email,
            name: additionalData.name || '',
            phone: additionalData.phone || '',
            birthdate: additionalData.birthdate || '',
            gender: additionalData.gender || '',
            address: additionalData.address || '',
            profileImageUrl: additionalData.profileImageUrl || '',
            agreeMarketing: additionalData.agreeMarketing || false,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        return { user, error: null };
    } catch (error) {
        console.error('Registration error:', error);
        return { user: null, error: error.message };
    }
};

// 로그인
export const loginUser = async (email, password) => {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        return { user: result.user, error: null };
    } catch (error) {
        console.error('Login error:', error);
        return { user: null, error: error.message };
    }
};

// 로그아웃
export const logoutUser = async () => {
    try {
        await signOut(auth);
        return { error: null };
    } catch (error) {
        console.error('Logout error:', error);
        return { error: error.message };
    }
};

// 사용자 프로필 정보 가져오기
export const getUserProfile = async (uid) => {
    try {
        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { data: docSnap.data(), error: null };
        } else {
            return { data: null, error: 'No user data found' };
        }
    } catch (error) {
        console.error('Get user profile error:', error);
        return { data: null, error: error.message };
    }
};

// 사용자 프로필 업데이트
export const updateUserProfile = async (uid, updateData) => {
    try {
        const userRef = doc(db, 'users', uid);
        await setDoc(userRef, {
            ...updateData,
            updatedAt: new Date()
        }, { merge: true });

        // Firebase Auth 프로필도 업데이트
        if (updateData.name && auth.currentUser) {
            await updateProfile(auth.currentUser, {
                displayName: updateData.name
            });
        }

        return { error: null };
    } catch (error) {
        console.error('Update user profile error:', error);
        return { error: error.message };
    }
};

// 비밀번호 변경
export const changePassword = async (currentPassword, newPassword) => {
    try {
        const user = auth.currentUser;
        if (!user) {
            return { error: 'No user logged in' };
        }

        // 현재 비밀번호로 재인증
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);

        // 새 비밀번호로 업데이트
        await updatePassword(user, newPassword);

        return { error: null };
    } catch (error) {
        console.error('Change password error:', error);
        return { error: error.message };
    }
};

// 예약 정보 저장
export const saveReservation = async (reservationData) => {
    try {
        const docRef = await addDoc(collection(db, 'reservations'), {
            ...reservationData,
            createdAt: new Date(),
            status: 'pending'
        });

        return { id: docRef.id, error: null };
    } catch (error) {
        console.error('Save reservation error:', error);
        return { id: null, error: error.message };
    }
};

// 사용자 예약 내역 가져오기
export const getUserReservations = async (uid) => {
    try {
        const q = query(
            collection(db, 'reservations'),
            where('userId', '==', uid)
        );
        const querySnapshot = await getDocs(q);
        const reservations = [];

        querySnapshot.forEach((doc) => {
            reservations.push({ id: doc.id, ...doc.data() });
        });

        return { data: reservations, error: null };
    } catch (error) {
        console.error('Get user reservations error:', error);
        return { data: [], error: error.message };
    }
};

// 인증 상태 변화 리스너
export const onAuthStateChange = (callback) => {
    return onAuthStateChanged(auth, callback);
};