import DynamicNav from '@/components/common/DynamicNav'
import SearchBar from '@/components/explore/SearchBar'
import React from 'react'

export default function explore() {
  return (
    <div>
        <DynamicNav title='Explore'/>
        <SearchBar/>
    </div>
  )
}
