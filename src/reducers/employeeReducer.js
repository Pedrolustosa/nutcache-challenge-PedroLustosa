export const employeeReducer = (state, action) =>{
//Função que vai decidir se altera ou não a store dependendo da action
var list = JSON.parse(localStorage.getItem('employees'))
    switch(action.type){
        case "INSERT":
        list.push(action.payload)
        localStorage.setItem('employees',JSON.stringify(list))
        return { list, currentIndex: -1}

        case "UPDATE":
        list[state.currentIndex] = action.payload
        localStorage.setItem('employees',JSON.stringify(list))
        return { list, currentIndex: -1}

        case "DELETE":
            list.splice(action.payload, 1)
            localStorage.setItem('employees', JSON.stringify(list))
            return { list, currentIndex: -1 }

        case "UPDATE-INDEX":
            return { list, currentIndex: action.payload }

        default:
            return state
    }
}