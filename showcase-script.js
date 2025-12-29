// PhyNetPy Showcase - Chart Configuration
// Light theme matching main site

document.addEventListener('DOMContentLoaded', function() {
    // Chart.js global defaults for light theme
    Chart.defaults.color = '#64748b';
    Chart.defaults.borderColor = '#e2e8f0';
    Chart.defaults.font.family = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

    // Color palette for light theme
    const colors = {
        primary: 'rgba(37, 99, 235, 0.85)',
        primaryBorder: 'rgba(37, 99, 235, 1)',
        teal: 'rgba(6, 182, 212, 0.85)',
        tealBorder: 'rgba(6, 182, 212, 1)',
        green: 'rgba(16, 185, 129, 0.85)',
        greenBorder: 'rgba(16, 185, 129, 1)',
        gray: 'rgba(100, 116, 139, 0.6)',
        grayBorder: 'rgba(100, 116, 139, 1)',
        orange: 'rgba(245, 158, 11, 0.85)',
        orangeBorder: 'rgba(245, 158, 11, 1)'
    };

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
                    backgroundColor: colors.primary,
                    borderColor: colors.primaryBorder,
                    borderWidth: 2,
                    borderRadius: 6,
                    borderSkipped: false
                }, {
                    label: 'PhyloNet InferMpAllop',
                    data: [3.8, 14.2, 32.1],
                    backgroundColor: colors.gray,
                    borderColor: colors.grayBorder,
                    borderWidth: 2,
                    borderRadius: 6,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            pointStyle: 'rectRounded',
                            font: { size: 12, weight: '500' }
                        }
                    },
                    tooltip: {
                        backgroundColor: '#ffffff',
                        titleColor: '#1e293b',
                        bodyColor: '#64748b',
                        borderColor: '#e2e8f0',
                        borderWidth: 1,
                        padding: 12,
                        cornerRadius: 8,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.y}s`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#e2e8f0',
                            drawBorder: false
                        },
                        ticks: {
                            padding: 10,
                            font: { size: 11 },
                            color: '#64748b'
                        },
                        title: {
                            display: true,
                            text: 'Compute Time (seconds)',
                            font: { size: 12, weight: '500' },
                            color: '#1e293b',
                            padding: { bottom: 10 }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            padding: 10,
                            font: { size: 11 },
                            color: '#64748b'
                        },
                        title: {
                            display: true,
                            text: 'Network Size',
                            font: { size: 12, weight: '500' },
                            color: '#1e293b',
                            padding: { top: 10 }
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
                    label: 'PhyNetPy GPU',
                    data: [1.2, 3.5, 7.8],
                    backgroundColor: colors.green,
                    borderColor: colors.greenBorder,
                    borderWidth: 2,
                    borderRadius: 6,
                    borderSkipped: false
                }, {
                    label: 'PhyNetPy CPU',
                    data: [4.1, 12.3, 24.7],
                    backgroundColor: colors.teal,
                    borderColor: colors.tealBorder,
                    borderWidth: 2,
                    borderRadius: 6,
                    borderSkipped: false
                }, {
                    label: 'PhyloNet',
                    data: [5.2, 15.8, 31.4],
                    backgroundColor: colors.gray,
                    borderColor: colors.grayBorder,
                    borderWidth: 2,
                    borderRadius: 6,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            pointStyle: 'rectRounded',
                            font: { size: 12, weight: '500' }
                        }
                    },
                    tooltip: {
                        backgroundColor: '#ffffff',
                        titleColor: '#1e293b',
                        bodyColor: '#64748b',
                        borderColor: '#e2e8f0',
                        borderWidth: 1,
                        padding: 12,
                        cornerRadius: 8,
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.y}s`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#e2e8f0',
                            drawBorder: false
                        },
                        ticks: {
                            padding: 10,
                            font: { size: 11 },
                            color: '#64748b'
                        },
                        title: {
                            display: true,
                            text: 'Compute Time (seconds)',
                            font: { size: 12, weight: '500' },
                            color: '#1e293b',
                            padding: { bottom: 10 }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            padding: 10,
                            font: { size: 11 },
                            color: '#64748b'
                        },
                        title: {
                            display: true,
                            text: 'Network Size',
                            font: { size: 12, weight: '500' },
                            color: '#1e293b',
                            padding: { top: 10 }
                        }
                    }
                }
            }
        });
    }

    // Correctness Analysis Chart
    const correctnessCtx = document.getElementById('correctnessChart');
    if (correctnessCtx) {
        const boxplotStats = [
            {min: 0.09, q1: 0.10, median: 0.12, q3: 0.14, max: 0.17},
            {min: 0.13, q1: 0.15, median: 0.18, q3: 0.21, max: 0.26},
            {min: 0.11, q1: 0.12, median: 0.15, q3: 0.18, max: 0.21},
            {min: 0.10, q1: 0.11, median: 0.14, q3: 0.17, max: 0.19},
            {min: 0.13, q1: 0.16, median: 0.19, q3: 0.22, max: 0.28}
        ];

        const chartColors = [
            colors.primary,
            colors.gray,
            colors.teal,
            colors.green,
            colors.gray
        ];

        const borderColors = [
            colors.primaryBorder,
            colors.grayBorder,
            colors.tealBorder,
            colors.greenBorder,
            colors.grayBorder
        ];

        new Chart(correctnessCtx, {
            type: 'bar',
            data: {
                labels: [
                    'PhyNetPy InferMpAllop-2.0',
                    'PhyloNet InferMpAllop',
                    'PhyNetPy MCMC (CPU)',
                    'PhyNetPy MCMC (GPU)',
                    'PhyloNet MCMC'
                ],
                datasets: [{
                    label: 'Median Distance',
                    data: boxplotStats.map(s => s.median),
                    backgroundColor: chartColors,
                    borderColor: borderColors,
                    borderWidth: 2,
                    borderRadius: 6,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: '#ffffff',
                        titleColor: '#1e293b',
                        bodyColor: '#64748b',
                        borderColor: '#e2e8f0',
                        borderWidth: 1,
                        padding: 14,
                        cornerRadius: 8,
                        callbacks: {
                            title: function(context) {
                                return context[0].label;
                            },
                            label: function(context) {
                                const index = context.dataIndex;
                                const stats = boxplotStats[index];
                                return [
                                    `Median: ${stats.median.toFixed(2)}`,
                                    `Range: ${stats.min.toFixed(2)} - ${stats.max.toFixed(2)}`,
                                    `IQR: ${(stats.q3 - stats.q1).toFixed(2)}`
                                ];
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 0.3,
                        grid: {
                            color: '#e2e8f0',
                            drawBorder: false
                        },
                        ticks: {
                            padding: 10,
                            font: { size: 11 },
                            color: '#64748b',
                            callback: function(value) {
                                return value.toFixed(2);
                            }
                        },
                        title: {
                            display: true,
                            text: 'Distance to Ground Truth (lower = better)',
                            font: { size: 12, weight: '500' },
                            color: '#1e293b',
                            padding: { bottom: 10 }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            padding: 10,
                            font: { size: 10 },
                            color: '#64748b',
                            maxRotation: 0,
                            autoSkip: false
                        }
                    }
                }
            }
        });
    }

    // Copy button feedback
    const copyBtn = document.querySelector('.copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const originalHTML = this.innerHTML;
            this.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
            `;
            this.style.color = '#10b981';
            
            setTimeout(() => {
                this.innerHTML = originalHTML;
                this.style.color = '';
            }, 2000);
        });
    }
});
