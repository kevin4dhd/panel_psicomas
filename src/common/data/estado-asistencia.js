const estadosDeAsistencia = [
    { value: "ASISTIO", label: "Asistio" },
    { value: "TARDANZA", label: "Tardanza" },
    { value: "TARDANZA_JUSTIFICADA", label: "Tardanza Justificada" },
    { value: "FALTA", label: "Falta" },
    { value: "FALTA_JUSTIFICADA", label: "Falta Justificada" },
];
export default {
    estadosDeAsistencia,
    valueToLabel(value){
        return estadosDeAsistencia.filter(v=>v.value==value)[0].label;
    },
    valueToEstado(value){
        return estadosDeAsistencia.filter(v=>v.value==value)[0];
    }
};
