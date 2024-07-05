
document.addEventListener("DOMContentLoaded",()=>{
    //obtener el formulario de edicion
    const formulario = document.querySelector("#formEditarPosteo")
    // obtenemos los parametros de la URL
    const formEditarPosteos = document.querySelector("#form-editar-posteos")
    const parametrosURL = new URLSearchParams(window.location.search)
    const IdPosteo =parametrosURL.get('id')


    // funcnion parta obtener los datos del posteo x ID

    const fetchPosteo = async (id) =>{
        try {
            const respuesta = await axios.get (`http://localhost:3030/posteos/${id}`)
            /*     console.log(respuesta); */
            const posteo = respuesta.data
            // asignar los valores obtenidos a los campos del formulario
            document.querySelector("#nuevo-titulo").value = posteo.titulo
            document.querySelector("#nuevo-contenido").value = posteo.contenido
        } catch (error) {
            console.error('Error al obtener el post:', error);
        }
    }

    //llamar a la funcion para obtener el posteo
if (IdPosteo){
    fetchPosteo(IdPosteo)
}

//funcion para crear un nuevo posteo
formEditarPosteos.addEventListener("submit",async function (event){
    event.preventDefault();
    const nuevoPosteo = {
      titulo:document.querySelector("#nuevo-titulo").value ,
      contenido:document.querySelector("#nuevo-contenido").value ,
    };
    try {
      await axios.put(`http://localhost:3030/posteos/${IdPosteo}`,nuevoPosteo)
      //limpiar el formulario
      formEditarPosteos.reset()
      //recargamos la lista de posteos despues de crear uno nuevo
      fetchPosteo(IdPosteo)
    } catch (error) {
      console.error("Error al actualizar ",error)
    }
  })



})