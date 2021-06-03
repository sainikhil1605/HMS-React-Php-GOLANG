import React from "react";
import {
	Col,
	Nav,
	NavItem,
	NavLink,
	Row,
	Table,
	Input,
	Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
class GetAppointments extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			appointments: [],
			searchTerm: "",
			isOpen: false,
		};
		this.handlePres = this.handlePres.bind(this);
	}
	componentDidMount() {
		console.log(Cookies.get("doc_id"));

		axios
			.post("http://localhost:801/HMS/server/get-appointments.php", {
				doc_id: Cookies.get("doc_id"),
			})
			.then((res) => {
				console.log(res);
				try {
					this.setState({ appointments: res.data.user_data });
				} catch {
					this.setState({ appointments: undefined });
					console.log(this.state.appointments);
				}
			});
	}
	handlePres(appointment) {
		this.setState({ isOpen: false });
		console.log(this.state);
		console.log(appointment);
		axios
			.post("http://localhost:801/HMS/server/add-prescription.php", {
				apid: appointment.apid,
				prescription: this.state.prescription,
			})
			.then((res) => {
				alert(res.data);
			});
	}
	render() {
		return (
			<div>
				<Nav tabs>
					<NavItem>
						<NavLink active>
							<Link to="/doctorLogin">View Appointments</Link>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink>
							<Link to="/doctorLogin/editDocProfile">
								Edit Profile
							</Link>
						</NavLink>
					</NavItem>
				</Nav>
				<Row>
					<Col className="mt-3" sm="3"></Col>
					<Col className="mt-3">
						<Input
							style={{ width: "50%" }}
							placeholder="Search..."
							type="text"
							onChange={(e) =>
								this.setState({ searchTerm: e.target.value })
							}
						/>
						<Table
							striped
							style={{
								width: "50%",
								"box-shadow": "2px 2px 4px 4px #CCCCCC",
								marginTop: "30px",
							}}
						>
							<thead>
								<th>Name</th>
								<th>Description</th>
								<th>Date</th>
								<th>Phone Number</th>
							</thead>
							{typeof this.state.appointments != undefined ? (
								this.state.appointments
									.filter((appointment) => {
										if (this.state.searchTerm === "") {
											return appointment;
										} else if (
											appointment.name
												.toLowerCase()
												.includes(
													this.state.searchTerm.toLowerCase()
												)
										) {
											return appointment;
										}
									})
									.map((appointment) => {
										return (
											<tr>
												<td>{appointment.name}</td>
												<td>
													{appointment.description}
												</td>
												<td>{appointment.day}</td>
												<td>{appointment.contact}</td>
												{this.state.isOpen ? (
													<td></td>
												) : (
													<td>
														<Button
															style={{
																backgroundColor:
																	"green",
															}}
															onClick={() =>
																this.setState({
																	isOpen: true,
																})
															}
														>
															Prescribe
														</Button>
													</td>
												)}
												{this.state.isOpen ? (
													<td
														style={{
															columnWidth:
																"200px",
														}}
													>
														<Input
															type="text"
															onChange={(e) =>
																this.setState({
																	prescription:
																		e.target
																			.value,
																})
															}
														/>
														<Button
															style={{
																backgroundColor:
																	"green",
															}}
															className="mt-2"
															onClick={() =>
																this.handlePres(
																	appointment
																)
															}
														>
															Add
														</Button>
													</td>
												) : (
													<td></td>
												)}
											</tr>
										);
									})
							) : (
								<h1></h1>
							)}
						</Table>
					</Col>
				</Row>
			</div>
		);
	}
}
export default GetAppointments;
