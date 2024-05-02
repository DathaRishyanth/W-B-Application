document.addEventListener("DOMContentLoaded", function() {
   
    async function fetchData() {
        try {
            const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&month=2009-01&outputsize=full&apikey=demo`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    
    
       
        async function prepareChartData() {
            const data = await fetchData();
            const timeSeriesData = data["Time Series (5min)"];
            const labels = Object.keys(timeSeriesData).reverse();
            const openingPrices = labels.map(label => parseFloat(timeSeriesData[label]["1. open"]));
            const closingPrices = labels.map(label => parseFloat(timeSeriesData[label]["4. close"]));
            return { labels, openingPrices, closingPrices };
        }
    
    async function displayChart() {
        const chartData = await prepareChartData();
        const ctx = document.getElementById("stockChart").getContext("2d");
        
     
    
        const stockChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: chartData.labels,
                datasets: [
                    {
                        label: "Opening Price",
                        data: chartData.openingPrices,
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 1,
                        fill: false
                    },
                    {
                        label: "Closing Price",
                        data: chartData.closingPrices,
                        borderColor: "rgba(54, 162, 235, 1)",
                        borderWidth: 1,
                        fill: false
                    }
                ]
            },
            options: {
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: "Time"
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: "Price (USD)"
                        },
                        ticks: {
                            precision: 2, 
                            stepSize: 0.01 
                        }
                    }
                },
                plugins: {
                    annotation: {
                        annotations: [
                            {
                                type: 'line',
                                mode: 'horizontal',
                                scaleID: 'y',
                                value: highestValue,
                                borderColor: 'green',
                                borderWidth: 2,
                                label: {
                                    enabled: true,
                                    content: `Highest: ${highestValue.toFixed(2)}`
                                }
                            },
                            {
                                type: 'line',
                                mode: 'horizontal',
                                scaleID: 'y',
                                value: lowestValue,
                                borderColor: 'red',
                                borderWidth: 2,
                                label: {
                                    enabled: true,
                                    content: `Lowest: ${lowestValue.toFixed(2)}`
                                }
                            }
                        ]
                    }
                }
            }
        });
    }
    
    
    async function displayChart() {
        const chartData = await prepareChartData();
        const ctx = document.getElementById("stockChart").getContext("2d");
        const stockChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: chartData.labels,
                datasets: [
                    {
                        label: "Opening Price",
                        data: chartData.openingPrices,
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 1,
                        fill: false
                    },
                    {
                        label: "Closing Price",
                        data: chartData.closingPrices,
                        borderColor: "rgba(54, 162, 235, 1)",
                        borderWidth: 1,
                        fill: false
                    }
                ]
            },
            options: {
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: "Time"
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: "Price (USD)"
                        },
                        ticks: {
                            precision: 2,
                            stepSize: 0.01 
                        }
                    }
                },
                plugins: {
                    zoom: {
                        zoom: {
                            wheel: {
                                enabled: true,
                                modifierKey: 'ctrl',
                                speed: 0.05
                            },
                            mode: 'xy'
                        },
                        pan: {
                            enabled: true,
                            mode: 'xy'
                        },
                        limits: {
                            y: {
                                minDelay: 0,
                                maxDelay: 10000,
                                minDuration: 1000,
                                maxDuration: 100000
                            }
                        },
                        onZoomComplete: (chart) => {
                            const yAxis = chart.scales.y;
                            const newPrecision = calculatePrecision(yAxis);
                            yAxis.options.ticks.precision = newPrecision;
                            chart.update();
                        }
                    }
                }
            }
        });
    
   
        function calculatePrecision(yAxis) {
            const tickInterval = Math.abs(yAxis.max - yAxis.min) / 10; 
            const precision = Math.max(0, Math.floor(Math.log10(tickInterval))); 
            return precision;
        }
    }
    
    
    
    
        displayChart();
    });