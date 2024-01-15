`use client`
import React from 'react'

interface EventFormProps {
    userId: string,
    type: string,
}

const EventForm = ({userId, type} : EventFormProps) => {
  return (
    <div>Event Form {type}</div>
  )
}

export default EventForm