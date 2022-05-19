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
      },
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
  
  const data = {
  labels,
  datasets: [{
      label: majorName,
      data: [averageGPA, 4.5],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(2, 135, 153, 0.6)',
    }]
  };

  
  return <Bar options={options} data={data}/>;
}