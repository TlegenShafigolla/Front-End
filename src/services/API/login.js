import {api} from "../../App"

export async function login(email, password) {
  return await fetch(`${api}/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
    .then(res => {
      return res.json();
    })

    .catch(error => console.log(error));
}
