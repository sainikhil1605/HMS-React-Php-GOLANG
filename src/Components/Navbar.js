import React from "react";
import { Link } from "react-router-dom";
import {
	Button,
	NavLink,
	Collapse,
	Nav,
	Navbar,
	NavbarText,
	NavbarToggler,
	NavItem,
} from "reactstrap";
class NavBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: "Department",
		};
	}
	handleClick(e) {
		this.setState({ active: e.target.innerHTML });
	}
	render() {
		let deptStyle = {
				color: "#61dafb",
				borderBottom: "#61dafb",
				borderRadius: "10px",
			},
			docStyle = { color: "white" },
			patientStyle = { color: "white" },
			feedStyle = { color: "white" },
			profileStyle = { color: "white" };
		if (this.state.active === "Departments") {
			deptStyle = {
				color: "#61dafb",
				borderBottom: "#61dafb",
				borderRadius: "10px",
			};
			docStyle = { color: "white" };
			patientStyle = { color: "white" };
			feedStyle = { color: "white" };
			profileStyle = { color: "white" };
		} else if (this.state.active === "Doctors") {
			deptStyle = { color: "white" };
			docStyle = { color: "#61dafb", borderBottom: "#61dafb" };
			patientStyle = { color: "white" };
			feedStyle = { color: "white" };
			profileStyle = { color: "white" };
		} else if (this.state.active === "Patients") {
			deptStyle = { color: "white" };
			docStyle = { color: "white" };
			patientStyle = { color: "#61dafb", borderBottom: "#61dafb" };
			feedStyle = { color: "white" };
			profileStyle = { color: "white" };
		} else if (this.state.active === "View Feedback") {
			deptStyle = { color: "white" };
			docStyle = { color: "white" };
			patientStyle = { color: "white" };
			feedStyle = { color: "#61dafb", borderBottom: "#61dafb" };
			profileStyle = { color: "white" };
		} else if (this.state.active === "Profile") {
			deptStyle = { color: "white" };
			docStyle = { color: "white" };
			patientStyle = { color: "white" };
			feedStyle = { color: "white" };
			profileStyle = { color: "#61dafb", borderBottom: "#61dafb" };
		}

		return (
			<div>
				<Navbar style={{ backgroundColor: "#242526" }} dark expand="md">
					<NavbarToggler
						onClick={() =>
							this.setState((prevState) => ({
								isOpen: !prevState.isOpen,
							}))
						}
					/>
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="mr-auto" navbar>
							<NavItem>
								<NavLink>
									<Link
										style={deptStyle}
										to="/adminLogin"
										onClick={(e) => this.handleClick(e)}
									>
										Departments
									</Link>
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink>
									<Link
										style={docStyle}
										to="/adminLogin/addDoctor"
										onClick={(e) => this.handleClick(e)}
									>
										Doctors
									</Link>
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink>
									<Link
										style={patientStyle}
										to="/adminLogin/addPatient"
										onClick={(e) => this.handleClick(e)}
									>
										Patients
									</Link>
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink>
									<Link
										style={feedStyle}
										to="/adminLogin/getFeedback"
										onClick={(e) => this.handleClick(e)}
									>
										View Feedback
									</Link>
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink>
									<Link
										style={profileStyle}
										to="/adminLogin/getProfile"
										onClick={(e) => this.handleClick(e)}
									>
										Profile
									</Link>
								</NavLink>
							</NavItem>
						</Nav>

						<NavbarText>
							<Button
								color="danger"
								onClick={() => this.props.fun()}
							>
								Logout
							</Button>
						</NavbarText>
					</Collapse>
				</Navbar>
			</div>
		);
	}
}
export default NavBar;
