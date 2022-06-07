import React, { useState, useEffect } from "react";

const Tasklist = () => {
	// DECLARAMOS NUESTROS ESTADOS
	const [task, setTask] = useState(""); //una tarea en el input
	const [listOfTasks, setListOfTasks] = useState([]); //array de tareas introducidas

	// evento para introducir la tarea en el array
	const handleTask = (e) => {
		if (e.key === "Enter") {
			if (task !== "") {
				setListOfTasks([...listOfTasks, { label: task, done: false }]); //[{label:"lavar",done:false}]
				setTask("");
				//updateTask(listOfTasks);
			} else {
				alert("Rellena el campo");
			}
		}
	};
	// función para borrar la tarea
	function deleteTask(task) {
		setListOfTasks(listOfTasks.filter((item) => item !== task));
	}

	// crea el usuario en la base de datos, sólo se ejecutará una vez
	const createUser = () => {
		const requestUser = {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json",
			},
		};
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/Aleisgar",
			requestUser
		)
			.then((resp) => resp.json())
			.then((data) => console.log(data));
	};

	const updateTask = (newTareas) => {
		//console.log(newTareas);[{label:"lavar",done:false}]
		fetch("https://assets.breatheco.de/apis/fake/todos/user/Aleisgar", {
			method: "PUT",
			body: JSON.stringify(newTareas), //newTareas tiene que ser un array, por eso luego mandamos listOfTasks
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((resp) => resp.json()) //la respuesta recibida la convierte en datos manipulables
			.then((data) => console.log(data));
	};

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/Aleisgar")
			.then((resp) => resp.json()) //la respuesta recibida la convierte en datos manipulables
			.then((data) => {
				setListOfTasks(data); //me devuelve el array de objetos con la tarea que tengo en la base de datos
			});
	}, []); //1 vez que el componente está cargado

	useEffect(() => {
		if (listOfTasks.length > 0) {
			//llama a la función updateTask solo si listOfTasks no está vacía
			updateTask(listOfTasks); //pasamos como parámetro el array//updateTask([{label:"lavar",done:false}])
		}
	}, [listOfTasks]); //colocamos a listOfTask [] => [{}] =>[{},{}] =>[{}]

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
				onChange={(e) => setTask(e.target.value)} //capta el cambio en value
				value={task}
				onKeyDown={handleTask} //procesa el cambio pasando al array
			/>
			<ul>
				{listOfTasks.map((item, index) => (
					<li key={index}>
						{item.label}
						{/* ponemos .label ya que las tareas estan en forma de objetos en nuestra base de datos */}
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
