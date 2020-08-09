
export function formatDatePython(stringDate, returnTime = false){
    if (!stringDate){
        return '';
    }

    //Formata da Data: 2020-06-03T22:23:27
    const ano = stringDate.substring(0,4);
    const mes = stringDate.substring(5,7);
    const dia = stringDate.substring(8,10);

    let result = dia + '/' + mes + '/' + ano;

    if(returnTime){
        const hrs = stringDate.substring(9,16);

        result = result + '-' + hrs;
    }

    return result;
};

export function dateNow(exibirhora = false, pythonFormat = false){
    const date = new Date();
    let dia     = ("0" + date.getDate()).slice(-2) // 1-31 -- o slice e o 0 e pra quando ter apenas um numero 
    let mes     = ("0" + (date.getMonth()+1)).slice(-2)          // 0-11 (zero=janeiro)
    let ano4    = date.getFullYear()       // 4 dígitos
    let hora    = ("0" + date.getHours()).slice(-2)          // 0-23
    let min     = ("0" + date.getMinutes()).slice(-2)        // 0-59
    let seg     = ("0" + date.getSeconds()).slice(-2)       // 0-59
    // let ano2    = date.getYear();           // 2 dígitos
    // let dia_sem = date.getDay();            // 0-6 (zero=domingo)
    // let mseg    = date.getMilliseconds();   // 0-999
    // let tz      = date.getTimezoneOffset(); // em minutos

    // Formata a data e a hora
    let result = '';
    if (pythonFormat){
        result = ano4 + '-' + mes + '-' + dia;
        if (exibirhora){
            result = result + 'T' + (hora + ':' + min + ':' + seg)
        }
    } else {
        result = dia + '/' + mes + '/' + ano4
        if (exibirhora){
            result = result + ' - ' + (hora + ':' + min + ':' + seg)
        }
    }

    return result;
}