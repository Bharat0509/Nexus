import React from 'react'
import { Title } from '../index'
import ProfileCard from '../ProfileCard/ProfileCard'
import { team_cordinators, team_core, team_designer, team_devs } from '../../data'

const Teams = () => {

    return (
        <div className='mx-auto h-full max-w-7xl space-y-8'>
            <Title>
                Our Team
            </Title>
            <div className='w-3/4 flex items-center justify-center flex-wrap gap-x-10 xl:gap-x-40  gap-y-10 xl:gap-y-20 mx-auto pt-10'>
                {team_core.map(item => <ProfileCard profile={item} />)}
            </div>
            <div className=' flex items-center justify-center flex-wrap gap-x-4 xl:gap-x-20 gap-y-6 xl:gap-y-20 mx-auto pt-10'>
                {team_devs.map(item => <ProfileCard profile={item} />)}
            </div>
            <div className='w-3/4 flex items-center justify-center flex-wrap gap-x-10 xl:gap-x-40  gap-y-6 xl:gap-y-20 mx-auto pt-10'>
                {team_cordinators.map(item => <ProfileCard profile={item} />)}
            </div>
            <div className=' flex items-center justify-center flex-wrap gap-x-4 xl:gap-x-20 gap-y-10 xl:gap-y-20 mx-auto pt-10'>
                {team_designer.map(item => <ProfileCard profile={item} />)}
            </div>
        </div>
    )
}

export default Teams