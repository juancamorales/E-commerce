import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useAuth0 } from '@auth0/auth0-react';
import Swal from "sweetalert2";
import { putUser } from '../../../Redux/Actions/Actions';
import './Profile.css';
import { useDispatch, useSelector } from 'react-redux';

export default function Profile() {
	const dispatch = useDispatch()
	const user = useSelector((state) => state.user);

	const [errorsData, setErrorsData] = useState({
		name: "",
		telephone: "",
		mail: "",
		direction: "",
		dni: ""
	});

	const [formData, setFormData] = useState({
		name: user.name,
		telephone: user.telephone,
		mail: user.mail,
		direction: user.direction
	});

	const handleChange = (event) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
		setErrorsData({
			...errorsData,
			[event.target.name]: event.target.value,
		});
	};

	function handleSubmit(e){
		e.preventDefault()
		dispatch(putUser(formData))
		Swal.fire({
			position: "center",
			icon: "success",
			title: "Your information has been updated",
			showConfirmButton: true,
		  });
	}

	return (
		<div className="container-Profile">
			<div className="information-Box">
				<h2 id="information">Personal Information</h2>
			</div>

			<Box
				component="form"
				noValidate
				autoComplete="off"
				sx={{
					'& .MuiTextField-root': { m: 1, width: '25ch' },
				}}
			>
				<div className="container-form">
					<TextField
						required
						id="outlined-required"
						label="Name"
						name="name"
						defaultValue={user.name}
						onChange={handleChange}
						
					/>

					<TextField
						disabled
						id="outlined-disabled"
						label="Email"
						defaultValue={user.mail}
						name="mail"
					/>
					<TextField 
                    required 
                    id="outlined-multiline-flexible" 
                    label="DNI" 
                    name="dni"
                    onChange={handleChange}
					
                    />
					<TextField
						required
						id="outlined-multiline-flexible"
						label="phone number"
						defaultValue={user.telephone}
						name="telephone"
						maxRows={1}
                        onChange={handleChange}
						error = {formData.telephone === "" }
					/>
					{/* <Box sx={{ minWidth: 220 }}>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">Gender</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								//   value={age}
								label="Age"
								//   onChange={handleChange}
							>
								<MenuItem value="">Male</MenuItem>
								<MenuItem value="">Female</MenuItem>
								<MenuItem value="">Other</MenuItem>
							</Select>
						</FormControl>
					</Box> */}
					<TextField
						required
						id="outlined-multiline-flexible"
						label="Address"
						defaultValue={user.direction}
						name="direction"
						maxRows={1}
                        onChange={handleChange}
						error = {formData.direction === ""}
					/>
				</div>
			</Box>
			{errorsData.direction !== ""  && errorsData.telephone !== "" && errorsData.dni !== ""? <div className="container-Button">
				<button id="add-Button" className="btn information-btn" onClick={handleSubmit}>
					Update information
				</button>
			</div> : <div className="container-Button">
				<button id="add-Button" className="btn information-btn" disabled="true" onClick={() =>		Swal.fire({
			position: "center",
			icon: "warning",
			title: "Complete all the information",
			showConfirmButton: true,
		  })}>
					Update information
				</button>
			</div>}
			
		</div>
	);
}
