'use client';
import AccountForm from '@/components/Forms/AccountForm';
import { useAuthStore } from '@/stores/authStore'
import React from 'react'
function Profile() {
    const userData = useAuthStore(s => s.userData)
    return (
        <div className="py-11 flex justify-center items-center !w-full">
            <div className="base-card rounded-xl bg-website_white bg-bgPrimary p-4 w-[90%]">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="animated wow zoomIn mb-3 text-4xl font-semibold text-text lg:text-5xl animated">Profile</h3>
                </div>
                {/* account form  */}
                <AccountForm />
            </div>
    </div>
    )
}


export default Profile