import { Route, Switch } from "react-router";
import GetAppointments from "../Components/Doctor/getAppointments";
import GetDocProfile from "../Components/Doctor/getDocProfile";

export default function DoctorRoutes() {
	return (
		<Switch>
			<Route exact path="/doctorLogin">
				<GetAppointments />
			</Route>
			<Route exact path="/doctorLogin/editDocProfile">
				<GetDocProfile id={sessionStorage.getItem("doc_id")} />
			</Route>
		</Switch>
	);
}
