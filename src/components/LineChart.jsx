import React, {useEffect, useState} from 'react'
import { Line } from 'react-chartjs-2'
import {
    Chart,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip
  } from 'chart.js';
  
function LineChart({killsTotalesArray, muertesTotalesArray, fechaArray,srPorPartidaArray,porcentajeVictoriasArray,kdArray}) {
    Chart.register(
        ArcElement,
        LineElement,
        BarElement,
        PointElement,
        BarController,
        BubbleController,
        DoughnutController,
        LineController,
        PieController,
        PolarAreaController,    
        RadarController,
        ScatterController,
        CategoryScale,
        LinearScale,
        LogarithmicScale,
        RadialLinearScale,
        TimeScale,
        TimeSeriesScale,
        Decimation,
        Filler,
        Legend,
        Title,
        Tooltip
      );
    const [datasets,setDatasets] = useState([])
      useEffect(()=>{
        if (killsTotalesArray != null && muertesTotalesArray != null && kdArray != null) {
            setDatasets([{
                label: 'Kills', 
                data:  killsTotalesArray,
                backgroundColor: ['rgba(5, 220, 155, 0.2)'],
                borderColor: ['rgba(5, 220, 155, 1)'],
                borderWidth: 3,
                tension:0.4
            },
            {
                label: 'Deaths',
                data: muertesTotalesArray,
                backgroundColor: ['rgba(255, 51, 51, 0.2)'],
                borderColor: ['rgba(255, 51, 51, 1)'],
                borderWidth: 3,
                tension:0.4
            },{
                label: 'KD',
                data: kdArray,
                backgroundColor: ['rgba(5, 220, 155, 0)'],
                borderColor: ['rgba(5, 220, 155, 0)'],
                borderWidth: 3,
                tension:0.4
            }
        ])
        }
        
        if (porcentajeVictoriasArray != null ) {
            setDatasets([{
                label: 'Wins%', 
                data: porcentajeVictoriasArray,
                backgroundColor: ['rgba(5, 220, 155, 0.2)'],
                borderColor: ['rgba(5, 220, 155, 1)'],
                borderWidth: 3,
                tension:0.4
            }
        ])
        }
        if (srPorPartidaArray != null) {
            setDatasets([{
                label: 'SR', 
                data: srPorPartidaArray,
                backgroundColor: ['rgba(5, 220, 250, 0.2)'],
                borderColor: ['rgba(5, 220, 250, 1)'],
                borderWidth: 3,
                tension:0.4
            }
        ])
        }
        
      },[killsTotalesArray, muertesTotalesArray, fechaArray,srPorPartidaArray,porcentajeVictoriasArray,kdArray])
      
      const options = {
          interaction: {
            intersect: false,
            mode: 'index',
          },
          scales:{
            x: {
              display:false
            }
          },
          plugins:{
            legend: {
                display : false
              }
          }
      };
const data= {
    labels: fechaArray,
        datasets: datasets
}
const plugins =  {
    
  }
      
  return (
    <div>
       <Line
       data={data}
       options={options}
       height={300}
       width={600}
       plugins={plugins}
       />
    </div>
  )
}

export default LineChart