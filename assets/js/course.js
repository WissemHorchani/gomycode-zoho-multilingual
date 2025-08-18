/**
 * GOMYCODE Course Page Manager
 * Handles course information display and form submission
 * Uses jQuery 3.7.1 Slim
 */

// Course configuration
const COURSES = {
    'ux-ui-design': {
        title: 'UX & UI Design Course',
        subtitle: 'Become a User Interface and User Experience Designer'
    },
    'data-scientist': {
        title: 'Data Science Course',
        subtitle: 'Master data analysis and Machine Learning'
    },
    'software-developer': {
        title: 'Software Developer Bootcamp',
        subtitle: 'Become a professional Full-Stack Developer'
    },
    'cybersecurity': {
        title: 'Cybersecurity Course',
        subtitle: 'Protect systems and data'
    },
    'web-development': {
        title: 'Web Development',
        subtitle: 'Create modern and responsive websites'
    },
    'graphic-design': {
        title: 'Graphic Design',
        subtitle: 'Create professional visuals with Adobe'
    },
    'devops': {
        title: 'DevOps Bootcamp',
        subtitle: 'Master development and operations practices'
    },
    'machine-learning': {
        title: 'Machine Learning',
        subtitle: 'Build intelligent systems and algorithms'
    },
    'ai-introduction': {
        title: 'Introduction to AI',
        subtitle: 'Discover Artificial Intelligence fundamentals'
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
        e.preventDefault();
        
        // Basic validation
        const requiredFields = ['First Name', 'Last Name', 'Email', 'Phone', 'CONTACTCF12', 'CONTACTCF126'];
        const form = document.forms['WebToContacts6890678000085288001'];
        
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
        
        // Submit form using vanilla JavaScript (jQuery Slim doesn't include AJAX)
        const formData = new FormData(this);
        
        fetch('https://crm.zoho.com/crm/WebToContactForm', {
            method: 'POST',
            body: formData,
            cache: 'no-cache'
        })
        .then(response => {
            const splashdom = document.getElementById('wf_splash');
            const splashinfodom = document.getElementById('wf_splash_info');
            if (splashinfodom) {
                splashinfodom.innerText = 'Thank you for your application!';
            }
            if (splashdom) {
                splashdom.style.display = '';
                setTimeout(function() {
                    splashdom.style.display = 'none';
                }, 5000);
            }
            document.getElementById('webform6890678000085288001').reset();
        })
        .catch(error => {
            alert('An error occurred. Please try again.');
        });
    });
});