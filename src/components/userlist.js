import React from "react";
import ItemList from './itemlist';
import Popup from './popup';


class Header extends React.Component{
		render(){
			return(
				<table>
					<tbody>
						<tr>
							<td />
							<td><h1>Last</h1></td>
							<td><h1>First</h1></td>
							<td><h1>Username</h1></td>
							<td><h1>Phone</h1></td>
							<td><h1>Location</h1></td>
							<td />
						</tr>
					</tbody>
				</table>
		);
	}
};

class UserList extends React.Component{
	constructor(props){  
		super(props);  
		
		localStorage.setItem("women", 0);
		localStorage.setItem("man", 0);
		
		this.state = { showPopup: false };  
	}  
	
	togglePopup = () => {  
		document.getElementById("mainBody").style.position = "static";
		
		this.setState({  
			 showPopup: !this.state.showPopup  
		});
	}	

	render(){
		return(
			<div className="userField">
				<button onClick={this.togglePopup}><h1>Open/close gender chart</h1></button>  
				{this.state.showPopup ? <Popup className="popup" />  : <div />}  
				<Header />
				<ItemList />
			</div>
		);
	}
}

export default UserList;