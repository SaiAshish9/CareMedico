import React from 'react'

import YouTube from 'react-youtube';


const Videos=()=>{

    const opts = {
        height: '300',
        width: '400'
    }

return (

<div style={{minHeight:'60vh',background:'white',padding:20}} >


<h4 style={{textAlign:'center',marginTop:40, fontWeight:'bolder',color:'#EA0F58'}}>
    Protect Yourself Against Corona
</h4>

    <div className='row' >

<div className='col-md-6' style={{marginBottom:30,display:'flex',alignItems:'center',justifyContent:'center',padding:20}} >
<YouTube
        videoId="mOV1aBVYKGA"
        opts={opts}
      />

</div>


<div className='col-md-6' style={{marginBottom:30,display:'flex',alignItems:'center',justifyContent:'center',padding:20}}
 >

<YouTube
        videoId="1APwq1df6Mw"
        opts={opts}
      />

</div>

    </div>

    </div>

)

}

export default Videos