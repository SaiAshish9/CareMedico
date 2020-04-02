import React,{useState,useRef,useEffect} from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';
import ReactTooltip from 'react-tooltip';

import getHeatMapData from '../../constants/heatmapData'

import Wrapper from '../Wrapper/Wrapper'

import './dashboard.css'

import * as d3 from 'd3'



const {select, axisBottom, axisRight, scaleLinear, scaleBand }=d3



const INDIA_TOPO_JSON = require('../../constants/india.topo.json');

const PROJECTION_CONFIG = {
  scale: 350,
  center: [78.9629, 22.5937] //  [East Latitude, North Longitude]
};

var tableData=getHeatMapData.filter(x=>x.value>20)

tableData=tableData.sort((a,b)=>a.value>b.value?-1:1)


const circleData=[

{ 
color:'#F65061',
data:'1218',
desc:'Confirmed'
},
{
color:'#FFE046',
data:'1200',
desc:'Active'
},
{
color:'#64EBEC',
data:'600',
desc:'Recovered'
},
{ 
color:'#7E8F89',
data:'10',
desc:'Deceased'
}

]




const COLOR_RANGE = [
    '#ffedea',
    '#ffcec5',
    '#ffcec5',
    '#ffad9f',
    '#ff8a75',
    '#ff8a75',
    '#ff8a75',
    '#ff5533',
    '#e2492d',
    '#be3d26',
    '#9a311f',
    '#782618'
  ];
  
  const DEFAULT_COLOR = '#EEE';
  

  
const geographyStyle = {
    default: {
      outline: 'none'
    },
    hover: {
      fill: '#ccc',
      transition: 'all 250ms',
      outline: 'none'
    },
    pressed: {
      outline: 'none'
    }
  };


const Dashboard = () => {




  const svgRef=useRef()

    const [tooltipContent, setTooltipContent] = useState('');
    const [data, setData] = useState(getHeatMapData);
  
    const [hover,isHovered] = useState(false)
   
const [data1,setData1] = useState([])
    
    const colorScale = scaleQuantile()
      .domain(data.map(d => d.value))
      .range(COLOR_RANGE);
  
    const onMouseEnter = (geo, current = { value: 'NA' }) => {
      return () => {
        setTooltipContent(`${geo.properties.name}: ${current.value}`);
        isHovered(true)
        setData1([40,120,50,78,90,100,200,300,488,756,864])
      };
    };
  
    const onMouseLeave = () => {
      setTooltipContent('');
      isHovered(false)
setData1([])
    };








    useEffect(() => {
      const svg = select(svgRef.current);
      const xScale = scaleBand()
        .domain(data1.map((value, index) => index))
        .range([0, 400])
        .padding(0.1);
    
      const yScale = scaleLinear()
        .domain([0, 150])
        .range([150, 0]);
    
      const colorScale = scaleLinear()
        .domain([30, 70, 130])
        .range(["#d8ebb5", "#639a67", "#2b580c"])
        .clamp(true);
    
      const xAxis = axisBottom(xScale)
                   .ticks(data1.length)
                   .tickFormat(index=>index+1)
    
      svg
        .select(".x-axis")
        .style("transform", "translateY(150px)")
        .call(xAxis);
    
      const yAxis = axisRight(yScale)
    
    
      svg
          .select(".y-axis")
          .style("transform", "translateX(300px)")
          .call(yAxis);
    
      svg
        .selectAll(".bar")
        .data(data1)
        .join("rect")
        .attr("class", "bar")
        .style("transform", "scale(1, -1)")
        .attr("x", (value, index) => xScale(index))
        .attr("y", -150)
        .attr("width", xScale.bandwidth())
        .transition()
        .duration(1000)
        .attr("fill", colorScale)
        .attr("height", value => 150 - yScale(value));
    }, [data1]);








    return (

 <Wrapper>
     <div style={{minHeight:'30vh',background:'white'}}>



<div style={{padding:2,marginTop:-10,textAlign:'center',width:'100%',height:'3vh',background:'#3e8a50'}} >


<h6 style={{color:'white',fontWeight:'bold',margin:'auto'}} >
Your Safety is in Your Hands. Stay At Home
</h6>


</div>



<div className='container' style={{height:'30vh',width:'100%'}}  >


<div style={{paddingTop:'5vh',maxWidth:'70%',display:'flex',justifyContent:'space-between',alignItems:'center',margin:'auto',}} >


{

  circleData.map((data,key)=>(
<div key={key} style={{margin:'auto',marginRight:5}}>
<div  className='circle123'  style={{width:'100px',height:'100px',border:`5px solid ${data.color}`,borderRadius:'50%'}} >
</div>
<h6 style={{  position:'relative',bottom:'9vh', color:`${data.color}`,fontWeight:'bolder',textAlign:'center'}} >

{data.data}

</h6>


<h6 style={{ color:'black',fontWeight:'bold',textAlign:'center'}}>
{data.desc}
</h6>

</div>
  ))

}



</div>

</div>



</div>





<div   >





     <div className="row" style={{minHeight:'100vh',background:'white'}}>




     <div className="col-md-6" style={{margin:'auto',paddingTop:50,alignItems:'center'}}>


<ReactTooltip>
        {tooltipContent}
        </ReactTooltip>
   
        <ComposableMap
          projectionConfig={PROJECTION_CONFIG}
          projection="geoMercator"
          width={300}
          height={220}
          data-tip=""
        >
          <Geographies geography={INDIA_TOPO_JSON}>
            {({ geographies }) =>
              geographies.map(geo => {
                const current = data.find(s => s.id === geo.id);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={current ? colorScale(current.value) : DEFAULT_COLOR}
                    style={geographyStyle}
                    onMouseEnter={onMouseEnter(geo, current)}
                    onMouseLeave={onMouseLeave}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>



</div>




<div className="col-md-6" style={{padding:'5%',margin:'auto'}}>

<table class="table table-striped table-sm" style={{ margin:'auto'}} >
  <thead >
    <tr >
      <th scope="col" style={{fontSize:'10px',margin:'auto'}}>Name of State / UT</th>
      <th scope="col" style={{fontSize:'10px'}} >Total Confirmed cases</th>
    </tr>
  </thead>
  <tbody>
    {
      tableData.map((data,key)=>{
        return (
<tr key={key}>
        <td style={{fontSize:'10px'}} >{data.state}</td>
        <td style={{fontSize:'10px'}} >{data.value}</td>
    </tr>
        )
      })
    }
    
   
  </tbody>
</table>

</div>
</div>


<div className="row" style={{width: '100%',minHeight: '30vh',background:'white'}}>



<div className="col-md-6"   > 

<p style={{textAlign:'center',color:'#F65061',fontWeight:'bold'}}>
  Hover over the state
</p>

<div className='row' style={{margin:'auto', width:'60%',display:'flex',justifyContent:'space-between',textAlign:'center'}} >


{
  circleData.map((data,i)=>(
<div className='col-md-3'  key={i}  style={{textAlign:'center', borderRadius:20, width:'40%', minWidth:'40%', height:'12vh', marginTop:20,marginBottom:20, background:`${data.color}`}} >

{
  hover && (
    <div>

<h4 style={{fontWeight:'bold',color:'white',marginTop:'3vh',}}>
{data.data}
</h4>
<p style={{textAlign:'center',fontWeight:'bold',color:'white'}}>
{data.desc}
</p>
</div>

  )
}




</div>
  ))
}





</div>





</div>

<div className="col-md-6" > 


<p style={{textAlign:'center',color:'#F65061',fontWeight:'bold'}}>

Trends

</p>


<div style={{width: '100%',padding:40}} > 


<svg ref={svgRef}>
            <g className="x-axis" />
            <g className="y-axis" />
          </svg>

</div>


</div>




</div>






     </div>
 </Wrapper>


    )
}

export default Dashboard
