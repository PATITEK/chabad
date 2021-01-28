export const PATTERN = {
    USERNAME: /^([a-zA-Z0-9]{1,})$/,
    EMAIL: /^([A-Za-z0-9._%+-])+@([A-Za-z0-9.-])+\.([A-Za-z]{2,4})$/,
    NOBLANK: /\S+/,
    STRONG_PASSWORD: /^.*(?=.{8,})((?=.*[!“§$%&/(){},:;/_#+*<> -]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
    STRONG_PASSWORD_TEMP: /^.*(?=.{8,})((?=.*[!“§$%&/(){},:;/_#+*<> -]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
    number: /[0-9]/,
    symbol: /[!“§$%&/(){},:;/_#+*<> -]/,
    minCharacters: /(?=.{8,})/,
    CODE: /^([A-Z0-9]{1,})$/,
    PHONE_NUMBER_VIETNAM: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
};