import React, { Component } from 'react'
import EmployeeForm from './EmployeeForm'
import { connect } from "react-redux";
import * as actions from "../actions/employeeActions";
import { bindActionCreators } from "redux";

export class EmployeeList extends Component {
    state = {
        currentIndex: -1,
        list: this.returnList()
    }

    returnList() {
        if (localStorage.getItem('employees') == null)
            localStorage.setItem('employees', JSON.stringify([]))
        return JSON.parse(localStorage.getItem('employees'))
    }

    onAddOrEdit = (data) => {
        var list = this.returnList()
        if (this.state.currentIndex == -1)
            list.push(data)
        else
            list[this.state.currentIndex] = data
        localStorage.setItem('employees', JSON.stringify(list))
        this.setState({ list, currentIndex: -1 })
    }

    handleEdit = index => {
        this.props.updateEmployeeIndex(index)
    }

    handleDelete = index => {
        this.props.deleteEmployee(index)
    }

    render() {
        return (
            <div className="container">
                <div className="d-flex justify-content-center">
                    <h1 className="text-center border-5 border-bottom border-success w-50 m-3 p-2">Bem-vindo</h1>
                </div>
                <hr/>
                    <EmployeeForm/>
                <hr/>
                <h3 className="text-center">Lista de Empregados</h3>
                <div className="table-responsive">
                <table className="table table-sm table-striped table-bordered table-hover table-dark text-center">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Aniversário</th>
                            <th>Gênero</th>
                            <th>Email</th>
                            <th>CPF</th>
                            <th>Data de Início</th>
                            <th>Equipe</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.list.map((item, index) => {
                                return <tr key={index}>
                                    <td>{item.Name}</td>
                                    <td>{item.BirtDate}</td>
                                    <td>{item.Gender}</td>
                                    <td>{item.Email}</td>
                                    <td>{item.CPF}</td>
                                    <td>{item.StartDate}</td>
                                    <td>{item.Team}</td>
                                    <td className="justify-content-center">
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                Ações
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li><a className="dropdown-item"><button className="btn btn-sm btn-outline-warning" onClick={() => this.handleEdit(index)}>Editar</button></a></li>
                                                <li><a className="dropdown-item"><button className="btn btn-sm btn-outline-danger" onClick={() => this.handleDelete(index)}>Excluir</button></a></li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        list: state.list,
        currentIndex: state.currentIndex
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        deleteEmployee: actions.Delete,
        updateEmployeeIndex: actions.UpdateIndex
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps) (EmployeeList)
