$(document).ready(function () {
    const $matrix_input = $('#Matrix');
    const $log = $('.log');
    const $start = $('.start');
    const $table = $('.result_table').clone();
    const $extremum = $('#extremum');
    const $result_container = $('.result_container');
    const $compare_symbol = $('.compare_symbol');
    const $compare_text = $('.compare_text');
    const $main_recommendations = $('.main_recommendations');

    let matrix = [];

    let old_value = localStorage.getItem('sedlovaya');
    $matrix_input.val(old_value);

    $('.nice-select').niceSelect();

    $start.on('click', function (e) {
        e.preventDefault();
        type = $extremum.val();
        matrix = getMatrix($matrix_input);
        let info = findSedlovaya(matrix);

        $result_container.removeClass('d-none');
        showRecomendation(info);

    });

    function findSedlovaya(matrix) {
        let row_min_array = [];
        let column_max_array = [];

        let alpha, beta;


        for (let i = 0; i < matrix.length; i++) {
            let min = Number.MAX_VALUE;

            for (let j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] < min) {
                    min = matrix[i][j];
                }
            }
            row_min_array.push(min);
        }

        for (let j = 0; j < matrix[0].length; j++) {
            let max = -Number.MAX_VALUE;

            for (let i = 0; i < matrix.length; i++) {
                if (matrix[i][j] > max) {
                    max = matrix[i][j];
                }
            }

            column_max_array.push(max);
        }

        alpha = arrayMax(row_min_array);
        beta = arrayMin(column_max_array);

        return {
            alpha: alpha,
            beta: beta
        };
    }


    function getStrategies(sedlovaya) {
        let first_strategies = [];
        let second_strategies = [];

        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == sedlovaya) {
                    first_strategies.push(i + 1);
                    second_strategies.push(j + 1);
                }
            }
        }

        first_strategies = first_strategies.filter(onlyUnique);
        second_strategies = second_strategies.filter(onlyUnique);

        return {
            first: first_strategies,
            second: second_strategies
        };
    }

    function showRecomendation(info) {
        $('.alpha_result').text(info.alpha);
        $('.beta_result').text(info.beta);

        const $first_strategies = $('.first_strategies');
        const $second_strategies = $('.second_strategies');
        
        let compare_symbol;
        let compare_text = '';
        let main_recommendations = '';

        if (info.alpha > info.beta) {
            compare_symbol = '>';
            compare_text = `У матрицы Нет седловой точки. Цена игы принадлежит интервалу <strong>(${info.alpha}:${info.beta})</strong>.`;
            main_recommendations = 'Игра в чистых стратегиях не решается.';
            $first_strategies.text('-');
            $second_strategies.text('-');
        }
        else if (info.alpha < info.beta) {
            compare_symbol = '<';
            compare_text = `У матрицы Нет седловой точки. Цена игы принадлежит интервалу <strong>(${info.alpha}:${info.beta})</strong>.`;
            main_recommendations = 'Игра в чистых стратегиях не решается.';
            $first_strategies.text('-');
            $second_strategies.text('-');
        }
        else {


            compare_symbol = '=';
            compare_text = `<strong>${info.alpha}</strong> - Цена игры.`;
            main_recommendations = 'Игра решается в чистых стратегиях.';
            let strategies = getStrategies(info.alpha);

            $first_strategies.html(JSON.stringify(strategies.first));
            $second_strategies.text(JSON.stringify(strategies.second));

        }
        $compare_symbol.text(compare_symbol);
        $compare_text.html(compare_text);
        $main_recommendations.html(main_recommendations);

    }

    function getMatrix($input) {
        let val = $input.val();

        localStorage.setItem('sedlovaya', val);

        t_array = val.trim().split('\n');
        let matrix = [];


        for (let i = 0; i < t_array.length; i++) {
            let split = t_array[i].trim().split(' ');

            let column = [];

            for (let j = 0; j < split.length; j++) {
                split[j] = parseFloat(split[j]);
                if (!isNaN(split[j])) {
                    column.push(split[j]);
                }
            }
            matrix.push(column);
        }
        return matrix;
    }


    function log(pdata) {
        let json = JSON.stringify(pdata);
        $log.append(json);
        $log.append("<hr>");
    }


})
;

