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
import styled from 'styled-components';


export default function GPAChart({majorName, averageGPA}) {



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
        clip: {left: 5, top: false, right: -2, bottom: 0},

        //inflateAmount: 2,
        //barPercentage: 0.5
      }
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: '지원자의 평균학점',
      },
      tooltip:{
        display:true,
      }
    }

    
  };
  
  const labels = ['평균학점'];
  
  //로그인하지 않은 경우:
  if(majorName === "false"){
    const noData = {
      labels,
      datasets: [{
          //label: majorName,
          data: [0, 4.5],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(2, 135, 153, 0.6)',
          barThickness:30
        }]
    }

    return <Bar width={100} height={25} options={options} data={noData} />;
  }
  
  const data = {
  labels,
  datasets: [{
      label: majorName,
      data: [averageGPA, 4.5],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(2, 135, 153, 0.6)',
      barThickness:30
    }]
  };

  
  return <Bar width={100} height={25} options={options} data={data} />;
}
