favicon="https://storage.googleapis.com/msgsndr/TabqlvGhEdxHpg7xkw7X/media/66293c89389126609db70ebb.jpeg ";
document.querySelector("link[rel=icon]").href = favicon;



(function() {
    function moveElement(element, newParent, referenceElement = null) {
        if (element && newParent) {
            newParent.insertBefore(element, referenceElement);
        }
    }

    function setupDashboardDropdown() {
        const dashboard = document.getElementById('sb_dashboard');
        if (dashboard && !dashboard.classList.contains('dropdown-initialized')) {
            dashboard.classList.add('dropdown-initialized');

            const dropdownContent = document.createElement('div');
            dropdownContent.className = 'dropdown-content';
            dropdownContent.style.display = 'none'; // Hide the dropdown initially

            const dropdownItemsIds = [
                'sb_location-mobile-app',
                'f5f16a85-70d1-49d2-a0d3-df5327a020c2',
                'sb_conversations',
                'sb_calendars',
                'sb_contacts',
                'sb_opportunities',
                'sb_payments',
                'sb_reputation',
                'sb_reporting'
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
            });

            // Close the dropdown if a click is detected outside of it
            document.addEventListener('click', function(event) {
                if (event.target !== dashboard && !dropdownContent.contains(event.target)) {
                    dropdownContent.style.display = 'none';
                }
            });

            console.log('Dashboard dropdown setup complete.');
        } else if (!dashboard) {
            console.log('Dashboard not found');
        }
    }

    function moveTopItems() {
        const partnerPortal = document.getElementById('f7cfc3b3-dc46-4389-bdba-b9a16368fb56');
        const theAcademy = document.getElementById('81120254-125c-450c-9e79-011fbcaecf3c');
        const directSites = document.getElementById('1ebb4501-4485-4a9b-8171-25e7f726f953');
        const resellMastery = document.getElementById('4a282f97-1844-4edc-a3a0-4ec14cabce5d');
        const coachingCalendar = document.getElementById('ca2c3c16-7cac-44d8-b2bf-ce50a73f1461');
        const dashboard = document.getElementById('sb_dashboard');
        const nav = dashboard ? dashboard.closest('nav') : null;

        moveElement(nav.removeChild(theAcademy), nav, nav.firstChild);
        moveElement(nav.removeChild(directSites), nav, theAcademy.nextSibling);
        moveElement(nav.removeChild(resellMastery), nav, directSites.nextSibling);
        moveElement(nav.removeChild(coachingCalendar), nav, resellMastery.nextSibling);
        moveElement(nav.removeChild(partnerPortal), nav, coachingCalendar.nextSibling);
    }

    function hideLaunchpad() {
        const launchpad = document.getElementById('sb_launchpad');
        if (launchpad) {
            launchpad.style.display = 'none';
        }
    }

    function initialize() {
        setupDashboardDropdown();
        moveTopItems();
        hideLaunchpad();
    }

    // Initialize the script once
    document.addEventListener('DOMContentLoaded', initialize);
})();

