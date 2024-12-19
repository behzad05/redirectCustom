console.log("test8");


    (function () {
        // Function to inject CSS for dropdown styles
        function injectCSS() {
            const css = `
                #dashboard-dropdown {
                    position: absolute;
                    top: 100%; /* Align dropdown below the Dashboard */
                    left: 0;
                    z-index: 10;
                    background-color: black; /* Dropdown background */
                    color: white; /* Dropdown text color */
                    border-radius: 5px;
                    display: none; /* Initially hidden */
                    width: 100%; /* Match sidebar width */
                    padding: 10px 0;
                    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                }
                #dashboard-dropdown a {
                    display: block;
                    padding: 10px 15px;
                    text-decoration: none;
                    color: white;
                    transition: background-color 0.3s;
                }
                #dashboard-dropdown a:hover {
                    background-color: #444; /* Darker hover effect */
                }
                #sb_dashboard:hover + #dashboard-dropdown {
                    display: block; /* Show dropdown on hover */
                }
                #sb_dashboard {
                    position: relative;
                }
                nav {
                    position: relative;
                }
            `;
            const style = document.createElement("style");
            style.type = "text/css";
            if (style.styleSheet) {
                style.styleSheet.cssText = css; // For IE
            } else {
                style.appendChild(document.createTextNode(css));
            }
            document.head.appendChild(style);
        }

        // Function to create and attach the dropdown
        function setupDashboardDropdown() {
            const dashboard = document.getElementById("sb_dashboard");
            if (dashboard) {
                // Prevent multiple initializations
                if (document.getElementById("dashboard-dropdown")) return;

                const dropdownContent = document.createElement("div");
                dropdownContent.id = "dashboard-dropdown";

                // List of dropdown items (IDs match sidebar elements)
                const dropdownItemsIds = [
                    "sb_conversations", // Conversations
                    "sb_calendars", // Calendar
                    "sb_contacts", // Contacts
                    "sb_opportunities", // Opportunities
                    "sb_payments", // Payments
                    "sb_reputation", // Reputation
                    "sb_reporting", // Reporting
                ];

                dropdownItemsIds.forEach((id) => {
                    const item = document.getElementById(id);
                    if (item) {
                        const clonedItem = item.cloneNode(true);
                        clonedItem.id = `dropdown-${id}`; // Ensure unique IDs
                        dropdownContent.appendChild(clonedItem);
                    } else {
                        console.log("Dropdown item not found:", id);
                    }
                });

                dashboard.parentElement.appendChild(dropdownContent);

                // Event listeners for hover functionality
                dashboard.addEventListener("mouseenter", function () {
                    dropdownContent.style.display = "block";
                });

                dropdownContent.addEventListener("mouseleave", function () {
                    dropdownContent.style.display = "none";
                });

                // Close dropdown when leaving sidebar
                dashboard.parentElement.addEventListener("mouseleave", function () {
                    dropdownContent.style.display = "none";
                });
            }
        }

        // Initialize the script with retry logic
        function initializeSidebarDropdown(maxRetries = 10, interval = 1000) {
            let retries = 0;

            const execute = () => {
                const dashboard = document.getElementById("sb_dashboard");
                if (dashboard) {
                    injectCSS();
                    setupDashboardDropdown();
                    console.log("Dropdown successfully initialized.");
                } else if (retries < maxRetries) {
                    retries++;
                    setTimeout(execute, interval);
                } else {
                    console.error("Failed to initialize dropdown: Dashboard not found.");
                }
            };

            execute();
        }

        // Start the initialization process
        initializeSidebarDropdown();
    })();

