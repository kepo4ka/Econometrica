$(document).ready(function () {

    const $Xinput = $('#dataX');
    const $Yinput = $('#dataY');
    // const $start = $('.start');
    const $stepen_model_btn = $('.stepen_model_btn');
    const $linear_model_btn = $('.linear_model_btn');
    const $table = $('.table');
    let x = [];
    let y = [];
    let setted = false;
    let n = 0;

    let sum = {};
    let calc = {};

    setup();
    window.test = new Stepen(x, y);


    $linear_model_btn.on('click', function (e) {
        e.preventDefault();
        setup();

    });

    // $stepen_model_btn.on('click', function (e) {
    //     e.preventDefault();
    //     stepen();
    //     showStepen();
    // });


    function stepen() {
        setup();
        calc.x = lg(calc.x);
        calc.y = lg(calc.y);

    }

    function showStepen() {
        const $b = $table.find('.var_b');
        const $a = $table.find('.var_a');
        const $regres_function = $table.find('.var_regres_function');
        const $r_xy = $table.find('.var_r_xy');
        const $r_xy_pow_2 = $table.find('.var_r_xy_pow_2');
        const $cheddoka = $table.find('.var_cheddoka');
        const $A_average = $table.find('.var_A_average');
        const $F_fact = $table.find('.var_F_fact');

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


    function linear() {
        setup();

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


    function showLinear() {

        const $b = $table.find('.var_b');
        const $a = $table.find('.var_a');
        const $regres_function = $table.find('.var_regres_function');
        const $r_xy = $table.find('.var_r_xy');
        const $r_xy_pow_2 = $table.find('.var_r_xy_pow_2');
        const $cheddoka = $table.find('.var_cheddoka');
        const $A_average = $table.find('.var_A_average');
        const $F_fact = $table.find('.var_F_fact');

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


    function setup() {
        x = getData($Xinput);
        y = getData($Yinput);
        n = x.length;

        calc['x'] = x;
        calc['y'] = y;
    }


    //
    // function lg(p_array) {
    //     let array = [];
    //
    //     for (let i = 0; i < p_array.length; i++) {
    //         array.push(Math.log10(p_array[i]));
    //     }
    //     return array;
    // }
    //
    //
    // function get_F_fact() {
    //     return calc.r_xy_pow_2 / (1 - calc.r_xy_pow_2) * (n - 2);
    // }
    //
    // function get_A() {
    //     let array = [];
    //
    //     for (let i = 0; i < n; i++) {
    //         let res = Math.abs(calc.y__dif__y_teor[i] / calc.y[i]) * 100;
    //         array.push(res);
    //     }
    //     return array;
    // }
    //
    // function get_y__dif__y_teor() {
    //     let array = [];
    //     for (let i = 0; i < n; i++) {
    //         let res = calc.y[i] - calc.y_teor[i];
    //         array.push(res);
    //     }
    //     return array;
    // }
    //
    //
    // function get_y_teor() {
    //     let array = [];
    //     for (let i = 0; i < n; i++) {
    //         let res = calc.a + calc.b * calc.x[i];
    //         array.push(res);
    //     }
    //     return array;
    // }
    //
    //
    // function get_r_xy() {
    //     let res = calc.b * (calc.x_gamma / calc.y_gamma);
    //     return res;
    // }
    //
    //
    // function get_gamma_pow_2(t) {
    //     let res = 0;
    //     switch (t) {
    //         case 'x':
    //             res = calc.x_pow_2_average - calc.x_average * calc.x_average;
    //             break;
    //         case 'y':
    //             res = calc.y_pow_2_average - calc.y_average * calc.y_average;
    //             break;
    //     }
    //     return res;
    // }
    //
    // function get_gamma(t) {
    //     let res = 0;
    //
    //     switch (t) {
    //         case 'x':
    //             res = Math.sqrt(calc.x_gamma_pow_2);
    //             break;
    //         case 'y':
    //             res = Math.sqrt(calc.y_gamma_pow_2);
    //             break;
    //     }
    //     return res;
    // }
    //
    //
    // function get_a() {
    //     let res = calc.y_average - calc.b * calc.x_average;
    //     return res;
    // }
    //
    // function get_b() {
    //     let res = (calc.xy_average - calc.y_average * calc.x_average) / (calc.x_pow_2_average - calc.x_average * calc.x_average);
    //     return (res);
    // }


});


class ecoFuntion {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.n = x.length;
    }

    static average(p_array) {
        let sum = getArraySum(p_array);
        let average = sum / p_array.length;
        return average;
    }


    static pow_2(p_array) {
        let array = [];
        for (let i = 0; i < p_array.length; i++) {
            let res = p_array[i] * p_array[i];
            array.push(res);
        }
        return array;
    }

    static  multiple(arr1, arr2) {
        let array = [];
        for (let i = 0; i < arr1.length; i++) {
            let res = arr1[i] * arr2[i];
            array.push(res);
        }
        return array;
    }


}

class Linear extends ecoFuntion {
    constructor(x, y) {
        super(x, y);
    }

    get xy() {
        return ecoFuntion.multiple(this.x, this.y);
    }

    get xy_average() {
        return ecoFuntion.average(this.xy);
    }

    get x_pow_2() {
        return ecoFuntion.pow_2(this.x);
    }

    get y_pow_2() {
        return ecoFuntion.pow_2(this.y);
    }

    get x_average() {
        return ecoFuntion.average(this.x);
    }

    get y_average() {
        return ecoFuntion.average(this.y);
    }

    get x_pow_2_average() {
        return ecoFuntion.average(this.x_pow_2);
    }

    get y_pow_2_average() {
        return ecoFuntion.average(this.y_pow_2);
    }

    get a() {
        return this.y_average - this.b * this.x_average;
    }

    get b() {
        return (this.xy_average - this.y_average * this.x_average) / (this.x_pow_2_average - this.x_average * this.x_average);
    }


    get y_teor() {
        let array = [];
        for (let i = 0; i < this.n; i++) {
            let res = this.a + this.b * this.x[i];
            array.push(res);
        }
        return array;
    }

    get y__dif__y_teor() {
        let array = [];
        for (let i = 0; i < this.n; i++) {
            let res = this.y[i] - this.y_teor[i];
            array.push(res);
        }
        return array;
    }

    get y__dif__y_teor___pow_2() {
        return ecoFuntion.pow_2(this.y__dif__y_teor);
    }

    get y__dif__y_teor___pow_2__average() {
        return ecoFuntion.average(this.y__dif__y_teor___pow_2);
    }

    get x_gamma_pow_2() {
        return this.x_pow_2_average - this.x_average * this.x_average;
    }

    get y_gamma_pow_2() {
        return this.y_pow_2_average - this.y_average * this.y_average;
    }

    get x_gamma() {
        return Math.sqrt(this.x_gamma_pow_2);
    }

    get y_gamma() {
        return Math.sqrt(this.y_gamma_pow_2);
    }

    get r_xy() {
        return this.b * (this.x_gamma / this.y_gamma);
    }

    get r_xy_pow_2() {
        return Math.pow(this.r_xy, 2);
    }

    get A() {
        let array = [];

        for (let i = 0; i < this.n; i++) {
            let res = Math.abs(this.y__dif__y_teor[i] / this.y[i]) * 100;
            array.push(res);
        }
        return array;
    }

    get A_average() {
        return ecoFuntion.average(this.A);
    }

    get p_xy() {
        return Math.sqrt(1 - (this.y__dif__y_teor___pow_2__average / this.y_gamma_pow_2));
    }

    /**
     * @return {number}
     */
    get F_fact() {
        return this.r_xy_pow_2 / (1 - this.r_xy_pow_2) * (this.n - 2);
    }


}

class Stepen extends Linear {
    constructor(x, y) {
        super(x, y);
    }

    get X() {
        let new_array = [];
        for (let i = 0; i < this.n; i++) {
            new_array.push(Math.log10(this.x[i]));
        }
        return new_array;
    }

    get Y() {
        let new_array = [];
        for (let i = 0; i < this.n; i++) {
            new_array.push(Math.log10(this.y[i]));
        }
        return new_array;
    }


    get XY() {
        return ecoFuntion.multiple(this.X, this.Y);
    }

    get XY_average() {
        return ecoFuntion.average(this.XY);
    }


    get X_pow_2() {
        return ecoFuntion.pow_2(this.X);
    }

    get Y_pow_2() {
        return ecoFuntion.pow_2(this.Y);
    }

    get X_average() {
        return ecoFuntion.average(this.X);
    }

    get Y_average() {
        return ecoFuntion.average(this.Y);
    }

    get X_pow_2_average() {
        return ecoFuntion.average(this.X_pow_2);
    }

    get Y_pow_2_average() {
        return ecoFuntion.average(this.Y_pow_2);
    }

    get b() {
        return (this.XY_average - this.Y_average * this.X_average) / (this.X_pow_2_average - this.X_average * this.X_average);
    }

    get a() {
        return this.Y_average - this.b * this.X_average;
    }




    get y_teor() {
        let array = [];
        for (let i = 0; i < this.n; i++) {
            let res = Math.pow(10, this.a) * Math.pow(this.x[i], this.b);
            array.push(res);
        }
        return array;
    }






}