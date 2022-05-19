import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


export default function ApplyChart({majorName, applyNum, totalNum}) {

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 0,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: '지원자 수',
      },
      tooltip:{
        display:true,
      }
    },
    // scale:{
    //     // Y축
    //     yAxes: 
    //       {
    //       offset:false
    //       }
    //     }
  
  };
  
  const labels = ['지원자 수'];
  
  const data = {
  labels,
  datasets: [{
      label: majorName,
      data: [applyNum, totalNum],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(0, 47, 90, 0.7)',
      barThickness:30,
    }]
  };

  
  return <Bar width={100} height={25} options={options} data={data}/>;
}