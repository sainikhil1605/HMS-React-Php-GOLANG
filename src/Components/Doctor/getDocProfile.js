import React from "react";
import {
	Button,
	Col,
	Form,
	FormGroup,
	Input,
	Label,
	Nav,
	NavItem,
	NavLink,
	Row,
} from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
class GetDocProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			email: "",
			address: "",
			phone: "",
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentDidMount() {
		axios
			.post("http://localhost:801/HMS/server/getDoctorProfile.php", {
				doc_id: this.props.id,
			})
			.then((res) => {
				console.log(res.data);
				this.setState({
					id: this.props.id,
					name: res.data.user_data[0].doctor_name,
					email: res.data.user_data[0].email,
					address: res.data.user_data[0].address,
					phone: res.data.user_data[0].phone,
				});
			});
	}
	handleSubmit(e) {
		e.preventDefault();
		axios
			.post(
				"http://localhost:801/HMS/server/editDocProfile.php",
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
							<Link to="/doctorLogin">View Appointments</Link>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink active>
							<Link to="#">Edit Profile</Link>
						</NavLink>
					</NavItem>
				</Nav>
				<Row>
					<Col md="3"></Col>
					<Col md="6">
						<Form className="mt-4">
							<FormGroup>
								<Row>
									<Col md="2">
										<Label>Name</Label>
									</Col>
									<Col>
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
								<Row>
									<Col md="2">
										<Label>Email</Label>
									</Col>
									<Col>
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
								<Row>
									<Col md="2">
										<Label>Phone Number</Label>
									</Col>
									<Col>
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
								<Row>
									<Col md="2">
										<Label>Adress</Label>
									</Col>
									<Col>
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
				</Row>
			</div>
		);
	}
}
export default GetDocProfile;
