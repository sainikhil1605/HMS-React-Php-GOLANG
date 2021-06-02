import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, NavItem, NavLink, Table } from "reactstrap";

class PatientAppointments extends Component {
	constructor(props) {
		super(props);
		this.state = {
			appointments: [],
		};
	}
	async componentDidMount() {
		await axios
			.post("http://localhost:801/HMS/server/patientAppointments.php", {
				email: sessionStorage.getItem("patientEmail"),
			})
			.then((res) => {
				console.log(res.data);
				this.setState({ appointments: res.data.user_data });
			});
		console.log(this.state);
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
						<NavLink>
							<Link to="/patientLogin/getPatientProfile">
								Edit Profile
							</Link>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink active>
							<Link to="/patientLogin/patientAppointments">
								View Appointments
							</Link>
						</NavLink>
					</NavItem>
				</Nav>
				<Table>
					<thead>
						<th>Application Id</th>
						<th>Name</th>
						<th>Email</th>
						<th>Prescription</th>
					</thead>
					<tbody>
						{this.state.appointments.map((appointment) => {
							return (
								<tr>
									<td>{appointment.apid}</td>
									<td>{appointment.name}</td>
									<td>{appointment.email}</td>
									<td>{appointment.prescription}</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>
		);
	}
}

export default PatientAppointments;
