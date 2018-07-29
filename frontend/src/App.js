import React, { Component } from 'react'
import Search from './Search'
import List from './List'
import FormCreate from './Create'
import logo from './assets/img/logo-tc.png'
import bg from './assets/img/car-wireframe.png'
import axios from 'axios'


import './assets/css/App.css'
import './assets/css/Search.css'
import './assets/css/Form.css'
import './assets/css/List.css'

const URL = 'http://192.168.99.100:7000/api/cars'

export default class App extends Component {

  constructor(props) {
    super(props)
    
    this.showForm = this.showForm.bind(this)
    this.refresh = this.refresh.bind(this)
    this.searchHandle = this.searchHandle.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleSave   = this.handleSave.bind(this)
    this.handleEdit   = this.handleEdit.bind(this)

    this.state = {
      search: '',
      showForm: false,
      list: [],
      car: {
        _id: '',
        name: '',
        model: '',
        color: '',
        price: '',
        year: '',
        company: '',
        km: ''
      },
      errors: []
    }

    this.refresh()
  }

  searchHandle(e) {
    this.setState(...this.state, {search: e.target.value})
    this.refresh(e.target.value)
  }

  childrenRender() {

    if (!this.state.showForm) return (<List handleEdit={this.handleEdit} list={this.state.list}/>)
    return (
      <FormCreate 
        car={this.state.car}
        errors={this.state.errors}
        clear={this.clearCar}
        handleCancel={this.handleCancel}
        handleSave={this.handleSave}
        handleChange={this.handleChange}
        handleDelete={this.handleDelete}
        handleSuccess={this.refresh}/>
    )

  }

  handleChange(field, e) {
    
    let car    = {...this.state.car}
    car[field] = e.target.value

    this.setState(...this.state, {car})
  }

  handleDelete() {
    
    let id = this.state.car._id
    this.clearCar()

    axios.delete(`${URL}/${id}`)
         .then(resp => this.refresh())  
  }

  handleSave() {

    let data    = {...this.state.car}
    let id      = data._id

    this.clearCar()
    delete data['_id']
    
    if(id) {

      axios.put(`${URL}/${id}`, data)
           .then(resp => this.refresh())
           .catch((error) => {
              this.setState(...this.state, {errors: error.response.data.errors})
           })

    } else {

      axios.post(`${URL}`, data)
           .then(resp => this.refresh())
           .catch((error) => {              
              this.setState(...this.state, {errors: error.response.data.errors})
           })

    }

  }

  handleCancel() {
    
    this.clearCar()
    this.showForm()

  }

  clearCar() {
    
    let car = {
      _id: '',
      name: '',
      model: '',
      color: '',
      price: '',
      year: '',
      company: '',
      km: ''
    }

    this.setState(...this.state, {car, errors: []})
  }

  handleEdit(car) {
    this.setState(...this.state, {showForm: true, car})
  }

  showForm() {
    let state = this.state.showForm
    this.setState(...this.state, {showForm: !state})
  }

  refresh(description = '') {
    const search = description ? `&name__regex=/${description}/` : ''    
    axios.get(`${URL}?sort=-createdAt${search}`).then(resp => this.setState(...this.state, {showForm: false, list: resp.data}))
  }

  render() {

  	let style = {
  		backgroundImage: `url("${bg}")`
  	}

    return (
      <main className="app">
        
          <aside className='app-side'>
            	<img src={logo} alt='Logo' />
          </aside>

          <section className='app-content'>
          	<Search 
              search={this.state.search} 
              handleSearch={this.searchHandle} 
              handleCreate={this.showForm} />

          	<div className='app-infos' style={style}>
              <div className='app-box'>
                {this.childrenRender()}
              </div>
          	</div>
          </section>

      </main>
    );
  }
}
