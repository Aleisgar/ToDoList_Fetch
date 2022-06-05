import React, { useState, useEffect } from "react";

const Tasklist = () => {
	const [task, setTask] = useState("");
	const [listOfTasks, setListOfTasks] = useState([]);

	const handleTask = (e) => {
		if (e.key === "Enter") {
			if (task !== "") {
				setListOfTasks([...listOfTasks, task]);
				setTask("");
			} else {
				alert("Rellena el campo");
			}
		}
	};

	function deleteTask(task) {
		setListOfTasks(listOfTasks.filter((item) => item !== task));
	}
	// const newList = listOfTasks.map((item, index) =>
	// 	console.log(<li key={index}>{item.label}</li>)
	// );
	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/Aleisgar")
			.then((resp) => resp.json())
			.then((data) => console.log(data[0].label));
	}, []);

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/Aleisgar", {
			method: "PUT",
			body: JSON.stringify(todos),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((resp) => resp.json())
			.then(
				listOfTasks.map((item, index) =>
					console.log(<li key={index}>{item.label}</li>)
				)
			);
	});
	//

	// })
	return (
		<>
			<input
				type="text"
				className="form-control col-6"
				style={{
					marginBottom: "2px",
					fontFamily: "Indie Flower",
					fontSize: "1.5rem",
				}}
				placeholder="Enter a task"
				aria-label="Username"
				// aria-describedby="basic-addon1"
				onChange={(e) => setTask(e.target.value)} //capta el cambio en value
				value={task}
				onKeyDown={handleTask} //procesa el cambio pasando al array
			/>
			<ul>
				{listOfTasks.map((item, index) => (
					<li key={index}>
						{item}
						<button
							className="btn-trash border border-1 float-end"
							onClick={() => deleteTask(item)}>
							{/* elimina cada elemento item que es el del array
						listOfTask  */}
							<i className="fas fa-trash-alt"></i>
						</button>
					</li>
				))}
			</ul>
		</>
	);
};

export default Tasklist;
