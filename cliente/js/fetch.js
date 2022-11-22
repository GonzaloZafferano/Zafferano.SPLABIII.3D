function obtenerElementosFETCH (url){ 
    return fetch(url)
    .then((rta)=>{
        if(rta.ok){            
            return rta.json();
        }else{
            throw new Error(`Error: ${rta.status} - ${rta.statusText}`); 
        }
    })
    .catch(error => {
        return Promise.reject(error); 
    });
}

function obtenerElementoPorIdFETCH (url, id){
    return fetch(url + "/" + id)
    .then((rta)=>{
        if(rta.ok){            
            return rta.json();
        }else{
            throw new Error(`Error: ${rta.status} - ${rta.statusText}`); 
        }
    })
    .catch(error => {
        return Promise.reject(error); 
    });
}

function insertarElementoFETCH(url, elemento){
    return fetch(url, {
        method: "POST",
        headers:{
        "Content-Type"  :"application/json"
        },
        body : JSON.stringify(elemento)
    })         
    .then((rta)=>{
        if(rta.ok){            
            return rta.json();
        }else{
            throw new Error(`Error: ${rta.status} - ${rta.statusText}`); 
        }
    })
    .catch(error => {
        return Promise.reject(error); 
    });
}

function actualizarElementoFETCH (url, elemento){      
    return fetch(url + "/" + elemento.id, {
        method: "PUT",
        headers:{
            "Content-Type"  :"application/json"
        },
        body : JSON.stringify(elemento)})
    .then((rta)=>{
        if(rta.ok){            
            return rta.json();
        }else{
            throw new Error(`Error: ${rta.status} - ${rta.statusText}`); 
        }
    })
    .catch(error => {
        return Promise.reject(error); 
    });
}

function eliminarElementoPorIdFETCH (url, id){      
    return fetch(url + "/" + id,
    {
        method: "DELETE"       
    })
    .then((rta)=>{
        if(rta.ok){            
            return rta.json();
        }else{
            throw new Error(`Error: ${rta.status} - ${rta.statusText}`); 
        }
    })
    .catch(error => {
        return Promise.reject(error); 
    });
}

/**
 * FUNCION ASYNC-AWAIT para insertar un elemento.
 * @param {*} url - URL.
 * @param {*} elemento - Elemento a insertar.
 * @returns una promesa.
 */
async function insertarElementoASYNCFETCH (url, elemento){ 
    try{
        const res = await fetch(url, {
            method: "POST",
            headers:{
            "Content-Type"  :"application/json"
            },
            body : JSON.stringify(elemento)
        })    

        if(!res.ok){
            throw new Error("Error: " + res.status+ " - " +res.statusText);
        }
        return res;
    }catch(error){
        return Promise.reject(error);
    }  
};

/**
 * FUNCION ASYNC-AWAIT para eliminar un elemento.
 * @param {*} url - URL.
 * @param {*} id - ID del Elemento a eliminar.
 * @returns una promesa.
 */
async function eliminarElementoPorIdASYNCFETCH (url, id){ 
    try{
        const res = await fetch(url + "/" + id,
        {
            method: "DELETE"       
        });

        if(!res.ok){
            throw new Error("Error: " + res.status+ " - " +res.statusText);
        }      
        return res;
    }catch(error){
        return Promise.reject(error);
    }  
};

export {actualizarElementoFETCH, 
        eliminarElementoPorIdFETCH, 
        insertarElementoFETCH, 
        obtenerElementoPorIdFETCH, 
        obtenerElementosFETCH,
        insertarElementoASYNCFETCH,
        eliminarElementoPorIdASYNCFETCH};