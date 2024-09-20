favicon="https://storage.googleapis.com/msgsndr/TabqlvGhEdxHpg7xkw7X/media/66293c89389126609db70ebb.jpeg ";
document.querySelector("link[rel=icon]").href = favicon;


console.log("test 336")

(function() {
    // Inject the CSS for the arrow and rotation
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

    // Move elements in the correct order
    function moveTopItems() {
        const directMerch = document.getElementById('bfeaa378-c453-43d1-ab29-d12b640ef788'); // Direct Merch
        const directServices = document.getElementById('e91933ff-f0b5-44b1-bcc7-5d6c972e7430'); // Direct Services
        const partnerPortal = document.getElementById('f7cfc3b3-dc46-4389-bdba-b9a16368fb56'); // Partner Portal
        const coachingCalendar = document.getElementById('ca2c3c16-7cac-44d8-b2bf-ce50a73f1461'); // Coaching Calendar
        const resellMastery = document.getElementById('4a282f97-1844-4edc-a3a0-4ec14cabce5d'); // Resell Mastery
        const helpLibrary = document.getElementById('1ebb4501-4485-4a9b-8171-25e7f726f953'); // Help Library
        const directStart = document.getElementById('81120254-125c-450c-9e79-011fbcaecf3c'); // Direct Start

        const dashboard = document.getElementById('sb_dashboard');
        const nav = dashboard ? dashboard.closest('nav') : null;

        if (!nav || !dashboard) return;

        // Move elements in the correct order
        moveElement(helpLibrary, nav, dashboard);
        moveElement(resellMastery, nav, helpLibrary);
        moveElement(coachingCalendar, nav, resellMastery);
        moveElement(partnerPortal, nav, coachingCalendar);
        moveElement(directServices, nav, partnerPortal);
        moveElement(directMerch, nav, directServices);
        moveElement(directStart, nav, directMerch);
    }

    // Function to handle dropdown and arrow behavior
    function setupDashboardDropdown() {
        const dashboard = document.getElementById('sb_dashboard');
        if (dashboard && !dashboard.classList.contains('dropdown-initialized')) {
            dashboard.classList.add('dropdown-initialized');

            const dropdownContent = document.createElement('div');
            dropdownContent.className = 'dropdown-content';
            dropdownContent.style.display = 'none'; // Hide dropdown initially

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
                    dropdownContent.appendChild(item);
                }
            });

            dashboard.insertAdjacentElement('afterend', dropdownContent);

            dashboard.addEventListener('click', function(event) {
                event.stopPropagation(); // Prevent bubbling
                const isHidden = dropdownContent.style.display === 'none';
                dropdownContent.style.display = isHidden ? 'block' : 'none';
                dashboard.classList.toggle('active'); // Toggle arrow rotation
            });

            document.addEventListener('click', function(event) {
                if (event.target !== dashboard && !dropdownContent.contains(event.target)) {
                    dropdownContent.style.display = 'none';
                    dashboard.classList.remove('active'); // Reset arrow direction
                }
            });
        }
    }

    // Function to hide the launchpad element
    function hideLaunchpad() {
        const launchpad = document.getElementById('sb_launchpad');
        if (launchpad) {
            launchpad.style.display = 'none';
        }
    }

    // Function to move an element to a new parent
    function moveElement(element, newParent, referenceElement = null) {
        if (element && newParent) {
            newParent.insertBefore(element, referenceElement);
        }
    }

    // MutationObserver to monitor changes in the sidebar
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            const sidebar = document.querySelector('#sidebar-v2 > div.flex.flex-col.h-screen > div');
            if (sidebar) {
                // Apply all necessary functions when sidebar is available
                injectCSS(); // Inject CSS for arrow
                setupDashboardDropdown(); // Setup dropdown
                moveTopItems(); // Move top items
                hideLaunchpad(); // Hide launchpad

                // Stop observing once applied
                observer.disconnect();
            }
        });
    });

    // Start observing the body for changes
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
