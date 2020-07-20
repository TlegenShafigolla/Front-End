
export function session() {
    try {
        if (localStorage.getItem('access_token') === null) {
               return null;
        }
        const timeout = Date.parse(localStorage.getItem('access_time'));
        const diff = new Date() - timeout;
        if (Math.round(diff) > 24*3600*1000-20) {
            return localStorage.clear()
            // refreshSession();
        }
        return localStorage.getItem('access_token');
    } catch (e) {
        return null;
    }
}
