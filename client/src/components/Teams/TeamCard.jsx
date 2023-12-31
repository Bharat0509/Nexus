import React from 'react'
import ModernProfile from '../ProfileCard/ModernProfile'

const TeamCard = ({ data, title }) => {
    return (
        <div className='my-10 mb-20 w-full flex flex-col items-center justify-center '>
            <h2 className='mb-4 font-semibold text-orange text-2xl'>{title}</h2>
            <div className='w-full flex flex-wrap items-center justify-center  gap-8 md:gap-10 lg:gap-12 '>
                {data.map(item => <ModernProfile key={item.email} profile={item} />)}
            </div>
        </div>
    )
}

export default TeamCard