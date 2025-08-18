/**
 * Smart Filter - Works directly with page URL without iframe parameters
 * Detects country and language from URL path: /[country]/[language]/courses/[track]/
 */

(function() {
    'use strict';

    // Form translations
    const TRANSLATIONS = {
        'en': {
            formTitle: 'Contact Form - Course Registration',
            firstName: 'First Name',
            lastName: 'Last Name',
            email: 'Email',
            phone: 'Phone',
            hearAbout: 'How did you hear about GOMYCODE?',
            hackerspaces: 'Hackerspaces',
            submit: 'Submit',
            reset: 'Reset'
        },
        'fr': {
            formTitle: 'Formulaire de Contact - Inscription aux Cours',
            firstName: 'Prénom',
            lastName: 'Nom',
            email: 'Email',
            phone: 'Téléphone',
            hearAbout: 'Comment avez-vous entendu parler de GOMYCODE?',
            hackerspaces: 'Hackerspaces',
            submit: 'Envoyer',
            reset: 'Réinitialiser'
        }
    };

    // Hackerspaces by country
    const HACKERSPACES_BY_COUNTRY = {
        'TN': [
            'Tunis Lac Hackerspace',
            'Sousse Hackerspace',
            'El Menzah Hackerspace',
            'Nabeul Hackerspace',
            'Tunis Downtown Hackerspace',
            'Gabes Hackerspace',
            'Tunis El Mourouj Hackerspace',
            'Tunis Bardo Hackerspace',
            'Tunis Boumhel Hackerspace',
            'Tataouine Hackerspace',
            'Kairouan Hackerspace',
            'Tozeur Hackerspace',
            'Tunisia Online Hackerspace'
        ],
        'MA': [
            'Casablanca Hackerspace',
            'Marrakech Hackerspace',
            'Morocco Online Hackerspace'
        ],
        'DZ': [
            'Algiers Hackerspace',
            'Bab Ezzouar Hackerspace',
            'Algiers Online Hackerspace'
        ],
        'SN': [
            'Point E Hackerspace',
            'Yoff Hackerspace',
            'Senegal Online Hackerspace'
        ],
        'NG': [
            'Yaba Hackerspace',
            'Ikeja HackerSpace',
            'Abuja Hackerspace',
            'Nigeria Online Hackerspace'
        ],
        'CI': [
            'Marcory Zone 4',
            'Riviera Hackerspace',
            'Ivory Coast Online Hackerspace'
        ],
        'EG': [
            'Egypt Online Hackerspace'
        ],
        'KE': [
            'Nairobi Hackerspace',
            'Kenya Online Hackerspace'
        ],
        'JO': [
            'Amman Hackerspace',
            'Jordan Online Hackerspace'
        ]
    };

    /**
     * Parse URL to extract country, language and track
     */
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

    /**
     * Translate form based on language
     */
    function translateForm(language) {
        const translations = TRANSLATIONS[language] || TRANSLATIONS['en'];
        
        // Form title
        const formTitle = document.querySelector('.zcwf_title');
        if (formTitle) {
            formTitle.textContent = translations.formTitle;
        }
        
        // Field labels
        const labelMappings = {
            'First_Name': translations.firstName,
            'Last_Name': translations.lastName,
            'Email': translations.email,
            'Phone': translations.phone,
            'CONTACTCF12': translations.hearAbout,
            'CONTACTCF126': translations.hackerspaces
        };
        
        Object.keys(labelMappings).forEach(fieldId => {
            const label = document.querySelector(`label[for="${fieldId}"]`);
            if (label) {
                const hasRequired = label.innerHTML.includes('<span style');
                label.innerHTML = labelMappings[fieldId];
                if (hasRequired) {
                    label.innerHTML += ' <span style="color:red;">*</span>';
                }
            }
        });
        
        // Buttons
        const submitButton = document.querySelector('#formsubmit');
        if (submitButton) {
            submitButton.value = translations.submit;
        }
        
        const resetButton = document.querySelector('input[name="reset"]');
        if (resetButton) {
            resetButton.value = translations.reset;
        }
        
    }

    /**
     * Filter hackerspaces by country
     */
    function filterHackerspaces(country) {
        const selectElement = document.getElementById('CONTACTCF126');
        if (!selectElement) {
            return;
        }
        
        // Save original options if not already saved
        if (!window.originalHackerspaceOptions) {
            window.originalHackerspaceOptions = Array.from(selectElement.options).map(opt => ({
                value: opt.value,
                text: opt.text
            }));
        }

        // Get allowed hackerspaces for country
        const allowedHackerspaces = HACKERSPACES_BY_COUNTRY[country] || [];
        
        if (allowedHackerspaces.length === 0) {
            return;
        }

        // Filter options
        const filteredOptions = window.originalHackerspaceOptions.filter(opt => {
            if (opt.value === '-None-') return true;
            return allowedHackerspaces.some(h => 
                opt.value.includes(h) || opt.text.includes(h)
            );
        });

        // Replace options
        selectElement.innerHTML = '';
        filteredOptions.forEach(opt => {
            const option = new Option(opt.text, opt.value);
            selectElement.add(option);
        });

        
        // Show visual indicator
        showIndicator(country);
    }

    /**
     * Show country indicator
     */
    function showIndicator(country) {
        const countryNames = {
            'TN': '🇹🇳 Tunisia',
            'MA': '🇲🇦 Morocco',
            'DZ': '🇩🇿 Algeria',
            'SN': '🇸🇳 Senegal',
            'NG': '🇳🇬 Nigeria',
            'CI': '🇨🇮 Ivory Coast',
            'EG': '🇪🇬 Egypt',
            'KE': '🇰🇪 Kenya',
            'JO': '🇯🇴 Jordan'
        };

        const old = document.getElementById('country-indicator');
        if (old) old.remove();

        const indicator = document.createElement('div');
        indicator.id = 'country-indicator';
        indicator.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #28a745, #20c997);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            font-size: 16px;
            font-weight: bold;
            z-index: 10000;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        `;
        
        indicator.innerHTML = `${countryNames[country] || country} detected`;
        document.body.appendChild(indicator);
        
        setTimeout(() => {
            indicator.style.opacity = '0';
            indicator.style.transition = 'opacity 0.5s';
            setTimeout(() => indicator.remove(), 500);
        }, 3000);
    }

    /**
     * Initialize when DOM is ready
     */
    function init() {
        
        // Parse URL to get country and language
        const urlInfo = parseURL();
        
        if (!urlInfo.country || !urlInfo.language) {
            return;
        }
        
        // Wait for form to be ready
        let attempts = 0;
        const maxAttempts = 50;
        
        const checkForm = setInterval(function() {
            attempts++;
            
            const form = document.forms['WebToContacts6890678000085288001'];
            const selectElement = document.getElementById('CONTACTCF126');
            
            if (form && selectElement) {
                clearInterval(checkForm);
                
                // Apply language translation
                translateForm(urlInfo.language);
                
                // Wait for all options to load, then filter
                setTimeout(() => {
                    if (selectElement.options.length > 10) {
                        filterHackerspaces(urlInfo.country);
                    }
                }, 500);
                
            } else if (attempts >= maxAttempts) {
                clearInterval(checkForm);
            }
        }, 200);
    }

    // Public API for testing
    window.SmartFilter = {
        parseURL: parseURL,
        translateForm: translateForm,
        filterHackerspaces: filterHackerspaces,
        test: function() {
            const info = parseURL();
            console.log('URL Info:', info);
            if (info.language) translateForm(info.language);
            if (info.country) filterHackerspaces(info.country);
        }
    };

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();