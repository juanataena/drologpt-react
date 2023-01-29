export const LIGHT_THEME = {
    grid: { color: '#182D3B', alpha: 0.1, markerFillColor: '#fff', markerRadius: 0 },
    legend: { background: '#fff', color: '#000' },
    preview: { maskColor: '#E2EEF9', maskAlpha: 0.6, brushColor: '#C0D1E1', brushBorderColor: '#fff', brushBorderAlpha: 1, handleColor: '#fff' },
    xAxis: { textColor: '#8E8E93', textAlpha: 1 },
    yAxis: { textColor: '#8E8E93', textAlpha: 1 },
    title: { color: '#000' },
    localRange: { color: '#000' },
    zoomedRange: { color: '#000' },
    zoomText: { color: '#108BE3' },
    zoomIcon: { fill: '#108BE3' },
    buttons: { color: '#fff' },
    pie: { textColor: '#fff' }
};
  
export const DARK_THEME = {
    grid: { backgroundColor: 'black', color: '#fff', alpha: 0.1, markerFillColor: '#242f3e' },
    legend: { background: '#1c2533', color: '#fff' },
    preview: { maskColor: '#304259', maskAlpha: 0.6, brushColor: '#56626D', brushBorderAlpha: 0, handleColor: '#fff' },
    xAxis: { textColor: '#A3B1C2', textAlpha: 0.6 },
    yAxis: { textColor: '#A3B1C2', textAlpha: 0.6 },
    title: { color: '#fff' },
    localRange: { color: '#fff' },
    zoomedRange: { color: '#fff' },
    zoomText: { color: '#108BE3' },
    zoomIcon: { fill: '#108BE3' },
    buttons: { color: '#fff' },
    pie: { textColor: '#fff' },
    tooltip: { color: '#fff' }    
};

export const getTheme = (theme) => {
    if (theme === 'light') {
        return LIGHT_THEME;
    }
    return DARK_THEME;
};

export const  getOption = (title, chartCategories, chartSeries, chartNames, ySymbol) => ({
    title: {
        text: title,
    },
    tooltip: {
        trigger: "axis",
        axisPointer: {
            // type: "shadow",
            type: "cross",
            crossStyle: {
                color: "#ccc"
            },
            xAxisIndex: [0],
            yAxisIndex: [0],
            lineStyle: {
                color: "#ccc"
            },
            snap: true,
            label: {
                show: true,
                backgroundColor: "#fff",
                borderColor: "#ccc",
                borderWidth: 1,
                borderRadius: 4,
                padding: [4, 6],
                shadowBlur: 2,
                shadowColor: "#ccc",
                shadowOffsetX: 1,
                shadowOffsetY: 1,
                color: "#000",
                formatter: function (params) {
                    const value = params.value;
                    const valueAsDate = new Date(Number(value));
                    const isTimestamp = valueAsDate instanceof Date && (valueAsDate.toLocaleDateString().indexOf(['1970']) === -1 && valueAsDate.toLocaleDateString().indexOf(['1969']) === -1);
                    const label = isTimestamp ? valueAsDate.toLocaleDateString() + ' ' + valueAsDate.toLocaleTimeString() : value.toFixed(2) + ' ' + ySymbol;
                    return label;
                }
            }

        },
        formatter: function (params) {
            // console.log(params);
            const timestamp = params[0].name;
            const dateFormatted = new Date(Number(timestamp));
            var res = '<span style="text-align: center; borderr: 1px solid #555; backgroundd: #eee; display: block; font-weight: bold; color: #999; margin-bottom: -10px;">' + dateFormatted.toLocaleDateString() + ' ' + dateFormatted.toLocaleTimeString() + '</span>';
            for (var i = 0, l = params.length; i < l; i++) {
                const twoDigitsValue = params[i].value.toFixed(2);
                res += '<br/>' + params[i].marker + ' <b>' + params[i].seriesName + '</b> : <span style="colorr: red; text-align: right; borderr: 2px solid blue; font-weight: 400; display: inline-block; width: 70px;">' + twoDigitsValue + ' ' + ySymbol + '</span>';
            }
            return res;
        }
    },
    legend: {
        show: false,
        data: chartNames
    },
    grid: {
        left: "5%",
        right: "4%",
        bottom: "15%",
        containLabel: true,
    }, 
    toolbox: {
        show: true,
        feature: {
            dataZoom: {
            yAxisIndex: 'none'
            },
            dataView: { readOnly: true },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {}
        }
    },
    xAxis: {
        type: "category",
        data: chartCategories,
        axisLabel: {
        formatter: function (value, index) {
            return new Date(Number(value)).toLocaleDateString();
        },
        align: 'center',
        padding: [10, 1, 1, 1],
        
        }
    },
    yAxis: {
        type: "value",
        scale: true,
        axisLabel: {
        formatter: '{value} ' + ySymbol,
        align: 'right'
        }
        // min: "auto"
    },
    dataZoom: [
        {
            type: 'slider',
            xAxisIndex: 0,
            filterMode: 'none',
            labelFormatter: function (index, value) {
                const date = new Date(Number(value));
                return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
            } 
        },
        {
            type: 'slider',
            yAxisIndex: 0,
            filterMode: 'none',
            left: 0,
            padding: [1, 1, 1, 1],
            labelFormatter: function (index, value) {
                return  Number(value).toFixed(0) + ' ' + ySymbol;
            } 
        }
    ],
    series: chartSeries
});
      
export const   getSeriesFor = (chartData, chartNames, chartColors, yAxisMarkAreaStart, yAxisMarkAreaEnd) => {
        let series = [];
        // Iterate over chartNames properties
        for (const chartName in chartNames) {
            let chartNameValue = chartNames[chartName];
            let chartColorValue = chartColors[chartNameValue];
// debugger;
            series.push({
                name: chartNameValue,
                type: "line",
                data: chartData[chartNameValue],
                animationDuration: 1,
                itemStyle: {
                        color: chartColorValue
                },
                showSymbol: false,
                endLabel: {
                    show: true,
                    formatter: function (params) {
                      return params.seriesName + ': ' + params.data;
                    }
                },
                // markArea: {
                //     silent: true,
                //     data: [
                //       [
                //         {
                //           yAxis: yAxisMarkAreaStart,
                //           itemStyle: {
                //             color: "darkgrey"
                //           }
                //         },
                //         {
                //           yAxis: yAxisMarkAreaEnd,
                //           itemStyle: {
                //             color: "darkgrey"
                //           }
                //         }
                //       ]
                //     ]
                //   }
            
            });
        }
        // debugger;

        return series;
}