// Define the base URL for your API if they share the same base URL
const BASE_URL = 'https://us-central1-kayyo-2378d.cloudfunctions.net';

// Function to fetch leaderboard neighbors
async function fetchLeaderboardNeighbors(userId: string) {
    const url = `${BASE_URL}/api/getLeaderboardNeighborsWeb`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

// Another example function for a different endpoint
async function getTopThirtyLeaderboard() {
    const url = `${BASE_URL}/api/getTopThirtyLeaderboardWeb`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

// Export all functions
export { fetchLeaderboardNeighbors, getTopThirtyLeaderboard };