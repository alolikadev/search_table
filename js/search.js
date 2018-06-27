$(document).ready(function (e) {
    var hostname = location.hostname;
    populate_default_lists();
    sortTable();
 
    $('.search-panel .dropdown-menu').find('a').click(function (e) {
        e.preventDefault();
        var param = $(this).attr("href").replace("#", "");
        var concept = $(this).text();
        $('.filtered_table').html("");
        $('.search-panel span#search_concept').text(concept);
        $('.input-group #search_param').val(param);

        if (param == "first_name"){
            populate_first_name_lists();
        }
        else if (param == "last_name"){
            populate_last_name_lists();
        }
        else if (param == "first_last_name"){
            populate_both_lists();
        }
        else if (param == "default_name"){
            populate_default_lists();
        }
        sortTable();
    });

       $("#search_btn").on("click", function () {
        search();
    });

    $('#search').keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            search();
            return false;
        }
    });

    function search() {
        var value = document.getElementById('search').value.toLowerCase().trim();
        console.log(value);
        if (value == "") {
            move();
            $('.filtered_table').html("");
            populate_default_lists();
        }
        else {
            $("table tr").each(function (index) {
                if (!index) return;
                $(this).find("td").each(function () {
                    var id = $(this).text().toLowerCase().trim();
                    var not_found = (id.indexOf(value) == -1);
                    $(this).closest('tr').toggle(!not_found);
                    return not_found;
                });
            });
        }
    }

    
    function move() {
        var elem = document.getElementById("myBar");
        var width = 1;
        var id = setInterval(frame, 10);
        function frame() {
            if (width >= 100) {
                clearInterval(id);
            } else {
                width++;
                elem.style.width = width + '%';
            }
        }
    }

    function sortTable() {
        var table, rows, switching, i, x, y, shouldSwitch;
        table = document.getElementById("filtered_table");
        switching = true;
     
        while (switching) {
          
            switching = false;
            rows = table.getElementsByTagName("TR");
           
            for (i = 1; i < (rows.length - 1); i++) {
             
                shouldSwitch = false;
              
                x = rows[i].getElementsByTagName("TD")[0];
                y = rows[i + 1].getElementsByTagName("TD")[0];
            
                if (Number(x.innerHTML) > Number(y.innerHTML)) {
                 
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
          
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }
    }

    function populate_default_lists() {
        var $table = $('#default');
        var $filtered_table = $('.filtered_table');
        $table.find('tbody').html('');

        $.get('https://alolikadev.github.io/search_table/html/default_table.html', function (data) { })
            .done(function (data) {
                var filtered_table = data;
                var content = $filtered_table.append(filtered_table);

                $.get('https://alolikadev.github.io/search_table/html/default.html', function (data, content) { })
                    .done(function (data) {
                       
                        var html = data;
                        $.get('https://data.cityofnewyork.us/resource/5scm-b38n.json', function (data) { })
                            .done(function (data) {
                                move();
                               
                                for (var i = 0; i < data.length; i++) {
                                    
                                    var list_no = data[i].list_no;
                                    if (list_no % 1 == 0)
                                        list_no = parseInt(list_no, 10);

                                    d = new Date(data[i].anniversary_date);
                                    anniversary_date = [d.getDate(), d.getMonth(), d.getFullYear()].join("/");

                                    e = new Date(data[i].established_date);
                                    established_date = [e.getDate(), e.getMonth(), e.getFullYear()].join("/");

                                    p = new Date(data[i].published_date);
                                    published_date = [p.getDate(), p.getMonth(), p.getFullYear()].join("/");

                                    var tr_html = html.replace('{{list_no}}', list_no);
                                    tr_html = tr_html.replace('{{first_name}}', data[i].first_name);
                                    tr_html = tr_html.replace('{{last_name}}', data[i].last_name);
                                    tr_html = tr_html.replace('{{list_agency_code}}', data[i].list_agency_code);
                                    tr_html = tr_html.replace('{{list_title_code}}', data[i].list_title_code);
                                    tr_html = tr_html.replace('{{list_title_desc}}', data[i].list_title_desc);
                                    tr_html = tr_html.replace('{{list_agency_desc}}', data[i].list_agency_desc);
                                    tr_html = tr_html.replace('{{group_no}}', data[i].group_no);
                                    tr_html = tr_html.replace('{{exam_no}}', data[i].exam_no);
                                    tr_html = tr_html.replace('{{anniversary_date}}', anniversary_date);
                                    tr_html = tr_html.replace('{{established_date}}', established_date);
                                    tr_html = tr_html.replace('{{published_date}}', published_date);
                                    tr_html = tr_html.replace('{{adj_fa}}', data[i].adj_fa);
                                    $filtered_table.find('#default').find('tbody').append(tr_html);
                                    
                                };
                               
                            });
                    });
            });
    }

    function populate_first_name_lists() {
        var $table = $('#first_name_tbl');
        var $filtered_table = $('.filtered_table');
        $table.find('tbody').html('');

        $.get('https://alolikadev.github.io/search_table/html/first_name_tbl.html', function (data) { })
            .done(function (data) {
                var filtered_table = data;
                var content = $filtered_table.append(filtered_table);
                
                $.get('https://alolikadev.github.io/search_table/html/first_name.html', function (data, content) { })
                    .done(function (data) {

                        var html = data;
                        $.get('https://data.cityofnewyork.us/resource/5scm-b38n.json?first_name=KIM&last_name=WONG', function (data) { })
                            .done(function (data) {
                                move();
                               
                                for (var i = 0; i < data.length; i++) {
                                    var list_no = data[i].list_no;
                                    if (list_no % 1 == 0)
                                        list_no = parseInt(list_no, 10);

                                    d = new Date(data[i].anniversary_date);
                                    anniversary_date = [d.getDate(), d.getMonth(), d.getFullYear()].join("/");

                                    e = new Date(data[i].established_date);
                                    established_date = [e.getDate(), e.getMonth(), e.getFullYear()].join("/");

                                    p = new Date(data[i].published_date);
                                    published_date = [p.getDate(), p.getMonth(), p.getFullYear()].join("/");
                                    var tr_html = html.replace('{{list_no}}', list_no);
                                    tr_html = tr_html.replace('{{first_name}}', data[i].first_name);
                                    tr_html = tr_html.replace('{{last_name}}', data[i].last_name);
                                    tr_html = tr_html.replace('{{list_agency_code}}', data[i].list_agency_code);
                                    tr_html = tr_html.replace('{{list_title_code}}', data[i].list_title_code);
                                    tr_html = tr_html.replace('{{list_title_desc}}', data[i].list_title_desc);
                                    tr_html = tr_html.replace('{{list_agency_desc}}', data[i].list_agency_desc);
                                    tr_html = tr_html.replace('{{group_no}}', data[i].group_no);
                                    tr_html = tr_html.replace('{{exam_no}}', data[i].exam_no);
                                    tr_html = tr_html.replace('{{anniversary_date}}', anniversary_date);
                                    tr_html = tr_html.replace('{{established_date}}', established_date);
                                    tr_html = tr_html.replace('{{published_date}}', published_date);
                                    tr_html = tr_html.replace('{{adj_fa}}', data[i].adj_fa);
                                    $filtered_table.find('#first_name_tbl').find('tbody').append(tr_html);
                                    
                                };
                                
                            });
                    });
            });
    }

    function populate_last_name_lists() {
        var $table = $('#last_name_tbl');
        var $filtered_table = $('.filtered_table');
        $table.find('tbody').html('');

        $.get('https://alolikadev.github.io/search_table/html/last_name_tbl.html', function (data) { })
            .done(function (data) {
                var filtered_table = data;
                var content = $filtered_table.append(filtered_table);

                $.get('https://alolikadev.github.io/search_table/html/last_name.html', function (data, content) { })
                    .done(function (data) {
                        move();
                        
                        var html = data;
                        $.get('https://data.cityofnewyork.us/resource/5scm-b38n.json?last_name=WONG', function (data) { })
                            .done(function (data) {
                                for (var i = 0; i < data.length; i++) {
                                    var list_no = data[i].list_no;
                                    if (list_no % 1 == 0)
                                        list_no = parseInt(list_no, 10);

                                    d = new Date(data[i].anniversary_date);
                                    anniversary_date = [d.getDate(), d.getMonth(), d.getFullYear()].join("/");

                                    e = new Date(data[i].established_date);
                                    established_date = [e.getDate(), e.getMonth(), e.getFullYear()].join("/");

                                    p = new Date(data[i].published_date);
                                    published_date = [p.getDate(), p.getMonth(), p.getFullYear()].join("/");

                                    var tr_html = html.replace('{{list_no}}', list_no);
                                    tr_html = tr_html.replace('{{mi}}', data[i].mi);
                                    tr_html = tr_html.replace('{{first_name}}', data[i].first_name);
                                    tr_html = tr_html.replace('{{last_name}}', data[i].last_name);
                                    tr_html = tr_html.replace('{{list_agency_code}}', data[i].list_agency_code);
                                    tr_html = tr_html.replace('{{list_title_code}}', data[i].list_title_code);
                                    tr_html = tr_html.replace('{{list_title_desc}}', data[i].list_title_desc);
                                    tr_html = tr_html.replace('{{list_agency_desc}}', data[i].list_agency_desc);
                                    tr_html = tr_html.replace('{{group_no}}', data[i].group_no);
                                    tr_html = tr_html.replace('{{exam_no}}', data[i].exam_no);
                                    tr_html = tr_html.replace('{{anniversary_date}}', anniversary_date);
                                    tr_html = tr_html.replace('{{established_date}}', established_date);
                                    tr_html = tr_html.replace('{{published_date}}', published_date);
                                    tr_html = tr_html.replace('{{adj_fa}}', data[i].adj_fa);
                                    $filtered_table.find('#last_name_tbl').find('tbody').append(tr_html);
                                    
                                };
                                
                            });
                    });
            });
    }

    function populate_both_lists() {
        var $table = $('#both_tbl');
        var $filtered_table = $('.filtered_table');
        $table.find('tbody').html('');

        $.get('https://alolikadev.github.io/search_table/html/both_tbl.html', function (data) { })
            .done(function (data) {
                var filtered_table = data;
                var content = $filtered_table.append(filtered_table);

                $.get('https://alolikadev.github.io/search_table/html/both.html', function (data, content) { })
                    .done(function (data) {
                        move();
                        
                        var html = data;
                        $.get('https://data.cityofnewyork.us/resource/5scm-b38n.json?last_name=WONG', function (data) { })
                            .done(function (data) {
                                for (var i = 0; i < data.length; i++) {
                                    var list_no = data[i].list_no;
                                    if (list_no % 1 == 0)
                                        list_no = parseInt(list_no, 10);

                                    d = new Date(data[i].anniversary_date);
                                    anniversary_date = [d.getDate(), d.getMonth(), d.getFullYear()].join("/");

                                    e = new Date(data[i].established_date);
                                    established_date = [e.getDate(), e.getMonth(), e.getFullYear()].join("/");

                                    p = new Date(data[i].published_date);
                                    published_date = [p.getDate(), p.getMonth(), p.getFullYear()].join("/");

                                    var tr_html = html.replace('{{list_no}}', list_no);
                                    tr_html = tr_html.replace('{{first_name}}', data[i].first_name);
                                    tr_html = tr_html.replace('{{last_name}}', data[i].last_name);
                                    tr_html = tr_html.replace('{{list_agency_code}}', data[i].list_agency_code);
                                    tr_html = tr_html.replace('{{list_title_code}}', data[i].list_title_code);
                                    tr_html = tr_html.replace('{{list_title_desc}}', data[i].list_title_desc);
                                    tr_html = tr_html.replace('{{list_agency_desc}}', data[i].list_agency_desc);
                                    tr_html = tr_html.replace('{{group_no}}', data[i].group_no);
                                    tr_html = tr_html.replace('{{exam_no}}', data[i].exam_no);
                                    tr_html = tr_html.replace('{{anniversary_date}}', anniversary_date);
                                    tr_html = tr_html.replace('{{established_date}}', established_date);
                                    tr_html = tr_html.replace('{{published_date}}', published_date);
                                    tr_html = tr_html.replace('{{adj_fa}}', data[i].adj_fa);
                                    $filtered_table.find('#both_tbl').find('tbody').append(tr_html);
                                    
                                };
                                
                            });
                    });
            });
    }
});
