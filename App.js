
const express=require('express');
const cors = require('cors');
const app=express();
const PORT=5000


app.use(cors());
app.use(express.json())


app.use((req,res,next)=>{
    console.log("Metodo HTTP:",req.method);
    console.log("Ruta solicitada:",req.path);
    next();
});


app.get('/inicio',(req,res)=>{
    res.json({"mensaje":"Bienvenido a nuestra API"})
});

app.get('/informacion',(req,res)=>{
    res.json({nombre:"API de registro",
        descripcion:"servicio para mostrar solicitudes"
    })
})


app.post('/solicitudes', (req, res) => {
    const { nombre, apellido, correo } = req.body;

    if (!nombre || !apellido  || !correo ) {
        res.status(400).json({
            mensaje: "Faltan datos"
        });
    } else if (!correo.includes("@") || !correo.includes(".")) {
        res.json({
            mensaje: "El correo no es válido"
        });
    } else {
        res.json({
            "dato enviado": nombre,
            "dato apellido": apellido,
            "dato correo": correo,
            mensaje: "Solicitud recibida correctamente"
        });
    }
    
});


app.get('/error-prueba', (req, res, next) => {
    next(new Error("Error de prueba"));
});


app.use((req,res)=>{
    res.status(404).json({
        mensaje: "La ruta solicitada no existe"
    });
});



app.use((err, req, res, next) => {
    res.status(500).json({
        mensaje: "Error interno del servidor"
    });
});

app.listen(PORT,()=>{
    console.log("servidor ejecutandose correctamente"+PORT)
})


app.listen(PORT,()=>{
    console.log("servidor ejecutandose correctamente"+PORT);
})
