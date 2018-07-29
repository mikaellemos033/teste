import React from 'react'

export default props => {

	const renderDelete = () => {
		if (props.car._id) {
			return <button onClick={props.handleDelete}>Deletar</button>
		}
	}

	const renderErrors = () => {
		let errors = props.errors || {}
		
		return Object.keys(errors).map(error => (
			<li key={error}>{errors[error].message.replace('Path ', '')}</li>
		))
	}

	return (
		<div>
			<div>
				<ul className='Errors'>
					{renderErrors()}
				</ul>
			</div>
			<div className='form'>
				<input className='form-absolute' placeholder='Nome' value={props.car.name} onChange={e => props.handleChange('name', e)}/>
				<input placeholder='Modelo do carro' value={props.car.model} onChange={e => props.handleChange('model', e)}/>
				<input placeholder='Ano' value={props.car.year} onChange={e => props.handleChange('year', e)}/>
				<select className='form-absolute' value={props.car.company} onChange={e => props.handleChange('company', e)}>
					<option value=''>Marca</option>
					<option>VW</option>
					<option>Audi</option>
					<option>Mercedes</option>
					<option>BMW</option>
				</select>
				<input placeholder='Cor' value={props.car.color} onChange={e => props.handleChange('color', e)}/>
				<input placeholder='Preço' value={props.car.price} onChange={e => props.handleChange('price', e)}/>
				<input placeholder='KM' value={props.car.km} onChange={e => props.handleChange('km', e)}/>

				<div className='buttons'>
					<div>
						<button onClick={props.handleCancel}>Cancelar</button>
						{renderDelete()}
					</div>
					<div>
						<button onClick={props.handleSave}>Salvar</button>
					</div>
				</div>
			</div>
		</div>
	)	

}