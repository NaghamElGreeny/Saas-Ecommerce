'use client';
import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="bg-white  flex w-full overflow-hidden">
            <div className="w-1/2 hidden md:block">
                <img
                    src="/assets/images/auth-image.png"
                    alt="login"
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="w-full md:w-1/2 p-8 rounded-2xl">
                <div className="flex justify-center mb-6">
                    <img src="/assets/images/mea-logo.png" alt="Logo" className="h-10" />
                </div>

                <h2 className="text-2xl font-bold text-center mb-4">
                    {isLogin ? 'Welcome back' : 'Create your account'}
                </h2>

                {isLogin ? <LoginForm /> : <RegisterForm />}

                <p className="text-center text-sm mt-4">
                    {isLogin ? (
                        <>
                            Don’t have an account?{' '}
                            <button
                                className="text-blue-600 underline"
                                onClick={() => setIsLogin(false)}
                            >
                                Sign up now
                            </button>
                        </>
                    ) : (
                        <>
                            Have an account?{' '}
                            <button
                                className="text-blue-600 underline"
                                onClick={() => setIsLogin(true)}
                            >
                                Login
                            </button>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
}
