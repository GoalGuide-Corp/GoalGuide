const BASE_URL = 'http://localhost:5000';  // Update this to your backend URL

export async function loginUser(email: string, password: string) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Failed to login');
  }

  const data = await response.json();
  return data;
}
