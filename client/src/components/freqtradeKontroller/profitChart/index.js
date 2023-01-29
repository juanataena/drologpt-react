import * as utils from '../../../core/utils';
import ReactEcharts from "echarts-for-react";
import * as chartUtils from '../../../core/chartUtils';
// import { TimeSeries, Index } from "pondjs";
export default function ProfitChart (props) {

    const renderChart = () => {


        const nodes = props.nodesTree;
        
        let chartData = props.profitData;
        const HAS_CHART_DATA = chartData !== null && chartData.x;
        // let nodeNames = null;
        let chartColors = null;
        let chartNames = null;

        if (HAS_CHART_DATA) {
            // nodeNames = Object.keys(chartData);
            // debugger;
            chartColors = HAS_CHART_DATA ? utils.getColorsFor(nodes) : null;
            chartNames = HAS_CHART_DATA ? utils.getNamesFor(nodes) : null;
            chartData = HAS_CHART_DATA ? utils.getDataFor(chartData, nodes) : null;
        }
        // La raya
        const yAxisMarkAreaStart = null;
        const yAxisMarkAreaEnd = null;
        const chartSeries = chartUtils.getSeriesFor(chartData, chartNames, chartColors, yAxisMarkAreaStart, yAxisMarkAreaEnd);

        const chartCategories = chartData.x;
        const chartTitle = "Profit (%) for " + chartNames.length + " nodes";
        const ySymbol = "%";
        // debugger;
        return (
            <div className={'chart-container'}>
            <ReactEcharts
              option={chartUtils.getOption(chartTitle, chartCategories, chartSeries, chartNames, ySymbol)}
              style={{ height: "100%", width: "100%" }}
              notMerge={true}
            />
            </div>

        );
    }

    // Render
    let value = props.nodesTree !== null ?props.nodesTree : '';
    let HAS_CHART_DATA = value != null && value.length > 0;
    // let machineName = props.machineName;
    // const themeClass = props.theme === 'dark' ? 'is-dark' : 'is-light';        

    return (
        <>
            {HAS_CHART_DATA && renderChart()}
        </>
    );
}
