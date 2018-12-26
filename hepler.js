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
        str += "<strong class='text-danger'>";
        str += "Очень Слабая";
        str += "</strong>";
    }
    else if (value < 0.3) {
        str += "<strong class='text-secondary'>";
        str += "Слабая";
        str += "</strong>";
    }
    else if (value < 0.5) {
        str += "<strong class='text-info'>";
        str += "Умеренная";
        str += "</strong>";
    }
    else if (value < 0.7) {
        str += "<strong class='text-primary'>";
        str += "Заметная";
        str += "</strong>";
    }
    else if (value < 0.9) {
        str += "<strong class='text-success'>";
        str += "Высокая";
        str += "</strong>";
    }
    else if (value >= 0.9) {
        str += "<strong class='text-warning'>";
        str += "Весьма Высокая";
        str += "</strong>";
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