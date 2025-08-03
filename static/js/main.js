
        // --- ENHANCED JAVASCRIPT ---

        // THEME TOGGLE FUNCTIONALITY (Moved to global scope)
        function updateThemeIcon(theme) {
            const themeIcon = document.getElementById('themeIcon');
            if (themeIcon) {
                if (theme === 'dark') {
                    themeIcon.innerHTML = '<path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/>';
                } else {
                    themeIcon.innerHTML = '<path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>';
                }
            }
        }

        function toggleTheme() {
            const html = document.documentElement;
            const current = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', current);
            localStorage.setItem('theme', current);
            updateThemeIcon(current);
        }

        window.toggleTheme = toggleTheme; // Make toggleTheme globally accessible

        // Initialize theme from localStorage (now that updateThemeIcon is defined)
        const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme); // This call will now work

        // Wait for DOM to be fully loaded
        document.addEventListener('DOMContentLoaded', function () {

            // MOBILE MENU TOGGLE FUNCTIONALITY
            const initializeMobileMenu = () => {
                const mobileToggle = document.querySelector('.mobile-toggle');
                const mobileMenu = document.querySelector('.mobile-menu');

                if (mobileToggle && mobileMenu) {
                    mobileToggle.addEventListener('click', function(e) {
                        e.stopPropagation(); // Prevent document click from immediately closing
                        this.classList.toggle('active');
                        mobileMenu.classList.toggle('active');
                        const isExpanded = this.classList.contains('active');
                        this.setAttribute('aria-expanded', isExpanded);
                        document.body.style.overflow = isExpanded ? 'hidden' : ''; // Prevent scrolling when menu is open
                    });

                    // Close menu on outside click
                    document.addEventListener('click', function(e) {
                        if (mobileMenu.classList.contains('active') && !mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                            mobileToggle.classList.remove('active');
                            mobileMenu.classList.remove('active');
                            mobileToggle.setAttribute('aria-expanded', 'false');
                            document.body.style.overflow = '';
                        }
                    });

                    // Close menu on resize if screen becomes larger
                    window.addEventListener('resize', function() {
                        if (window.innerWidth > 991) { // Breakpoint from navigation system.html
                            mobileToggle.classList.remove('active');
                            mobileMenu.classList.remove('active');
                            mobileToggle.setAttribute('aria-expanded', 'false');
                            document.body.style.overflow = '';
                        }
                    });
                }
            };

            // ---------------------------------------- TYPED.JS INITIALIZATION ----------------------------------------//
            const initializeTypedText = () => {
                const typedElement = document.getElementById('typed');
                if (typedElement) {
                    const texts = ['Expert P.O.P', 'Gypsum Work', 'Lavish Interiors', 'Jaipur\'s Best'];
                    let currentIndex = 0;
                    let charIndex = 0;
                    let isDeleting = false;
                    let typingSpeed = 150;

                    const type = () => {
                        const currentText = texts[currentIndex];

                        if (isDeleting) {
                            typedElement.textContent = currentText.substring(0, charIndex - 1);
                            charIndex--;
                            typingSpeed = 100;
                        } else {
                            typedElement.textContent = currentText.substring(0, charIndex + 1);
                            charIndex++;
                            typingSpeed = 150;
                        }

                        if (!isDeleting && charIndex === currentText.length) {
                            isDeleting = true;
                            typingSpeed = 1500; // Pause at end of typing
                        } else if (isDeleting && charIndex === 0) {
                            isDeleting = false;
                            currentIndex = (currentIndex + 1) % texts.length;
                            typingSpeed = 500; // Pause before new word starts
                        }

                        setTimeout(type, typingSpeed);
                    };
                    type();
                }
            };

            // NAVBAR SCROLL EFFECT
            const initializeScrollEffect = () => {
                window.addEventListener('scroll', () => {
                    const navbar = document.querySelector('.navbar');
                    if (navbar) {
                        if (window.scrollY > 50) {
                            navbar.classList.add('scrolled');
                        } else {
                            navbar.classList.remove('scrolled');
                        }
                    }
                });
            };

            // CALCULATOR LOGIC (Existing, no changes needed from navigation system)
            const initializeCalculator = () => {
                const rates = { pop: 28, gypsum: 70, full: 1500 };
                const serviceType = document.getElementById('serviceType');
                const area = document.getElementById('area');
                const finish = document.getElementById('finish');
                const quoteResult = document.getElementById('quoteResult');

                const updateQuote = () => {
                    if (serviceType && area && finish && quoteResult) {
                        const type = serviceType.value;
                        const areaValue = parseInt(area.value) || 0;
                        const finishMultipliers = { basic: 1, premium: 1.2, luxury: 1.5 };
                        const price = Math.round(areaValue * rates[type] * finishMultipliers[finish.value]);
                        quoteResult.textContent = `₹ ${price.toLocaleString()}`;
                    }
                };
                window.updateQuote = updateQuote; // Make globally accessible
                updateQuote(); // Initial calculation
                ['serviceType', 'area', 'finish'].forEach(id => {
                    const element = document.getElementById(id);
                    if (element) {
                        element.addEventListener('change', updateQuote);
                        element.addEventListener('input', updateQuote);
                    }
                });
            };

            // SMOOTH SCROLL FUNCTIONALITY
            const initializeSmoothScroll = () => {
                window.scrollToSection = (sectionId) => {
                    const element = document.getElementById(sectionId);
                    if (element) {
                        const offsetTop = element.offsetTop - 80; // Adjust for fixed navbar height
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                };

                document.querySelectorAll('.nav-link').forEach(link => {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        const href = link.getAttribute('href');
                        if (href && href.startsWith('#')) {
                            const targetId = href.substring(1);
                            const targetElement = document.getElementById(targetId);
                            if (targetElement) {
                                const offsetTop = targetElement.offsetTop - 80; // Adjust for fixed navbar height
                                window.scrollTo({
                                    top: offsetTop,
                                    behavior: 'smooth'
                                });
                            }
                            // Close mobile menu after clicking a link
                            const mobileMenu = document.querySelector('.mobile-menu');
                            const mobileToggle = document.querySelector('.mobile-toggle');
                            if (mobileMenu && mobileMenu.classList.contains('active')) {
                                mobileMenu.classList.remove('active');
                                if (mobileToggle) {
                                    mobileToggle.classList.remove('active');
                                    mobileToggle.setAttribute('aria-expanded', 'false');
                                }
                                document.body.style.overflow = ''; // Re-enable scrolling
                            }
                        }
                    });
                });
            };

            // FADE ON SCROLL ANIMATION
            const initializeFadeOnScroll = () => {
                if ('IntersectionObserver' in window) {
                    const io = new IntersectionObserver(entries => {
                        entries.forEach(entry => {
                            entry.target.classList.toggle('show', entry.isIntersecting);
                        });
                    }, {
                        threshold: 0.2, // Trigger when 20% of the element is visible
                        rootMargin: '0px 0px -50px 0px' // Start animation slightly before reaching bottom
                    });
                    document.querySelectorAll('.fade').forEach(el => {
                        io.observe(el);
                    });
                } else {
                    // Fallback for browsers that don't support IntersectionObserver
                    document.querySelectorAll('.fade').forEach(el => {
                        el.classList.add('show');
                    });
                }
            };

            // LAZY LOAD IMAGES
            const initializeLazyLoad = () => {
                if ('IntersectionObserver' in window) {
                    const lazyLoadImages = document.querySelectorAll('img.lazy-load');
                    const imageObserver = new IntersectionObserver((entries, observer) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                const img = entry.target;
                                img.src = img.dataset.src;
                                img.classList.remove('lazy-load');
                                observer.unobserve(img);
                            }
                        });
                    });

                    lazyLoadImages.forEach(img => {
                        imageObserver.observe(img);
                    });
                } else {
                    // Fallback for browsers that don't support IntersectionObserver
                    document.querySelectorAll('img.lazy-load').forEach(img => {
                        img.src = img.dataset.src;
                    });
                }
            };

            // CONTACT FORM HANDLING (for both forms)
            const setupFormSubmission = (formId) => {
                const form = document.getElementById(formId);
                if (form) {
                    form.addEventListener('submit', async (e) => {
                        e.preventDefault();

                        // Simple validation
                        const inputs = form.querySelectorAll('[required]');
                        let allFieldsFilled = true;
                        inputs.forEach(input => {
                            if (!input.value.trim()) {
                                allFieldsFilled = false;
                                input.classList.add('is-invalid'); // Add visual feedback for invalid fields
                            } else {
                                input.classList.remove('is-invalid');
                            }
                        });

                        if (!allFieldsFilled) {
                            showMessageBox('Please fill in all required fields.', 'error');
                            return;
                        }

                        const formData = new FormData(form);
                        const data = {};
                        formData.forEach((value, key) => {
                            data[key] = value;
                        });

                        try {
                            const response = await fetch('https://formspree.io/f/mblowogr', { // Replace with your Formspree endpoint
                                method: 'POST',
                                body: formData,
                                headers: {
                                    'Accept': 'application/json'
                                }
                            });

                            if (response.ok) {
                                showMessageBox('Thank you for your message! We will get back to you soon.', 'success');
                                form.reset();
                                if (formId === 'contactForm') { // Only hide LLM response for the main contact form
                                    document.getElementById('llmResponse').style.display = 'none';
                                    document.getElementById('llmResponseContent').innerHTML = '';
                                }
                            } else {
                                const errorData = await response.json();
                                showMessageBox(`Oops! Something went wrong. ${errorData.error || ''}`, 'error');
                                console.error('Form submission error:', errorData);
                            }
                        } catch (error) {
                            showMessageBox('An error occurred while sending your message. Please try again later.', 'error');
                            console.error('Network error during form submission:', error);
                        }
                    });
                }
            };

            // Custom Message Box (replaces alert())
            const showMessageBox = (message, type = 'info') => {
                const existingMessageBox = document.getElementById('customMessageBox');
                if (existingMessageBox) {
                    existingMessageBox.remove();
                }

                const messageBox = document.createElement('div');
                messageBox.id = 'customMessageBox';
                messageBox.style.cssText = `
                    position: fixed;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    background-color: ${type === 'success' ? '#4CAF50' : (type === 'error' ? '#f44336' : '#2196F3')};
                    color: white;
                    padding: 15px 25px;
                    border-radius: 8px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                    z-index: 10000;
                    opacity: 0;
                    transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
                    font-family: var(--font-body), sans-serif;
                    max-width: 90%;
                    text-align: center;
                `;
                messageBox.textContent = message;
                document.body.appendChild(messageBox);

                setTimeout(() => {
                    messageBox.style.opacity = '1';
                    messageBox.style.transform = 'translateX(-50%) translateY(0)';
                }, 100);

                setTimeout(() => {
                    messageBox.style.opacity = '0';
                    messageBox.style.transform = 'translateX(-50%) translateY(-20px)';
                    messageBox.addEventListener('transitionend', () => messageBox.remove());
                }, 5000);
            };

            // STATS COUNTER ANIMATION
            const initializeStatsCounter = () => {
                const counters = document.querySelectorAll('.stats-counter');
                const observer = new IntersectionObserver(entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const counter = entry.target;
                            const target = parseInt(counter.getAttribute('data-target')) || parseInt(counter.textContent);
                            const increment = target / 200;
                            let current = 0;
                            const updateCounter = () => {
                                if (current < target) {
                                    current += increment;
                                    counter.textContent = Math.floor(current) + '+';
                                    requestAnimationFrame(updateCounter);
                                } else {
                                    counter.textContent = target + '+';
                                }
                            };
                            updateCounter();
                            observer.unobserve(counter);
                        }
                    });
                }, { threshold: 0.5 });
                counters.forEach(counter => observer.observe(counter));
            };

            // New function to call your backend
            async function callGeminiViaBackend(prompt) {
                try {
                    const response = await fetch('/generate-text', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ prompt })
                    });

                    const data = await response.json();
                    return data.generatedText;
                } catch (error) {
                    console.error('Backend API error:', error);
                    throw error;
                }
            }

            // Gemini API Integration - Get Project Ideas (Contact Form)
            const getProjectIdeas = async () => {
                const projectDetails = document.getElementById('contactMessage').value;
                const serviceType = document.getElementById('contactService').value;
                const llmResponseDiv = document.getElementById('llmResponse');
                const llmResponseContent = document.getElementById('llmResponseContent');
                const llmLoadingSpinner = document.getElementById('llmLoadingSpinner');

                if (!projectDetails.trim() || !serviceType.trim()) {
                    showMessageBox('Please provide project details and select a service to get ideas.', 'info');
                    return;
                }

                llmResponseContent.innerHTML = '';
                llmResponseDiv.style.display = 'block';
                llmLoadingSpinner.style.display = 'block';

                const prompt = `The user is planning a project for '${serviceType}' with the following details: '${projectDetails}'. Based on this, provide creative and practical ideas, design suggestions, or potential enhancements for their project. Focus on innovative solutions and aesthetic improvements. Keep the response concise and actionable, formatted as a bulleted list.`;

                let chatHistory = [];
                chatHistory.push({ role: "user", parts: [{ text: prompt }] });

                const payload = { contents: chatHistory };
                // const apiKey = ""; // Canvas will automatically provide the API key
                // const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

                 try {
                    // Replace Gemini API call with:
                    const text = await callGeminiViaBackend(prompt);

                    // Process text as before
                    if (text) {
                        const htmlList = text.split('\n').map(line => {
                            if (line.startsWith('* ') || line.startsWith('- ')) {
                                return `<li>${line.substring(2).trim()}</li>`;
                            }
                            return line;
                        }).join('');
                        llmResponseContent.innerHTML = `<ul>${htmlList}</ul>`;
                    }
                } catch (error) {
                    llmResponseContent.innerHTML = '<p>Error connecting to the idea generator. Please try again later.</p>';
                    console.error('Error calling Gemini API:', error);
                } finally {
                    llmLoadingSpinner.style.display = 'none';
                }
            };

            // Gemini API Integration - Service Elaborator/Summarizer (Services Section)
            const handleServiceAction = async (actionType, serviceName, currentDescription, targetElementId, spinnerId) => {
    const targetElement = document.getElementById(targetElementId);
    const spinner = document.getElementById(spinnerId);

    if (!targetElement || !spinner) {
        console.error('Target element or spinner not found');
        return;
    }

    // Toggle visibility
    if (targetElement.style.display === 'block') {
        targetElement.style.display = 'none';
        targetElement.innerHTML = '';
        return;
    }

    targetElement.innerHTML = '';
    targetElement.style.display = 'block';
    spinner.style.display = 'block';

    let prompt = '';
    if (actionType === 'elaborate') {
        prompt = `Elaborate on: '${serviceName}'. Current description: '${currentDescription}'. Provide detailed description with benefits and USPs in 2-3 paragraphs.`;
    } else if (actionType === 'summarize') {
        prompt = `Summarize: '${currentDescription}' in 50-60 words.`;
    }

    try {
        // Call your Flask backend instead of Gemini directly
        const text = await callGeminiViaBackend(prompt);

        if (actionType === 'elaborate') {
            targetElement.innerHTML = text.split('\n\n').map(p => `<p>${p.trim()}</p>`).join('');
        } else {
            targetElement.textContent = text.trim();
        }
    } catch (error) {
        targetElement.innerHTML = '<p>Error connecting to service. Please try again.</p>';
        console.error('Error:', error);
    } finally {
        spinner.style.display = 'none';
    }
};
            window.handleServiceAction = handleServiceAction; // Make globally accessible

            // Pricing Table Functionality
            const servicePricingData = [ // Renamed to avoid conflict
                { name: "Gypsum Board False Ceiling with Gyp Cera Frame", unit: "SFT", rate: 115 },
                { name: "Gypsum Board False Ceiling with Expert Frame", unit: "SFT", rate: 95 },
                { name: "Gypsum Board False Ceiling with GI Ultra Frame", unit: "SFT", rate: 85 },
                { name: "Chicken Wire Mesh False Ceiling", unit: "SFT", rate: 150 },
                { name: "P.O.P Panning on Wall (Right Angle)", unit: "SFT", rate: 42 },
                { name: "P.O.P Panning on Wall (Line & Level)", unit: "SFT", rate: 30 },
                { name: "Ceiling Cornices up to 4 inches", unit: "RFT", rate: 100 },
                { name: "Ceiling Cornices up to 6 inches", unit: "RFT", rate: 150 },
                { name: "Ceiling Groove Making", unit: "RFT", rate: 30 },
                { name: "Skirting & Wall Groove", unit: "RFT", rate: 20 },
                { name: "Light Gala Cutting", unit: "Nos", rate: 50 },
                { name: "AC Grill Cutting", unit: "SFT", rate: 50 }
            ];

            const initPricingTable = () => {
                let currentData = [...servicePricingData]; // Use renamed data
                const tableBody = document.getElementById('pricingTableBody');
                const searchInput = document.getElementById('searchInput');

                /**
                 * Renders the pricing table with the given data.
                 * @param {Array<Object>} data The array of service objects to display.
                 */
                const renderTable = (data) => {
                    if (!tableBody) return;
                    tableBody.innerHTML = ''; // Clear existing rows
                    data.forEach((item, index) => {
                        const row = tableBody.insertRow();
                        row.innerHTML = `
                            <td style="padding: 1rem; border: 1px solid var(--clr-border-light);">${index + 1}</td>
                            <td style="padding: 1rem; border: 1px solid var(--clr-border-light);">${item.name}</td>
                            <td style="padding: 1rem; border: 1px solid var(--clr-border-light);">${item.unit}</td>
                            <td style="padding: 1rem; border: 1px solid var(--clr-border-light); font-weight: 600; color: var(--clr-primary);">₹ ${item.rate}/-</td>
                        `;
                        // Add hover effect (can be done with CSS :hover as well)
                        row.style.transition = 'background-color 0.3s ease';
                        row.addEventListener('mouseenter', () => {
                            row.style.backgroundColor = 'var(--clr-border-light)';
                            if (document.documentElement.getAttribute('data-theme') === 'dark') {
                                row.style.backgroundColor = 'rgba(77, 208, 225, 0.05)'; // Dark mode hover
                            }
                        });
                        row.addEventListener('mouseleave', () => {
                            row.style.backgroundColor = '';
                        });
                    });
                };

                /**
                 * Sorts the pricing table data by a specified column.
                 * @param {string} column The column to sort by ('name' or 'rate').
                 */
                window.sortTable = (column) => { // Made global for onclick in HTML
                    if (column === 'name') {
                        currentData.sort((a, b) => a.name.localeCompare(b.name));
                    } else if (column === 'rate') {
                        currentData.sort((a, b) => a.rate - b.rate);
                    }
                    renderTable(currentData);
                };

                if (searchInput) {
                    searchInput.addEventListener('input', () => {
                        const searchTerm = searchInput.value.toLowerCase();
                        currentData = servicePricingData.filter(item => // Filter original data
                            item.name.toLowerCase().includes(searchTerm)
                        ); // Update currentData for sorting
                        renderTable(currentData);
                    });
                }

                renderTable(currentData); // Initial render
            };

            // Gemini API for Maintenance Tips
            const generateMaintenanceTips = async () => {
                // This function depends on elements not present in the provided HTML.
                // If you add a "Maintenance Tips" section, ensure these elements exist.
                const maintenanceService = document.getElementById('maintenanceService');
                const maintenanceConcerns = document.getElementById('maintenanceConcerns');
                const maintenanceResponseDiv = document.getElementById('maintenanceResponse');
                const maintenanceSpinner = document.getElementById('maintenanceSpinner');
                const getMaintenanceTipsBtn = document.getElementById('getMaintenanceTipsBtn');

                if (!maintenanceService || !maintenanceConcerns || !maintenanceResponseDiv || !maintenanceSpinner || !getMaintenanceTipsBtn) {
                    console.warn('Maintenance tips elements not found. Skipping initialization.');
                    return;
                }


                if (!maintenanceService.value) {
                    showMessageBox('Please select a type of POP/Gypsum work.', 'error');
                    return;
                }

                maintenanceResponseDiv.style.display = 'none';
                maintenanceSpinner.style.display = 'inline-block'; // Show spinner
                if (getMaintenanceTipsBtn) getMaintenanceTipsBtn.disabled = true;
                maintenanceResponseDiv.classList.remove('alert-success', 'alert-info', 'alert-danger');

                let prompt = `Provide detailed maintenance tips for a ${maintenanceService.value} installation.`;
                if (maintenanceConcerns.value.trim()) {
                    prompt += ` The user is specifically concerned about: ${maintenanceConcerns.value.trim()}. Address these concerns in the tips.`;
                }
                prompt += ` Ensure the tips are practical, easy to follow, and cover common issues like cleaning, moisture, and minor repairs. Format as a bulleted list.`;

                try {
                    let chatHistory = [];
                    chatHistory.push({ role: "user", parts: [{ text: prompt }] });
                    const payload = { contents: chatHistory };
                    // const apiKey = ""; // If you want to use models other than gemini-2.0-flash or imagen-3.0-generate-002, provide an API key here. Otherwise, leave this as-is.
                    // const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });

                    const result = await response.json();

                    if (result.candidates && result.candidates.length > 0 &&
                        result.candidates[0].content && result.candidates[0].content.parts &&
                        result.candidates[0].content.parts.length > 0) {
                        const text = result.candidates[0].content.parts[0].text;
                        maintenanceResponseDiv.innerHTML = `<pre style="white-space: pre-wrap; font-family: inherit;">${text}</pre>`;
                        maintenanceResponseDiv.classList.add('alert-info');
                        maintenanceResponseDiv.style.display = 'block';
                    } else {
                        throw new Error('Invalid response structure from Gemini API.');
                    }
                } catch (error) {
                    console.error('Error fetching maintenance tips from Gemini API:', error);
                    showMessageBox('Failed to generate tips. Please try again later.', 'error');
                    maintenanceResponseDiv.classList.add('alert-danger');
                    maintenanceResponseDiv.style.display = 'block';
                } finally {
                    maintenanceSpinner.style.display = 'none'; // Hide spinner
                    if (getMaintenanceTipsBtn) getMaintenanceTipsBtn.disabled = false;
                }
            };

            // New: Cost Calculator Functionality
            const initCostCalculator = () => {
                const calcServiceSelect = document.getElementById('calcService');
                const calcQuantityInput = document.getElementById('calcQuantity');
                const calculateCostBtn = document.getElementById('calculateCostBtn');
                const calculatorSpinner = document.getElementById('calculatorSpinner');
                const calculationResultDiv = document.getElementById('calculationResult');

                if (!calcServiceSelect || !calcQuantityInput || !calculateCostBtn || !calculatorSpinner || !calculationResultDiv) {
                    console.error('Missing calculator elements.');
                    return;
                }

                calculateCostBtn.addEventListener('click', () => {
                    const serviceName = calcServiceSelect.value;
                    const quantity = parseFloat(calcQuantityInput.value);

                    if (!serviceName || isNaN(quantity) || quantity <= 0) {
                        showMessageBox('Please select a service and enter a valid quantity.', 'error');
                        return;
                    }

                    calculatorSpinner.style.display = 'inline-block';
                    calculateCostBtn.disabled = true;
                    calculationResultDiv.style.display = 'none';
                    calculationResultDiv.classList.remove('alert-success', 'alert-danger', 'alert-info');

                    // Find the rate for the selected service
                    const selectedService = servicePricingData.find(service => service.name === serviceName);

                    if (!selectedService) {
                        showMessageBox('Selected service not found in pricing data.', 'error');
                        calculatorSpinner.style.display = 'none';
                        calculateCostBtn.disabled = false;
                        return;
                    }

                    const estimatedCost = quantity * selectedService.rate;

                    setTimeout(() => { // Simulate calculation delay
                        calculationResultDiv.innerHTML = `
                            <p><strong>Service:</strong> ${selectedService.name}</p>
                            <p><strong>Quantity:</strong> ${quantity} ${selectedService.unit}</p>
                            <p><strong>Estimated Cost:</strong> &#8377;${estimatedCost.toLocaleString('en-IN')}/-</p>
                            <small>This is an estimate. Final cost may vary.</small>
                        `;
                        calculationResultDiv.classList.add('alert-success');
                        calculationResultDiv.style.display = 'block';
                        calculatorSpinner.style.display = 'none';
                        calculateCostBtn.disabled = false;
                    }, 1000);
                });
            };
            // Initialize all functionality
            try {
                initializeMobileMenu();
                initializeScrollEffect();
                initializeCalculator(); // This is the old calculator logic, might be redundant with initCostCalculator
                initializeSmoothScroll();
                initializeFadeOnScroll();
                initializeLazyLoad(); // New: Lazy load images
                setupFormSubmission('homeContactForm');
                setupFormSubmission('contactForm');
                initializeStatsCounter();
                initializeTypedText();
                initPricingTable(); // New: Initialize interactive pricing table
                initCostCalculator();
                // The generateMaintenanceTips function depends on elements not present in the provided HTML.
                // If you add a "Maintenance Tips" section, uncomment the line below.
                // generateMaintenanceTips();

                const getIdeasBtn = document.getElementById('getIdeasBtn');
                if (getIdeasBtn) {
                    getIdeasBtn.addEventListener('click', getProjectIdeas);
                }

                document.querySelectorAll('.service-action-btn').forEach(button => {
                    button.addEventListener('click', function() {
                        const actionType = this.getAttribute('data-action');
                        const serviceName = this.getAttribute('data-service-name');
                        const serviceDesc = this.getAttribute('data-service-desc');
                        const targetId = this.getAttribute('data-target-id');
                        const spinnerId = this.getAttribute('data-spinner-id');
                        handleServiceAction(actionType, serviceName, serviceDesc, targetId, spinnerId);
                    });
                });

                console.log('MAD Associates - All scripts initialized successfully!');
            } catch (error) {
                console.error('Error initializing scripts:', error);
            }
        });
