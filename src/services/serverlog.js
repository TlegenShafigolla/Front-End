
export function login() {
    console.log('okk');

    return fetch('http://35.228.95.87:7000/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": 'gabitaskar@unist.ac.kr',
                "password": 'password ',
            })
        }).then(res => {
  console.log('okkk1');

            return res.json();
        })
        .then(data => {
            console.log('data');

            console.log(data);
            if (data['type'] === 'admin')
                localStorage.setItem('admin', data['access_token']);
            else
                localStorage.setItem('user', data['access_token']);


        })

        .catch(error => console.log(error))
}