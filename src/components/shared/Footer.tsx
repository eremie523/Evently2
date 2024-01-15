import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer className='border-t w-full'>
      <div className='flex items-center wrapper w-full justify-between flex-col gap-4 p-5 text-center sm:flex-row'>
        <Link href={'/'}>
          <Image src={'/assets/images/logo.svg'} alt={'logo'} width={128} height={38} />
        </Link>

        <p>2024 Evently. All Rights Reserved</p>
      </div>
    </footer>
  )
}

export default Footer