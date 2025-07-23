"use client"
import React, { useState } from 'react'
import PasswordChangeComponent from './password-change-component'
import ProfileInfoComponent from './profile-component'

const AllcomponenSetting = () => {
    const [change, setChange] = useState(false)

    return (
        <div>
            {change ? (
                <PasswordChangeComponent setChange={setChange}/>
            ) : (
                <ProfileInfoComponent setChange={setChange} />
            )}
        </div>
    )
}

export default AllcomponenSetting
