import axios from "axios";
import React from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
class SignUp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			email: "",
			password: "",
			address: "",
			phone: "",
			sex: "",
			birthdate: "",
			age: "",
			blood_group: "",
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(e) {
		console.log(this.state);

		axios
			.post("http://localhost:801/HMS/server/add-patient.php", this.state)
			.then((res) => {
				console.log(res);
				alert(res.data);
			});
	}
	render() {
		return (
			<div>
				<Form style={{ marginTop: "25px" }}>
					<FormGroup>
						<Row>
							<Col sm="2">
								<Label>Name *</Label>
							</Col>
							<Col sm="10">
								<Input
									type="text"
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
								<Label>Email *</Label>
							</Col>
							<Col sm="10">
								<Input
									type="email"
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
								<Label>Password *</Label>
							</Col>
							<Col sm="10">
								<Input
									type="password"
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
								<Label>Address</Label>
							</Col>
							<Col sm="10">
								<Input
									type="text"
									onChange={(e) =>
										this.setState({
											address: e.target.values,
										})
									}
								/>
							</Col>
						</Row>
					</FormGroup>
					<FormGroup>
						<Row>
							<Col sm="2">
								<Label>Phone</Label>
							</Col>
							<Col sm="10">
								<Input
									type="phone"
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
								<Label>Sex</Label>
							</Col>
							<Col sm="10">
								<Input
									type="text"
									onChange={(e) =>
										this.setState({ sex: e.target.value })
									}
								/>
							</Col>
						</Row>
					</FormGroup>
					<FormGroup>
						<Row>
							<Col sm="2">
								<Label>Birthdate</Label>
							</Col>
							<Col sm="10">
								<Input
									type="text"
									onChange={(e) =>
										this.setState({
											birthdate: e.target.value,
										})
									}
								/>
							</Col>
						</Row>
					</FormGroup>
					<FormGroup>
						<Row>
							<Col sm="2">
								<Label>Age</Label>
							</Col>
							<Col sm="10">
								<Input
									type="number"
									onChange={(e) =>
										this.setState({ age: e.target.value })
									}
								/>
							</Col>
						</Row>
					</FormGroup>
					<FormGroup>
						<Row>
							<Col sm="2">
								<Label>Blood Group</Label>
							</Col>
							<Col sm="10">
								<Input
									type="text"
									onChange={(e) =>
										this.setState({
											blood_group: e.target.value,
										})
									}
								/>
							</Col>
						</Row>
					</FormGroup>
					<FormGroup>
						<Row>
							<Col sm="2"></Col>
							<Col sm="10">
								<Button onClick={(e) => this.handleSubmit()}>
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
export default SignUp;
