import React from 'react'

const Common=({title,description})=>{
    

return (
<div className='container' style={{minHeight:'12rem'}} >

<h4 style={{textAlign:'center',margin:20, fontWeight:'bolder',color:'#EA0F58'}}>
    {title}
</h4>

<p style={{textAlign:'start'}}>
{description}
</p>

</div>
)

}

export default Common