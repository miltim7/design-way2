// components/hero/hero.js

document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    let width, height;
    let particles = [];
    let shapes = [];
    let particleCount = 50;
    let isMobile = false;
    
    const style = getComputedStyle(document.documentElement);
    const accentColor = style.getPropertyValue('--color-accent').trim();
    const accentDark = style.getPropertyValue('--color-accent-dark').trim();
    const beigeColor = style.getPropertyValue('--color-beige').trim();

    function hexToRgb(hex) {
        hex = hex.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return { r, g, b };
    }

    function getAccentRgba(opacity = 1) {
        const rgb = hexToRgb(accentColor);
        return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
    }

    function getAccentDarkRgba(opacity = 1) {
        const rgb = hexToRgb(accentDark);
        return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
    }

    function getBeigeRgba(opacity = 1) {
        const rgb = hexToRgb(beigeColor);
        return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
    }

    function resize() {
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;

        width = rect.width;
        height = rect.height;

        canvas.width = width * dpr;
        canvas.height = height * dpr;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        isMobile = width <= 768;

        if (width < 480) {
            particleCount = 15;
        } else if (width < 768) {
            particleCount = 25;
        } else if (width < 1024) {
            particleCount = 35;
        } else {
            particleCount = 50;
        }

        initShapes();
    }

    function initShapes() {
        const baseScale = Math.min(width / 600, height / 600);
        const scale = Math.max(baseScale, 0.75);
        
        let mobileScale = 1;
        let positionAdjustmentX = 0;
        let positionAdjustmentY = 0;
        
        if (width < 500) {
            mobileScale = 0.55;
            positionAdjustmentX = 0;
            positionAdjustmentY = -0.1;
        } else if (width < 650) {
            mobileScale = 0.65;
            positionAdjustmentX = 0.05;
            positionAdjustmentY = -0.05;
        } else if (width < 768) {
            mobileScale = 0.75;
            positionAdjustmentX = 0.1;
            positionAdjustmentY = 0;
        }
        
        const finalScale = scale * mobileScale;

        shapes = [
            {
                type: 'circle',
                x: width * (0.7 - positionAdjustmentX),
                y: height * (0.35 + positionAdjustmentY),
                radius: 180 * finalScale,
                getColor() { return getAccentRgba(width < 500 ? 0.18 : 0.28); },
                rotation: 0,
                rotationSpeed: 0.002
            },
            {
                type: 'rect',
                x: width * (0.25 + positionAdjustmentX),
                y: height * (0.60 + positionAdjustmentY),
                width: 220 * finalScale,
                height: 220 * finalScale,
                getColor() { return getAccentDarkRgba(width < 500 ? 0.12 : 0.22); },
                rotation: 45,
                rotationSpeed: -0.001
            },
            {
                type: 'circle',
                x: width * 0.5,
                y: height * (0.50 + positionAdjustmentY),
                radius: 120 * finalScale,
                getColor() { return getAccentRgba(width < 500 ? 0.24 : 0.34); },
                rotation: 0,
                rotationSpeed: 0.003
            },
            {
                type: 'circle',
                x: width * (0.15 + positionAdjustmentX * 0.5),
                y: height * (0.25 + positionAdjustmentY),
                radius: 80 * finalScale,
                getColor() { return getBeigeRgba(width < 500 ? 0.25 : 0.45); },
                rotation: 0,
                rotationSpeed: 0.0025
            },
            {
                type: 'rect',
                x: width * (0.8 - positionAdjustmentX),
                y: height * (0.70 + positionAdjustmentY),
                width: 150 * finalScale,
                height: 150 * finalScale,
                getColor() { return getAccentRgba(width < 500 ? 0.14 : 0.24); },
                rotation: 30,
                rotationSpeed: 0.0015
            }
        ];

        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: (Math.random() * 4 + 2) * finalScale,
                getColor() { return getAccentRgba((width < 500 ? 0.2 : 0.3) + Math.random() * 0.3); },
                vx: (Math.random() - 0.5) * 0.6,
                vy: (Math.random() - 0.5) * 0.6
            });
        }
    }

    function drawShapes() {
        shapes.forEach(shape => {
            ctx.save();
            ctx.translate(shape.x, shape.y);
            ctx.rotate(shape.rotation);

            if (shape.type === 'circle') {
                ctx.beginPath();
                ctx.arc(0, 0, shape.radius, 0, Math.PI * 2);
                ctx.fillStyle = shape.getColor();
                ctx.fill();

                ctx.strokeStyle = width < 500 ? getAccentRgba(0.2) : getAccentRgba(0.35);
                ctx.lineWidth = 2 * Math.min(width / 600, 1);
                ctx.stroke();
            } else if (shape.type === 'rect') {
                ctx.fillStyle = shape.getColor();
                ctx.fillRect(-shape.width / 2, -shape.height / 2, shape.width, shape.height);

                ctx.strokeStyle = width < 500 ? getAccentRgba(0.15) : getAccentRgba(0.3);
                ctx.lineWidth = 2 * Math.min(width / 600, 1);
                ctx.strokeRect(-shape.width / 2, -shape.height / 2, shape.width, shape.height);
            }

            ctx.restore();

            shape.rotation += shape.rotationSpeed;
        });
    }

    function drawParticles() {
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.getColor();
            ctx.fill();

            if (!isMobile) {
                ctx.strokeStyle = getAccentRgba(0.5);
                ctx.lineWidth = 1;
                ctx.stroke();
            }

            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < 0 || particle.x > width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > height) particle.vy *= -1;
        });
    }

    function drawLines() {
        if (width < 768) return;

        ctx.strokeStyle = getAccentRgba(0.22);
        ctx.lineWidth = 1.5;

        const maxDistance = width < 1024 ? 120 : 180;

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.globalAlpha = 1 - distance / maxDistance;
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        drawShapes();
        drawParticles();
        drawLines();
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    resize();
    animate();

    const heroButtons = document.querySelectorAll('.hero__button');
    heroButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            button.appendChild(ripple);

            setTimeout(function() {
                ripple.remove();
            }, 600);
        });
    });
});