import React from 'react'

export default props => {

	const renderList = () => {
		
		let list = props.list || []
		return list.map(child => (
			<li onClick={() => props.handleEdit(child)} key={child._id}>
				<div>
					<strong>{child.name}</strong> <br />
					<span>{child.model} * {child.company} * KM {child.km} * Cor {child.color}</span>
				</div>
				
				<div>
					<strong>R$ {child.price}</strong><br />
					<span>{child.year}</span>
				</div>

			</li>
		))
	}


	return (
		<div>
			<ul className='list'>
				{renderList()}
			</ul>
		</div>
	)
	
}