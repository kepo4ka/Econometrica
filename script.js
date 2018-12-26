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

    $linear_model_btn.on('click', function (e) {
        e.preventDefault();
        setup();
        const linear_reg = new Linear(x, y);
        linear_reg.show();
    });

    $stepen_model_btn.on('click', function (e) {
        e.preventDefault();
        setup();
        const stepen_reg = new Stepen(x, y);
        stepen_reg.show();
    });


    function setup() {
        x = getData($Xinput);
        y = getData($Yinput);
        n = x.length;
    }


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

    show() {
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


    show() {
        const $table = $('.table');
        const $b = $table.find('.var_b');
        const $a = $table.find('.var_a');
        const $regres_function = $table.find('.var_regres_function');
        const $r_xy = $table.find('.var_r_xy');
        const $r_xy_pow_2 = $table.find('.var_r_xy_pow_2');
        const $cheddoka = $table.find('.var_cheddoka');
        const $A_average = $table.find('.var_A_average');
        const $F_fact = $table.find('.var_F_fact');
        const $p_xy = $table.find('.var_p_xy');

        $b.html(this.b);
        $a.html(this.a);
        $regres_function.html(this.a + " + " + this.b + " * x");
        $r_xy.html(this.r_xy);
        $r_xy_pow_2.html(this.r_xy_pow_2);
        $cheddoka.html(get_cheddoka(this.r_xy));
        $A_average.html(this.A_average);
        $F_fact.html(this.F_fact);
        $p_xy.html(this.p_xy);
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


    /**
     * @return {number}
     */
    get X_gamma_pow_2() {
        return this.X_pow_2_average - this.X_average * this.X_average;
    }

    /**
     * @return {number}
     */
    get Y_gamma_pow_2() {
        return this.Y_pow_2_average - this.Y_average * this.Y_average;
    }

    /**
     * @return {number}
     */
    get X_gamma() {
        return Math.sqrt(this.X_gamma_pow_2);
    }

    /**
     * @return {number}
     */
    get Y_gamma() {
        return Math.sqrt(this.Y_gamma_pow_2);
    }

    get r_xy() {
        return this.b * (this.X_gamma / this.Y_gamma);
    }

    show() {
        const $table = $('.table');
        const $b = $table.find('.var_b');
        const $a = $table.find('.var_a');
        const $regres_function = $table.find('.var_regres_function');
        const $r_xy = $table.find('.var_r_xy');
        const $r_xy_pow_2 = $table.find('.var_r_xy_pow_2');
        const $cheddoka = $table.find('.var_cheddoka');
        const $A_average = $table.find('.var_A_average');
        const $F_fact = $table.find('.var_F_fact');
        const $p_xy = $table.find('.var_p_xy');

        $b.html(this.b);
        $a.html(this.a);
        $regres_function.html("10 ^ (" + this.a + ") * x ^ (" + this.b + ")");
        $r_xy.html(this.r_xy);
        $r_xy_pow_2.html(this.r_xy_pow_2);
        $cheddoka.html(get_cheddoka(this.r_xy));
        $A_average.html(this.A_average);
        $F_fact.html(this.F_fact);
        $p_xy.html(this.p_xy);
    }

}