function arrayStrFormat(array) {
    let str = '';

    for (let i = 0; i < array.length; i++) {
        str += array[i] + "\n";
    }
    return str;

}

function get_cheddoka(value) {
    let str = "Теснота связи - ";

    if (Math.abs(value) < 0.1) {
        str += "<strong class='text-danger'>";
        str += "Очень Слабая";
        str += "</strong>";
    }
    else if (Math.abs(value) < 0.3) {
        str += "<strong class='text-secondary'>";
        str += "Слабая";
        str += "</strong>";
    }
    else if (Math.abs(value) < 0.5) {
        str += "<strong class='text-info'>";
        str += "Умеренная";
        str += "</strong>";
    }
    else if (Math.abs(value) < 0.7) {
        str += "<strong class='text-primary'>";
        str += "Заметная";
        str += "</strong>";
    }
    else if (Math.abs(value) < 0.9) {
        str += "<strong class='text-success'>";
        str += "Высокая";
        str += "</strong>";
    }
    else if (Math.abs(value) >= 0.9) {
        str += "<strong class='text-warning'>";
        str += "Весьма Высокая";
        str += "</strong>";
    }

    if (value < 0) {
        str += ", обратная";
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


// Функции сортировки
function sortX(i, ii) { // По x (возрастание)
    if (i[0] > ii[0])
        return 1;
    else if (i[0] < ii[0])
        return -1;
    else
        return 0;
}

function grafik(x, y, y_teor) {


    let coor1 = [];


    for (let i = 0; i < x.length; i++) {
        let temp = [];

        temp[0] = x[i];
        temp[1] = y[i];
        coor1.push(temp);
    }
    coor1.sort(sortX);


    Highcharts.chart('grafik', {

        title: {
            text: 'Теоритические значения'
        },


        legend: {
            enabled: false,
            align: 'right',
            verticalAlign: 'middle'
        },

        yAxis: {
            title: {
                text: 'Y'
            }
        },
        xAxis: {
            title: {
                text: 'X'
            }
        },

        tooltip: {
            headerFormat: '',
            pointFormat: 'x = {point.x}, y = {point.y}'
        },

        series: [
            {
                name: "Y",
                data: coor1

            }

        ],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 1200
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    });
}