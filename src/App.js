import { Switch, Route, Link } from "react-router-dom";
import { Row, Navbar, Nav, NavItem, NavbarText } from "reactstrap";
import Body from "./Components/body";
import "./App.css";
import admin from "./assets/admin.png";
import patient from "./assets/patient.jpg";
import doctor from "./assets/doctor_new.png";
import Footer from "./Components/footer";
import EntryRoutes from "./Routes/entryRoutes";
import PureBody from "./Components/PureBody";
import PureFooter from "./Components/PureFooter";

function App() {
	return (
		<div className="App">
			{/* <a href="https://w3schools.com">hi</a> */}
			<Switch>
				<Route exact path="/">
					{/* <Navbar color="dark" dark expand="md">
						<Nav className="mr-auto" navbar>
							<NavItem
								style={{
									color: "white",
									padding: "20px",
									fontSize: "20px",
								}}
							>
								Global Hospitals
							</NavItem>
						</Nav>
						<NavbarText>
							<Link to="/signUp">New User? Sign Up!!</Link>
						</NavbarText>
					</Navbar> */}
					<ul
						style={{
							display: "flex",
							flexDirection: "row",
							paddingTop: "20px",
							marginTop: 0,
							marginBottom: "0px",
							paddingBottom: "30px",
							backgroundColor: "#242526",
							color: "white",
						}}
					>
						<li
							style={{
								paddingTop: "10px",
								flex: "1",
								position: "absolute",
							}}
						>
							Global Hospitals
						</li>
						<li
							style={{
								paddingTop: "10px",
								flex: "1",
								textAlign: "right",
							}}
						>
							<Link style={{ color: "white" }} to="/signUp">
								New User? Sign Up!!
							</Link>
						</li>
					</ul>
					<div className="container">
						{/* <Body role="Admin" src={admin} link="/adminLogin" /> */}
						<PureBody role="Admin" src={admin} link="/adminLogin" />
						{/* <Body role="Doctor" src={doctor} link="/doctorLogin" />
						<Body
							role="Patient"
							src={patient}
							link="patientLogin"
						/> */}
						<PureBody
							role="Doctor"
							src={doctor}
							link="/doctorLogin"
						/>
						<PureBody
							role="Patient"
							src={patient}
							link="patientLogin"
						/>
					</div>
				</Route>
				<EntryRoutes />
			</Switch>
			{/* <Footer /> */}
			<PureFooter />
		</div>
	);
}
export default App;
