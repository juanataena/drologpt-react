import React from 'react';
import { VictoryChart, VictoryPie, VictoryAxis } from "victory";


export default function MachinaChart (props) {

    const renderChart = () => {

        const nodes = props.nodesTree ? props.nodesTree : [];
        // filter by visible nodes in nodeTree
        const nodesFiltered = nodes.filter(node => node.visible === true && node.trades !== undefined && node.trades.length > -1);
        const HAS_CHART_DATA = nodesFiltered !== null && nodesFiltered.length > 0;
        let chartColors = null;

        const chartDataAdapted = nodesFiltered.map (node => {
            return {
                x: node.name,
                y: 10,
                
            }
        });

        return (
        <div className={'chart-container'}>
            {HAS_CHART_DATA &&
            
            <div className={'chart-loaded'}>
                <VictoryChart
                    domainPadding={0}
                    padding={{ top: 20, bottom: 20, left: 20, right: 20 }}
                    height={100}
                    width={100}
                    
                    domain={{ y: [0, 100] }}
                    legend={
                        {
                            // data: chartNames,
                            // orientation: 'horizontal',
                            // gutter: 50,
                            // style: {
                            //     labels: {
                            //         fontSize: 20,
                            //         padding: 20,
                            //         fill: '#000',
                            //         stroke: '#fff',
                            //         strokeWidth: 1,
                            //         fontFamily: 'Helvetica'
                            //     }
                            // }
                        }   
                    }
                    canvas = {{
                        width: '100px',
                        height: '100px',
                    }}

                    
                    // theme={VictoryTheme.material}

                >


                <VictoryAxis style={{ 
                    axis: {stroke: "transparent"}, 
                    ticks: {stroke: "transparent"},
                    tickLabels: { fill:"transparent"} 
                }} />

                <VictoryPie
                                    colorScale={chartColors}
                    innerRadius={20}
                    labelRadius={22}
                    style={{ labels: 
                        { fill: "white", fontSize: 5, width: 50}
                    }}
                    data={chartDataAdapted}
                />
                </VictoryChart>
            </div>
        
            }
            {!HAS_CHART_DATA &&
            
            'NO_HAS_DATA'
        }
      </div>

        );
}
    const renderLoading = () => {

        const data = props.nodesTree;
        // debugger;
        const HAS_CHART_DATA = data !== null && data.length > 0;

        if (HAS_CHART_DATA) {
        
            return (
                <div className={'chart-loading'}>
                    <VictoryPie
                        innerRadius={70}
                        labelRadius={110}
                        style={{ labels: { fill: "white", fontSize: 20, width: 100} }}
                        // data={chartDataAdapted}
                    />
                </div>
            );
        } else 
        return "Loading...";
        
        
    }

    // Render
    let value = props.nodesTree !== null ?props.nodesTree : '';
    let HAS_CHART_DATA = value != null && value.length > 0;
    // let machineName = props.machineName;
    // const themeClass = props.theme === 'dark' ? 'is-dark' : 'is-light';        

    return (
        <>
            <div className="chart-victory-container">
                {HAS_CHART_DATA &&
                    renderChart()
                }
                {!HAS_CHART_DATA &&
                    renderLoading()
                }
            </div>
        </>
        
    );
}
