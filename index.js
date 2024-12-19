console.log("test4");

(function() {
    // Function to inject CSS for styling
    function injectCSS() {
        const css = `
            #sb_dashboard {
                position: relative;
            }
            .dropdown-content {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                background-color: black; /* Black background */
                color: white; /* White text */
                width: 200px;
                padding: 10px;
                border-radius: 4px;
                z-index: 1000;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .dropdown-content a {
                color: white; /* Ensure link text is visible */
                text-decoration: none;
                display: block;
                padding: 5px 10px;
                border-radius: 4px;
            }
            .dropdown-content a:hover {
                background-color: rgba(255, 255, 255, 0.1); /* Slight highlight on hover */
            }
            #sb_dashboard:hover + .dropdown-content {
                display: block; /* Show dropdown on hover */
            }
        `;
        const style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css; // For IE
        } else {
            style.appendChild(document.createTextNode(css));
        }
        document.head.appendChild(style);
    }

    // Function to set up the dropdown behavior
    function setupDashboardDropdown() {
        const dashboard = document.getElementById('sb_dashboard');
        if (dashboard && !dashboard.classList.contains('dropdown-initialized')) {
            dashboard.classList.add('dropdown-initialized');

            const dropdownContent = document.createElement('div');
            dropdownContent.className = 'dropdown-content';

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
                    const link = document.createElement('a');
                    link.href = item.href || '#';
                    link.textContent = item.textContent.trim();
                    dropdownContent.appendChild(link);
                } else {
                    console.log('Dropdown item not found:', id);
                }
            });

            dashboard.insertAdjacentElement('afterend', dropdownContent);
        }
    }

    // Retry logic to ensure sidebar is loaded
    function retryUntilSuccess(func, maxRetries = 10, interval = 1000) {
        let retries = 0;

        const execute = () => {
            if (retries >= maxRetries) {
                console.error('Max retries reached. Sidebar elements not found.');
                return;
            }

            const sidebar = document.querySelector('#sidebar-v2 > div.flex.flex-col.h-screen > div');
            if (sidebar) {
                // Once the sidebar is detected, apply all necessary functions
                injectCSS(); // Inject CSS for the dropdown
                setupDashboardDropdown(); // Setup dropdown functionality
                console.log('Sidebar elements successfully processed.');
            } else {
                retries++;
                console.log(`Retrying... attempt ${retries}`);
                setTimeout(execute, interval);
            }
        };

        execute();
    }

    // Start the retry mechanism with a max of 10 retries and 1-second interval
    retryUntilSuccess();
})();
