import React, {/* Component */} from 'react'
import loading from './spinner.gif'
const spinner = ()=>{
    return (
      <div className='text-center'>
        <img src={loading} alt="loading..."  />
      </div>
    )
}

export default spinner
