const baseUrl = "src/assets/mock"; // Replace with your actual API base URL
const headers = {
  "Content-Type": "application/json",
  "Accept": "*/*",
  "Cache-Control": "no-cache"
};

export async function getChildren() {
  const response = await fetch(`${baseUrl}/children.json`, {
    method: "GET",
    headers: headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error code: ${response.status}`);
  }

  return response.json();
}

export async function getSchool() {
  const response = await fetch(`${baseUrl}/school.json`, {
    method: "GET",
    headers: headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error code: ${response.status}`);
  }

  return response.json();
}

export async function getSchoolSummary() {
  const response = await fetch(`${baseUrl}/schoolSummary.json`, {
    method: "GET",
    headers: headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error code: ${response.status}`);
  }

  return response.json();
}

export async function getPerson() {
  const response = await fetch(`${baseUrl}/person.json`, {
    method: "GET",
    headers: headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error code: ${response.status}`);
  }

  return response.json();
}

export async function getPostalCodes() {
  const response = await fetch(`${baseUrl}/postalCodes.json`, {
    method: "GET",
    headers: headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error code: ${response.status}`);
  }

  return response.json();
}

export async function getRegistration() {
  const response = await fetch(`${baseUrl}/registration.json`, {
    method: "GET",
    headers: headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error code: ${response.status}`);
  }

  return response.json();
}

export async function getSiblings() {
  const response = await fetch(`${baseUrl}/siblings.json`, {
    method: "GET",
    headers: headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error code: ${response.status}`);
  }

  return response.json();
}

export async function getQuestionnaire() {
  const response = await fetch(`${baseUrl}/questions.json`, {
    method: "GET",
    headers: headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error code: ${response.status}`);
  }

  return response.json();
}