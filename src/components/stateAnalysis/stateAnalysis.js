import React from 'react'

import Pic from '../../assets/3.jpg'

import CountUp from 'react-countup'


const StateAnalysis = () => {
    return (
        <div className="row" style={{backgroundColor: 'white',minHeight:'30vh'}}>

    <div className="col-6" style={{textAlign: 'center'}}>

<img src={Pic} alt="pic" style={{ width:'10rem' }}/>

    </div>

    
<div className="col-6" style={{marginTop:'10vh', display:'flex',flexDirection:'column',alignItems:'center', textAlign: 'center'}}>

<h1 style={{color:'#EA0F58',fontWeight:'bold'}}>
<CountUp delay={0.5} end={36} duration={2.5}  />
</h1>

<h6 style={{margin:15,display:'bolder',color:'#68535A'}}>
Active COVID 2019 Cases in Delhi    
</h6>    

</div>

        </div>
    )
}

export default StateAnalysis
