function suma(a, b){
    return a + b;
}

const Persona = {
    nombre: "Henry",
    getNombre: function (){
        return this.nombre
    }
}

//exports.Persona = Persona;
//exports.suma = suma;

module.exports = Persona;