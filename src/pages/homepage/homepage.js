import React,{useState,useEffect} from 'react'

import Banner from '../../assets/Homepage.jpg'

import Wrapper from '../Wrapper/Wrapper'

import StateAnalysis from '../../components/stateAnalysis/stateAnalysis'

import Common from '../../components/Common/Common'

import './homepage.css'

import CountryAnalysis from '../../components/CountryAnalysis/CountryAnalysis'

import PreventionsData from '../../constants/preventionData'

import SymptomsData from '../../constants/symptomsData'

import COVIDData from '../../constants/covidData'

import Videos from '../../components/Videos/Videos'

const Homepage = () => {

var phrase='SAVE LIVES'

const [text,setText]=useState('')



var x=phrase.split('')


useEffect(()=>{

const interval=setInterval(()=>{

setText(text=>text!==phrase?text+x[text.length]:text)
},200)
return ()=>clearInterval(interval)

},[])

    return (
            <Wrapper>

<div className="row" style={{minHeight:'60vh'}}>

<div className="col-6" style={{textAlign: 'end'}}>

<img src={Banner} alt="Banner" style={{width:'15rem',marginTop:'2rem'}}
/>

</div>

<div className="col-6" style={{textAlign:'start',display:'flex',flexDirection:'column'}}>

<h2 style={{color:'#EA0F58',marginTop:'30vh',fontWeight:'bold'}}>

STAY HOME

</h2>

<h2 style={{marginLeft:'30%',color:'#8C727B',fontWeight:'bold'}}>
    {text}
</h2>

</div>

</div>

<div className='container' style={{marginTop:30}}>

<p style={{color:'#707070'}}>
Coronavirus disease (<span style={{color:'#EA0F58',fontWeight:'bold'}}> COVID-19 </span> ) {COVIDData.desc}
</p>

</div>

<StateAnalysis/>


<Common title={PreventionsData.title} description={PreventionsData.desc}/>

<CountryAnalysis/>

<Common title={SymptomsData.title} description={SymptomsData.desc}/>

<Videos/>

</Wrapper>

    )
}

export default Homepage
