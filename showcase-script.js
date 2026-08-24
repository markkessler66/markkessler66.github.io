// PhyNetPy Showcase - Chart Configuration
//
// All data below is MEASURED, not illustrative. Sources:
//   Substitution models + MPL kernel A/B
//     -> scripts/portfolio_benchmarks.py and portfolio_benchmarks_kernel.py
//        PhyNetPy 0.6.0, Python 3.14.2, AMD Ryzen / Windows 11.
//        Median-of-repeats wall time; every optimized path is asserted to
//        agree numerically with its reference implementation.
//   PhyNetPy vs PhyloNet accuracy
//     -> paper_figures/defj_accuracy_table.tex (1160 vs 669 runs)
// Do not edit these numbers without re-running the harness.

document.addEventListener('DOMContentLoaded', function () {
    Chart.defaults.color = '#64748b';
    Chart.defaults.borderColor = '#e2e8f0';
    Chart.defaults.font.family = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

    const colors = {
        primary: 'rgba(37, 99, 235, 0.85)',
        primaryBorder: 'rgba(37, 99, 235, 1)',
        teal: 'rgba(6, 182, 212, 0.85)',
        tealBorder: 'rgba(6, 182, 212, 1)',
        green: 'rgba(16, 185, 129, 0.85)',
        greenBorder: 'rgba(16, 185, 129, 1)',
        gray: 'rgba(100, 116, 139, 0.55)',
        grayBorder: 'rgba(100, 116, 139, 1)',
        orange: 'rgba(245, 158, 11, 0.85)',
        orangeBorder: 'rgba(245, 158, 11, 1)'
    };

    const tooltipStyle = {
        backgroundColor: '#ffffff',
        titleColor: '#1e293b',
        bodyColor: '#64748b',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: true
    };

    const legendStyle = {
        display: true,
        position: 'top',
        labels: {
            padding: 18,
            usePointStyle: true,
            pointStyle: 'rectRounded',
            font: { size: 12, weight: '500' }
        }
    };

    function axisTitle(text) {
        return {
            display: true,
            text: text,
            font: { size: 12, weight: '500' },
            color: '#1e293b'
        };
    }

    // ------------------------------------------------------------------
    // 1. Substitution-model transition matrices: expt() vs scipy expm()
    // ------------------------------------------------------------------
    const substCtx = document.getElementById('substModelChart');
    if (substCtx) {
        const models = ['JC', 'F81', 'K81', 'K80', 'HKY', 'TN93', 'SYM', 'GTR'];
        const phynetpy = [1.59, 1.28, 1.39, 1.97, 2.04, 1.97, 2.53, 2.58];
        const scipy = [21.02, 24.98, 23.17, 22.59, 20.91, 23.67, 26.50, 22.10];

        new Chart(substCtx, {
            type: 'bar',
            data: {
                labels: models,
                datasets: [{
                    label: 'PhyNetPy expt()',
                    data: phynetpy,
                    backgroundColor: colors.primary,
                    borderColor: colors.primaryBorder,
                    borderWidth: 2,
                    borderRadius: 6,
                    borderSkipped: false
                }, {
                    label: 'scipy.linalg.expm(Q·t)',
                    data: scipy,
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
                    legend: legendStyle,
                    tooltip: Object.assign({}, tooltipStyle, {
                        callbacks: {
                            label: function (ctx) {
                                return `${ctx.dataset.label}: ${ctx.parsed.y.toFixed(2)} µs`;
                            },
                            afterBody: function (items) {
                                const i = items[0].dataIndex;
                                return `\nSpeedup: ${(scipy[i] / phynetpy[i]).toFixed(1)}×`;
                            }
                        }
                    })
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: '#e2e8f0' },
                        ticks: { padding: 8, font: { size: 11 } },
                        title: axisTitle('Time per call (µs) — lower is better')
                    },
                    x: {
                        grid: { display: false },
                        ticks: { padding: 8, font: { size: 11 } },
                        title: axisTitle('Substitution model')
                    }
                }
            }
        });
    }

    // ------------------------------------------------------------------
    // 2. Cython MPL DP kernel vs pure-Python reference (log scale)
    // ------------------------------------------------------------------
    const kernelCtx = document.getElementById('cythonKernelChart');
    if (kernelCtx) {
        const taxa = ['6', '8', '10', '12', '16', '20', '24'];
        const cython = [0.1371, 0.2937, 0.5789, 1.1166, 3.1266, 7.2230, 14.0067];
        const python = [0.5776, 1.9745, 4.6649, 9.5421, 28.0024, 63.4336, 128.6013];

        new Chart(kernelCtx, {
            type: 'line',
            data: {
                labels: taxa,
                datasets: [{
                    label: 'Cython kernel',
                    data: cython,
                    backgroundColor: colors.primary,
                    borderColor: colors.primaryBorder,
                    borderWidth: 3,
                    pointRadius: 4,
                    pointBackgroundColor: colors.primaryBorder,
                    tension: 0.25
                }, {
                    label: 'Pure-Python reference',
                    data: python,
                    backgroundColor: colors.gray,
                    borderColor: colors.grayBorder,
                    borderWidth: 3,
                    borderDash: [6, 4],
                    pointRadius: 4,
                    pointBackgroundColor: colors.grayBorder,
                    tension: 0.25
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: legendStyle,
                    tooltip: Object.assign({}, tooltipStyle, {
                        callbacks: {
                            label: function (ctx) {
                                return `${ctx.dataset.label}: ${ctx.parsed.y.toFixed(3)} ms`;
                            },
                            afterBody: function (items) {
                                const i = items[0].dataIndex;
                                return `\nSpeedup: ${(python[i] / cython[i]).toFixed(1)}×  (identical scores)`;
                            }
                        }
                    })
                },
                scales: {
                    y: {
                        type: 'logarithmic',
                        grid: { color: '#e2e8f0' },
                        ticks: {
                            padding: 8,
                            font: { size: 11 },
                            callback: function (v) {
                                const allowed = [0.1, 0.3, 1, 3, 10, 30, 100];
                                return allowed.includes(v) ? v + ' ms' : null;
                            }
                        },
                        title: axisTitle('Time per score, log scale — lower is better')
                    },
                    x: {
                        grid: { display: false },
                        ticks: { padding: 8, font: { size: 11 } },
                        title: axisTitle('Taxa in species network')
                    }
                }
            }
        });
    }

    // ------------------------------------------------------------------
    // 3. Topological accuracy vs PhyloNet (lower = better)
    // ------------------------------------------------------------------
    const accuracyCtx = document.getElementById('accuracyChart');
    if (accuracyCtx) {
        const scenarios = ['Scenario D', 'Scenario E', 'Scenario F', 'Scenario J'];
        const phynetpy = [4.59, 4.39, 4.21, 3.52];
        const phylonet = [8.39, 14.01, 17.84, null];

        new Chart(accuracyCtx, {
            type: 'bar',
            data: {
                labels: scenarios,
                datasets: [{
                    label: 'PhyNetPy (MP-Allop, simulated annealing)',
                    data: phynetpy,
                    backgroundColor: colors.primary,
                    borderColor: colors.primaryBorder,
                    borderWidth: 2,
                    borderRadius: 6,
                    borderSkipped: false
                }, {
                    label: 'PhyloNet (incumbent Java implementation)',
                    data: phylonet,
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
                    legend: legendStyle,
                    tooltip: Object.assign({}, tooltipStyle, {
                        callbacks: {
                            label: function (ctx) {
                                if (ctx.parsed.y === null) {
                                    return `${ctx.dataset.label}: did not complete`;
                                }
                                return `${ctx.dataset.label}: μ-distance ${ctx.parsed.y.toFixed(2)}`;
                            }
                        }
                    })
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: '#e2e8f0' },
                        ticks: { padding: 8, font: { size: 11 } },
                        title: axisTitle('μ-distance to true network — lower is better')
                    },
                    x: {
                        grid: { display: false },
                        ticks: { padding: 8, font: { size: 11 }, maxRotation: 0 },
                        title: axisTitle('Benchmark condition')
                    }
                }
            }
        });
    }

    // ------------------------------------------------------------------
    // Copy button feedback
    // ------------------------------------------------------------------
    const copyBtn = document.querySelector('.copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', function () {
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
