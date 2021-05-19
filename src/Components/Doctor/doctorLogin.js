import React from "react";
import axios from "axios";
import { Switch, Route, Redirect } from "react-router-dom";
import { Row, Col, Form } from "reactstrap";
import background from "../../assets/background.svg";
import doctor from "../../assets/doctor_2.jpg";
import Header from "../header";
import LogIn from "../loginIn";
import SecNavBar from "../Patient/secNavBar";
import LoginNav from "../LoginNav";
import DoctorRoutes from "../../Routes/doctorRoutes";
import LoginCard from "../LoginCard";
class DoctorLogin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			auth: false,
			admin_id: "",
			error: "",
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	async handleSubmit(childEmail, childPswrd) {
		await this.setState({ email: childEmail, password: childPswrd });
		axios
			.post(
				"http://localhost:801/HMS/server/login-doctor.php",
				this.state
			)
			.then((res) => {
				console.log(res);
				if (res.data.doctor_data) {
					sessionStorage.setItem("doctorData", res.data.doctor_data);
					sessionStorage.setItem(
						"docName",
						res.data.doctor_data.doc_name
					);
					sessionStorage.setItem(
						"doc_id",
						res.data.doctor_data.doctor_id
					);
					this.setState({ docredirectReq: true });
				} else {
					alert(res.data.error);
				}
			});
	}

	render() {
		if (sessionStorage.getItem("doctorData")) {
			return (
				<div>
					<SecNavBar
						data="doctorData"
						name="docName"
						link="/doctorLogin"
					/>
					<Header msg={sessionStorage.getItem("docName")} />
					<DoctorRoutes />
				</div>
			);
		}
		return (
			<div style={{ backgroundImage: `url(${background})` }}>
				<div>
					<Switch>
						<Route exact path="/doctorLogin">
							<LoginNav />
							<Row>
								<LoginCard src={doctor} msg="Doctor" />
								<Col md="6">
									<Form
										style={{
											marginTop: "200px",
											marginLeft: "200px",
										}}
									>
										<LogIn fun={this.handleSubmit} />
									</Form>
								</Col>
							</Row>
						</Route>
						<Route>
							<Redirect to="/doctorLogin" />
						</Route>
					</Switch>
				</div>
			</div>
		);
	}
}
export default DoctorLogin;
