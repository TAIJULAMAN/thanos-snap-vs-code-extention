// This is a test file for VS Thanos Snap
// It contains various types of expendable code

function calculateTotal(items) {
    console.log('Starting calculation...');

    // Initialize total variable
    let total = 0;

    // Loop through all items
    for (const item of items) {
        console.log('Processing item:', item.name);

        // Add item price to total
        total += item.price;
        console.log('Current total:', total);
    }

    console.log('Final total:', total);

    // Return the calculated total
    return total;
}

// Test function for user authentication
function authenticateUser(username, password) {
    console.log('Authenticating user:', username);

    // Check if username is valid
    if (!username || username.length < 3) {
        console.error('Invalid username');
        return false;
    }

    // Check if password is valid
    if (!password || password.length < 8) {
        console.error('Invalid password');
        return false;
    }

    console.log('User authenticated successfully');
    return true;
}

// Export functions
export { calculateTotal, authenticateUser };
