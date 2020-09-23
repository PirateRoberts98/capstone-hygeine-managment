import React from 'react';
import {Bar} from 'react-chartjs-2';

const data = {
    labels: ['12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm','7pm','8pm','9pm','10pm','11pm','12pm'],
    datasets: [
        {
            label: 'Water Usage (L)',
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(75,192,192,1)',
            hoverBorderColor: 'rgba(220,220,220,1)',
            borderCapStyle: 'round',
            data: [65, 0, 0, 10, 0, 0, 130,65, 0, 0, 10, 0, 0, 130]
        }
    ]
};

class WaterUsageChart extends React.Component {

    render() {
        return (
            <div>
                <Bar
                    data={data}
                    width={100}
                    height={50}
                    options={{
                        maintainAspectRatio: true
                    }}
                />
            </div>
        )
    }
}

export default WaterUsageChart;