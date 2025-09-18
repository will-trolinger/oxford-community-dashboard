// Oxford, Mississippi Community Impact Dashboard - Scroll-Driven Interactions

// Chart.js Professional Defaults
Chart.defaults.font.family = 'Inter, system-ui, sans-serif';
Chart.defaults.font.size = 12;
Chart.defaults.color = '#64748b';
Chart.defaults.borderColor = '#e2e8f0';

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeScrollAnimations();
    initializeCharts();
    initializePeerMap();
});

// Intersection Observer for scroll-triggered animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Trigger chart animations when they come into view
                const chartCanvas = entry.target.querySelector('canvas');
                if (chartCanvas && !chartCanvas.dataset.animated) {
                    chartCanvas.dataset.animated = 'true';
                    animateChart(chartCanvas.id);
                }
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Counter animation for hero stats
    animateCounters();
}

// Counter animation for hero statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/,/g, ''));
    const duration = 2000;
    const start = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(target * easeOutCubic);

        element.textContent = current.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }

    requestAnimationFrame(updateCounter);
}

// Initialize all charts with scroll-triggered animations
function initializeCharts() {
    // Store chart configurations for later animation
    window.chartConfigs = {
        chronicDiseaseChart: createChronicDiseaseConfig(),
        dentalAccessChart: createDentalAccessConfig(),
        educationChart: createEducationConfig(),
        graduationChart: createGraduationConfig(),
        migrationChart: createMigrationConfig(),
        infrastructureChart: createInfrastructureConfig(),
        peerComparisonChart: createPeerComparisonConfig()
    };
}

// Animate specific chart when it comes into view
function animateChart(chartId) {
    const ctx = document.getElementById(chartId);
    if (!ctx || !window.chartConfigs[chartId]) return;

    const config = window.chartConfigs[chartId];

    // Add animation configuration
    config.options.animation = {
        duration: 1500,
        easing: 'easeOutCubic',
        delay: (context) => {
            return context.type === 'data' && context.mode === 'default'
                ? context.dataIndex * 100
                : 0;
        }
    };

    new Chart(ctx, config);
}

// Chart Configurations
function createChronicDiseaseConfig() {
    return {
        type: 'bar',
        data: {
            labels: ['Diabetes', 'Heart Disease', 'COPD', 'Cancer', 'Stroke'],
            datasets: [
                {
                    label: 'Oxford',
                    data: [8.2, 5.8, 4.1, 22.4, 3.2],
                    backgroundColor: '#3b82f6',
                    borderRadius: 4
                },
                {
                    label: 'Mississippi Average',
                    data: [11.1, 7.2, 5.9, 24.8, 4.1],
                    backgroundColor: '#e2e8f0',
                    borderRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: { size: 11, weight: '500' }
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: '#64748b', font: { size: 11 } }
                },
                y: {
                    beginAtZero: true,
                    grid: { color: '#f1f5f9' },
                    ticks: {
                        color: '#64748b',
                        font: { size: 11 },
                        callback: function(value) { return value + '%'; }
                    }
                }
            }
        }
    };
}

function createDentalAccessConfig() {
    return {
        type: 'line',
        data: {
            labels: ['2019', '2020', '2021', '2022', '2023'],
            datasets: [{
                label: 'Dental Care Access Rate',
                data: [68, 71, 73, 75, 78],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 8,
                pointBackgroundColor: '#10b981',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: '#64748b', font: { size: 11 } }
                },
                y: {
                    beginAtZero: false,
                    min: 60,
                    max: 85,
                    grid: { color: '#f1f5f9' },
                    ticks: {
                        color: '#64748b',
                        font: { size: 11 },
                        callback: function(value) { return value + '%'; }
                    }
                }
            }
        }
    };
}

function createEducationConfig() {
    return {
        type: 'radar',
        data: {
            labels: ['High School', 'Some College', 'Associates', 'Bachelors', 'Masters', 'Doctoral'],
            datasets: [
                {
                    label: 'Oxford',
                    data: [89, 45, 22, 35, 20, 8],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    pointBackgroundColor: '#3b82f6',
                    pointRadius: 4
                },
                {
                    label: 'National Average',
                    data: [85, 38, 18, 28, 15, 5],
                    borderColor: '#64748b',
                    backgroundColor: 'rgba(100, 116, 139, 0.1)',
                    pointBackgroundColor: '#64748b',
                    pointRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: { size: 11, weight: '500' }
                    }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    grid: { color: '#f1f5f9' },
                    pointLabels: {
                        color: '#64748b',
                        font: { size: 10 }
                    },
                    ticks: {
                        color: '#64748b',
                        font: { size: 9 },
                        stepSize: 20
                    }
                }
            }
        }
    };
}

function createGraduationConfig() {
    return {
        type: 'doughnut',
        data: {
            labels: ['High School', 'Community College', 'University', 'Graduate School'],
            datasets: [{
                data: [93, 78, 89, 85],
                backgroundColor: [
                    '#10b981',
                    '#3b82f6',
                    '#8b5cf6',
                    '#f59e0b'
                ],
                borderWidth: 3,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: { size: 11, weight: '500' },
                        boxWidth: 12,
                        boxHeight: 12
                    },
                    maxHeight: 100
                }
            },
            layout: {
                padding: {
                    bottom: 20
                }
            }
        }
    };
}

function createMigrationConfig() {
    return {
        type: 'line',
        data: {
            labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
            datasets: [
                {
                    label: 'Net Migration Rate',
                    data: [1.2, 1.8, 0.9, 2.1, 2.8, 2.3],
                    borderColor: '#8b5cf6',
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointBackgroundColor: '#8b5cf6',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    yAxisID: 'y'
                },
                {
                    label: 'Median Income Growth',
                    data: [2.1, 3.2, 1.8, 4.5, 5.2, 4.8],
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    fill: false,
                    tension: 0.4,
                    pointRadius: 5,
                    pointBackgroundColor: '#f59e0b',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: { size: 11, weight: '500' }
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: '#64748b', font: { size: 11 } }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    grid: { color: '#f1f5f9' },
                    ticks: {
                        color: '#64748b',
                        font: { size: 11 },
                        callback: function(value) { return value + '%'; }
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid: { drawOnChartArea: false },
                    ticks: {
                        color: '#64748b',
                        font: { size: 11 },
                        callback: function(value) { return value + '%'; }
                    }
                }
            }
        }
    };
}

function createInfrastructureConfig() {
    return {
        type: 'bar',
        data: {
            labels: ['Broadband Speed', 'Coverage %', 'Reliability', 'Affordability'],
            datasets: [{
                label: 'Infrastructure Quality Score',
                data: [78, 85, 72, 68],
                backgroundColor: [
                    '#10b981',
                    '#3b82f6',
                    '#f59e0b',
                    '#ef4444'
                ],
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: '#64748b', font: { size: 11 } }
                },
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: { color: '#f1f5f9' },
                    ticks: {
                        color: '#64748b',
                        font: { size: 11 },
                        callback: function(value) { return value; }
                    }
                }
            }
        }
    };
}

function createPeerComparisonConfig() {
    return {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Oxford',
                    data: [{x: 72, y: 89}],
                    backgroundColor: '#ef4444',
                    borderColor: '#ef4444',
                    pointRadius: 12,
                    pointHoverRadius: 15
                },
                {
                    label: 'Clemson Micro',
                    data: [{x: 68, y: 85}],
                    backgroundColor: '#3b82f6',
                    borderColor: '#3b82f6',
                    pointRadius: 8,
                    pointHoverRadius: 10
                },
                {
                    label: 'Boone Micro',
                    data: [{x: 75, y: 87}],
                    backgroundColor: '#10b981',
                    borderColor: '#10b981',
                    pointRadius: 8,
                    pointHoverRadius: 10
                },
                {
                    label: 'Starkville Micro',
                    data: [{x: 65, y: 82}],
                    backgroundColor: '#8b5cf6',
                    borderColor: '#8b5cf6',
                    pointRadius: 8,
                    pointHoverRadius: 10
                },
                {
                    label: 'Athens-Clarke Micro',
                    data: [{x: 82, y: 91}],
                    backgroundColor: '#f59e0b',
                    borderColor: '#f59e0b',
                    pointRadius: 8,
                    pointHoverRadius: 10
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: { size: 11, weight: '500' }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Health & Wellness Score',
                        color: '#64748b',
                        font: { size: 12, weight: '500' }
                    },
                    min: 60,
                    max: 90,
                    grid: { color: '#f1f5f9' },
                    ticks: { color: '#64748b', font: { size: 11 } }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Talent Pipeline Score',
                        color: '#64748b',
                        font: { size: 12, weight: '500' }
                    },
                    min: 75,
                    max: 95,
                    grid: { color: '#f1f5f9' },
                    ticks: { color: '#64748b', font: { size: 11 } }
                }
            }
        }
    };
}

// Add smooth scroll behavior for better UX
function smoothScrollTo(target) {
    target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Progress indicator for scroll progress (optional enhancement)
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0;
        height: 3px;
        background: linear-gradient(90deg, #3b82f6, #10b981);
        z-index: 1000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize scroll progress indicator
document.addEventListener('DOMContentLoaded', () => {
    createScrollProgress();
});

// Remove problematic parallax effect

// Add stagger animation to summary cards
function staggerSummaryCards() {
    const cards = document.querySelectorAll('.summary-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
}

document.addEventListener('DOMContentLoaded', staggerSummaryCards);

// Initialize Peer Micropolitan Map
function initializePeerMap() {
    // Micropolitan area coordinates (approximate centers)
    const micropolitanAreas = [
        {
            name: 'Oxford, MS',
            label: 'Oxford',
            lat: 34.3664,
            lng: -89.5192,
            health: 72,
            talent: 89,
            competitiveness: 67,
            color: '#ef4444',
            isOxford: true
        },
        {
            name: 'Clemson, SC Micro',
            label: 'Clemson Micro',
            lat: 34.6834,
            lng: -82.8374,
            health: 68,
            talent: 85,
            competitiveness: 71,
            color: '#3b82f6'
        },
        {
            name: 'Boone, NC Micro',
            label: 'Boone Micro',
            lat: 36.2168,
            lng: -81.6746,
            health: 75,
            talent: 87,
            competitiveness: 73,
            color: '#10b981'
        },
        {
            name: 'Starkville, MS Micro',
            label: 'Starkville Micro',
            lat: 33.4504,
            lng: -88.8184,
            health: 65,
            talent: 82,
            competitiveness: 69,
            color: '#8b5cf6'
        },
        {
            name: 'Athens-Clarke County, GA Micro',
            label: 'Athens Micro',
            lat: 33.9519,
            lng: -83.3576,
            health: 82,
            talent: 91,
            competitiveness: 78,
            color: '#f59e0b'
        }
    ];

    // Initialize map centered on the Southeast region
    const map = L.map('peerMap', {
        center: [33.5, -86.5],
        zoom: 6,
        zoomControl: true,
        scrollWheelZoom: false
    });

    // Add clean, professional tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 10,
        minZoom: 5
    }).addTo(map);

    // Add markers for each micropolitan area
    micropolitanAreas.forEach(area => {
        // Create custom marker
        const markerIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="
                background: white;
                border: 3px solid ${area.color};
                border-radius: 50%;
                width: ${area.isOxford ? '32px' : '24px'};
                height: ${area.isOxford ? '32px' : '24px'};
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: ${area.isOxford ? '700' : '600'};
                font-size: ${area.isOxford ? '14px' : '12px'};
                color: ${area.color};
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            ">${area.isOxford ? 'OX' : area.label.substring(0, 2).toUpperCase()}</div>`,
            iconSize: [area.isOxford ? 32 : 24, area.isOxford ? 32 : 24],
            iconAnchor: [area.isOxford ? 16 : 12, area.isOxford ? 16 : 12]
        });

        // Create marker
        const marker = L.marker([area.lat, area.lng], { icon: markerIcon }).addTo(map);

        // Create popup content
        const popupContent = `
            <div style="min-width: 200px;">
                <h4 style="margin: 0 0 12px 0; color: #1a1a1a; font-size: 16px; font-weight: 600;">${area.name}</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 13px;">
                    <div>
                        <span style="color: #64748b;">Health & Wellness:</span>
                        <strong style="color: ${area.color};">${area.health}</strong>
                    </div>
                    <div>
                        <span style="color: #64748b;">Talent Pipeline:</span>
                        <strong style="color: ${area.color};">${area.talent}</strong>
                    </div>
                    <div style="grid-column: span 2;">
                        <span style="color: #64748b;">Competitiveness:</span>
                        <strong style="color: ${area.color};">${area.competitiveness}</strong>
                    </div>
                </div>
                ${area.isOxford ? '<div style="margin-top: 8px; padding: 4px 8px; background: #fef3f2; color: #dc2626; border-radius: 4px; font-size: 12px; font-weight: 500;">Primary Focus Area</div>' : ''}
            </div>
        `;

        marker.bindPopup(popupContent);
    });

    // Add map legend
    const legend = L.control({ position: 'bottomright' });
    legend.onAdd = function(map) {
        const div = L.DomUtil.create('div', 'legend');
        div.style.cssText = `
            background: white;
            padding: 12px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            font-size: 12px;
            line-height: 1.4;
        `;
        div.innerHTML = `
            <div style="font-weight: 600; margin-bottom: 8px; color: #1a1a1a;">Micropolitan Areas</div>
            <div style="display: flex; align-items: center; margin-bottom: 4px;">
                <div style="width: 16px; height: 16px; background: #ef4444; border-radius: 50%; margin-right: 8px;"></div>
                <span style="color: #64748b;">Oxford (Primary)</span>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 4px;">
                <div style="width: 12px; height: 12px; background: #64748b; border-radius: 50%; margin-right: 8px;"></div>
                <span style="color: #64748b;">Peer Micros</span>
            </div>
        `;
        return div;
    };
    legend.addTo(map);
}