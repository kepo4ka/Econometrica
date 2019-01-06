$(document).ready(function () {

    const $matrix_input = $('#canonMatrix');
    const $log = $('.log');
    const $simplex_start = $('.simplex_start');
    const $simplex_table = $('.simplex_table').clone();


    let f_function = [];
    let matrix = [];
    let data = [];


    $simplex_start.on('click', function (e) {
        e.preventDefault();

        simplex();
    });


    function simplex() {
        $log.html("");

        let t = '';

        data = getMatrix($matrix_input);

        if (!data) {
            alert('Не удалось распознать Условие задачи. Возможна ошибка при вводе');
        }

        data.bazis = getFirstBazis(data);
        data.simplex = getSimplexTable(data);

        let lead = getLeadElem(data);
        data.lead = {i: lead.i, j: lead.j};
        data.relations = lead.relations;
        showTable(data, 1);

        t += JSON.stringify(data) + "\n";

        let new_simplex = newSimplexTable(data);
        data.simplex = new_simplex.simplex;
        data.f = new_simplex.f;
        showTable(data, 2, checkEnd(data));
        t += JSON.stringify(data) + "\n";


        let step = 3;

        while (!checkEnd(data)) {
            data.bazis = getBazis(data);
            let lead = getLeadElem(data);
            data.lead = {i: lead.i, j: lead.j};
            data.relations = lead.relations;

            new_simplex = newSimplexTable(data, true);
            data.simplex = new_simplex.simplex;
            data.f = new_simplex.f;
            t += JSON.stringify(data) + "\n";
            showTable(data, step++, checkEnd(data));

        }
        console.log(t);


        $log.append("<hr>");
        $log.append("<h1>ОТВЕТ:</h1>");


        let free_elems = "";

        for (let i = 0; i < data.m - 2; i++) {
            free_elems += data.simplex[i][data.m - 1] + "; ";
        }
        free_elems += data.simplex[data.m - 2][data.m - 1];

        $log.append("<h1>Функция в точке <span class='font-weight-bold text-primary'>(" + free_elems + ")</span> достигает максимума = <span class='font-weight-bold text-success'>" + data.f[data.m - 1] + "</span></h1>");

    }

    function showTable(pData, pStep, ilast) {
        const $table = $simplex_table.clone();
        let rows = pData.m + 2;
        let columns = pData.m + 2;

        let head = document.createElement('tr');
        let $head = $(head);
        $head.append("<td>Базисные переменные</td>");
        for (let j = 0; j < pData.m - 1; j++) {
            $head.append("<td>X" + (j + 1) + "</td>");
        }
        $head.append("<td>Свободный элемент</td>");
        $head.append("<td>Отношения</td>");
        $table.find('thead').append($head);

        let $tbody = $table.find('tbody');

        let bazic = [];


        for (let i = 0; i < pData.bazis.length; i++) {
            bazic.push(pData.bazis[i]);
        }

        bazic.push(pData.lead.j);

        for (let i = 0; i < pData.m - 1; i++) {
            if (!bazic.includes(i)) {
                continue;
            }

            let it_null = true;
            for (let j = 0; j < pData.m; j++) {
                if (pData.simplex[i][j] !== 0) {
                    it_null = false;
                    break;
                }
            }
            if (it_null) {
                continue;
            }

            let row = document.createElement("tr");
            let $row = $(row);

            $row.append("<td>X" + (i + 1) + "</td>");
            let new_lead = getLeadElem(data);

            for (let j = 0; j < pData.m; j++) {

                if (i == new_lead.i && j == new_lead.j && !ilast) {
                    $row.append("<td class='bg-success font-weight-bold text-white'>" + pData.simplex[i][j] + "</td>");
                }
                else {
                    $row.append("<td>" + pData.simplex[i][j] + "</td>");
                }
            }
            if (!ilast) {
                $row.append("<td class='text-warning font-weight-bold'>" + new_lead.relations[i] + "</td>");
            }

            $tbody.append($row);
        }

        let row = document.createElement("tr");
        let $row = $(row);
        $row.addClass('text-primary font-weight-bold');
        $row.append("<td>F</td>");

        for (let j = 0; j < pData.m; j++) {
            $row.append("<td>" + pData.f[j] + "</td>");
        }
        $tbody.append($row);

        $log.append("<h1>ШАГ " + pStep + "</h1>");
        $log.append($table);
    }


    function log(pdata) {
        let json = JSON.stringify(pdata);
        $log.append(json);
        $log.append("<hr>");
    }

    function checkEnd(data) {
        for (let j = 0; j < data.f.length; j++) {
            if (data.f[j] < 0) {
                return false;
            }
        }
        return true;
    }


    function newSimplexTable(data, show) {
        let simplex = [];
        let old_simplex = JSON.parse(JSON.stringify(data.simplex));

        for (let i = 0; i < data.m - 1; i++) {
            simplex[i] = [];
            for (let j = 0; j < data.m; j++) {
                simplex[i][j] = 0;
            }
        }

        if (old_simplex[data.lead.i][data.lead.j] !== 1) {

            let znam = old_simplex[data.lead.i][data.lead.j] + 1 - 1;

            for (let j = 0; j < data.m; j++) {
                old_simplex[data.lead.i][j] = (old_simplex[data.lead.i][j] / znam);
            }
        }

        for (let i = 0; i < data.m - 1; i++) {
            for (let j = 0; j < data.m; j++) {
                if (i == data.lead.j) {
                    simplex[i][j] = old_simplex[data.lead.i][j];
                }
                else {
                    simplex[i][j] = old_simplex[i][j] - (old_simplex[data.lead.i][j] * old_simplex[i][data.lead.j]);
                }
            }
        }

        let f = [];
        for (let j = 0; j < data.f.length; j++) {
            let val = data.f[j] - (simplex[data.lead.j][j] * data.f[data.lead.j]);
            f.push(val);
        }

        return {
            simplex: simplex,
            f: f
        }
    }

    function getSimplexTable(data) {
        let simplex = [];
        for (let i = 0; i < data.m - 1; i++) {
            simplex[i] = [];
            for (let j = 0; j < data.m; j++) {
                simplex[i].push(0);
            }
        }

        let ii = 0;
        for (let i = 0; i < data.bazis.length; i++) {
            for (let j = 0; j < data.m; j++) {
                simplex[data.bazis[i]][j] = parseFloat(data.matrix[ii][j]);

            }
            ii++;
        }

        return simplex;
    }


    function getLeadElem(data, show) {
        let relations_array = [];
        let min = Number.MAX_VALUE;
        let index = 0;
        for (let i = 0; i < data.m - 1; i++) {
            if (data.f[i] < min) {
                min = data.f[i];
                index = i;
            }
        }


        if (index < 0) {
            return false;
        }

        for (let i = 0; i < data.m - 1; i++) {
            let value = NaN;

            if (data.simplex[i][data.m - 1] > 0 && data.simplex[i][index] > 0) {

                value = data.simplex[i][data.m - 1] / data.simplex[i][index];
            }

            if (!isFinite(value)) {
                relations_array.push(NaN);
            }
            else {
                relations_array.push(value);
                min = value;
            }
        }
        let jindex = 0;
        min = Number.MAX_VALUE;


        for (let i = 0; i < relations_array.length; i++) {
            if (relations_array[i] < min && !isNaN(relations_array[i])) {
                min = relations_array[i];
                jindex = i;
            }
        }

        return {
            i: jindex,
            j: index,
            relations: relations_array
        };
    }

    function getBazis(data) {
        let bazis_array = [];

        for (let i = 0; i < data.m - 1; i++) {
            for (let j = 0; j < data.m; j++) {
                if (data.simplex[i][j] === 1) {

                    let it_one = true;

                    if (data.f[j] === 0) {
                        for (let k = 0; k < data.m - 1; k++) {
                            if (k === i) {
                                continue;
                            }
                            try {
                                if (data.simplex[k][j] !== 0) {
                                    it_one = false;
                                    break;
                                }
                            }
                            catch (er) {
                                console.log(data.m - 1, k, j, data.simplex);
                            }
                        }
                    }
                    else {
                        it_one = false;
                    }
                    if (it_one) {
                        bazis_array.push(j);
                    }
                }
            }
        }
        return bazis_array;
    }

    function getFirstBazis(data) {
        let bazis_array = [];
        for (let i = 0; i < data.n; i++) {
            for (let j = 0; j < data.m; j++) {
                if (data.matrix[i][j] === 1) {

                    let it_one = true;

                    if (data.f[j] === 0) {
                        for (let k = 0; k < data.n; k++) {
                            if (k === i) {
                                continue;
                            }
                            try {
                                if (data.matrix[k][j] !== 0) {
                                    it_one = false;
                                    break;
                                }
                            }
                            catch (er) {
                                console.log(data.n, k, j, data.matrix);
                            }
                        }
                    }
                    else {
                        it_one = false;
                    }
                    if (it_one) {
                        bazis_array.push(j);
                    }
                }
            }
        }
        return bazis_array;
    }


    function getMatrix($input) {
        let val = $input.val();
        t_array = val.trim().split('\n');
        let array = [];
        let f_array = [];
        let matrix = [];
        let m = 0;

        let f_input_array = t_array[0].trim().split(' ');

        for (let i = 0; i < f_input_array.length; i++) {
            f_input_array[i] = parseFloat(f_input_array[i]);

            if (!isNaN(f_input_array[i])) {
                f_array.push(f_input_array[i]);

                if (f_array[i] !== 0) {
                    f_array[i] = f_array[i] * (-1);
                }
            }
        }

        m = f_array.length;

        if (m === 0) {
            return false;
        }

        for (let i = 1; i < t_array.length; i++) {
            let split = t_array[i].trim().split(' ');

            if (split.length !== m) {
                return false;
            }

            let column = [];

            for (let j = 0; j < m; j++) {
                split[j] = parseFloat(split[j]);
                if (!isNaN(split[j])) {
                    column.push(split[j]);
                }
            }
            matrix.push(column);
        }
        return {
            f: f_array,
            matrix: matrix,
            m: m,
            n: matrix.length
        };
    }


})
;

