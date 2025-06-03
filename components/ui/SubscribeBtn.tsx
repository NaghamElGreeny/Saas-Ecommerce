'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';

interface EmailSubscriptionProps {
    apiEndpoint?: string;
}

const EmailSubscription = ({ apiEndpoint = '/api/subscribe' }: EmailSubscriptionProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [subscriptionStatus, setSubscriptionStatus] = useState<{
        success: boolean;
        message: string;
    } | null>(null);
    const [isRTL, setIsRTL] = useState(false);

    useEffect(() => {
        if (typeof document !== 'undefined') {
            setIsRTL(document.dir === 'rtl');
        }
    }, []);

    const formik = useFormik({
        initialValues: { email: '' },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Please enter a valid email address')
                .required('Email is required'),
        }),
        onSubmit: async (values) => {
            setIsSubmitting(true);
            setSubscriptionStatus(null);

            try {
                const response = await fetch(apiEndpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: values.email }),
                });

                const data = await response.json();

                if (response.ok) {
                    setSubscriptionStatus({ success: true, message: data.message || 'Thank you for subscribing!' });
                    formik.resetForm();
                } else {
                    setSubscriptionStatus({ success: false, message: data.error || 'Subscription failed. Please try again.' });
                }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                setSubscriptionStatus({ success: false, message: 'An error occurred. Please try again later.' });
            } finally {
                setIsSubmitting(false);
            }
        },
    });

    return (
        <div className="w-full" dir={isRTL ? 'rtl' : 'ltr'}>
            <form onSubmit={formik.handleSubmit} className="relative">
                <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    placeholder="Enter your email"
                    disabled={isSubmitting}
                    className={`w-full h-17 px-4 py-4 !rounded-full focus:outline-none focus:ring-2 bg-white ${formik.touched.email && formik.errors.email
                        ? ' ring-red-500 focus:ring-red-200'
                        : 'border-gray-300 focus:ring-indigo-200'
                        }`}
                />
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`absolute min-w-30 h-14 top-1/2 -translate-y-1/2 px-4 py-1.5 font-bold rounded-full text-white transition-all ${isRTL ? 'left-1' : 'right-1'
                        } ${isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'}`}
                >
                    {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </button>
            </form>

            {formik.touched.email && formik.errors.email && (
                <p className="mt-2 text-sm text-red-600">{formik.errors.email}</p>
            )}

            {subscriptionStatus && (
                <div
                    className={`mt-3 p-3 rounded-md text-sm ${subscriptionStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}
                >
                    {subscriptionStatus.message}
                </div>
            )}
        </div>
    );
};

export default EmailSubscription;
