    favicon="https://storage.googleapis.com/msgsndr/TabqlvGhEdxHpg7xkw7X/media/66293c89389126609db70ebb.jpeg ";
    document.querySelector("link[rel=icon]").href = favicon;
    
    
    console.log("test 350");
   
(function () {
    // Ensure CSS for `order` and enforce display styles
    function applyCSS() {
        const css = `
            #81120254-125c-450c-9e79-011fbcaecf3c {
                order: -1 !important; /* Ensure Direct Start appears first */
            }
            nav {
                display: flex; /* Ensure the sidebar uses flexbox */
                flex-direction: column; /* Align items vertically */
            }
        `;
        const style = document.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
        console.log('Custom CSS applied.');
    }

    // Move Direct Start above Dashboard
    function moveDirectStartAboveDashboard() {
        const directStart = document.getElementById('81120254-125c-450c-9e79-011fbcaecf3c'); // Direct Start
        const dashboard = document.getElementById('sb_dashboard');
        const navContainer = dashboard ? dashboard.closest('nav') : null;

        if (directStart && dashboard && navContainer) {
            navContainer.insertBefore(directStart, dashboard);
            console.log('Direct Start moved above Dashboard.');
        } else {
            console.warn('Direct Start or Dashboard not found.');
        }
    }

    // Observe DOM changes and enforce order
    function observeDOMChanges() {
        const sidebar = document.querySelector('#sidebar-v2 > div.flex.flex-col.h-screen');
        if (!sidebar) {
            console.warn('Sidebar not found for mutation observer.');
            return;
        }

        const observer = new MutationObserver(() => {
            moveDirectStartAboveDashboard();
        });

        observer.observe(sidebar, {
            childList: true,
            subtree: true,
        });

        console.log('Mutation observer started.');
    }

    // Main function to execute the script
    function main() {
        applyCSS(); // Apply necessary CSS
        moveDirectStartAboveDashboard(); // Initial movement
        observeDOMChanges(); // Continuously enforce position
    }

    // Execute immediately without waiting for DOMContentLoaded
    main();
})();

