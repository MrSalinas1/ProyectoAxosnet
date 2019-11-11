import React, { useEffect, useState, } from 'react';
import { Link, } from 'react-router-dom'


import { ListGroup, ListGroupItem } from 'reactstrap';
import axios from 'axios';


import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
  root: {
    padding: theme.spacing(3, 2),
  },
}));



const Recibos = () => {

    const classes = useStyles();
    const [recibos, setRecibos] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchData() {
        setLoading(true);
        const res = await fetch("https://cors-anywhere.herokuapp.com/https://devapi.axosnet.com/am/v2/api_receipts_beta/api/receipt/getall");
        res.json().then(res => setRecibos(JSON.parse(res)));
        setLoading(false);
      }

    useEffect(() => {
        fetchData()
    }, [])

    const eliminarRecibo = async (id) => {
        setLoading(true);
        await axios.post(`https://cors-anywhere.herokuapp.com/https://devapi.axosnet.com/am/v2/api_receipts_beta/api/receipt/delete?id=${id}`);
        window.location.reload()
        setLoading(false);
    }

  

    return (
        
    <React.Fragment>

        <CircularProgress variant={loading? "indeterminate": "determinate"}  />

        <ListGroup>
            {recibos && recibos.map((item) => {
                return (
                    <ListGroupItem key={item.id}>
                        ID: { item.id } <br />
                        Provider: { item.provider } <br />
                        Amount: { item.amount } <br />
                        Emission: { item.emission_date } <br />
                        Comment: { item.comment } <br />
                        Currency: { item.currency_code } <br />
                        <Button variant="contained" color="primary"  className={classes.button}  onClick={() => eliminarRecibo(item.id)}>ELIMINAR RECIBO</Button> <br />
                        <Link to={`/modificar/${item.id}`}>
                            <Button color="primary" className={classes.button}>
                                MODIFICAR RECIBO
                            </Button>
                        </Link>
                    </ListGroupItem>
                )
            })}
        </ListGroup>
    </React.Fragment>
    )
}

export default Recibos;
