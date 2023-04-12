const { createCanvas } = require('canvas');
const Chart = require('chart.js/auto');
const sharp = require('sharp');

// Main Azure Function
module.exports = async function (context, req) {
    context.log('Generating attendance chart.');

    // Get attendance data from the request
    const attendanceData = req.body.attendance;

    try {
        // Prepare the chart data based on the received attendance data
        const chartData = prepareChartData(attendanceData);

        // Generate the chart image using Chart.js
        const chartImage = await generateChart(chartData);

        // Convert the chart image to base64
        const chartBase64 = await convertToBase64(chartImage);

        // Send the base64 encoded chart image in the response
        context.res = {
            body: {
                base64Image: chartBase64
            }
        };
    } catch (error) {
        // Log the error and send an error response
        context.log('Error:', error);
        context.res = {
            status: 500,
            body: {
                error: `Failed to generate chart. ${error}`
            }
        };
    }
};


//Generate the chart and return a buffer string
async function generateChart(chartData) {
    const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

    const width = 800;
    const height = 600;

    // Initialize ChartJSNodeCanvas with the given width and height
    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

    // Define the chart configuration
    const configuration = {
        type: 'bar',
        data: chartData,
        options: {
            indexAxis: 'x',
            plugins: {
                legend: {
                    position: 'bottom'
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1,
                        font: {
                            family: 'Arial'
                        }
                    }
                },
                y: {
                    ticks: {
                        font: {
                            family: 'Arial'
                        }
                    }
                }
            }
        }
    };

    // Render the chart as a PNG buffer
    const imageBuffer = await chartJSNodeCanvas.renderToBuffer(configuration);
    return imageBuffer;
}


// Convert the image buffer to a base64 string using the 'sharp' library
async function convertToBase64(buffer) {
    const base64Image = await sharp(buffer)
        .toBuffer({ resolveWithObject: true })
        .then(({ data }) => data.toString('base64'));

    return base64Image;
}


// Prepare the chart data based on the received attendance data
function prepareChartData(attendanceData) {
    // Initialize an empty object to store the processed data
    const processedData = {};

    // Iterate through the attendance data
    for (const entry of attendanceData) {
        const { name, datetime, attended } = entry;

        // If the person's name is not in the processed data object, add it with an empty array
        if (!processedData[name]) {
            processedData[name] = [];
        }

        // Get the day of the week as an index (0 = Sunday, 1 = Monday, etc.)
        const dayOfWeek = new Date(datetime).getDay();

        // Add the attended value (1 or 0) to the person's array at the day of the week index
        processedData[name][dayOfWeek] = attended ? 1 : 0;
    }

    // Convert the processed data into the format expected by Chart.js
    const labels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const datasets = Object.entries(processedData).map(([name, data]) => {
        return {
            label: name,
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        };
    });

    // Return the chart data object
    return {
        labels: labels,
        datasets: datasets
    };
}
