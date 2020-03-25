

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
      localStorage.setItem('refresh_token',data['refresh_token'])
      localStorage.setItem("access_token", data["access_token"]);
      localStorage.setItem("status", data["type"]);
      localStorage.setItem('access_time', Date())
    })

    .catch(error => console.log(error));
}
