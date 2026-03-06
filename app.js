// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('Service Worker registrado:', registration);
            })
            .catch(error => {
                console.log('Error al registrar Service Worker:', error);
            });
    });
}

// PWA Install Prompt
let deferredPrompt;
const installPrompt = document.getElementById('installPrompt');
const installBtn = document.getElementById('installBtn');
const dismissBtn = document.getElementById('dismissBtn');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Show install prompt after 3 seconds
    setTimeout(() => {
        installPrompt.style.display = 'block';
    }, 3000);
});

if (installBtn) {
    installBtn.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`User response: ${outcome}`);
            deferredPrompt = null;
            installPrompt.style.display = 'none';
        }
    });
}

if (dismissBtn) {
    dismissBtn.addEventListener('click', () => {
        installPrompt.style.display = 'none';
    });
}

// Navigation
const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetSection = button.dataset.section;
        
        // Remove active class from all buttons and sections
        navButtons.forEach(btn => btn.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));
        
        // Add active class to clicked button and target section
        button.classList.add('active');
        document.getElementById(targetSection).classList.add('active');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Quick action buttons
const quoteActionBtns = document.querySelectorAll('[data-action="quote"]');
quoteActionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Navigate to quote section
        navButtons.forEach(navBtn => navBtn.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));
        
        document.querySelector('[data-section="quote"]').classList.add('active');
        document.getElementById('quote').classList.add('active');
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Service card buttons
const serviceButtons = document.querySelectorAll('.service-btn');
serviceButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const service = btn.dataset.quote;
        
        // Navigate to quote section
        navButtons.forEach(navBtn => navBtn.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));
        
        document.querySelector('[data-section="quote"]').classList.add('active');
        document.getElementById('quote').classList.add('active');
        
        // Pre-select the service
        const serviceSelect = document.getElementById('service');
        serviceSelect.value = service;
        
        // Trigger change event to show relevant fields
        serviceSelect.dispatchEvent(new Event('change'));
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Form Logic
const serviceSelect = document.getElementById('service');
const otherServiceDetail = document.getElementById('otherServiceDetail');
const septicTankDetails = document.getElementById('septicTankDetails');
const quoteForm = document.getElementById('quoteForm');

// Service selection handler
serviceSelect.addEventListener('change', (e) => {
    const selectedService = e.target.value;
    
    // Hide all conditional sections
    otherServiceDetail.style.display = 'none';
    septicTankDetails.style.display = 'none';
    
    // Clear other service description
    document.getElementById('otherServiceDescription').value = '';
    
    // Reset septic tank fields
    document.querySelectorAll('input[name="tankSpecType"]').forEach(radio => {
        radio.checked = false;
    });
    document.querySelectorAll('input[name="tankLocation"]').forEach(radio => {
        radio.checked = false;
    });
    document.getElementById('numAlcantarillas').value = '';
    document.getElementById('tankDimensions').value = '';
    document.getElementById('tankCapacity').value = '';
    document.getElementById('tankAlcantarillas').style.display = 'none';
    document.getElementById('tankMedidas').style.display = 'none';
    document.getElementById('tankCapacidad').style.display = 'none';
    
    // Show relevant sections
    if (selectedService === 'otros') {
        otherServiceDetail.style.display = 'block';
        document.getElementById('otherServiceDescription').required = true;
    } else {
        document.getElementById('otherServiceDescription').required = false;
    }
    
    if (selectedService === 'tanque-septico') {
        septicTankDetails.style.display = 'block';
    }
});

// Septic tank specification type handler
const tankSpecRadios = document.querySelectorAll('input[name="tankSpecType"]');
tankSpecRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        const specType = e.target.value;
        
        // Hide all tank spec inputs
        document.getElementById('tankAlcantarillas').style.display = 'none';
        document.getElementById('tankMedidas').style.display = 'none';
        document.getElementById('tankCapacidad').style.display = 'none';
        
        // Clear all inputs
        document.getElementById('numAlcantarillas').value = '';
        document.getElementById('tankDimensions').value = '';
        document.getElementById('tankCapacity').value = '';
        
        // Show relevant input
        if (specType === 'alcantarillas') {
            document.getElementById('tankAlcantarillas').style.display = 'block';
        } else if (specType === 'medidas') {
            document.getElementById('tankMedidas').style.display = 'block';
        } else if (specType === 'capacidad') {
            document.getElementById('tankCapacidad').style.display = 'block';
        }
    });
});

// Form submission handler
quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const service = serviceSelect.options[serviceSelect.selectedIndex].text;
    const fullName = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const description = document.getElementById('description').value.trim();
    
    // Build WhatsApp message
    let message = `*SOLICITUD DE COTIZACIÓN*\n\n`;
    message += `📋 *Servicio:* ${service}\n\n`;
    
    // Add other service detail if applicable
    if (serviceSelect.value === 'otros') {
        const otherDescription = document.getElementById('otherServiceDescription').value.trim();
        if (otherDescription) {
            message += `📝 *Detalle del Servicio:*\n${otherDescription}\n\n`;
        }
    }
    
    // Add septic tank details if applicable
    if (serviceSelect.value === 'tanque-septico') {
        message += `🚛 *DETALLES DEL TANQUE SÉPTICO:*\n`;
        
        // Tank specifications
        const tankSpecType = document.querySelector('input[name="tankSpecType"]:checked');
        if (tankSpecType) {
            if (tankSpecType.value === 'alcantarillas') {
                const numAlcantarillas = document.getElementById('numAlcantarillas').value.trim();
                if (numAlcantarillas) {
                    message += `• Número de alcantarillas: ${numAlcantarillas}\n`;
                }
            } else if (tankSpecType.value === 'medidas') {
                const tankDimensions = document.getElementById('tankDimensions').value.trim();
                if (tankDimensions) {
                    message += `• Medidas: ${tankDimensions}\n`;
                }
            } else if (tankSpecType.value === 'capacidad') {
                const tankCapacity = document.getElementById('tankCapacity').value.trim();
                if (tankCapacity) {
                    message += `• Capacidad: ${tankCapacity}\n`;
                }
            }
        }
        
        // Tank location
        const tankLocation = document.querySelector('input[name="tankLocation"]:checked');
        if (tankLocation) {
            const locationText = tankLocation.value === 'frente' ? 'Al frente de la casa' : 'En la parte trasera';
            message += `• Ubicación: ${locationText}\n`;
        }
        
        message += `\n⚠️ *Nota:* Se requiere conexión a toma de agua\n\n`;
    }
    
    // Add personal information
    message += `👤 *INFORMACIÓN DE CONTACTO:*\n`;
    message += `• Nombre: ${fullName}\n`;
    message += `• Teléfono: ${phone}\n`;
    message += `• Dirección: ${address}\n\n`;
    
    // Add description
    message += `📄 *DESCRIPCIÓN:*\n${description}\n\n`;
    
    message += `---\n_Enviado desde Destaqueos 24 Horas PWA_`;
    
    // Encode message for WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/50686504644?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Show success feedback
    showSuccessMessage();
    
    // Reset form
    setTimeout(() => {
        quoteForm.reset();
        otherServiceDetail.style.display = 'none';
        septicTankDetails.style.display = 'none';
    }, 1000);
});

// Success message
function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
        color: white;
        padding: 2rem 3rem;
        border-radius: 1rem;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        z-index: 9999;
        text-align: center;
        font-weight: 700;
        font-size: 1.2rem;
        animation: popIn 0.3s ease-out;
    `;
    successDiv.innerHTML = `
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="margin-bottom: 1rem;">
            <path d="M20 6L9 17l-5-5"/>
        </svg>
        <div>¡Solicitud Enviada!</div>
        <div style="font-size: 0.9rem; font-weight: 400; margin-top: 0.5rem; opacity: 0.9;">
            Te contactaremos pronto
        </div>
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.animation = 'popOut 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(successDiv);
        }, 300);
    }, 2500);
}

// Add animations to document
const style = document.createElement('style');
style.textContent = `
    @keyframes popIn {
        from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
    
    @keyframes popOut {
        from {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Add active state persistence
window.addEventListener('load', () => {
    const savedSection = sessionStorage.getItem('activeSection');
    if (savedSection) {
        navButtons.forEach(btn => btn.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));
        
        document.querySelector(`[data-section="${savedSection}"]`)?.classList.add('active');
        document.getElementById(savedSection)?.classList.add('active');
    }
});

// Save active section
navButtons.forEach(button => {
    button.addEventListener('click', () => {
        sessionStorage.setItem('activeSection', button.dataset.section);
    });
});

console.log('Destaqueos 24 Horas PWA inicializada correctamente ✓');
