import React, { Component } from 'react'
import { connect } from "react-redux";
import * as actions from "../actions/employeeActions";
import { bindActionCreators } from "redux";
import { CPF } from './CPF';

export class EmployeeForm extends Component {
    
    state = {
        ...this.returnStateObject()
    }

    returnStateObject() {
        if (this.props.currentIndex == -1)
            return {
                Name: '',
                BirtDate: '',
                Gender: '',
                Email: '',
                CPF: '',
                StartDate: '',
                Team: ''
            }
        else
            return this.props.list[this.props.currentIndex]
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentIndex != this.props.currentIndex || prevProps.list != this.props.list) {
            this.setState({ ...this.returnStateObject() })
            console.log(prevProps, this.props)
        }
    }

    handleInputChange = e => {
        this.setState({[e.target.name]: e.target.value
        })
    }

    handleInputChangeCPF = e =>{
        this.setState({ CPF: CPF(e.target.value) })
    }

    handleSubmit = e => {
        e.preventDefault()
        if(this.props.currentIndex == -1)
           this.props.insertEmployee(this.state)
        else
            this.props.updateEmployee(this.state)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} autoComplete="off">
                <div className="container">
                    <div className="card">
                        <h3 className="card-header text-center fw-bold">Fomulário de Empregados</h3>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4 p-1"><input name="Name" type="texto" className="form-control" placeholder="Name" onChange={this.handleInputChange} value={this.state.Name} required/></div>
                                <div className="col-md-4 p-1"><input name="BirtDate" type="date" className="form-control" placeholder="BirtDate" onChange={this.handleInputChange} value={this.state.BirtDate} required/></div>
                                <div className="col-md-4 p-1">
                                <select name="Gender" class="form-select" aria-label="Default select example" onChange={this.handleInputChange} value={this.state.Gender} required>
                                <option value="" selected disabled hidden>Escolha uma opção</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Feminino">Feminino</option>
                                <option value="Outros">Outros</option>
                                </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3 p-1"><input name="Email" type="email" className="form-control" placeholder="Email" onChange={this.handleInputChange} value={this.state.Email} required/></div>
                                <div className="col-md-3 p-1"><input name="CPF" maxLength='14' value={CPF} type="text" className="form-control" placeholder="CPF" onChange={this.handleInputChangeCPF} value={this.state.CPF} required /></div>                           
                                <div className="col-md-3 p-1"><input name="StartDate" type="date" className="form-control" placeholder="StartDate" onChange={this.handleInputChange} value={this.state.StartDate} required/></div>
                                <div className="col-md-3 p-1">
                                <select name="Team" class="form-select" aria-label="Default select example" onChange={this.handleInputChange} value={this.state.Team} required>
                                <option value="" selected disabled hidden>Escolha uma opção</option>
                                <option value="Back-End">Back-End</option>
                                <option value="Front-End">Front-End</option>
                                <option value="Full-Stack">Full-Stack</option>
                                <option value="Data Science">Data Science</option>
                                <option value="Outros">Outros</option>
                                </select>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer d-grid"><button type="submit" className="btn btn-sm btn-outline-success fw-bold">Cadastrar</button></div>
                    </div>
                </div>
                        
            </form>

            
        )
    }
}

const mapStateToProps = state => {
    return{
        list: state.list,
        currentIndex: state.currentIndex
    }
}

const mapDispatchToProp = dispatch => {
    return bindActionCreators({
        insertEmployee: actions.insert,
        updateEmployee: actions.update
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProp) (EmployeeForm)
