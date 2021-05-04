export const options = {
    scales: {
        xAxes: [
            {
                type: 'time',
                time: {
                    unit: 'day',
                    unitStepSize: 1,
                    displayFormats: {
                        day: 'MM/DD/YY',
                    }
                }
            }
        ],
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
    maintainAspectRatio: false,
};