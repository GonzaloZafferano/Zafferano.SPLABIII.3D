function obtenerElementosAJAX (url){    
    return new Promise((resolve, reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", ()=>{
            if(xhr.readyState === 4){           
                if(xhr.status >= 200 && xhr.status < 300){               
                    const data = JSON.parse(xhr.responseText);    
                    resolve(data);
                }else{
                    reject(`Error: ${xhr.status} - ${xhr.statusText}`);
                }
            }
        });
        xhr.open("GET", url);    
        xhr.send();
    });
}

function obtenerElementoPorIdAJAX (url, id){
    return new Promise((resolve, reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", ()=>{
            if(xhr.readyState === 4){           
                if(xhr.status >= 200 && xhr.status < 300){               
                    const data = JSON.parse(xhr.responseText);    
                    resolve(data);
                }else{
                    reject(`Error: ${xhr.status} - ${xhr.statusText}`);
                }
            }
        });
        xhr.open("GET", url +"/" + id);    
        xhr.send();
    });
}

function insertarElementoAJAX (url, nuevoElemento){ 
    return new Promise((resolve, reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", ()=>{
            if(xhr.readyState === 4){           
                if(xhr.status >= 200 && xhr.status < 300){               
                    const data = JSON.parse(xhr.responseText);    
                    resolve(data);
                }else{
                    reject(`Error: ${xhr.status} - ${xhr.statusText}`);
                }
            }
        });
        xhr.open("POST", url);       
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(nuevoElemento));
    });
}

function actualizarElementoAJAX (url, elemento){ 
    return new Promise((resolve, reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", ()=>{
            if(xhr.readyState === 4){           
                if(xhr.status >= 200 && xhr.status < 300){               
                    const data = JSON.parse(xhr.responseText);    
                    resolve(data);
                }else{
                    reject(`Error: ${xhr.status} - ${xhr.statusText}`);
                }
            }
        });
        xhr.open("PUT", url + "/" + elemento.id);        
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(elemento));
    });
}

function eliminarElementoPorIdAJAX (url, id){ 
    return new Promise((resolve, reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", ()=>{
            if(xhr.readyState === 4){           
                if(xhr.status >= 200 && xhr.status < 300){               
                    const data = JSON.parse(xhr.responseText);    
                    resolve(data);
                }else{
                    reject(`Error: ${xhr.status} - ${xhr.statusText}`);
                }
            }
        });
        xhr.open("DELETE", url +"/" + id);    
        xhr.send();
    });
}

export {actualizarElementoAJAX, eliminarElementoPorIdAJAX, insertarElementoAJAX, obtenerElementoPorIdAJAX, obtenerElementosAJAX};