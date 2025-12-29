// PhyNetPy Showcase Page Script
// Initialize performance charts

document.addEventListener('DOMContentLoaded', function() {
    // InferMpAllop Performance Comparison Chart
    const inferMpAllopCtx = document.getElementById('inferMpAllopChart');
    if (inferMpAllopCtx) {
        new Chart(inferMpAllopCtx, {
            type: 'bar',
            data: {
                labels: ['5 taxa', '15 taxa', '25 taxa'],
                datasets: [{
                    label: 'PhyNetPy InferMpAllop-2.0',
                    data: [2.3, 8.7, 18.5],
                    backgroundColor: 'rgba(37, 99, 235, 0.8)',
                    borderColor: 'rgba(37, 99, 235, 1)',
                    borderWidth: 1
                }, {
                    label: 'PhyloNet InferMpAllop',
                    data: [3.8, 14.2, 32.1],
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
                            text: 'Compute Time (seconds)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Number of Taxa'
                        }
                    }
                }
            }
        });
    }

    // MCMC_BiMarkers Performance Comparison Chart
    const mcmcBiMarkersCtx = document.getElementById('mcmcBiMarkersChart');
    if (mcmcBiMarkersCtx) {
        new Chart(mcmcBiMarkersCtx, {
            type: 'bar',
            data: {
                labels: ['5 taxa', '15 taxa', '25 taxa'],
                datasets: [{
                    label: 'PhyNetPy MCMC_BiMarkers (GPU)',
                    data: [1.2, 3.5, 7.8],
                    backgroundColor: 'rgba(16, 185, 129, 0.8)',
                    borderColor: 'rgba(16, 185, 129, 1)',
                    borderWidth: 1
                }, {
                    label: 'PhyNetPy MCMC_BiMarkers (CPU)',
                    data: [4.1, 12.3, 24.7],
                    backgroundColor: 'rgba(37, 99, 235, 0.8)',
                    borderColor: 'rgba(37, 99, 235, 1)',
                    borderWidth: 1
                }, {
                    label: 'PhyloNet MCMC_BiMarkers',
                    data: [5.2, 15.8, 31.4],
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
                            text: 'Compute Time (seconds)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Number of Taxa'
                        }
                    }
                }
            }
        });
    }

    // Correctness Boxplot Chart
    // Showing median values with IQR ranges
    const correctnessCtx = document.getElementById('correctnessChart');
    if (correctnessCtx) {
        // Boxplot statistics: [min, q1, median, q3, max] for each method
        const boxplotStats = [
            {min: 0.09, q1: 0.10, median: 0.12, q3: 0.14, max: 0.17}, // PhyNetPy InferMpAllop-2.0
            {min: 0.13, q1: 0.15, median: 0.18, q3: 0.21, max: 0.26}, // PhyloNet InferMpAllop
            {min: 0.11, q1: 0.12, median: 0.15, q3: 0.18, max: 0.21}, // PhyNetPy MCMC_BiMarkers (CPU)
            {min: 0.10, q1: 0.11, median: 0.14, q3: 0.17, max: 0.19}, // PhyNetPy MCMC_BiMarkers (GPU)
            {min: 0.13, q1: 0.16, median: 0.19, q3: 0.22, max: 0.28}  // PhyloNet MCMC_BiMarkers
        ];

        new Chart(correctnessCtx, {
            type: 'bar',
            data: {
                labels: ['PhyNetPy\nInferMpAllop-2.0', 'PhyloNet\nInferMpAllop', 'PhyNetPy\nMCMC_BiMarkers\n(CPU)', 'PhyNetPy\nMCMC_BiMarkers\n(GPU)', 'PhyloNet\nMCMC_BiMarkers'],
                datasets: [{
                    label: 'Average Distance to Ground Truth',
                    data: boxplotStats.map(s => s.median),
                    backgroundColor: [
                        'rgba(37, 99, 235, 0.8)',
                        'rgba(100, 116, 139, 0.8)',
                        'rgba(37, 99, 235, 0.8)',
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(100, 116, 139, 0.8)'
                    ],
                    borderColor: [
                        'rgba(37, 99, 235, 1)',
                        'rgba(100, 116, 139, 1)',
                        'rgba(37, 99, 235, 1)',
                        'rgba(16, 185, 129, 1)',
                        'rgba(100, 116, 139, 1)'
                    ],
                    borderWidth: 2
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
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const index = context.dataIndex;
                                const stats = boxplotStats[index];
                                return `Median: ${stats.median.toFixed(2)}`;
                            },
                            afterBody: function(context) {
                                const index = context[0].dataIndex;
                                const stats = boxplotStats[index];
                                return [
                                    `Min: ${stats.min.toFixed(2)}`,
                                    `Q1: ${stats.q1.toFixed(2)}`,
                                    `Median: ${stats.median.toFixed(2)}`,
                                    `Q3: ${stats.q3.toFixed(2)}`,
                                    `Max: ${stats.max.toFixed(2)}`,
                                    `IQR: ${(stats.q3 - stats.q1).toFixed(2)}`
                                ];
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Distance to Ground Truth Network (Median)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Method'
                        }
                    }
                }
            }
        });
    }
});

