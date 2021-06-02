import axios from "axios";
import React from "react";
import { Input, FormGroup, Label, Button, Form, Row, Col } from "reactstrap";
class GetProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			email: "",
			address: "",
			phone: "",
			id: "",
		};
	}
	componentDidMount() {
		axios
			.post("http://localhost:801/HMS/server/getAdminProfile.php", {
				admin_id: this.props.id,
			})
			.then((res) => {
				console.log(res.data);
				this.setState({
					id: this.props.id,
					name: res.data.user_data[0].admin_name,
					email: res.data.user_data[0].email,
					address: res.data.user_data[0].address,
					phone: res.data.user_data[0].phone,
				});
			});
	}
	handleSubmit(e) {
		e.preventDefault();
		alert("Submitted");
		axios
			.post(
				"http://localhost:801/HMS/server/editAdminProfile.php",
				this.state
			)
			.then((res) => {
				console.log(res);
			});
	}
	render() {
		return (
			<div>
				<Row>
					<Col md="3"></Col>
					<Col>
						<h1 style={{ fontFamily: "cursive" }}>Edit Profile</h1>
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
					<Col sm="4"></Col>
				</Row>
			</div>
		);
	}
}
export default GetProfile;
