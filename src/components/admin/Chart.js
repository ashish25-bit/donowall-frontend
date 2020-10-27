import React from 'react';
import { Bar } from 'react-chartjs-2';

const Chart = ({ data }) => {

    const chartData = {
        labels: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
        datasets: [{
            label: 'Blood Data',
            data: data.map(({ value }) => { return value }),
            backgroundColor: 'rgba(255, 0, 0, 0.6)'
        }]
    }

    return (
        <div>
            <Bar
                data={chartData}
                options={{
                    title:{
                      display: true,
                      text: 'Blood Data',
                      fontSize: 25
                    },
                    legend:{
                      display: true,
                      position: 'bottom'
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }}
            />
        </div>
    )
}

export default Chart
