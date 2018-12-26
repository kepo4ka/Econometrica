$(document).ready(function () {

    const $Xinput = $('#dataX');
    const $Yinput = $('#dataY');
    const $start = $('.start');
    let x = [];
    let y = [];
    let n = 0;

    let sum = {};
    let calc = {};


    $start.on('click', function (e) {
        e.preventDefault();
        x = getData($Xinput);
        y = getData($Yinput);
        n = x.length;

        $('.Xlength').text(x.length);
        $('.Ylength').text(y.length);


        sum.x = getArraySum(x);
        sum.y = getArraySum(y);

        calc['x'] = x;
        calc['y'] = y;
        calc['xy'] = multiple(x, y);
        calc['x_pow_2'] = pow_2(x);
        calc['y_pow_2'] = pow_2(y);
        calc['x_average'] = average(x);
        calc['y_average'] = average(y);
        calc['xy_average'] = average(calc.xy);
        calc['x_pow_2_average'] = average(calc.x_pow_2);
        calc['y_pow_2_average'] = average(calc.y_pow_2);
        calc['b'] = get_b();
        calc['a'] = get_a();
        calc['x_gamma_pow_2'] = get_gamma_pow_2('x');
        calc['x_gamma'] = get_gamma('x');
        calc['y_gamma_pow_2'] = get_gamma_pow_2('y');
        calc['y_gamma'] = get_gamma('y');
        calc['r_xy'] = get_r_xy();
        calc['r_xy_pow_2'] = calc.r_xy * calc.r_xy;
        
        calc['y_teor'] = get_y_teor();
      
        calc['y__dif__y_teor'] = get_y__dif__y_teor();

        console.log(calc);
    });


    function get_y__dif__y_teor() {
        let array = [];
        for (let i = 0; i < n; i++) {
            let res = calc.y[i] - calc.y_teor[i];
            array.push(res);
        }
        return array;
    }


    function get_y_teor() {
        let array = [];
        for (let i = 0; i < n; i++) {
            let res = calc.a + calc.b * calc.x[i];
            array.push(res);
        }
        return array;
    }


    function get_r_xy() {
        let res = calc.b * (calc.x_gamma / calc.y_gamma);
        return res;
    }


    function get_gamma_pow_2(t) {
        let res = 0;
        switch (t) {
            case 'x':
                res = calc.x_pow_2_average - calc.x_average * calc.x_average;
                break;
            case 'y':
                res = calc.y_pow_2_average - calc.y_average * calc.y_average;
                break;
        }
        return res;
    }

    function get_gamma(t) {
        let res = 0;

        switch (t) {
            case 'x':
                res = Math.sqrt(calc.x_gamma_pow_2);
                break;
            case 'y':
                res = Math.sqrt(calc.y_gamma_pow_2);
                break;
        }
        return res;
    }


    function get_a() {
        let res = calc.y_average - calc.b * calc.x_average;
        return res;
    }

    function get_b() {
        let res = (calc.xy_average - calc.y_average * calc.x_average) / (calc.x_pow_2_average - calc.x_average * calc.x_average);
        return (res);
    }

    function average(p_array) {
        let sum = getArraySum(p_array);
        let average = sum / p_array.length;
        return average;

    }

    function pow_2(p_array) {
        let array = [];
        for (let i = 0; i < p_array.length; i++) {
            let res = p_array[i] * p_array[i];
            array.push(res);
        }
        return array;
    }

    function multiple(arr1, arr2) {
        let array = [];
        for (let i = 0; i < arr1.length; i++) {
            let res = arr1[i] * arr2[i];
            array.push(res);
        }
        return array;
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

});