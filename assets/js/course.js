/**
 * GOMYCODE Course Page Manager
 * Handles course information display and form submission
 * Uses jQuery 3.7.1 Slim
 */


// Course configuration
const COURSES = {
    'ux-ui-design': {
        title: 'UX & UI Design Course',
        subtitle: 'Become a User Interface and User Experience Designer',
        product: 'UX & UI Design'
    },
    'data-scientist': {
        title: 'Data Science Course',
        subtitle: 'Master data analysis and Machine Learning',
        product: 'Data Scientist Bootcamp'
    },
    'software-developer': {
        title: 'Software Developer Bootcamp',
        subtitle: 'Become a professional Full-Stack Developer',
        product: 'Software Developer Bootcamp'
    },
    'cybersecurity': {
        title: 'Cybersecurity Course',
        subtitle: 'Protect systems and data',
        product: 'Cyber Security Bootcamp: Certified CompTIA Security+ 701'
    },
    'web-development': {
        title: 'Web Development',
        subtitle: 'Create modern and responsive websites',
        product: 'Web Development Essentials'
    },
    'graphic-design': {
        title: 'Graphic Design',
        subtitle: 'Create professional visuals with Adobe',
        product: 'Graphic Design - Adobe Certified'
    },
    'devops': {
        title: 'DevOps Bootcamp',
        subtitle: 'Master development and operations practices',
        product: 'The DevOps Bootcamp'
    },
    'machine-learning': {
        title: 'Machine Learning',
        subtitle: 'Build intelligent systems and algorithms',
        product: 'Machine learning'
    },
    'ai-introduction': {
        title: 'Introduction to AI',
        subtitle: 'Discover Artificial Intelligence fundamentals',
        product: 'Introduction to Artificial Intelligence'
    }
};

// Country names for location display
const COUNTRY_NAMES = {
    'TN': 'Tunisia',
    'MA': 'Morocco',
    'DZ': 'Algeria',
    'SN': 'Senegal',
    'NG': 'Nigeria',
    'CI': 'Ivory Coast',
    'EG': 'Egypt',
    'KE': 'Kenya',
    'JO': 'Jordan'
};

// Parse URL to extract information
function parseURL() {
    const path = window.location.pathname;
    const parts = path.split('/').filter(p => p !== '');
    
    const urlInfo = {
        country: null,
        language: null,
        track: null
    };
    
    // Expected format: /country/language/courses/track/
    if (parts.length >= 4 && parts[2] === 'courses') {
        urlInfo.country = parts[0].toUpperCase();
        urlInfo.language = parts[1].toLowerCase();
        urlInfo.track = parts[3];
    }
    
    return urlInfo;
}

// Initialization
function init() {
    const urlInfo = parseURL();
    
    // Update course title if we have a track
    if (urlInfo.track && COURSES[urlInfo.track]) {
        document.getElementById('course-title').textContent = COURSES[urlInfo.track].title;
        document.getElementById('course-subtitle').textContent = COURSES[urlInfo.track].subtitle;
        document.title = COURSES[urlInfo.track].title + ' - GOMYCODE';
        
        // Set the product field in the form
        const productField = document.querySelector('input[name="CONTACTCF329"]');
        if (productField) {
            productField.value = COURSES[urlInfo.track].product;
        }
    }
    
    // Update location info
    if (urlInfo.country && COUNTRY_NAMES[urlInfo.country]) {
        document.getElementById('course-location').textContent = COUNTRY_NAMES[urlInfo.country];
    }
}

// Form submission handler
$(document).ready(function() {
    init();
    
    $('#webform6890678000085288001').submit(function(e) {
        console.log('=== FORM SUBMISSION STARTED ===');
        
        // Basic validation
        const requiredFields = ['First Name', 'Last Name', 'Email', 'Phone', 'CONTACTCF12', 'CONTACTCF126'];
        const form = document.forms['WebToContacts6890678000085288001'];
        
        console.log('Form data before submission:');
        const formData = new FormData(form);
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        
        for (let field of requiredFields) {
            const fieldObj = form[field];
            if (fieldObj && (!fieldObj.value || fieldObj.value === '-None-')) {
                alert(field + ' is required');
                fieldObj.focus();
                return false;
            }
        }
        
        // Email validation
        const emailField = form['Email'];
        if (emailField) {
            const emailVal = emailField.value;
            const atpos = emailVal.indexOf('@');
            const dotpos = emailVal.lastIndexOf('.');
            if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= emailVal.length) {
                alert('Please enter a valid email address.');
                emailField.focus();
                return false;
            }
        }
        
        e.preventDefault(); // Prevent redirect
        
        // Submit form in hidden iframe to avoid redirect
        const iframe = document.createElement('iframe');
        iframe.name = 'hidden_iframe';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        
        // Set form target to iframe
        this.target = 'hidden_iframe';
        this.action = 'https://crm.zoho.com/crm/WebToContactForm';
        this.method = 'POST';
        
        // Submit form
        console.log('Submitting to:', this.action);
        console.log('Target:', this.target);
        this.submit();
        
        console.log('Form submitted successfully to iframe');
        
        // Show success message immediately
        const splashdom = document.getElementById('wf_splash');
        const splashinfodom = document.getElementById('wf_splash_info');
        if (splashinfodom) {
            splashinfodom.innerText = 'Thank you for your application! Our team will contact you shortly.';
        }
        if (splashdom) {
            splashdom.style.display = '';
            setTimeout(function() {
                splashdom.style.display = 'none';
            }, 5000);
        }
        
        // Reset form after delay
        setTimeout(() => {
            // Clear all form fields manually
            const form = document.getElementById('webform6890678000085288001');
            const inputs = form.querySelectorAll('input[type="text"], input[type="email"], select');
            inputs.forEach(input => {
                if (input.type === 'select-one') {
                    input.selectedIndex = 0;
                } else if (input.name !== 'xnQsjsdp' && input.name !== 'xmIwtLD' && input.name !== 'actionType' && input.name !== 'returnURL' && input.name !== 'CONTACTCF329') {
                    input.value = '';
                }
            });
            // Remove iframe
            if (document.body.contains(iframe)) {
                document.body.removeChild(iframe);
            }
        }, 2000);
        
        return false;
    });
});