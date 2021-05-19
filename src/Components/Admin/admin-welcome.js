import React from "react";
import { Row, Col } from "reactstrap";
import { Switch, Route, Redirect } from "react-router-dom";
import background from "../../assets/background.svg";
import Header from "../header";
import NavBar from "../Navbar";
import axios from "axios";
import admin from "../../assets/admin.png";
import LogIn from "../loginIn";
import AdminRoutes from "../../Routes/adminRoutes";
import LoginNav from "../LoginNav";
import LoginCard from "../LoginCard";
import PureLoginCard from "../PureLoginCard";
class AdminWelcome extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			redirectReq: false,
			admin_id: "",
			error: "",
			isOpen: false,
			isActive: "Departments",
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.logout = this.logout.bind(this);
	}
	async handleSubmit(childEmail, childPswrd) {
		await this.setState({ email: childEmail });
		await this.setState({ password: childPswrd });
		axios
			.post("http://localhost:801/HMS/server/login-admin.php", this.state)
			.then((res) => {
				console.log(res);
				if (res.data.user_data) {
					console.log(res.data.user_data.user_id);
					sessionStorage.setItem("userData", res.data.user_data);
					sessionStorage.setItem("username", res.data.user_data.name);
					sessionStorage.setItem(
						"user_id",
						res.data.user_data.user_id
					);
					this.setState({ redirectReq: true });
				} else {
					alert(res.data.error);
				}
			});
	}
	logout() {
		sessionStorage.setItem("userData", "");
		sessionStorage.setItem("username", "");
		sessionStorage.clear();
		sessionStorage.clear();
		this.setState({ redirectReq: false });
		<Redirect to="/adminLogin" />;
	}
	render() {
		if (this.state.redirectToReq || sessionStorage.getItem("userData")) {
			return (
				<div>
					<NavBar fun={() => this.logout()} />
					<Header msg={sessionStorage.getItem("username")} />
					<AdminRoutes />
				</div>
			);
		}
		return (
			<div
				style={{ backgroundImage: `url(${background})`, zIndex: "-1" }}
			>
				<div>
					<Switch>
						<Route exact path="/adminLogin">
							<LoginNav />
							<div
								className="container"
								style={{ padding: "0px" }}
							>
								{/* <LoginCard src={admin} msg="Admin" /> */}
								<PureLoginCard src={admin} msg="Admin" />
								<div style={{ flex: "1" }}></div>
								<div style={{ flex: "2" }}>
									<LogIn fun={this.handleSubmit} />
								</div>
								<div style={{ flex: "1" }}></div>
							</div>
						</Route>
						<Route>
							<Redirect to="/adminLogin" />
						</Route>
					</Switch>
				</div>
			</div>
		);
	}
}
export default AdminWelcome;
