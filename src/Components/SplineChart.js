import React from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
export default function SplineChart(props){

	const {plotRecords} = props;

		const options = {
			zoomEnabled:true,
			animationEnabled: true,
			title:{
				text: plotRecords.chartTitle
			},
			axisX: {
				valueFormatString: plotRecords.valueFormatString
			},
			axisY: {
				title: plotRecords.yAxisTitle,
				prefix: "",
				includeZero: true,
				zoomType: "x"
			},
			data: plotRecords.dataPoints,
		}
		
	return (
		<div>
			<CanvasJSChart options = {options} />
		</div>
	);
}