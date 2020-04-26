export async function login(email, password) {
  return await fetch("http://localhost:3000/login", {
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
