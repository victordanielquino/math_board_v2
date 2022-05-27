import axios                 from "axios";
import {
    anguloEntreDosRectasCaso1,
    anguloEntreDosRectasCaso2, circunferenciaConCentroRadio, interseccionRectaCircunferencia,
    rectaQuePasaPorDosPtos, u_distanciaEntreDosPtos,
    u_estaPtoInTriangle, u_intersectionnToTwoRects, u_ptoMedio,
    u_rectaParalela,
    u_rectToPerpendicular
}                            from "../../utils/geometriaAnalitica";
import {convertDegToRadians} from "../../utils/math";
// METODO CANVAS: Convierte una imagen en un array de atos
const u_getImageData = (context, imagen) => {
    return context.getImageData(imagen.x_ini, imagen.y_ini, imagen.x_fin - imagen.x_ini, imagen.y_fin - imagen.y_ini);
}
// METODO CANVAS: Grafica bytes
const u_putImageData = (context, imagen) => {
    context.putImageData(imagen.dataImagen, imagen.x_ini, imagen.y_ini);//(data, x_ini, y_ini, width, height)
}
const u_imagenGraficaSinPromesa = (context, objImagen) => {
    if (objImagen.visible){
        let imagen = new Image();
        imagen.src = objImagen.fileSrc;
        imagen.addEventListener('load', () => {
            context.drawImage(imagen, objImagen.x_ini, objImagen.y_ini, objImagen.x_fin - objImagen.x_ini, objImagen.y_fin - objImagen.y_ini);
        });
    }
};
const u_imageDrawImageSrc = (context, objImagen) => {
    console.log('heeeeeee')
    let newPromise = '';
    let imagen = new Image();
    imagen.crossOrigin = "Anonymous";
    imagen.src = objImagen.fileSrc;
    newPromise = new Promise((aceptado, rechazado) => {
        imagen.addEventListener('load', () => {
            (imagen.src === '') ? rechazado(new Error('drawImageGoogle: no se pudo modificar!!!')): '';
            aceptado(
                objImagen.dataUse = true,
                objImagen.imageDraw = imagen,
                u_imageDrawImage(context, objImagen),
            )
        })
    });
    return newPromise;
}
const u_imageDrawImage = (context, image) => {
    let newPromise = '';
    newPromise = new Promise((aceptado, rechazado) => {
        if (image.rotateDeg !== 0) {
            aceptado(
                context.save(),
                context.translate(image.h, image.k),
                context.rotate(convertDegToRadians(image.rotateDeg)),
                context.drawImage(image.imageDraw, - image.width / 2, - image.height / 2, image.width, image.height),
                context.restore(),
            );
        } else {
            aceptado(context.drawImage(image.imageDraw, image.x_ini, image.y_ini, image.x_fin - image.x_ini, image.y_fin - image.y_ini));
        }
    });
    return newPromise;
}
const u_imageDraw = (context, objImagen) => {
    let newPromise = '';
    (objImagen.dataUse)
        ? newPromise = u_imageDrawImage(context, objImagen)
        : newPromise = u_imageDrawImageSrc(context, objImagen);
    return newPromise;
};
const u_convertImageBase64 = async(url)=>{
    console.log('getBase64')
    let data = {
        data: '',
        base64: '',
    }
    try {
        let image = await axios.get(url, { responseType: 'arraybuffer' });
        let raw = Buffer.from(image.data).toString('base64');
        data.data = image.headers['content-type'];
        data.base64 = raw;
        console.log('data:',data)
        return data;
    } catch (error) {
        console.log(error)
    }
}
// IMAGEN: GET
const u_imagenGetClick = (image, x, y) => {
    let resp = '';
    let tri1 = {
        x1:image.vertex[0].x, y1:image.vertex[0].y,
        x2:image.vertex[1].x, y2:image.vertex[1].y,
        x3:image.vertex[2].x, y3:image.vertex[2].y,
    };
    let tri2 = {
        x1:image.vertex[0].x, y1:image.vertex[0].y,
        x2:image.vertex[2].x, y2:image.vertex[2].y,
        x3:image.vertex[3].x, y3:image.vertex[3].y,
    };
    let resp1 = u_estaPtoInTriangle({x:x, y:y}, tri1);
    let resp2 = u_estaPtoInTriangle({x:x, y:y}, tri2);
    (resp1 || resp2) ? resp = image:'';
    return resp;
};
const u_imageClickTrue = (imagen, x, y) => {
    return (imagen.visible && imagen.edit && (imagen.x_ini < x && x < imagen.x_fin && imagen.y_ini < y && y < imagen.y_fin));
};
// IMAGEN: SI SE HIZO CLICK SOBRE UNA IMAGEN, PODREMOS MOVER
const u_imagenClickSobreImagen = (imagenSelect, mouse) => {
    if (imagenSelect) {
        mouse.imagen_mover = true;
        mouse.imagen_mover_pts = false;
        mouse.imagen_seleccionar_pts = true;
    } else{
        mouse.imagen_mover = false;
        mouse.imagen_mover_pts = false;
        mouse.imagen_seleccionar_pts =false;
    }
}
// CUADRADO: CLICK SOBRE ALGUN PUNTO PARA REDIMENCIONAR EL CUADRADO
const u_imagenBuscaPtoClickParaRedimencionar = (image, x, y) => {
    let resp = -1;
    for (let i = 0; i < image.vertex.length; i++) {
        if (image.vertex[i].x - 5 < x && x < image.vertex[i].x + 5 && image.vertex[i].y - 5 < y && y < image.vertex[i].y + 5) {
            resp = image.vertex[i].pto;
            break;
        }
        i === 0 ? i = 3:'';
    }
    return resp;
};
// IMAGEN: BUSCA IMAGEN PARA PODER MOVERLO O EDITAR SU TAMANO
const u_imagenOpera = (imagenSelect, elmIn, mouse) => {
    if (mouse.imagen_seleccionar_pts){
        mouse.imagen_pto = u_imagenBuscaPtoClickParaRedimencionar(imagenSelect, mouse.pos.x, mouse.pos.y);
        if(mouse.imagen_pto !== -1) {
            mouse.imagen_mover = false;
            mouse.imagen_mover_pts = true;
        } else {
            mouse.imagen_mover = false;
            mouse.imagen_mover_pts = false; // move_size
            mouse.imagen_seleccionar_pts = false;
        }
    }
    if (!mouse.imagen_seleccionar_pts){
        imagenSelect = u_imagenGetClick(elmIn, mouse.pos.x, mouse.pos.y);
        u_imagenClickSobreImagen(imagenSelect, mouse);
    }
    return imagenSelect;
}
const u_imageDrawSquarePto = (context, p) => {
    context.strokeStyle = '#1976d2'; // borde Color
    context.fillStyle = 'white';
    context.lineWidth = 2;
    context.setLineDash([0,0]);

    context.beginPath();
    context.moveTo(p.x - 5, p.y - 5); // (x_ini, y_ini)
    context.lineTo(p.x + 5, p.y - 5); // (x_fin, y_ini)
    context.lineTo(p.x + 5, p.y + 5); // (x_fin, y_fin)
    context.lineTo(p.x - 5, p.y + 5); // (x_ini, y_fin)
    context.lineTo(p.x - 5, p.y - 5); // (x_ini, y_ini)
    context.fill();
    context.stroke();
    context.closePath();
}
// IMAGEN: BORDE SEGMENTADO
const u_imagenBordeSegmentado = (context, image) => {
    context.strokeStyle = '#1976d2'; // borde Color
    context.lineWidth = 2; // borde grosor de linea
    context.setLineDash([5, 5]); // lineas segmentadas

    context.beginPath();
    context.moveTo(image.vertex[0].x, image.vertex[0].y); // (x_ini, y_ini)
    context.lineTo(image.vertex[1].x, image.vertex[1].y); // (x_fin, y_ini)
    context.lineTo(image.vertex[2].x, image.vertex[2].y); // (x_fin, y_fin)
    context.lineTo(image.vertex[3].x, image.vertex[3].y); // (x_ini, y_fin)
    context.lineTo(image.vertex[0].x, image.vertex[0].y); // (x_ini, y_ini)
    context.stroke();
    context.closePath();

    u_imageDrawSquarePto(context, image.vertex[0]);
    u_imageDrawSquarePto(context, image.vertex[4]);
    u_imageDrawSquarePto(context, image.vertex[5]);
    u_imageDrawSquarePto(context, image.vertex[6]);
    u_imageDrawSquarePto(context, image.vertex[7]);
};
// IMAGEN: MOVER
const u_imagenMover = (imagen, mouse) => {
    const recorrido_x = mouse.pos.x - mouse.pos_prev.x;
    const recorrido_y = mouse.pos.y - mouse.pos_prev.y;
    imagen.x_ini = imagen.x_ini + recorrido_x;
    imagen.y_ini = imagen.y_ini + recorrido_y;
    imagen.x_fin = imagen.x_fin + recorrido_x;
    imagen.y_fin = imagen.y_fin + recorrido_y;
    imagen.h += recorrido_x;
    imagen.k += recorrido_y;
    for (let elm of imagen.vertex) {
        elm.x += recorrido_x;
        elm.y += recorrido_y;
    }

    return imagen;
};
// UPDATE ZISE IMAGEN SELECT:
const u_imagenUpdateZise = (image, mouse) => {
    let rec1, rec2, rec3, pto1, pto2, recParalalela, ptoMedio, recCentro, recPerpendicular1, recPerpendicular2, d;
    switch (mouse.imagen_pto) {
        case 0:
            const p0 = {x:image.vertex[0].x, y:image.vertex[0].y};
            let recMouse = rectaQuePasaPorDosPtos({x:mouse.pos.x, y:mouse.pos.y},{x:image.h, y:image.k});
            let cirRadio = circunferenciaConCentroRadio({h:image.h, k:image.k}, image.radio);
            let resp1 = interseccionRectaCircunferencia(recMouse, cirRadio);
            let d1 = u_distanciaEntreDosPtos(p0, {x:resp1.x1, y:resp1.y1});
            let d2 = u_distanciaEntreDosPtos(p0, {x:resp1.x2, y:resp1.y2});
            if (d1 < d2) {
                image.vertex[0].x = resp1.x1; image.vertex[0].y = resp1.y1;
                image.vertex[2].x = resp1.x2; image.vertex[2].y = resp1.y2;
            } else {
                image.vertex[0].x = resp1.x2; image.vertex[0].y = resp1.y2;
                image.vertex[2].x = resp1.x1; image.vertex[2].y = resp1.y1;
            }
            const p3 = {x:image.vertex[3].x, y:image.vertex[3].y};
            let recAngulo = anguloEntreDosRectasCaso1(recMouse, 180 - image.angulo, {x:image.h, y:image.k});
            let resp2 = interseccionRectaCircunferencia(recAngulo, cirRadio);
            d1 = u_distanciaEntreDosPtos(p3, {x:resp2.x1, y:resp2.y1});
            d2 = u_distanciaEntreDosPtos(p3, {x:resp2.x2, y:resp2.y2});
            if (d1 < d2) {
                image.vertex[3].x = resp2.x1; image.vertex[3].y = resp2.y1;
                image.vertex[1].x = resp2.x2; image.vertex[1].y = resp2.y2;
            } else {
                image.vertex[3].x = resp2.x2; image.vertex[3].y = resp2.y2;
                image.vertex[1].x = resp2.x1; image.vertex[1].y = resp2.y1;
            }
            // pto: 4
            ptoMedio = u_ptoMedio(image.vertex[0], image.vertex[1]);
            image.vertex[4].x = ptoMedio.x;
            image.vertex[4].y = ptoMedio.y;
            // pto: 5
            ptoMedio = u_ptoMedio(image.vertex[1], image.vertex[2]);
            image.vertex[5].x = ptoMedio.x;
            image.vertex[5].y = ptoMedio.y;
            // pto: 6
            ptoMedio = u_ptoMedio(image.vertex[2], image.vertex[3]);
            image.vertex[6].x = ptoMedio.x;
            image.vertex[6].y = ptoMedio.y;
            // pto: 7
            ptoMedio = u_ptoMedio(image.vertex[0], image.vertex[3]);
            image.vertex[7].x = ptoMedio.x;
            image.vertex[7].y = ptoMedio.y;

            // ROTATE IMAGE:
            let recHorizontal = rectaQuePasaPorDosPtos({x:image.h - 1, y:image.k}, {x:image.h, y:image.k});
            let angulo = anguloEntreDosRectasCaso2(recMouse, recHorizontal);
            image.rotateDeg = angulo - image.rotateDegPrev;

            break;
        case 4:
            // recta que pasa por el centro
            recCentro = rectaQuePasaPorDosPtos(
                {x:image.vertex[5].x, y:image.vertex[5].y},
                {x:image.vertex[7].x, y:image.vertex[7].y},
            )
            // recta paralela a la recta que pasa por el centro:
            recParalalela = u_rectaParalela(recCentro, {x:mouse.pos.x, y:mouse.pos.y});
            // rectas perpendiculares
            recPerpendicular1 = u_rectToPerpendicular(recCentro, image.vertex[7]);
            recPerpendicular2 = u_rectToPerpendicular(recCentro, image.vertex[5]);
            pto1 = u_intersectionnToTwoRects(recParalalela, recPerpendicular1);
            pto2 = u_intersectionnToTwoRects(recParalalela, recPerpendicular2);

            image.vertex[0].x = pto1.x;
            image.vertex[0].y = pto1.y;
            image.vertex[1].x = pto2.x;
            image.vertex[1].y = pto2.y;
            // pto: 4
            ptoMedio = u_ptoMedio(image.vertex[0], image.vertex[1]);
            image.vertex[4].x = ptoMedio.x;
            image.vertex[4].y = ptoMedio.y;
            // pto: 5
            ptoMedio = u_ptoMedio(image.vertex[1], image.vertex[2]);
            image.vertex[5].x = ptoMedio.x;
            image.vertex[5].y = ptoMedio.y;
            // pto: 7
            ptoMedio = u_ptoMedio(image.vertex[0], image.vertex[3]);
            image.vertex[7].x = ptoMedio.x;
            image.vertex[7].y = ptoMedio.y;
            // h, k
            ptoMedio = u_ptoMedio(image.vertex[0], image.vertex[2]);
            image.h = ptoMedio.x;
            image.k = ptoMedio.y;
            // angulo:
            rec1 = rectaQuePasaPorDosPtos(image.vertex[0], {x:image.h, y:image.k});
            rec2 = rectaQuePasaPorDosPtos(image.vertex[3], {x:image.h, y:image.k});
            image.angulo = anguloEntreDosRectasCaso2(rec1, rec2);
            (image.angulo < 0) ? image.angulo = 90 + (90 + image.angulo):'';
            // radio:
            image.radio = u_distanciaEntreDosPtos(image.vertex[0], {x:image.h, y:image.k});
            // rotateDegPrev:
            image.rotateDegPrev = image.angulo / 2;
            // width height:
            image.width = u_distanciaEntreDosPtos(image.vertex[7], image.vertex[5]);
            image.height = u_distanciaEntreDosPtos(image.vertex[4], image.vertex[6]);

            d = u_distanciaEntreDosPtos(image.vertex[4], image.vertex[6]);
            image.y_ini = image.y_fin - d;
            break;
        case 5:
            recCentro = rectaQuePasaPorDosPtos(
                {x:image.vertex[4].x, y:image.vertex[4].y},
                {x:image.vertex[6].x, y:image.vertex[6].y},
            )
            recParalalela = u_rectaParalela(recCentro, {x:mouse.pos.x, y:mouse.pos.y});
            // rectas perpendiculares
            recPerpendicular1 = u_rectToPerpendicular(recCentro, image.vertex[4]);
            recPerpendicular2 = u_rectToPerpendicular(recCentro, image.vertex[6]);
            pto1 = u_intersectionnToTwoRects(recParalalela, recPerpendicular1);
            pto2 = u_intersectionnToTwoRects(recParalalela, recPerpendicular2);

            image.vertex[1].x = pto1.x;
            image.vertex[1].y = pto1.y;
            image.vertex[2].x = pto2.x;
            image.vertex[2].y = pto2.y;

            // pto: 4
            ptoMedio = u_ptoMedio(image.vertex[0], image.vertex[1]);
            image.vertex[4].x = ptoMedio.x;
            image.vertex[4].y = ptoMedio.y;
            // pto: 5
            ptoMedio = u_ptoMedio(image.vertex[1], image.vertex[2]);
            image.vertex[5].x = ptoMedio.x;
            image.vertex[5].y = ptoMedio.y;
            // pto: 6
            ptoMedio = u_ptoMedio(image.vertex[2], image.vertex[3]);
            image.vertex[6].x = ptoMedio.x;
            image.vertex[6].y = ptoMedio.y;
            // h, k
            ptoMedio = u_ptoMedio(image.vertex[0], image.vertex[2]);
            image.h = ptoMedio.x;
            image.k = ptoMedio.y;
            // angulo:
            rec1 = rectaQuePasaPorDosPtos(image.vertex[0], {x:image.h, y:image.k});
            rec2 = rectaQuePasaPorDosPtos(image.vertex[3], {x:image.h, y:image.k});
            image.angulo = anguloEntreDosRectasCaso2(rec1, rec2);
            (image.angulo < 0) ? image.angulo = 90 + (90 + image.angulo):'';
            // radio:
            image.radio = u_distanciaEntreDosPtos(image.vertex[0], {x:image.h, y:image.k});
            // rotateDegPrev:
            image.rotateDegPrev = image.angulo / 2;
            // width height:
            image.width = u_distanciaEntreDosPtos(image.vertex[7], image.vertex[5]);
            image.height = u_distanciaEntreDosPtos(image.vertex[4], image.vertex[6]);

            d = u_distanciaEntreDosPtos(image.vertex[7], image.vertex[5]);
            image.x_fin = image.x_ini + d;
            break;
        case 6:
            recCentro = rectaQuePasaPorDosPtos(
                {x:image.vertex[5].x, y:image.vertex[5].y},
                {x:image.vertex[7].x, y:image.vertex[7].y},
            )
            recParalalela = u_rectaParalela(recCentro, {x:mouse.pos.x, y:mouse.pos.y});
            // rectas perpendiculares
            recPerpendicular1 = u_rectToPerpendicular(recCentro, image.vertex[7]);
            recPerpendicular2 = u_rectToPerpendicular(recCentro, image.vertex[5]);
            pto1 = u_intersectionnToTwoRects(recParalalela, recPerpendicular1);
            pto2 = u_intersectionnToTwoRects(recParalalela, recPerpendicular2);

            image.vertex[3].x = pto1.x;
            image.vertex[3].y = pto1.y;
            image.vertex[2].x = pto2.x;
            image.vertex[2].y = pto2.y;
            //image.vertex[6] = u_ptoMedio(image.vertex[2], image.vertex[3]);
            // pto: 6
            ptoMedio = u_ptoMedio(image.vertex[2], image.vertex[3]);
            image.vertex[6].x = ptoMedio.x;
            image.vertex[6].y = ptoMedio.y;
            // pto: 5
            ptoMedio = u_ptoMedio(image.vertex[1], image.vertex[2]);
            image.vertex[5].x = ptoMedio.x;
            image.vertex[5].y = ptoMedio.y;
            // pto: 7
            ptoMedio = u_ptoMedio(image.vertex[0], image.vertex[3]);
            image.vertex[7].x = ptoMedio.x;
            image.vertex[7].y = ptoMedio.y;
            // h, k
            ptoMedio = u_ptoMedio(image.vertex[0], image.vertex[2]);
            image.h = ptoMedio.x;
            image.k = ptoMedio.y;
            // angulo:
            let r1 = rectaQuePasaPorDosPtos(image.vertex[0], {x:image.h, y:image.k});
            let r2 = rectaQuePasaPorDosPtos(image.vertex[3], {x:image.h, y:image.k});
            image.angulo = anguloEntreDosRectasCaso2(r1, r2);
            (image.angulo < 0) ? image.angulo = 90 + (90 + image.angulo):'';
            // radio:
            image.radio = u_distanciaEntreDosPtos(image.vertex[0], {x:image.h, y:image.k});
            // rotateDegPrev:
            image.rotateDegPrev = image.angulo / 2;
            // width height:
            image.width = u_distanciaEntreDosPtos(image.vertex[7], image.vertex[5]);
            image.height = u_distanciaEntreDosPtos(image.vertex[4], image.vertex[6]);

            d = u_distanciaEntreDosPtos(image.vertex[4], image.vertex[6]);
            image.y_fin = image.y_ini + d;
            break;
        case 7:
            recCentro = rectaQuePasaPorDosPtos(
                {x:image.vertex[4].x, y:image.vertex[4].y},
                {x:image.vertex[6].x, y:image.vertex[6].y},
            )
            recParalalela = u_rectaParalela(recCentro, {x:mouse.pos.x, y:mouse.pos.y});
            recPerpendicular1 = u_rectToPerpendicular(recCentro, image.vertex[4]);
            recPerpendicular2 = u_rectToPerpendicular(recCentro, image.vertex[6]);
            pto1 = u_intersectionnToTwoRects(recParalalela, recPerpendicular1);
            pto2 = u_intersectionnToTwoRects(recParalalela, recPerpendicular2);

            image.vertex[0].x = pto1.x;
            image.vertex[0].y = pto1.y;
            image.vertex[3].x = pto2.x;
            image.vertex[3].y = pto2.y;
            // pto: 4
            ptoMedio = u_ptoMedio(image.vertex[0], image.vertex[1]);
            image.vertex[4].x = ptoMedio.x;
            image.vertex[4].y = ptoMedio.y;
            // pto: 6
            ptoMedio = u_ptoMedio(image.vertex[2], image.vertex[3]);
            image.vertex[6].x = ptoMedio.x;
            image.vertex[6].y = ptoMedio.y;
            // pto: 7
            ptoMedio = u_ptoMedio(image.vertex[0], image.vertex[3]);
            image.vertex[7].x = ptoMedio.x;
            image.vertex[7].y = ptoMedio.y;
            // h, k
            ptoMedio = u_ptoMedio(image.vertex[0], image.vertex[2]);
            image.h = ptoMedio.x;
            image.k = ptoMedio.y;
            // angulo:
            rec1 = rectaQuePasaPorDosPtos(image.vertex[0], {x:image.h, y:image.k});
            rec2 = rectaQuePasaPorDosPtos(image.vertex[3], {x:image.h, y:image.k});
            image.angulo = anguloEntreDosRectasCaso2(rec1, rec2);
            (image.angulo < 0) ? image.angulo = 90 + (90 + image.angulo):'';
            // radio:
            image.radio = u_distanciaEntreDosPtos(image.vertex[0], {x:image.h, y:image.k});
            // rotateDegPrev:
            image.rotateDegPrev = image.angulo / 2;
            // width height:
            image.width = u_distanciaEntreDosPtos(image.vertex[7], image.vertex[5]);
            image.height = u_distanciaEntreDosPtos(image.vertex[4], image.vertex[6]);

            d = u_distanciaEntreDosPtos(image.vertex[7], image.vertex[5]);
            image.x_ini = image.x_fin - d;
            break;
        default:
            console.log('ocurrio un error');
            break;
    }
    return image;
};
export {
    u_imagenOpera,
    u_imagenBordeSegmentado,
    u_imagenMover,
    u_imagenUpdateZise,
    u_getImageData,
    u_putImageData,
    u_convertImageBase64,
    u_imageDraw,
    u_imageClickTrue
}