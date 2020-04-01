import React,{useState} from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';
import ReactTooltip from 'react-tooltip';

import getHeatMapData from '../../constants/heatmapData'

import Wrapper from '../Wrapper/Wrapper'

const INDIA_TOPO_JSON = require('../../constants/india.topo.json');

const PROJECTION_CONFIG = {
  scale: 350,
  center: [78.9629, 22.5937] //  [East Latitude, North Longitude]
};

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


    const [tooltipContent, setTooltipContent] = useState('');
    const [data, setData] = useState(getHeatMapData);
  
   
  
    const colorScale = scaleQuantile()
      .domain(data.map(d => d.value))
      .range(COLOR_RANGE);
  
    const onMouseEnter = (geo, current = { value: 'NA' }) => {
      return () => {
        setTooltipContent(`${geo.properties.name}: ${current.value}`);
      };
    };
  
    const onMouseLeave = () => {
      setTooltipContent('');
    };



    return (

 <Wrapper>
     <div className="container" style={{minHeight:'75vh'}}>

     <div className="row" style={{minHeight:'100vh'}}>

<div className="col-md-3">

<table class="table table-striped table-sm" style={{width:'270%',marginLeft:-180}}>
  <thead >
    <tr >
      <th scope="col">Name of State / UT</th>
      <th scope="col">Total Confirmed cases (Including 49 foreign Nationals)	</th>
    </tr>
  </thead>
  <tbody>
    {
      getHeatMapData.map((data,key)=>{
        return (
<tr key={key}>
        <td>{data.state}</td>
        <td>{data.value}</td>
    </tr>
        )
      })
    }
    
   
  </tbody>
</table>



</div>



<div className="col-md-9" style={{paddingTop:50,paddingLeft:'10vw'}}>


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

</div>


     </div>
 </Wrapper>


    )
}

export default Dashboard
