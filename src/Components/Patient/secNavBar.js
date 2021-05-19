import React from "react";
import { Navbar, Nav, NavItem, NavbarText, NavLink, Button } from "reactstrap";
import { withRouter } from "react-router-dom";
class SecNavBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
		};
		// this.logout=this.logout.bind(this);
	}
	logout() {
		sessionStorage.setItem(this.props.data, "");
		sessionStorage.setItem(this.props.name, "");
		sessionStorage.clear();
		sessionStorage.clear();
		// <Redirect to="/patientLogin" />
		// window.location.reload();
		this.props.history.push(this.props.link);
	}
	render() {
		return (
			<div>
				<Navbar style={{ backgroundColor: "#242526" }} dark expand="md">
					<Nav className="mr-auto" navbar>
						<NavItem>
							<NavLink href="/">Home</NavLink>
						</NavItem>
					</Nav>
					<NavbarText>
						<Button color="danger" onClick={() => this.logout()}>
							Logout
						</Button>
					</NavbarText>
				</Navbar>
			</div>
		);
	}
}
export default withRouter(SecNavBar);
