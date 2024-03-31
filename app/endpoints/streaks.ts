
// Define the base URL for your API if they share the same base URL
const BASE_URL = 'https://us-central1-kayyo-2378d.cloudfunctions.net';

// Function to fetch leaderboard neighbors
async function fetchStreakLeaderboardNeighbors(userId: string) {
    console.log(userId);
    const url = `${BASE_URL}/api/getStreakLeaderboardNeighborsWeb`;
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
async function getTopThirtyStreakLeaderboard() {
    const url = `${BASE_URL}/api/getTopThirtyStreakLeaderboardWeb`;
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
export { fetchStreakLeaderboardNeighbors, getTopThirtyStreakLeaderboard };

