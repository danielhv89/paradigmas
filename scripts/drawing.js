var myPieChart;
var globalPieChart;

var options = {
    //Boolean - Whether we should show a stroke on each segment
    segmentShowStroke : true,

    //String - The colour of each segment stroke
    segmentStrokeColor : "#fff",

    //Number - The width of each segment stroke
    segmentStrokeWidth : 2,

    //Number - The percentage of the chart that we cut out of the middle
    percentageInnerCutout : 50, // This is 0 for Pie charts

    //Number - Amount of animation steps
    animationSteps : 100,

    //String - Animation easing effect
    animationEasing : "easeOutBounce",

    //Boolean - Whether we animate the rotation of the Doughnut
    animateRotate : true,

    //Boolean - Whether we animate scaling the Doughnut from the centre
    animateScale : false,

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"

};

function createChart(){
var modelData = modelo.datos;
var data = [];

    $.each(modelData,function(index){
            data[index] = [
                {
                    value: modelData[index].parties.pln,
                    color:"#04B404",
                    highlight: "#01DF3A",
                    label: "PLN"
                },
                {
                    value: modelData[index].parties.pac,
                    color: "#FFFF00",
                    highlight: "#F7FE2E",
                    label: "PAC"
                },
                {
                    value: modelData[index].parties.plib,
                    color: "#FF0000",
                    highlight: "#FE2E2E",
                    label: "PLIB"
                },
                {
                    value: modelData[index].parties.rc,
                    color: "#0101DF",
                    highlight: "#2E2EFE",
                    label: "RC"
                }
            ];
    });
return data;
};


function createGlobalChart(){
var modelData = modelo.datos;
var data = [];
var totalParties = [];
var sumParties = 0;
    $.each(modelData, function(index){  
        $.each(modelData[index].parties,function(index2,count){    
            sumParties += count;
        }); 
        totalParties.push(sumParties);
                  
        sumParties=0;
    });
    $.each(modelData, function(index){
        data[index] = [
        {
            value: totalParties[0],
            color:"#FFFF00",
            highlight: "#F7FE2E",
            label: modelo.datos[0].nombre
        },
        {
            value: totalParties[1],
            color:"#00FFFF",
            highlight: "#58FAF4",
            label: modelo.datos[1].nombre
        },
        {
            value: totalParties[2],
            color:"#FF0000",
            highlight: "#FE2E2E",
            label: modelo.datos[2].nombre
        },
        {
            value: totalParties[3],
            color:"#0101DF",
            highlight: "#2E2EFE",
            label: modelo.datos[3].nombre
        },
        {
            value: totalParties[4],
            color:"#FF4000",
            highlight: "#FE642E",
            label: modelo.datos[4].nombre
        },
        {
            value: totalParties[5],
            color:"#3ADF00",
            highlight: "#9AFE2E",
            label: modelo.datos[5].nombre
        },
        {
            value: totalParties[6],
            color:"#0B6121",
            highlight: "#088A29",
            label: modelo.datos[6].nombre
        }
    ];
    });
    
return data;
};

function drawChart(){
    $(".charts label").css('display', 'block');
    var dataChart = createChart();
    var dataChart07 = createGlobalChart();
    $.each(modelo.datos,function(index){
        var ctx = document.getElementById("myChart"+index).getContext("2d");
        myPieChart = new Chart(ctx).Pie(dataChart[index],options);
        var globalCtx = document.getElementById("myChart7").getContext("2d");
        globalPieChart = new Chart(globalCtx).Pie(dataChart07[index],options);
    });
};








