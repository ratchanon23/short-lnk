import React, { Component } from 'react'

import LinkLists from './LinkLists'
import PrivateHeader from './PrivateHeader'
import AddLink from './AddLink'
import LinksListFilter from './LinksListFilter'

// Stateless functional component => ฟังก์ชันโง่ๆ
export default () => {
    return (
        <div>
            <PrivateHeader title='Your Links' />
            <div className='page-content'>
                <LinksListFilter />
                <AddLink />
                <LinkLists />
            </div>
        </div>
    )
}