## Malik Art Decor Website
This repository contains the official website for Malik Art Decor, specialists in P.O.P. (Plaster of Paris) and Gypsum works. The website is designed to showcase our services, portfolio, provide instant quotes, and offer interactive features powered by Large Language Models (LLMs).

Table of Contents
About

Features

Technologies Used

Setup and Installation

Usage

Contributing

License

About
Malik Art Decor is a leading P.O.P. and Gypsum specialist based in Jaipur, India, with over a decade of experience. We provide comprehensive interior solutions, including custom false ceilings, gypsum partitions, and turn-key construction services, focusing on quality, timely delivery, and client satisfaction. This website serves as our digital storefront, providing potential clients with detailed information and interactive tools.

Features
Responsive Design: Optimized for seamless viewing and interaction across all devices (desktop, tablet, mobile).

Dynamic Hero Section: Engaging introductory section with a dynamic typed text effect.

Quick Enquiry Form: A convenient form on the hero section for instant inquiries.

Our Core Services: Detailed section highlighting key services with:

Service Elaborator: Dynamically generates more detailed descriptions of services using the Gemini API.

Service Summarizer: Provides concise summaries of services (50-60 words) using the Gemini API for quick understanding.

Project Portfolio: A gallery showcasing recent projects with hover effects.

Instant Project Estimator: A calculator to provide estimated costs for P.O.P., Gypsum, and turn-key construction based on area and finishing level.

About Us Section: Information about the company's history, mission, and key statistics.

Contact Section: Comprehensive contact details and a contact form with:

Project Ideas Generator: Uses the Gemini API to generate creative project ideas based on user input.

Theme Toggle: Allows users to switch between light and dark modes for a personalized browsing experience.

Smooth Scrolling: Enhanced navigation with smooth transitions to different sections.

Technologies Used
HTML5: Structure of the web pages.

CSS3: Styling and visual presentation, including responsive design and animations.

JavaScript (ES6+): Interactive elements, form handling, and API integrations.

Bootstrap 5.3: Responsive grid system and pre-styled components.

Font Awesome 6.4.0: Icons used throughout the website.

Google Fonts: Custom typography (Inter, Playfair Display, Poppins, Open Sans).

Typed.js: JavaScript library for the dynamic typing effect in the hero section.

Gemini API (gemini-2.0-flash): Powers the "Service Elaborator," "Service Summarizer," and "Project Ideas Generator" features.

Formspree: Used for handling form submissions (replace with your Formspree endpoint).

Setup and Installation
To run this project locally:

Clone the repository:

git clone <repository-url>
cd malik-art-decor-website

Open index.html:
Simply open the index.html file in your web browser. All necessary CSS and JavaScript libraries are loaded via CDN.

Note on Gemini API:
The Gemini API calls are configured to use an empty API key (const apiKey = "";). In the Canvas environment, this will be automatically provided at runtime. If you are deploying this outside of Canvas and wish to use the LLM features, you will need to:

Obtain a Gemini API key from the Google AI Studio.

Replace const apiKey = ""; with const apiKey = "YOUR_GEMINI_API_KEY"; in the JavaScript code.

Usage
Navigate through the sections using the top navigation bar.

Toggle between light and dark themes using the sun/moon icon in the navigation.

Use the "Quick Enquiry" form on the home page for general questions.

Explore "Our Core Services" and click "Elaborate ✨" for detailed descriptions or "Summarize 📝" for brief overviews.

View our past projects in the "Our Recent Projects" gallery.

Get an instant cost estimate using the "Instant Project Estimator."

Fill out the "Get In Touch" form and click "Get Project Ideas ✨" to receive AI-generated suggestions for your project.

Contributing
We welcome contributions! If you have suggestions for improvements or find any issues, please feel free to:

Fork the repository.

Create a new branch (git checkout -b feature/your-feature-name).

Make your changes.

Commit your changes (git commit -m 'Add new feature').

Push to the branch (git push origin feature/your-feature-name).

Open a Pull Request.

License
This project is licensed under the MIT License - see the LICENSE file for details.