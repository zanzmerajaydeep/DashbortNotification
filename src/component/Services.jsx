import React, { useState } from 'react'

export const Services = () => {

    const [ServicesItem,setServicesItem]=useState([
        {name:'Email',img:'email1.png',des:'Stay connected and informed with our reliable email notification microservice.'},
    {name:'SMS',img:"sms1.png",des:'Instantly reach your users with our powerful SMS notification microservice.'},
    {name:'Push Notification',img:'pn1.png',des:'Engage and retain users with our customizable push notification microservice.'}
  
    ])
  return (
    <div>Services</div>
  )
}
