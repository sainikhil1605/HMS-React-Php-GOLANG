import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
	Button,
	Form,
	FormGroup,
	Input,
	Label,
	NavItem,
	NavLink,
	Nav,
	Row,
	Col,
	InputGroupButtonDropdown,
} from "reactstrap";
class BookAppointment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			email: "",
			contact: "",
			age: "",
			day: "",
			speciality: "",
			description: "",
			id: "",
		};
		this.inputRef = React.createRef();
	}
	handleSubmit(e) {
		console.log(this.state);
		axios
			.post(
				"http://localhost:801/HMS/server/bookAppointment.php",
				this.state
			)
			.then((res) => {
				console.log(res);
				alert(res.data);
			});
	}
	componentDidMount() {
		this.inputRef.current.focus();
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
						<NavLink active>
							<Link to="/patientLogin/bookAppointment">
								Book Appointment
							</Link>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink>
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
				<Row>
					<Col md="3"></Col>
					<Col md="6">
						<Form className="mt-3">
							<FormGroup>
								<Label>Name</Label>
								<Input
									innerRef={this.inputRef}
									type="text"
									value={sessionStorage.getItem(
										"patientName"
									)}
									onChange={(e) => {
										this.setState({ name: e.target.value });
									}}
								/>
							</FormGroup>
							<FormGroup>
								<Label>Email</Label>
								<Input
									type="email"
									value={sessionStorage.getItem(
										"patientEmail"
									)}
									onChange={(e) => {
										this.setState({
											email: e.target.value,
										});
									}}
								/>
							</FormGroup>
							<FormGroup>
								<Label>Contact</Label>
								<Input
									type="text"
									value={sessionStorage.getItem(
										"patientContact"
									)}
									onChange={(e) => {
										this.setState({
											contact: e.target.value,
										});
									}}
								/>
							</FormGroup>
							<FormGroup>
								<Label>Age</Label>
								<Input
									type="number"
									onChange={(e) => {
										this.setState({ age: e.target.value });
									}}
								/>
							</FormGroup>
							<FormGroup>
								<Label>Day</Label>
								<Input
									type="date"
									onChange={(e) => {
										this.setState({ day: e.target.value });
									}}
								/>
							</FormGroup>
							<FormGroup>
								<Label>Speciality</Label>
								<Input
									type="text"
									onChange={(e) => {
										this.setState({
											speciality: e.target.value,
										});
									}}
								/>
							</FormGroup>
							<FormGroup>
								<Label>Description</Label>
								<Input
									type="text"
									onChange={(e) => {
										this.setState({
											description: e.target.value,
										});
									}}
								/>
							</FormGroup>
							<FormGroup>
								<Label>Doctor Id</Label>
								<Input
									type="number"
									onChange={(e) => {
										this.setState({ id: e.target.value });
									}}
								/>
							</FormGroup>
							<FormGroup>
								<Button
									color="primary"
									onClick={() => this.handleSubmit()}
								>
									Submit
								</Button>
							</FormGroup>
						</Form>
					</Col>
				</Row>
			</div>
		);
	}
}
export default BookAppointment;
