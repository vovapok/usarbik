// ──────────────────────────────────────────────
// Linux vs Windows vs Mac OS — Interactions
// ──────────────────────────────────────────────

// ── Mobile Menu Toggle ──

const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

if (menuToggle && menu) {
	menuToggle.addEventListener('click', () => {
		const isOpen = menu.classList.toggle('open');
		menuToggle.classList.toggle('open', isOpen);
		menuToggle.setAttribute('aria-expanded', String(isOpen));
	});

	// Close menu when a link is clicked (mobile navigation)
	menu.querySelectorAll('a').forEach((link) => {
		link.addEventListener('click', () => {
			menu.classList.remove('open');
			menuToggle.classList.remove('open');
			menuToggle.setAttribute('aria-expanded', 'false');
		});
	});
}

// ── Falling Background (🐧 🪟 🍎) ──

const FALLING_ICONS = ['🐧', '🪟', '🍎'];
const FALLING_COUNT = 14;

function createFallingBackground() {
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	const container = document.createElement('div');
	container.className = 'falling';
	container.setAttribute('aria-hidden', 'true');

	for (let i = 0; i < FALLING_COUNT; i++) {
		const span = document.createElement('span');
		span.textContent = FALLING_ICONS[i % FALLING_ICONS.length];
		span.style.left = `${(i / FALLING_COUNT) * 100 + Math.random() * 4}%`;
		span.style.fontSize = `${1 + Math.random() * 1.2}rem`;
		span.style.animationDuration = `${10 + Math.random() * 8}s`;
		span.style.animationDelay = `${Math.random() * 10}s`;
		container.appendChild(span);
	}

	document.body.prepend(container);
}

createFallingBackground();

// ── Chart Animation (bars grow when visible) ──

function animateCharts() {
	const charts = document.querySelectorAll('.chart');

	if (!charts.length) return;

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;

				entry.target.querySelectorAll('.chart-bar').forEach((bar) => {
					bar.style.width = bar.dataset.value + '%';
				});

				observer.unobserve(entry.target);
			});
		},
		{ threshold: 0.3 }
	);

	charts.forEach((chart) => observer.observe(chart));
}

animateCharts();