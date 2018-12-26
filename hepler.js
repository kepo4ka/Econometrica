


function arrayStrFormat(array) {
    let str = '';

    for (let i = 0; i < array.length; i++) {
        str += array[i] + "\n";
    }
    return str;

}

function get_cheddoka(value) {
    let str = "Теснота связи - ";

    if (value < 0.1) {
        str += "Очень Слабая";
    }
    else if (value < 0.3) {
        str += "Слабая";
    }
    else if (value < 0.5) {
        str += "Умеренная";
    }
    else if (value < 0.7) {
        str += "Заметная";
    }
    else if (value < 0.9) {
        str += "Высокая";
    }
    else if (value >= 0.9) {
        str += "Весьма Высокая";
    }
    return str;
}

function getArraySum(array) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += array[i];
    }
    return sum;
}


function mround(number, ex) {

    ex = ex || 2;
    number = parseFloat(number);

    return parseFloat(number.toFixed(ex));
}

function getData($input) {

    let val = $input.val();
    t_array = val.split('\n');
    let array = [];

    for (let i = 0; i < t_array.length; i++) {

        t_array[i] = t_array[i].replace(',', '.');

        t_array[i] = parseFloat(t_array[i]);
        if (!isNaN(t_array[i])) {
            array.push(t_array[i]);
        }
    }
    return array;
}