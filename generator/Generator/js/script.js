$(document).ready(function () {


    $('form').submit(function (event) {

        var howMuch = $('input[name="howMuch"]').val();
        var max = $('input[name="max"]').val();
        var min = $('input[name="min"]').val();

        var data = {
            jsonrpc: '2.0',
            method: 'generateIntegers',
            params: {
                apiKey: 'e282d86c-ed15-4d86-b19f-f1ee7085bed2',
                n: howMuch,
                min: min,
                max: max,
                replacement: true,
                base: 10
            },
            id: 2601
        };
        if (max > min) {
            $.ajax({
                    url: 'https://api.random.org/json-rpc/1/invoke',
                    type: "POST",
                    data: JSON.stringify(data), // stringify data object
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                })
                .done(function (data) {
                    console.log(data);
                    //console.log(data.result.random.data);
                    newArr = data.result.random.data;

                    chart(data); // make chart from pulled data

                });

            // stop the form from submitting the normal way and refreshing the page
            event.preventDefault();
            $('#reset').css('display', 'block');
            $('#post-btn').css('display', 'none');
            resetGenerator();
        } else {
            alert("The max number should be biger then min number.");
  
        }

    });

    function resetGenerator() {
        $('#reset').on('click', function () {
            window.location.reload(true);
        });
    }


    function chart(data) {
        var chartData = data.result.random.data;
        //sort data
        chartData.sort(function (a, b) {
            return a > b ? 1 : a < b ? -1 : 0;
        });
        console.log('SortedData', chartData);

        var ctx = document.getElementById("myChart").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: chartData,
                datasets: [{
                    label: 'Sorted random numbers',
                    data: chartData,
                    backgroundColor: 'teal',
                    borderColor: 'white',
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
});
