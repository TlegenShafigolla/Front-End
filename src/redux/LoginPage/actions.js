export  const CHANGE_EMAIL = 'CHANGE_EMAIL';
export  const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const onChangeEmail = (email) => ({type: CHANGE_EMAIL, email})
export const onChangePassword = (password) => ({type: CHANGE_PASSWORD, password})