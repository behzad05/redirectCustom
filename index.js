    favicon="https://storage.googleapis.com/msgsndr/TabqlvGhEdxHpg7xkw7X/media/66293c89389126609db70ebb.jpeg ";
    document.querySelector("link[rel=icon]").href = favicon;
    
    
    console.log("test 345");
    
    
    (function() {
        // Function to inject CSS for the arrow and rotation
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
    
        // Function to move elements in the correct order in the sidebar
            function moveTopItems() {
                const directStart = document.getElementById('81120254-125c-450c-9e79-011fbcaecf3c'); // Direct Start
                const helpLibrary = document.getElementById('1ebb4501-4485-4a9b-8171-25e7f726f953'); // Help Library
                const resellMastery = document.getElementById('4a282f97-1844-4edc-a3a0-4ec14cabce5d'); // Resell Mastery
                const coachingCalendar = document.getElementById('ca2c3c16-7cac-44d8-b2bf-ce50a73f1461'); // Coaching Calendar
                const partnerPortal = document.getElementById('f7cfc3b3-dc46-4389-bdba-b9a16368fb56'); // Partner Portal
                const directServices = document.getElementById('e91933ff-f0b5-44b1-bcc7-5d6c972e7430'); // Direct Services
                const directMerch = document.getElementById('bfeaa378-c453-43d1-ab29-d12b640ef788'); // Direct Merch
                const webinarDirect = document.getElementById('83099f1e-d253-4f39-ae8f-14cc05873114'); // Webinar Direct
                
                const dashboard = document.getElementById('sb_dashboard');
                const nav = dashboard ? dashboard.closest('nav') : null;
            
                if (!nav || !dashboard) return;
            
                // Insert elements in the reverse order
                moveElement(directMerch, nav, dashboard);
                moveElement(directServices, nav, directMerch);
                moveElement(webinarDirect, nav, directServices);
                moveElement(partnerPortal, nav, webinarDirect);
                moveElement(coachingCalendar, nav, partnerPortal);
                moveElement(resellMastery, nav, coachingCalendar);
                moveElement(helpLibrary, nav, resellMastery);
                moveElement(directStart, nav, helpLibrary);
            }


    
        // Function to handle the dropdown and arrow behavior
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
                        dropdownContent.appendChild(item);
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
    
        // Retry logic for checking the existence of the sidebar elements
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
                    injectCSS(); // Inject CSS for the dropdown arrow
                    setupDashboardDropdown(); // Setup dropdown functionality
                    moveTopItems(); // Rearrange top items
                    hideLaunchpad(); // Hide the launchpad
    
                    console.log('Sidebar elements successfully processed.');
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
        setInterval(function() {
        moveTopItems();
    }, 2000);
    })();
