import {
	Row,
	Col,
	Nav,
	NavItem,
	NavLink,
	Form,
	FormGroup,
	Label,
	Input,
	Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";
class AddDoctorForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			email: "",
			password: "",
			address: "",
			phone: "",
			department: "",
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(e) {
		console.log(this.state);
		axios
			.post("http://localhost:801/HMS/server/add-doctor.php", this.state)
			.then((res) => {
				console.log(res);
				alert(res.data);
			});
	}
	render() {
		return (
			<div>
				<Nav tabs>
					<NavItem>
						<NavLink active>
							<Link to="/adminLogin/addDoctor">Add Doctor</Link>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink>
							<Link to="/adminLogin/doctorList">Doctor List</Link>
						</NavLink>
					</NavItem>
				</Nav>
				<Form>
					<FormGroup>
						<Row className="mt-4">
							<Col sm="2">
								<Label for="docname">Name *</Label>
							</Col>
							<Col sm="6">
								<Input
									type="text"
									name="docname"
									onChange={(e) =>
										this.setState({ name: e.target.value })
									}
								/>
							</Col>
						</Row>
					</FormGroup>
					<FormGroup>
						<Row>
							<Col sm="2">
								<Label for="docname">Email *</Label>
							</Col>
							<Col sm="6">
								<Input
									type="email"
									name="docname"
									onChange={(e) =>
										this.setState({ email: e.target.value })
									}
								/>
							</Col>
						</Row>
					</FormGroup>
					<FormGroup>
						<Row>
							<Col sm="2">
								<Label for="docname">Password *</Label>
							</Col>
							<Col sm="6">
								<Input
									type="password"
									name="docname"
									onChange={(e) =>
										this.setState({
											password: e.target.value,
										})
									}
								/>

								<small>
									(Must be atleast of length 8 with one
									Uppercase,a number and a special character)
								</small>
							</Col>
						</Row>
					</FormGroup>
					<FormGroup>
						<Row>
							<Col sm="2">
								<Label for="docname">Address</Label>
							</Col>
							<Col sm="6">
								<Input
									type="text"
									name="docname"
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
						<Row>
							<Col sm="2">
								<Label for="docname">Phone</Label>
							</Col>
							<Col sm="6">
								<Input
									type="phone"
									name="docname"
									onChange={(e) =>
										this.setState({ phone: e.target.value })
									}
								/>
							</Col>
						</Row>
					</FormGroup>
					<FormGroup>
						<Row>
							<Col sm="2">
								<Label for="docname">Department</Label>
							</Col>
							<Col sm="6">
								<Input
									type="text"
									name="docname"
									onChange={(e) =>
										this.setState({
											department: e.target.value,
										})
									}
								/>
							</Col>
						</Row>
					</FormGroup>
					<FormGroup>
						<Row>
							<Col sm="9">
								<Button
									color="primary"
									onClick={() => this.handleSubmit()}
								>
									Submit
								</Button>
							</Col>
						</Row>
					</FormGroup>
				</Form>
			</div>
		);
	}
}
export default AddDoctorForm;
