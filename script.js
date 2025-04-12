// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements for better performance using destructuring
    const elements = {
        dynamicText: document.getElementById('dynamicText'),
        contactTable: document.getElementById('contactTable'),
        buttons: {
            changeText: document.getElementById('changeTextButton'),
            changeStyle: document.getElementById('changeStyleButton'),
            addContact: document.getElementById('addContactButton'),
            removeContact: document.getElementById('removeContactButton')
        }
    };

    // Add these functions to the global scope for dynamic calling
    window.changeText = () => {
        if (!elements.dynamicText) return console.error('Dynamic text element not found');
        elements.dynamicText.textContent = "This is a dynamically updated text!";
    };

    // Function to modify the CSS styles via classList for better performance
    window.changeStyle = () => {
        document.body.classList.toggle('styled');
        // The styled class should be defined in CSS with all necessary styles
    };

    // Function to add a new contact to the table using template literals
    window.addContact = () => {
        const tbody = elements.contactTable?.querySelector('tbody') || elements.contactTable;
        if (!tbody) return console.error('Contact table not found');
        
        const newRow = tbody.insertRow();
        
        // Using template literals for cleaner HTML insertion
        newRow.innerHTML = `
            <td>New User</td>
            <td>New City, Country</td>
            <td>+27 65 123 4567</td>
            <td>newuser@domain.com</td>
        `;
    };

    // Function to remove the last contact from the table
    window.removeContact = () => {
        const tbody = elements.contactTable?.querySelector('tbody') || elements.contactTable;
        if (!tbody) return console.error('Contact table not found');
        
        const rowCount = tbody.rows.length;
        if (rowCount > 0) {
            tbody.deleteRow(rowCount - 1);
        }
    };

    // Modern event delegation approach using Object.values
    Object.values(elements.buttons).forEach(button => {
        if (!button) return; // Skip if button not found
        
        button.addEventListener('click', (event) => {
            // Extract function name from button ID by removing 'Button' suffix
            const action = event.target.id.replace('Button', '');
            
            // Call the corresponding function if it exists
            if (typeof window[action] === 'function') {
                window[action]();
            }
        });
    });
});
