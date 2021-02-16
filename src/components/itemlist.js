import React from "react"
import plus from '../images/plus_Icon.png';
import minus from '../images/minus_Icon.png';
import girlIcon from '../images/girl_Icon.png';
import manIcon from '../images/man_Icon.png';

const numberOfItems = 7;

var toggledItem, hasToggled = false;


class Item extends React.Component{
		constructor(props){
			super(props);
	
            this.state = {
                expanded: false,
				isVisible: true
            };
		}
		
		moreInfo(){
			if(this.state.expanded)
				return(<MoreInfo
					firstName={this.props.firstName}
					userName={this.props.userName}
					adress={this.props.adress}
					birthday={this.props.birthday}
					registred={this.props.registred}
					city={this.props.city}
					gender={this.props.gender}
					phone={this.props.phone}
					cell={this.props.cell}
					bigPic={this.props.bigPic}
					email={this.props.email}
					zipCode={this.props.zipCode}
				/>);
			
		}
	
		isClicked = () => {
			if(hasToggled && this.state.expanded){ //на выбраную, закрытие
				hasToggled = false;
				toggledItem = null;
				this.setState({expanded: false});
			} else if(hasToggled && !this.state.expanded) {
				toggledItem.setState({expanded: false});
				toggledItem = this;
				this.setState({expanded: true});
			} else {
				hasToggled = true;
				this.setState({expanded: true});
				toggledItem = this;
			}
		}
		
		isHighlighted(){
			if(this.props.id % 2) return "highlightedItem";
			return "item";
		}
		
		render(){
			if(!this.props.visible)
				return <div />
			
			return(
				<div className={this.isHighlighted()}>
					<table>
						<tbody>
							<tr>
								<td><img src={JSON.parse(this.props.smallPic)} alt="ERROR" /></td>
								<td>{JSON.parse(this.props.lastName)}</td>
								<td>{JSON.parse(this.props.firstName)}</td>
								<td>{JSON.parse(this.props.userName)}</td>
								<td>{JSON.parse(this.props.phone)}</td>
								<td>{JSON.parse(this.props.adress)}</td>
								<td><img className="toggleButton" onClick={this.isClicked} src={(this.state.expanded) ? minus : plus} alt="ERROR"/></td>
							</tr>
						</tbody>
					</table>
					{this.moreInfo()}
				</div> 
			);
	}
};

class MoreInfo extends React.Component{
	
	sliceDate(Date){;
		return Date.substr(0, 10);
	}
	
	
	render(){
		return(
			<div>
				<table className="genderTable">
					<tbody>
						<tr>
							<td><h2>{JSON.parse(this.props.firstName)}</h2></td>
							<td><img className="genderIcon" src={JSON.parse(this.props.gender) === "female" ?  manIcon :  girlIcon} alt="ERROR" /></td>
						</tr>	
					</tbody>
				</table>
				<table>
					<tbody>
						<tr>
							<td><h1>Username:</h1> {JSON.parse(this.props.userName)}</td>
							<td><h1>Address:</h1> {JSON.parse(this.props.adress)} </td>
							<td><h1>Birthday:</h1> {this.sliceDate(JSON.parse(this.props.birthday))} </td>
							<td rowSpan="3"><img src={JSON.parse(this.props.bigPic)} alt="ERROR" /></td>
						</tr>	
						<tr>
							<td><h1>Registred:</h1> {this.sliceDate(JSON.parse(this.props.registred))}</td>
							<td><h1>City:</h1> {JSON.parse(this.props.city)}</td>
							<td><h1>Phone:</h1> {JSON.parse(this.props.phone)}</td>
						</tr>	
						<tr>
							<td><h1>Email:</h1> {JSON.parse(this.props.email)}</td>
							<td><h1>Zip code:</h1> {JSON.parse(this.props.zipCode)}</td>
							<td><h1>Cell:</h1> {JSON.parse(this.props.cell)}</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

class ItemList extends React.Component{
	constructor(props){
		super(props);
		
		this.firstSearchBar = React.createRef();
		
		this.state = { 
			list: [],
			filter: []
		};
	}

	componentDidMount(){
		var Filter = [];
		
		for(var i = 0; i < numberOfItems; i++){
			this.sendRequest(i);
			Filter.push(true);
		}
		
		this.setState({
			filter: Filter
		});
}

	sendRequest(itemIndex){
		const xhr = new XMLHttpRequest();
		xhr.open("GET", 'https://randomuser.me/api/?format=JSON');
		xhr.setRequestHeader("content-type", "application/json");
		xhr.onreadystatechange = function(){
			if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200){
				var List = this.state.list;
				List[itemIndex] = JSON.parse(xhr.response);
				
				this.setState({list: List});
			}
		}.bind(this)
		xhr.send();
	}

	genderChartCounter(){
		var women = 0, man = 0;
		
		this.state.list.map((item, i) => {
			if(this.state.list[i].results[0].gender === "female")
				women++;
			else
				man++;
			
			return <div />
		});
		
		localStorage.setItem("women", women);
		localStorage.setItem("man", man);
	}

	nameSearch = () => {
		var searchBar = this.firstSearchBar.current;
		var arr = this.state.filter;
		
		this.state.filter.map((item, i) => {
			if(this.state.list[i].results[0].name.first.search(searchBar.value)===-1)
				arr[i] = false;
			else 
				arr[i] = true;
			
			this.setState({filter: arr});
			return <div />;
		})
	}
	
	render(){
		for(var i = 0; i < numberOfItems; i++)
			if(this.state.list[i] === undefined)
				return <h3>Sending AJAX requests. If loading too long please check your CORS policy and internet connection or just refresh the page</h3>
		
		return(
			<div className="users" onLoad={this.genderChartCounter()}>
                <table>
					<tbody>
						<tr>
							<td><h1>Search:</h1></td>
							<td><input type="search" defaultValue="Disabled" /></td>
							<td><input ref={this.firstSearchBar} type="search" defaultValue="Input here" onChange={this.nameSearch} /></td>
							<td><input type="search" defaultValue="Disabled" /></td>
							<td><input type="search" defaultValue="Disabled" /></td>
							<td><input type="search" defaultValue="Disabled" /></td>
							<td />
						</tr>
					</tbody>
				</table>
				{this.state.list.map((item, i) => <Item 
					id={i} 
					key={i}
					visible={this.state.filter[i]}
					lastName={JSON.stringify(this.state.list[i].results[0].name.last)}
					firstName={JSON.stringify(this.state.list[i].results[0].name.first)}
					userName={JSON.stringify(this.state.list[i].results[0].login.username)}
					birthday={JSON.stringify(this.state.list[i].results[0].dob.date)}
					adress={JSON.stringify(this.state.list[i].results[0].location.state)}
					city={JSON.stringify(this.state.list[i].results[0].location.city)}
					zipCode={JSON.stringify(this.state.list[i].results[0].location.postcode)}
					email={JSON.stringify(this.state.list[i].results[0].email)}
					gender={JSON.stringify(this.state.list[i].results[0].gender)}
					phone={JSON.stringify(this.state.list[i].results[0].phone)}
					cell={JSON.stringify(this.state.list[i].results[0].cell)}
					registred={JSON.stringify(this.state.list[i].results[0].registered.date)}
					smallPic={JSON.stringify(this.state.list[i].results[0].picture.medium)}
					bigPic={JSON.stringify(this.state.list[i].results[0].picture.large)}
				/>)}
            </div>
        );
    }
}

export default ItemList;
