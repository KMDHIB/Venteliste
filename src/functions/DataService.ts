const baseUrl = "src/assets/mock";
const headers = {
  "Content-Type": "application/json",
  "Accept": "*/*",
  "Cache-Control": "no-cache"
};
const cacheBuster = new Date().getTime();

export async function getChildren() {
  const response = await fetch(`${baseUrl}/children.json?v=${cacheBuster}`, {
    method: "GET",
    headers: headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error code: ${response.status}`);
  }

  return response.json();
}

export async function getSchool() {
  const response = await fetch(`${baseUrl}/school.json?v=${cacheBuster}`, {
    method: "GET",
    headers: headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error code: ${response.status}`);
  }

  return response.json();
}

export async function getSchoolSummary() {
  const response = await fetch(`${baseUrl}/schoolSummary.json?v=${cacheBuster}`, {
    method: "GET",
    headers: headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error code: ${response.status}`);
  }

  return response.json();
}

export async function getPerson() {
  const response = await fetch(`${baseUrl}/person.json?v=${cacheBuster}`, {
    method: "GET",
    headers: headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error code: ${response.status}`);
  }

  return response.json();
}

export async function getPostalCodes() {
  const response = await fetch(`${baseUrl}/postalCodes.json?v=${cacheBuster}`, {
    method: "GET",
    headers: headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error code: ${response.status}`);
  }

  return response.json();
}

export async function getRegistration() {
  const response = await fetch(`${baseUrl}/registration.json?v=${cacheBuster}`, {
    method: "GET",
    headers: headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error code: ${response.status}`);
  }

  return response.json();
}

export async function getSiblings() {
  const response = await fetch(`${baseUrl}/siblings.json?v=${cacheBuster}`, {
    method: "GET",
    headers: headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error code: ${response.status}`);
  }

  return response.json();
}

export async function getQuestionnaire() {
  const response = await fetch(`${baseUrl}/questions.json?v=${cacheBuster}`, {
    method: "GET",
    headers: headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error code: ${response.status}`);
  }

  return response.json();
}