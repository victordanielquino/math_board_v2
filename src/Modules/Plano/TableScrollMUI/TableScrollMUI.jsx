import React                                                                                       from 'react';
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow
}                            from "@mui/material";
import { styled }            from '@mui/material/styles';
import DeleteIcon            from "@mui/icons-material/Delete";
import Punto                 from "../Punto/Punto";
import RectaPasaPorDosPuntos from "../Recta/RectaPasaPorDosPuntos/RectaPasaPorDosPuntos";
import DistanciaDosPuntos    from "../DistanciaDosPuntos/DistanciaDosPuntos";
import EcuacionCanonica   from "../Recta/EcuacionCanonica/EcuacionCanonica";
import EcuacionGeneral    from "../Recta/EcuacionGeneral/EcuacionGeneral";
import PuntoPendiente  from "../Recta/PuntoPendiente/PuntoPendiente";
import Circunferencia  from "../Circunferencia/Circunferencia";
import EcuacionCanonicaPar from '../Parabola/EcuacionCanonica/EcuacionCanonica';
import EcuacionGeneralPar from '../Parabola/EcuacionGeneral/EcuacionGeneral';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        width:'100px'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        width:'100px'
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const TableScrollMUI = ({rows, onclick}) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table" size='small'>
                <TableHead>
                    <TableRow>
                        <StyledTableCell align='left' sx={{maxWidth:'0px', minWidth:'0px', margin:0}}>Nro</StyledTableCell>
                        <StyledTableCell align='left' >Gráfico</StyledTableCell>
                        <StyledTableCell align="left">Datos</StyledTableCell>
                        <StyledTableCell align="center" sx={{maxWidth:'30px', margin:0}}>Acciones</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.id}>
                            {/*<StyledTableCell component="th" scope="row">{row.name}</StyledTableCell>*/}
                            <StyledTableCell align='left' sx={{maxWidth:'0px', margin:0}}>{row.id}</StyledTableCell>
                            <StyledTableCell align='left'>{row.title}</StyledTableCell>
                            <StyledTableCell align="left">
                                {row.type === 'punto' && <Punto p={row.p}/>}
                                {row.type === 'distancia' && <DistanciaDosPuntos p1={row.p1} p2={row.p2}/>}
                                {row.type === 'recC1' && <RectaPasaPorDosPuntos p1={row.p1} p2={row.p2}/>}
                                {row.type === 'recC2' && <EcuacionCanonica p={row.p}/>}
                                {row.type === 'recC3' && <EcuacionGeneral rec={row.rec}/>}
                                {row.type === 'recC4' && <PuntoPendiente p={row.p} m={row.m}/>}
                                {row.type === 'cirC1' && <Circunferencia cir={row.cir}/>}
                                {row.type === 'parC1' && <EcuacionCanonicaPar par={row.par} foco={row.foco} directriz={row.directriz}/>}
                                {row.type === 'parC2' && <EcuacionCanonicaPar par={row.par} foco={row.foco} directriz={row.directriz}/>}
                                {row.type === 'parC3' && <EcuacionGeneralPar ecuParabola={row.ecuParabola} eje={row.eje}/>}
                                {row.type === 'parC4' && <EcuacionGeneralPar ecuParabola={row.ecuParabola} eje={row.eje}/>}
                            </StyledTableCell>
                            <StyledTableCell align="center" sx={{maxWidth:'30px', margin:0}}>
                                <IconButton style={{margin:0, padding:0}} size='small' color="error" aria-label="upload picture" component="span" onClick={() => onclick(row)}>
                                    <DeleteIcon fontSize='small'/>
                                </IconButton>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TableScrollMUI;