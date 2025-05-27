'use client';
import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="bg-white  flex w-full h-screen overflow-hidden">
            <div className="w-1/2 hidden md:block">
                <img
                    src="/assets/images/auth-image.png"
                    alt="login"
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="w-full md:w-1/2 relative">
                <div className="rtl:left-3.5 ltr:right-3.5 absolute w-full h-full px-28 py-48 rounded-2xl z-20 bg-white flex flex-col  justify-center">
                    <div className="flex  mb-6">
                        <img src="/assets/images/mea-logo.png" alt="Logo" className="w-[154px] h-[115px]" />
                    </div>

                    <h2 className="font-bold lg:text-4xl text-3xl mb-4">
                        {isLogin ? 'Welcome back' : 'Create your account'}
                    </h2>
                    {isLogin ? <p className='text-sub mb-3'>
                        Please enter your valid e-mail address and your password
                    </p> : ''}
                    {isLogin ? <LoginForm /> : <RegisterForm />}

                    <p className="text-center text-sm mt-4">
                        {isLogin ? (
                            <>
                                Don’t have an account ?{' '}
                                <button
                                    className="text-blue-600 font-semibold"
                                    onClick={() => setIsLogin(false)}
                                >
                                    Sign up
                                </button>
                            </>
                        ) : (
                            <>
                                Have an account ?{' '}
                                <button
                                    className="text-blue-600 font-semibold"
                                    onClick={() => setIsLogin(true)}
                                >
                                    Login
                                </button>
                            </>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}
