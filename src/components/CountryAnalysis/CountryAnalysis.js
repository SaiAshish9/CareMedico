import React from 'react'

import CountUp from 'react-countup'

const CountryAnalysis=()=>{


const data=[
    {
        cases:10,
        state:'West Bengal'
    },
    {
        cases:33,
        state:'Punjab'
    },
    {
        cases:137,
        state:'Kerala'
    }
]

return(
<div className="row" style={{background:'white'}}>

{data.map((i,k)=>{
    return(
<div key={k} className="col-4" style={{marginTop:'10vh',justifyContent:'center', display:'flex',flexDirection:'column',alignItems:'center', textAlign: 'center'}}>

<h1 style={{color:'#EA0F58',fontWeight:'bold'}}>
<CountUp delay={1} end={i.cases} duration={2.5}  />
</h1>

<h6 style={{margin:20, display:'bolder',color:'#68535A'}}>
Active COVID 2019 Cases in {i.state}   
</h6>    

</div>
    )
})}


</div>
)

}

export default CountryAnalysis