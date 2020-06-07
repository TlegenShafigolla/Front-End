export const required = (value) => {
    return !value;
}
export const  checkEmail=(value)=>{
    const email = /[0-9a-z_-]+@[0-9a-z_-]+\.[a-z]{2,5}$/i;
   return !email.test(value);
}