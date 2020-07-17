
export function formatDate(stringDate, returnTime = false){
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