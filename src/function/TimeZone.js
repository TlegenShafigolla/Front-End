export function TimeZone(dates) {
    let time=new Date().getTimezoneOffset()/60
    let s=dates.getHours()-time;
    let t=dates.setHours(s);
    console.log(dates)
    return dates;
}