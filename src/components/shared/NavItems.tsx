'use client'

import React from 'react'
import { headerLinks } from '../../constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {}

const NavItems = (props: Props) => {
    const pathName = usePathname();
  return (
    <ul className="flex md:justify-between gap-5 md:flex-row flex-col">
        {headerLinks.map((link, index) => {
            const isActive = pathName === link.route
            return (
                <li 
                    key={index} 
                    className={`px-4 py-2 ${isActive && 'text-primary-500'} flex justify-center p-medium-16 whitespace-nowrap`}
                >
                    <Link href={link.route} className='text-xl text-gray-700R'>{link.label}</Link>
                </li>
            )
        })}
    </ul>
  )
}

export default NavItems