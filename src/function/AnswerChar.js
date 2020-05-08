export const getChar = (number) => {
    if(number >= 0 && number < 26){
        return String.fromCharCode(97+number);
    } else{
        return "Z";
    }
};

