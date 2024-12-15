    favicon="https://storage.googleapis.com/msgsndr/TabqlvGhEdxHpg7xkw7X/media/66293c89389126609db70ebb.jpeg ";
    document.querySelector("link[rel=icon]").href = favicon;
    
    
    console.log("test 348");
    
    (function () {
    // Function to move an element to the top of the sidebar
    function moveDirectStartToTop() {
        const directStart = document.getElementById('81120254-125c-450c-9e79-011fbcaecf3c'); // Direct Start
        const sidebarNav = document.querySelector('.hl_nav-header nav'); // Main sidebar navigation container

        if (directStart && sidebarNav) {
            // Move the Direct Start item to the top of the sidebar
            sidebarNav.insertBefore(directStart, sidebarNav.firstChild);
            console.log('Direct Start moved to the top of the sidebar.');
        } else {
            console.error('Direct Start or sidebar navigation not found.');
        }
    }

    // Retry logic to ensure the sidebar is loaded
    function retryUntilSuccess(func, maxRetries = 10, interval = 1000) {
        let retries = 0;

        const execute = () => {
            if (retries >= maxRetries) {
                console.error('Max retries reached. Sidebar elements not found.');
                return;
            }

            const sidebar = document.querySelector('.hl_nav-header nav');
            if (sidebar) {
                func(); // Execute the move function
            } else {
                retries++;
                console.log(`Retrying... attempt ${retries}`);
                setTimeout(execute, interval);
            }
        };

        execute();
    }

    // Start the retry mechanism to move Direct Start to the top
    retryUntilSuccess(moveDirectStartToTop);
})();
