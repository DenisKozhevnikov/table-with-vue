const API_URL = "http://localhost:3000";

export function getPersons() {
  return fetch(`${API_URL}/person`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  });
}

export function setPerson({ firstName, lastName }) {
  return fetch(`${API_URL}/person`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ firstName, lastName })
  }).then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  });
}

export function changePersonInfo({ firstName, lastName, uuid }) {
  return fetch(`${API_URL}/person/${uuid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ firstName, lastName })
  }).then(res => {
    if (res.ok) {
      return res;
    }

    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  });
}

export function deletePerson(uuid) {
  return fetch(`${API_URL}/person/${uuid}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    if (res.ok) {
      return res;
    }

    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  });
}
