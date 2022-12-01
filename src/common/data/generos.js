const generos = [
    { value: "H", label: "Masculino" },
    { value: "M", label: "Femenino" },
];
export default {
    generos,
    valueToLabel(value){
        return generos.filter(v=>v.value==value)[0].label;
    },
    valueToEstado(value){
        return generos.filter(v=>v.value==value)[0];
    }
};
