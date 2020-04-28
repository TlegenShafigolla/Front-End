export function ServerTimeToUserTime(dates) {
    let time=new Date().getTimezoneOffset()/60
    // let s=dates.getHours()-time;
    // let t=dates.setHours(s);
    // console.log(dates)
    return dates;
}
export function UserTimeToServerTime(date) {
    let dateTimeFormat=date.toISOString().replace('T',' ').replace('Z',' ')
    console.log( dateTimeFormat)
    return dateTimeFormat;
}