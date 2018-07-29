import React from 'react'

export default props => (
	<div className='search'>
		<input value={props.search} onChange={props.handleSearch} placeholder='Pesquise Algo' />
		<button onClick={props.handleCreate}>Cadastrar</button>
	</div>		
)