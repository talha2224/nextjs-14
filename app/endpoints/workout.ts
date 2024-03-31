async function logWorkoutCompletion(userId: string, timestamp: string, totalStrikes: number): Promise<any> {
  const url = 'https://us-central1-kayyo-2378d.cloudfunctions.net/api/logWorkoutCompletion';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, timestamp, totalStrikes }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export { logWorkoutCompletion };