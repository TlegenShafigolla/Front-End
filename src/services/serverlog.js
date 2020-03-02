

export async function login(email, password) {
  return await fetch("http://35.228.95.87:7000/login", {
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
    .then(data => {
      console.log(data);
      if (data["type"] === "admin") {
        localStorage.setItem("admin", data["access_token"]);
        localStorage.setItem("status", data["type"]);
      }
      if (data["type"] === "user") {
        localStorage.setItem("user", data["access_token"]);
        localStorage.setItem("status", data["type"]);

      }
    })

    .catch(error => console.log(error));
}
