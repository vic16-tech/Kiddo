import React from 'react'


const nav =[{id:"About", href:"/about"}]
const Settings = () => {
  return (
    <div className='min-h-1'>
     {nav.forEach(element => {
      <>
          <h1 className='text-3xl'>{ console.log(element.id)}</h1>
          <p>{console.log(element.href)}</p>
          </>
      })
      } 
    </div>
  )
}

export default Settings
