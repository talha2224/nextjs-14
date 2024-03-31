"use client";

const BASE_URL = 'https://us-central1-kayyo-2378d.cloudfunctions.net';

async function fetchUserStats(userId: string) {
  const url = `${BASE_URL}/api/getUserStatsWeb`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({"userId": userId}),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch user stats:', error);
    throw error;
  }
}

async function updateStreak(userId: string) {
  const url = `${BASE_URL}/api/updateStreakWeb`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to update streak:', error);
    throw error;
  }
}

export { updateStreak, fetchUserStats };
