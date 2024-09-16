async function getData(){
    const result = await fetch('https://fakestoreapi.com/products/');
    const products = await result.json();
    const jsonArr = products.map(elemento => Object.entries(elemento));
    const jsonSlice = jsonArr.slice(0 ,5);
    products.forEach(element => {
        const ranInt = randonData(1, jsonArr.length);
        const ranIndex = ranInt;
        for(i = 0; i < jsonSlice.length; i++){
            if(element.id == i){
                const card = document.createRange().createContextualFragment(`
                    
                <div class="feature-card-${i}">
                    <img src="${jsonArr[ranIndex][5][1]}">
                    <h3>${jsonArr[ranIndex][1][1]}</h3>
                    <p>${jsonArr[ranIndex][3][1]}.</p>
                    <button class="button-2">Precio $${jsonArr[ranIndex][2][1]}</button>
                </div>
                    
                    `)
                    const features_row = document.querySelector('.features-row');
                    features_row.append(card)
            }
        }
        function randonData(min, max){
            return Math.floor(Math.random() * (max - min + 1) + min)
        }
    });
}

const btn_validar = document.getElementById('btn-validar');

const validar = (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const mensaje = document.getElementById('mensaje');
    const arr = [];
    const messageArr = ["Nombre", "Email", "Mensaje"];
    arr.push(nombre, email, mensaje);
    for(i = 0; i < arr.length; i++){
        if(arr[i].value == ""){
            swal({
                title: `El campo ${messageArr[i]} no puede estar vacío`,
                icon: "error",
                 })
                 return false;
        }
    }
    if(!emailValido(email.value)){
        swal({
            title: `El campo ${messageArr[1]} no tiene el formato correcto`,
            icon: "error",
             })
             return false;
    }
    swal({
        title: `Datos enviados satisfactoriamente`,
        icon: "success",
         })
         nombre.value = "";
         email.value = "";
         mensaje.value = "";
    return true;
}

const emailValido = email => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

btn_validar.addEventListener("click", validar)
getData()