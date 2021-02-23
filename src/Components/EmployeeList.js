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
                <div className="d-flex justify-content-center">
                <a href="https://github.com/Pedrolustosa" class="btn btn-lg btn-outline-dark"><i
                    class="fab fa-github"></i> GitHub</a>
                <a href="https://www.linkedin.com/in/pedro-henrique-lustosa-e-silva-29b827144/"
                  class="btn btn-lg btn-outline-primary"><i class="fab fa-linkedin"></i> Linkedin</a>
                </div>
                <hr/>
                    <EmployeeForm/>
                <hr/>
                <div className="card">
                    <div className="card-body">
                        <div className="card-header">
                            <h3 className="text-center fw-bold">Lista de Empregados</h3>
                        </div>
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
                                            <td>
                                            <div class="d-grid gap-2">
                                                <div class="btn-group dropstart">
                                                    <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                        Opções
                                                    </button>
                                                        <ul class="dropdown-menu">
                                                            <li><a className="dropdown-item"><button className="btn btn-outline-warning w-100" onClick={() => this.handleEdit(index)}>Editar</button></a></li>
                                                            <li><a className="dropdown-item"><button className="btn btn-outline-danger w-100 delete-button" onClick={() => { if (window.confirm('Você tem certeza que deseja excluir dados desse subordinado?')) this.handleDelete(index) }} >Excluir</button></a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                
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
