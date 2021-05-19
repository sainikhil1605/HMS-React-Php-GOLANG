import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
	Button,
	Col,
	NavLink,
	Form,
	FormGroup,
	Input,
	Label,
	Nav,
	NavItem,
	Row,
} from "reactstrap";

class GetPatientProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: "",
			name: "",
			email: "",
			address: "",
			phone: "",
		};
	}
	componentDidMount() {
		axios
			.post("http://localhost:801/HMS/server/getPatientProfile.php", {
				patient_id: this.props.patient_id,
			})
			.then((res) => {
				console.log(res.data);
				this.setState({
					id: this.props.patient_id,
					name: res.data.user_data[0].patient_name,
					email: res.data.user_data[0].email,
					address: res.data.user_data[0].address,
					phone: res.data.user_data[0].phone,
				});
			});
	}
	handleSubmit(e) {
		e.preventDefault();
		console.log(this.state.id);
		// alert("Submitted");
		axios
			.post(
				"http://localhost:801/HMS/server/editPatientProfile.php",
				this.state
			)
			.then((res) => {
				console.log(res);
			});
	}
	render() {
		return (
			<div>
				<Nav tabs>
					<NavItem>
						<NavLink>
							<Link to="/patientLogin">Doctor List</Link>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink>
							<Link to="/patientLogin/bookAppointment">
								Book Appointment
							</Link>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink active>
							<Link to="/patientLogin/getPatientProfile">
								Edit Profile
							</Link>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink>
							<Link to="/patientLogin/patientAppointments">
								View Appointments
							</Link>
						</NavLink>
					</NavItem>
				</Nav>
				<Row className="mt-4">
					<Col>
						<h1>Edit Profile</h1>
						<Form>
							<FormGroup>
								<Row mt="3">
									<Col sm="2">
										<Label>Name</Label>
									</Col>
									<Col sm="10">
										<Input
											value={this.state.name}
											onChange={(e) =>
												this.setState({
													name: e.target.value,
												})
											}
										/>
									</Col>
								</Row>
							</FormGroup>
							<FormGroup>
								<Row mt="3">
									<Col sm="2">
										<Label>Email</Label>
									</Col>
									<Col sm="10">
										<Input
											value={this.state.email}
											onChange={(e) =>
												this.setState({
													email: e.target.value,
												})
											}
										/>
									</Col>
								</Row>
							</FormGroup>
							<FormGroup>
								<Row mt="3">
									<Col sm="2">
										<Label>Phone Number</Label>
									</Col>
									<Col sm="10">
										<Input
											value={this.state.phone}
											onChange={(e) =>
												this.setState({
													phone: e.target.value,
												})
											}
										/>
									</Col>
								</Row>
							</FormGroup>
							<FormGroup>
								<Row mt="3">
									<Col sm="2">
										<Label>Adress</Label>
									</Col>
									<Col sm="10">
										<Input
											value={this.state.address}
											onChange={(e) =>
												this.setState({
													address: e.target.value,
												})
											}
										/>
									</Col>
								</Row>
							</FormGroup>
							<FormGroup>
								<Button onClick={(e) => this.handleSubmit(e)}>
									Submit
								</Button>
							</FormGroup>
						</Form>
					</Col>
					<Col sm="6"></Col>
				</Row>
			</div>
		);
	}
}

export default GetPatientProfile;
