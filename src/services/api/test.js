//
export default function getTest(link) {
    const requestOptions = {
        method: 'GET',
    };
    const api = 'http://35.228.95.87:7000';
    const json = fetch(`${api}/invitation/${link}`, requestOptions).then(res => {
        return res.json();
    });
    return json;
};

export function postTest(link, email) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body:JSON.stringify( {
            email: email
        }),
    };
    const api = 'http://35.228.95.87:7000';
    return fetch(`${api}/invitation/${link}`, requestOptions).then(res => {
        return res.json();
    });
}
