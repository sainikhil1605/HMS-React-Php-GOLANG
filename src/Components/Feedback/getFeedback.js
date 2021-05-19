import axios from "axios";
import React from "react";
import { Col, Row, Table } from "reactstrap";
class GetFeedBack extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			feedbacks: [],
		};
	}
	componentDidMount() {
		axios
			.get("http://localhost:801/HMS/server/get-feedback.php")
			.then((res) => {
				this.setState({ feedbacks: res.data["feedbacks"] });
			});
	}
	render() {
		return (
			<div>
				<Row>
					<Col sm="3"></Col>

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
							<th>Email</th>
							<th>Feedback</th>
						</thead>

						{this.state.feedbacks.map((feedback) => {
							return (
								<tr>
									<td>{feedback.name}</td>
									<td>{feedback.email}</td>
									<td>{feedback.suggestion}</td>
								</tr>
							);
						})}
					</Table>
				</Row>
			</div>
		);
	}
}
export default GetFeedBack;
