import React from 'react'

export function checklogin(){
    const login = window.localStorage.getItem('status')
    if (login === "admin") {
      console.log('ok');
    } else {console.log('bad');
    }
}
        
  

  