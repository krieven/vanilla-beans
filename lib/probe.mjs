//@ts-check
/**
 * Функция для доставния данных из вводных
 * 
 * @param {() => any} supplier функция для получения данных
 * @returns {{
 *      or: (def?:any) => any
 * }}
 */
export default function (supplier) {
    return {
        /**
         * пробуем воспользоваться supplier, 
         * если вылетает Error или undefined
         * возвращаем значение по умолчанию
         */
        or: function (def) {
            var result
            try {
                result = supplier()
            } catch (ignore) {
                
            }
            return typeof result === 'undefined' ? def : result
        }
    }
}


