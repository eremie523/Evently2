import EventForm from '@/components/shared/EventForm'
import { auth } from '@clerk/nextjs'
import React from 'react'

const page = () => {
    const { userId } = {userId: "12384992"}  //auth()

    return (
        <>
            <section className='bg-primary-50 bg-covr bg-dotted-pattern bg-center py-5 md:py-10'>
                <h3 className='h3-bold wrapper text-center sm:text-left'>Create Event</h3>
            </section>
            <div className='wrapper my-10'>
                <EventForm userId={userId!} type={"Create"} />
            </div>
        </>
    )
}

export default page