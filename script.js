let test = {};


$(document).ready(function () {

    const $Xinput = $('#dataX');
    const $Yinput = $('#dataY');
    const $znach = $('.znach');
    const $prognoz = $('.prognoz');

    let Xinput = Cookies.get('xinput');
    let Yinput = Cookies.get('yinput');

    if (Xinput && Yinput) {
        $Xinput.val(Xinput);
        $Yinput.val(Yinput);
    }


    // const $start = $('.start');
    const $stepen_model_btn = $('.stepen_model_btn');
    const $linear_model_btn = $('.linear_model_btn');
    const $pokaz_model_btn = $('.pokaz_model_btn');
    const $giper_model_btn = $('.giper_model_btn');
    const $logar_model_btn = $('.logar_model_btn');

    $('[data-toggle="tooltip"]').tooltip({
        animated: 'fade',
        placement: 'top',
        html: true
    });

    let customX = [];
    for (let i = 0; i < 500; i++) {
        customX.push(i);
    }

    let x = [];
    let y = [];
    let setted = false;
    let n = 0;
    let znach = parseFloat($znach.val());
    let prognoz = parseFloat($prognoz.val());
    let student_array = [];
    let phisher_array = [];
    let student = 0;
    let phisher = 0;

    let sum = {};
    let calc = {};

    loadCriticalValues();

    $('.nice-select').niceSelect();

    $znach.on('change', function () {
        znach = parseFloat($znach.val());
        loadCriticalValues();
    });

    $linear_model_btn.on('click', function (e) {
        e.preventDefault();

        setup();
        const linear_reg = new Linear(x, y);

        linear_reg.show();
        test = linear_reg;

    });

    $stepen_model_btn.on('click', function (e) {
        e.preventDefault();

        setup();
        const stepen_reg = new Stepen(x, y);
        stepen_reg.show();
    });
    $logar_model_btn.on('click', function (e) {
        e.preventDefault();

        setup();
        const logar_reg = new Logar(x, y);
        test = logar_reg;
        logar_reg.show();
    });

    $pokaz_model_btn.on('click', function (e) {
        e.preventDefault();

        setup();
        const pokaz_reg = new Pokaz(x, y);
        pokaz_reg.show();
    });

    $giper_model_btn.on('click', function (e) {
        e.preventDefault();

        setup();
        const giper_reg = new Giper(x, y);
        giper_reg.show();
    });


    function setup() {

        Cookies.set('xinput', $Xinput.val());
        Cookies.set('yinput', $Yinput.val());

        x = getData($Xinput);
        y = getData($Yinput);
        n = x.length;
        student = student_array[n - 4];
        phisher = phisher_array[n - 4];
    }

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

        static multiple(arr1, arr2) {
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

        get x_pow_2_sum() {
            let sum = 0;

            for (let i = 0; i < this.x.length; i++) {
                sum += this.x_pow_2[i];
            }
            return sum;
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

        get y__dif__y_teor___pow_2__sum() {
            let sum = 0;

            for (let i = 0; i < this.x.length; i++) {
                sum += this.y__dif__y_teor___pow_2[i];
            }
            return sum;
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

        /**
         * @return {number}
         */
        get Sost() {
            return Math.sqrt(this.y__dif__y_teor___pow_2__sum / (this.x.length - 2));
        }

        /**
         * @return {number}
         */
        get Mb() {
            return this.Sost / (this.x_gamma * Math.sqrt(this.x.length));
        }

        /**
         * @return {number}
         */
        get Ma() {
            return this.Sost * (Math.sqrt(this.x_pow_2_sum) / (this.x.length * this.x_gamma));

        }

        /**
         * @return {number}
         */
        get Mrxy() {
            return Math.sqrt((1 - this.r_xy_pow_2) / (this.x.length - 2));
        }


        get tb() {
            let res = this.b / this.Mb;

            return {
                val: res,
                check: res > student
            }
        }


        get ta() {
            let res = this.a / this.Ma;

            return {
                val: res,
                check: res > student
            }
        }

        get tr() {
            let res = this.r_xy / this.Mrxy;

            return {
                val: res,
                check: res > student
            }
        }


        get check_H0_student() {
            return this.tb.check && this.ta.check && this.tr.check;
        }

        get check_H0_phisher() {
            return this.F_fact > phisher;
        }

        get delta_a() {
            return this.Ma * student;
        }

        get delta_b() {
            return this.Mb * student;
        }


        get gamma_a_min() {
            return this.a - this.delta_a;
        }

        get gamma_a_max() {
            return this.a + this.delta_a;
        }

        get gamma_b_min() {
            return this.b - this.delta_b;
        }

        get gamma_b_max() {
            return this.b + this.delta_b;
        }

        get interval_a_zero() {
            return (this.gamma_a_min * this.gamma_a_max) > 0;
        }

        get interval_b_zero() {
            return (this.gamma_b_min * this.gamma_b_max) > 0;
        }

        get interval_zero() {
            return this.interval_a_zero && this.interval_b_zero;
        }

        /**
         * @return {number}
         */
        get Xp() {
            return this.x_average * prognoz / 100;
        }


        get Yp() {
            return this.a + this.b * this.Xp;
        }


        /**
         * @return {number}
         */
        get M_Yp() {
            return this.Sost * Math.sqrt(1 + 1 / n + ((this.Xp - this.x_average) * (this.Xp - this.x_average) / (n * this.x_gamma * this.x_gamma)));
        }


        get delta_Yp() {
            return student * this.M_Yp;
        }

        get gamma_Yp_min() {
            return this.Xp - this.delta_Yp;
        }

        get gamma_Yp_max() {
            return this.Xp + this.delta_Yp;
        }


        /**
         * @return {number}
         */
        get Dy() {
            return this.gamma_Yp_max / this.gamma_Yp_min;
        }

        y_teor_customX(p_x) {
            let array = [];
            for (let i = 0; i < p_x.length; i++) {
                let res = this.a + this.b * p_x[i];
                array.push(res);
            }
            return array;
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
            const $F_table = $table.find('.var_F_table');
            const $p_xy = $table.find('.var_p_xy');
            const $Mb = $table.find('.var_Mb');
            const $Ma = $table.find('.var_Ma');
            const $Mr = $table.find('.var_Mr');

            const $tb = $table.find('.var_tb');
            const $ta = $table.find('.var_ta');
            const $tr = $table.find('.var_tr');

            const $student = $('.var_student');
            const $H0 = $('.var_H0');
            const $H0_1 = $('.var_H0_1');
            const $delta_a = $('.var_delta_a');
            const $delta_b = $('.var_delta_b');
            const $gamma_a = $('.var_gamma_a');
            const $gamma_b = $('.var_gamma_b');
            const $var_analiz_dov_interval = $('.var_analiz_dov_interval');
            const $Xp = $('.var_Xp');
            const $Yp = $('.var_Yp');
            const $M_Yp = $('.var_M_Yp');
            const $delta_Yp = $('.var_delta_M_Yp');
            const $gamma_Yp = $('.var_gamma_Yp');
            const $Dy = $('.var_Dy');

            const $var = $('.var');

            $var.html('');

            $b.html(this.b);
            $a.html(this.a);
            $regres_function.html(this.getFunctionStr);
            $r_xy.html(this.r_xy);
            $r_xy_pow_2.html(this.r_xy_pow_2);
            $cheddoka.html(get_cheddoka(this.r_xy));
            $A_average.html(this.A_average);
            $F_fact.html(this.F_fact);
            $F_table.html(phisher);
            $p_xy.html(this.p_xy);


            if (!this.check_H0_phisher) {
                $H0_1.html('Гипотеза H0 принимается: выявленная зависимость имеет случайную природу, параметры уравнения и показателя тесноты статистически незначимы');
            }
            else {
                $H0_1.html('Гипотеза H0 о статистической незначимости уравнения регресии и показателя тесноты Отклоняется.');
            }

            $Mb.html(this.Mb);
            $Ma.html(this.Ma);
            $Mr.html(this.Mrxy);
            $tb.html(this.tb.val);
            $ta.html(this.ta.val);
            $tr.html(this.tr.val);


            if (this.tb.check) {
                $tb.addClass('text-success');
            }
            else {
                $tb.addClass('text-danger');
            }
            if (this.ta.check) {
                $ta.addClass('text-success');
            }
            else {
                $ta.addClass('text-danger');
            }
            if (this.tr.check) {
                $tr.addClass('text-success');
            }
            else {
                $tr.addClass('text-danger');
            }

            $student.html(student);

            if (this.check_H0_student) {
                $H0.html('Гипотеза H0 отклоняется: a,b r_xy не случайно отличаются от нуля, а статистически значимы');
                $gamma_a.html(this.a + " ± " + this.delta_a);
                $gamma_b.html(this.b + " ± " + this.delta_b);

                if (this.interval_a_zero) {
                    $gamma_a.addClass('text-success');
                }
                if (this.interval_b_zero) {
                    $gamma_b.addClass('text-success');
                }

                if (this.interval_zero) {
                    $var_analiz_dov_interval.html('С вероятностью ' + (1 - znach) + " параметры a и b не принимают нулевых значений и не являются статистически незначимыми");

                    $Xp.html(this.Xp);
                    $Yp.html(this.Yp);
                    $M_Yp.html(this.M_Yp);

                    $delta_a.html(this.delta_a);
                    $delta_b.html(this.delta_b);

                    $delta_Yp.html(this.delta_Yp);
                    $gamma_Yp.html(this.Xp + " ± " + this.delta_Yp);
                    $Dy.html(this.Dy);
                }
                else {
                    $var_analiz_dov_interval.html('С вероятностью ' + (1 - znach) + " параметры a и b принимают нулевые значения и являются статистически незначимыми");
                }
            }
            else {
                $H0.html('Гипотеза H0 принимается: a,b r_xy случайно отличаются от нуля и статистически НЕзначимы');
            }


            grafik(this.x, this.y, this.y_teor);
            grafikCustom(customX, this.y_teor_customX(customX));
        }


        get getFunctionStr() {
            return this.a + " + " + this.b + " * x";
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


        y_teor_customX(p_x) {
            let array = [];
            for (let i = 0; i < p_x.length; i++) {
                let res = Math.pow(10, this.a) * Math.pow(p_x[i], this.b);
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


        get getFunctionStr() {
            return "10 ^ (" + this.a + ") * x ^ (" + this.b + ")";
        }
    }


    class Logar extends Linear {
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


        get Xy() {
            return ecoFuntion.multiple(this.X, this.y);
        }

        get Xy_average() {
            return ecoFuntion.average(this.Xy);
        }


        get X_pow_2() {
            return ecoFuntion.pow_2(this.X);
        }


        get X_average() {
            return ecoFuntion.average(this.X);
        }

        get X_pow_2_average() {
            return ecoFuntion.average(this.X_pow_2);
        }

        get b() {
            return (this.Xy_average - this.y_average * this.X_average) / (this.X_pow_2_average - this.X_average * this.X_average);
        }

        get a() {
            return this.y_average - this.b * this.X_average;
        }

        get y_teor() {
            let array = [];
            for (let i = 0; i < this.n; i++) {
                let res = this.a + this.b * Math.log10(this.x[i]);
                array.push(res);
            }
            return array;
        }


        y_teor_customX(p_x) {
            let array = [];
            for (let i = 0; i < p_x.length; i++) {
                let res = this.a + this.b * Math.log10(p_x[i]);
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
        get X_gamma() {
            return Math.sqrt(this.X_gamma_pow_2);
        }


        get r_xy() {
            return this.b * (this.X_gamma / this.y_gamma);
        }


        get getFunctionStr() {
            return this.a + " + " + this.b + " * lg(x)";
        }
    }


    class Pokaz extends Linear {
        constructor(x, y) {
            super(x, y);
        }

        get Y() {
            let new_array = [];
            for (let i = 0; i < this.n; i++) {
                new_array.push(Math.log10(this.y[i]));
            }
            return new_array;
        }


        get xY() {
            return ecoFuntion.multiple(this.x, this.Y);
        }

        get xY_average() {
            return ecoFuntion.average(this.xY);
        }


        get Y_pow_2() {
            return ecoFuntion.pow_2(this.Y);
        }


        get Y_average() {
            return ecoFuntion.average(this.Y);
        }

        get Y_pow_2_average() {
            return ecoFuntion.average(this.Y_pow_2);
        }

        get b() {
            return (this.xY_average - this.Y_average * this.x_average) / (this.x_pow_2_average - this.x_average * this.x_average);
        }

        get a() {
            return this.Y_average - this.b * this.x_average;
        }


        get y_teor() {
            let array = [];
            for (let i = 0; i < this.n; i++) {
                let res = Math.pow(10, this.a) * Math.pow(10, (this.b * this.x[i]));
                array.push(res);
            }
            return array;
        }

        y_teor_customX(p_x) {
            let array = [];
            for (let i = 0; i < p_x.length; i++) {
                let res = Math.pow(10, this.a) * Math.pow(10, (this.b * p_x[i]));
                array.push(res);
            }
            return array;
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
        get Y_gamma() {
            return Math.sqrt(this.Y_gamma_pow_2);
        }

        get r_xy() {
            return this.b * (this.x_gamma / this.Y_gamma);
        }

        get getFunctionStr() {
            return "10 ^ (" + this.a + ") * 10 ^(" + this.b + " * x)";
        }
    }


    class Giper extends Linear {
        constructor(x, y) {
            super(x, y);
        }

        get z() {
            let array = [];

            for (let i = 0; i < this.x.length; i++) {
                array.push((1 / this.x[i]));
            }

            return array;
        }


        get zy() {

            return ecoFuntion.multiple(this.z, this.y);
        }

        get zy_average() {
            return ecoFuntion.average(this.zy);
        }

        get z_pow_2() {
            return ecoFuntion.pow_2(this.z);
        }

        get z_average() {
            return ecoFuntion.average(this.z);
        }

        get z_pow_2_average() {
            return ecoFuntion.average(this.z_pow_2);
        }

        get a() {
            return this.y_average - this.b * this.z_average;
        }

        get b() {
            return (this.zy_average - this.y_average * this.z_average) / (this.z_pow_2_average - this.z_average * this.z_average);
        }


        get y_teor() {
            let array = [];
            for (let i = 0; i < this.n; i++) {
                let res = this.a + this.b * 1 / this.x[i];
                array.push(res);
            }
            return array;
        }


        y_teor_customX(p_x) {
            let array = [];
            for (let i = 0; i < p_x.length; i++) {
                let res = this.a + this.b * 1 / p_x[i];
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

        get z_gamma_pow_2() {
            return this.z_pow_2_average - this.z_average * this.z_average;
        }

        get z_gamma() {
            return Math.sqrt(this.z_gamma_pow_2);
        }

        get r_xy() {
            return this.b * (this.z_gamma / this.y_gamma);
        }

        get A() {
            let array = [];

            for (let i = 0; i < this.n; i++) {
                let res = Math.abs(this.y__dif__y_teor[i] / this.y[i]) * 100;
                array.push(res);
            }
            return array;
        }


        get getFunctionStr() {
            return this.a + " + " + this.b + " * 1 / x";
        }

    }


    function loadCriticalValues() {
        $('.work_button').attr('disabled', true);


        $.ajax({
            url: 'student_critical.txt', success: function (data) {

                if (!data) {
                    alert('Ошибка загрузки таблицы критических значений Стьюдента. Перезагрузите страницу');
                    return false;
                }

                $('.work_button').attr('disabled', false);

                student_array = [];

                data = data.trim();
                let split = data.split('\n');
                let first = split[0].split(' ');


                for (let i = 1; i < split.length; i++) {
                    let line = split[i].trim().split(' ');

                    let num = 0;

                    switch (znach) {
                        case 0.05:
                            num = parseFloat(line[1]);
                            break;
                        case 0.01:
                            num = parseFloat(line[2]);
                            break;
                        case 0.001:
                            num = parseFloat(line[3]);
                            break;
                    }
                    student_array.push(num);
                }

            }
        });

        $.ajax({
            url: 'phisher_critical.txt', success: function (data) {

                if (!data) {
                    alert('Ошибка загрузки таблицы критических значений Фишера. Перезагрузите страницу');
                    return false;
                }


                $('.work_button').attr('disabled', false);

                phisher_array = [];

                data = data.trim();
                let split = data.split('\n');
                let first = split[0].split(' ');


                for (let i = 1; i < split.length; i++) {
                    let line = split[i].trim().split(' ');

                    let num = 0;

                    switch (znach) {
                        case 0.05:
                            num = parseFloat(line[1]);
                            break;
                        case 0.01:
                            num = parseFloat(line[2]);
                            break;
                        case 0.001:
                            num = parseFloat(line[3]);
                            break;
                    }
                    phisher_array.push(num);
                }

            }
        });
    }
});


