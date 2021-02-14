import React from 'react';   
import { Pie } from 'react-chartjs-2';

var data;

class Popup extends React.Component {  
	constructor(props){
		super(props);
				
		var men = localStorage.getItem("man");
		var women = localStorage.getItem("women");
		
		data = {	
			datasets: [{
				data: [men, women],
				backgroundColor: ["#0074D9", "#FF4136"]
			}],
			
			labels: [
				'Man',
				'Women'
			],
		
		};
	}
	
	render() { 
		document.getElementById("mainBody").style.position = "fixed";
		
		return (  
			<div className='popup'>  
				<Pie data={data} />
			</div>  
		);  
	}  
}  

export default Popup;