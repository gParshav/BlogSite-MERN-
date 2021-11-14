import React from 'react'
import One from '../../components/one/One'
import Sidebar from '../../components/sidebar/Sidebar'
// import singlePost from '../../components/singlePost/singlePost'

import './single.css'

export default function Single() {
    return (
        <div className='single'>
            
            {/* <singlePost /> */}
            <One />
            <Sidebar/>
        </div>
    )
}
