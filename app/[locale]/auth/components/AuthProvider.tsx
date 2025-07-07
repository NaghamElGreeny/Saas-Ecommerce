'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';

export default function AuthProvider() {
    const setToken = useAuthStore((state) => state.setToken);

    const setUserData = useAuthStore((state) => state.setUserData);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userDataStr = localStorage.getItem('userData');
        if (token) setToken(token);
        if (userDataStr) setUserData(JSON.parse(userDataStr));
    }, [setToken, setUserData]);

    return null;
}
