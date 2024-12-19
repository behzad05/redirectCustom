console.log("test4");

(function() {
    // Function to inject CSS for the dropdown and styling
    function injectCSS() {
        const css = `
            #sb_dashboard::after {
                content: '\\25BC'; /* Unicode character for a downward arrow */
                display: inline-block;
                margin-left: 10px;
                transition: transform 0.3s ease; /* Smooth rotation transition */
            }
            #sb_dashboard.active::after {
                transform: rotate(180deg); /* Rotate the arrow upward */
            }
            .dropdown-content {
                position: absolute;
                background-color: black; /* Set dropdown background to black */
                color: white;
                padding: 10px;
                border-radius: 5px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                z-index: 1000;
            }
            .dropdown-content a {
                display: block;
                color: white;
                text-decoration: none;
                padding: 5px 10px;
            }
            .dropdown-content a:hover {
                background-color: rgba(255, 255, 255, 0.2);
            }
        `;
        const style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css; // For IE
        } else {
            style.appendChild(document.createTextNode(css));
        }
        document.head.appendChild(style); // Append the style to the head
    }

    // Function to handle the dropdown behavior
    function setupDashboardDropdown() {
        const dashboard = document.getElementById('sb_dashboard');
        if (dashboard && !dashboard.classList.contains('dropdown-initialized')) {
            dashboard.classList.add('dropdown-initialized');

            const dropdownContent = document.createElement('div');
            dropdownContent.className = 'dropdown-content';
            dropdownContent.style.display = 'none'; // Hide the dropdown initially

            const dropdownItemsIds = [
                'sb_location-mobile-app', // Mobile App
                'f5f16a85-70d1-49d2-a0d3-df5327a020c2', // Permissions Form
                'sb_conversations', // Conversation
                'sb_calendars', // Calendar
                'sb_contacts', // Contacts
                'sb_opportunities', // Opportunities
                'sb_payments', // Payments
                'sb_reputation', // Reputation
                'sb_reporting' // Reporting
            ];

            dropdownItemsIds.forEach((id) => {
                const item = document.getElementById(id);
                if (item) {
                    const clone = item.cloneNode(true);
                    clone.id = `${id}-dropdown-item`; // Prevent ID duplication
                    dropdownContent.appendChild(clone);
                } else {
                    console.log('Dropdown item not found:', id);
                }
            });

            dashboard.insertAdjacentElement('afterend', dropdownContent);

            dashboard.addEventListener('click', function(event) {
                event.stopPropagation(); // Prevent the event from bubbling up to the document
                const isHidden = dropdownContent.style.display === 'none';
                dropdownContent.style.display = isHidden ? 'block' : 'none';
                dashboard.classList.toggle('active'); // Toggle arrow rotation
            });

            // Close the dropdown if a click is detected outside of it
            document.addEventListener('click', function(event) {
                if (event.target !== dashboard && !dropdownContent.contains(event.target)) {
                    dropdownContent.style.display = 'none';
                    dashboard.classList.remove('active'); // Reset the arrow direction
                }
            });

            // Close the dropdown if the mouse leaves the dropdown area
            dropdownContent.addEventListener('mouseleave', function() {
                dropdownContent.style.display = 'none';
                dashboard.classList.remove('active');
            });
        }
    }

    // Retry logic for checking the existence of the dashboard element
    function retryUntilSuccess(func, maxRetries = 10, interval = 1000) {
        let retries = 0;

        const execute = () => {
            if (retries >= maxRetries) {
                console.error('Max retries reached. Sidebar elements not found.');
                return;
            }

            const dashboard = document.getElementById('sb_dashboard');
            if (dashboard) {
                injectCSS(); // Inject CSS for the dropdown
                setupDashboardDropdown(); // Setup dropdown functionality
                console.log('Dashboard dropdown successfully processed.');
            } else {
                retries++;
                console.log(`Retrying... attempt ${retries}`);
                setTimeout(execute, interval);
            }
        };

        execute();
    }

    // Start the retry mechanism with a max of 10 retries and 1 second interval
    retryUntilSuccess();
})();
