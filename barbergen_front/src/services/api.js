import axios from 'axios';

const API_URL = 'http://localhost:8000';

const api = {
    // 헤어 스타일 목록 가져오기
    getStyles: async () => {
        try {
            const response = await axios.get(`${API_URL}/styles`);
            return response.data;
        } catch (error) {
            console.error('Error fetching styles:', error);
            throw error;
        }
    },

    // 예약 생성하기
    createAppointment: async (appointmentData) => {
        try {
            const response = await axios.post(`${API_URL}/appointments`, appointmentData);
            return response.data;
        } catch (error) {
            console.error('Error creating appointment:', error);
            throw error;
        }
    }
};

export default api;