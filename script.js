$(document).ready(function () {

    const $Xinput = $('#dataX');
    const $Yinput = $('#dataY');
    const $start = $('.start');
    const $stepen_model_btn = $('.stepen_model_btn');
    const $linear_model_btn = $('.linear_model_btn');

    let x = [];
    let y = [];
    let setted = false;
    let n = 0;

    let sum = {};
    let calc = {};



    $linear_model_btn.on('click', function (e) {
        e.preventDefault();
        if (x.length > 0 || x.length > 0) {

            $Xinput.html(arrayStrFormat(x));
            $Yinput.html(arrayStrFormat(y));
        }
       
    });

    $stepen_model_btn.on('click', function (e) {
        e.preventDefault();
        if (!setted) {
            setted = true;
            x = getData($Xinput);
            y = getData($Yinput);
        }
        calc['x'] = getData($Xinput);
        calc['y'] = getData($Yinput);


        calc.x = lg(calc.x);
        calc.y = lg(calc.y);
       

        $Xinput.html(arrayStrFormat(calc.x));
        $Yinput.html(arrayStrFormat(calc.y));

    });

    $start.on('click', function(e)
    {
        e.preventDefault();

        start();
        showVar();
    });


    function arrayStrFormat(array) {
        let str = '';

        for (let i = 0; i < array.length; i++) {
            str += array[i] + "\n";
        }
        return str;

    }

    function lg(p_array) {
        let array = [];

        for (let i = 0; i < p_array.length; i++) {
            array.push(Math.log10(p_array[i]));
        }
        return array;
    }

    function start() {
        if (!setted) {
            setted = true;
            x = getData($Xinput);
            y = getData($Yinput);
        }


        n = x.length;

        sum.x = getArraySum(x);
        sum.y = getArraySum(y);

        calc['x'] = getData($Xinput);
        calc['y'] = getData($Yinput);

        

        calc['xy'] = multiple(calc.x, calc.y);
        calc['x_pow_2'] = pow_2(calc.x);
        calc['y_pow_2'] = pow_2(calc.y);
        calc['x_average'] = average(calc.x);
        calc['y_average'] = average(calc.y);
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
        calc['A'] = get_A();
        calc['A_average'] = average(calc.A);
        calc['F_fact'] = get_F_fact();
    }



    function showVar() {
        const $linear_regress = $('.linear_regress');
        const $b = $linear_regress.find('.var_b');
        const $a = $linear_regress.find('.var_a');
        const $regres_function = $linear_regress.find('.var_regres_function');
        const $r_xy = $linear_regress.find('.var_r_xy');
        const $r_xy_pow_2 = $linear_regress.find('.var_r_xy_pow_2');

        const $cheddoka = $linear_regress.find('.var_cheddoka');
        const $A_average = $linear_regress.find('.var_A_average');
        const $F_fact = $linear_regress.find('.var_F_fact');

        $b.html(calc.b);
        $a.html(calc.a);

        $regres_function.html(calc.a + " + " + calc.b + " * x");
        $r_xy.html(calc.r_xy);
        $r_xy_pow_2.html(calc.r_xy_pow_2);
        $cheddoka.html(get_cheddoka(calc.r_xy));
        $A_average.html(calc.A_average);
        $F_fact.html(calc.F_fact);
        console.log(calc);
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


    function get_F_fact() {
        return calc.r_xy_pow_2 / (1 - calc.r_xy_pow_2) * (n - 2);
    }

    function get_A() {
        let array = [];

        for (let i = 0; i < n; i++) {
            let res = Math.abs(calc.y__dif__y_teor[i] / calc.y[i]) * 100;
            array.push(res);
        }
        return array;
    }

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