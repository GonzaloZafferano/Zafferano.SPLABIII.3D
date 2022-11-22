function obtenerElementosAXIOS (url){ 
    return axios(url)
    .then((rta)=>{          
        return rta.data;
    })  
    .catch((err)=>{
        return Promise.reject(`Error: ${err.message}`); 
    });
}

function obtenerElementoPorIdAXIOS (url, id){   
    return axios(url + "/" + id)
    .then((rta)=>{          
        return rta.data;
    })  
    .catch((err)=>{
        return Promise.reject(`Error: ${err.message}`); 
    });
}

function insertarElementoAXIOS (url, nuevoElemento){  
    return  axios(url, {
        method : "POST",
        headers : {
            "Content-Type"  : "application/json"
        },      
        data : JSON.stringify(nuevoElemento)
    })
    .then((rta)=>{          
        return rta.data;
    })  
    .catch((err)=>{
        return Promise.reject(`Error: ${err.message}`); 
    });
}

function eliminarElementoPorIdAXIOS (url, id){  
    return axios.delete(url + "/" + id)
    .then((rta)=>{          
        return rta;
    })  
    .catch((err)=>{
        return Promise.reject(`Error: ${err.message}`); 
    });
}

function actualizarElementoAXIOS (url, nuevoElemento){
    return axios(url + "/" + nuevoElemento.id, {
        method : "PUT",
        headers : {
            "Content-Type"  : "application/json"
        },
        data : JSON.stringify(nuevoElemento)
    })
    .then((rta)=>{          
        return rta.data;
    })  
    .catch((err)=>{
        return Promise.reject(`Error: ${err.message}`); 
    });
}

export {actualizarElementoAXIOS, 
        insertarElementoAXIOS, 
        eliminarElementoPorIdAXIOS, 
        obtenerElementosAXIOS, 
        obtenerElementoPorIdAXIOS};

