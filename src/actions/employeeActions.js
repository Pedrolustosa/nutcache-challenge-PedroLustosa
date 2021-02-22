export const insert = data =>{//Função com ação de inserir dados
    return{
        type : 'INSERT',
        payload : data
    }
}

export const update = data =>{//Função com ação de atualizar dados
    return{
        type : 'UPDATE',
        payload : data
    }
}

export const Delete = index =>{//Função com ação de deletar dados
    return{
        type : 'DELETE',
        payload : index
    }
}

export const UpdateIndex = index =>{//Função com ação de atualizar dados na index(Tabela)
    return{
        type : 'UPDATE-INDEX',
        payload : index
    }
}