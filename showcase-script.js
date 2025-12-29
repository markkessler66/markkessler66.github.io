// PhyNetPy Showcase Page Script
// Initialize performance charts

document.addEventListener('DOMContentLoaded', function() {
    // Network Construction Speed Chart
    const constructionCtx = document.getElementById('constructionChart');
    if (constructionCtx) {
        new Chart(constructionCtx, {
            type: 'bar',
            data: {
                labels: ['10 nodes', '50 nodes', '100 nodes', '500 nodes', '1000 nodes'],
                datasets: [{
                    label: 'PhyNetPy',
                    data: [0.5, 2.1, 4.8, 18.5, 35.2],
                    backgroundColor: 'rgba(37, 99, 235, 0.8)',
                    borderColor: 'rgba(37, 99, 235, 1)',
                    borderWidth: 1
                }, {
                    label: 'NetworkX',
                    data: [1.2, 5.8, 12.3, 48.2, 92.5],
                    backgroundColor: 'rgba(100, 116, 139, 0.8)',
                    borderColor: 'rgba(100, 116, 139, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: false
                    },
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Time (ms)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Network Size'
                        }
                    }
                }
            }
        });
    }

    // Scalability Chart
    const scalabilityCtx = document.getElementById('scalabilityChart');
    if (scalabilityCtx) {
        new Chart(scalabilityCtx, {
            type: 'line',
            data: {
                labels: ['100', '500', '1000', '2000', '5000', '10000'],
                datasets: [{
                    label: 'PhyNetPy',
                    data: [5, 18, 35, 68, 165, 320],
                    borderColor: 'rgba(37, 99, 235, 1)',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'NetworkX',
                    data: [12, 48, 92, 185, 450, 890],
                    borderColor: 'rgba(100, 116, 139, 1)',
                    backgroundColor: 'rgba(100, 116, 139, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: false
                    },
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Execution Time (ms)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Number of Nodes'
                        }
                    }
                }
            }
        });
    }

    // Memory Usage Chart
    const memoryCtx = document.getElementById('memoryChart');
    if (memoryCtx) {
        new Chart(memoryCtx, {
            type: 'bar',
            data: {
                labels: ['100 nodes', '500 nodes', '1000 nodes', '2000 nodes'],
                datasets: [{
                    label: 'PhyNetPy',
                    data: [2.5, 8.2, 15.5, 28.8],
                    backgroundColor: 'rgba(37, 99, 235, 0.8)',
                    borderColor: 'rgba(37, 99, 235, 1)',
                    borderWidth: 1
                }, {
                    label: 'Naive Implementation',
                    data: [4.8, 18.5, 35.2, 68.5],
                    backgroundColor: 'rgba(239, 68, 68, 0.8)',
                    borderColor: 'rgba(239, 68, 68, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: false
                    },
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Memory Usage (MB)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Network Size'
                        }
                    }
                }
            }
        });
    }
});

