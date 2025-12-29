// PhyNetPy Showcase - Chart Configuration
// Dark theme with cyan/blue/purple accents

document.addEventListener('DOMContentLoaded', function() {
    // Chart.js global defaults for dark theme
    Chart.defaults.color = '#94a3b8';
    Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.08)';
    Chart.defaults.font.family = "'Outfit', -apple-system, sans-serif";

    // Color palette
    const colors = {
        cyan: 'rgba(0, 212, 170, 0.85)',
        cyanBorder: 'rgba(0, 212, 170, 1)',
        blue: 'rgba(59, 130, 246, 0.85)',
        blueBorder: 'rgba(59, 130, 246, 1)',
        purple: 'rgba(139, 92, 246, 0.85)',
        purpleBorder: 'rgba(139, 92, 246, 1)',
        gray: 'rgba(100, 116, 139, 0.7)',
        grayBorder: 'rgba(100, 116, 139, 1)',
        green: 'rgba(16, 185, 129, 0.85)',
        greenBorder: 'rgba(16, 185, 129, 1)'
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
                    backgroundColor: colors.cyan,
                    borderColor: colors.cyanBorder,
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
                        backgroundColor: '#1a2435',
                        titleColor: '#f1f5f9',
                        bodyColor: '#94a3b8',
                        borderColor: 'rgba(0, 212, 170, 0.3)',
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
                            color: 'rgba(255, 255, 255, 0.05)',
                            drawBorder: false
                        },
                        ticks: {
                            padding: 10,
                            font: { size: 11 }
                        },
                        title: {
                            display: true,
                            text: 'Compute Time (seconds)',
                            font: { size: 12, weight: '500' },
                            padding: { bottom: 10 }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            padding: 10,
                            font: { size: 11 }
                        },
                        title: {
                            display: true,
                            text: 'Network Size',
                            font: { size: 12, weight: '500' },
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
                    backgroundColor: colors.blue,
                    borderColor: colors.blueBorder,
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
                        backgroundColor: '#1a2435',
                        titleColor: '#f1f5f9',
                        bodyColor: '#94a3b8',
                        borderColor: 'rgba(0, 212, 170, 0.3)',
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
                            color: 'rgba(255, 255, 255, 0.05)',
                            drawBorder: false
                        },
                        ticks: {
                            padding: 10,
                            font: { size: 11 }
                        },
                        title: {
                            display: true,
                            text: 'Compute Time (seconds)',
                            font: { size: 12, weight: '500' },
                            padding: { bottom: 10 }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            padding: 10,
                            font: { size: 11 }
                        },
                        title: {
                            display: true,
                            text: 'Network Size',
                            font: { size: 12, weight: '500' },
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
            colors.cyan,
            colors.gray,
            colors.blue,
            colors.green,
            colors.gray
        ];

        const borderColors = [
            colors.cyanBorder,
            colors.grayBorder,
            colors.blueBorder,
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
                        backgroundColor: '#1a2435',
                        titleColor: '#f1f5f9',
                        bodyColor: '#94a3b8',
                        borderColor: 'rgba(0, 212, 170, 0.3)',
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
                            color: 'rgba(255, 255, 255, 0.05)',
                            drawBorder: false
                        },
                        ticks: {
                            padding: 10,
                            font: { size: 11 },
                            callback: function(value) {
                                return value.toFixed(2);
                            }
                        },
                        title: {
                            display: true,
                            text: 'Distance to Ground Truth (lower = better)',
                            font: { size: 12, weight: '500' },
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
                            maxRotation: 0,
                            autoSkip: false
                        }
                    }
                }
            }
        });
    }

    // Add smooth scroll behavior for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Observe all animated cards
    document.querySelectorAll('.module-card, .achievement-card').forEach(card => {
        card.style.animationPlayState = 'paused';
        observer.observe(card);
    });

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
            this.style.color = '#00d4aa';
            
            setTimeout(() => {
                this.innerHTML = originalHTML;
                this.style.color = '';
            }, 2000);
        });
    }
});
