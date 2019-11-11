import React, { useEffect, useState, useRef } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
    import Paper from '@material-ui/core/Paper';
    import Grid from '@material-ui/core/Grid';

    const useStyles = makeStyles(theme => ({
   
        root: {
            padding: theme.spacing(3, 2),
          },
        input: {
            margin: theme.spacing(1),
          },
      }));
    

const Modificar = (props) => {
    const classes = useStyles();
    const { id } = props.match.params;
    const [dataRecibo, setDataRecibo] = useState([])

    const provider = useRef()
    const amount = useRef()
    const comment = useRef()
    const emission = useRef()
    const [currency, setCurrency] = useState('EUR');
    const [ready, setReady] = useState("")
    const [currencyList, setCurrencyList] = useState([]);

    const handleClick = async (e) => {
        e.preventDefault();
        await axios.post(`https://cors-anywhere.herokuapp.com/https://devapi.axosnet.com/am/v2/api_receipts_beta/api/receipt/update?id=${id}&provider=${provider.current.value}&amount=${amount.current.value}&comment=${comment.current.value}&emission_date=${emission.current.value}&currency_code=${currency}`)
        setReady('SE MODIFICO RECIBO')
    }

    async function fetchData() {
        // Recibe los datos del recibo y los guarda en dataRecibo
        // Recibe los currency para imprimirlos en el Input Select
        const res = await fetch(`https://cors-anywhere.herokuapp.com/https://devapi.axosnet.com/am/v2/api_receipts_beta/api/receipt/getbyid?id=${id}`);
        res.json().then(res => {
            setDataRecibo(JSON.parse(res))
            return fetch("https://cors-anywhere.herokuapp.com/https://devapi.axosnet.com/am/v2/api_receipts_beta/api/currency/getall");
        }).then(res => {
            return res.json()
        }).then(res => setCurrencyList(JSON.parse(res)));
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <Form>
             <Paper className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                    <FormGroup>
                        <Label for="exampleProvider">Provider</Label>
                        <input className="form-control" type="text" name="provider" value={dataRecibo.length && dataRecibo[0].provider} id="exampleProvider" placeholder="Provider..." ref={provider} onChange={(e) => setDataRecibo([{ ...dataRecibo[0], provider: e.target.value}])}/>
                    </FormGroup>
                    </Grid>

                    <Grid item xs={6}>
                    <FormGroup>
                        <Label for="exampleAmount">Amount</Label>
                        <input className="form-control" type="text" name="amount" value={dataRecibo.length && dataRecibo[0].amount} id="exampleAmount" placeholder="Amount..." ref={amount} onChange={(e) => setDataRecibo([{ ...dataRecibo[0], amount: e.target.value}])}/>
                    </FormGroup>
                    </Grid>

                    <Grid item xs={6}>
                    <FormGroup>
                        <Label for="exampleComment">Comment</Label>
                        <input className="form-control" type="text" name="comment" value={dataRecibo.length && dataRecibo[0].comment} id="exampleComment" placeholder="Comment..." ref={comment} onChange={(e) => setDataRecibo([{ ...dataRecibo[0], comment: e.target.value}])}/>
                    </FormGroup>
                    </Grid>

                    <Grid item xs={6}>
                    <FormGroup>
                        <Label for="exampleEmision">Emission</Label>
                        <input className="form-control" type="text" name="emision" value={dataRecibo.length && dataRecibo[0].emission_date} id="exampleEmision" placeholder="Emission..." ref={emission} onChange={(e) => setDataRecibo([{ ...dataRecibo[0], emission_date: e.target.value}])}/>
                    </FormGroup>
                    </Grid>

                    <Grid item xs={6}>
                        <FormGroup>
                            <Label for="exampleCurrency">Currency</Label>
                            <Input type="select" name="currency" id="exampleCurrency" onChange={(e) => setCurrency(e.target.value)}>
                                { currencyList && currencyList.map(({ currency_code }) => {
                                    return <option key={currency_code}> { currency_code } </option>
                                })}
                            </Input>
                        </FormGroup>
                    </Grid>
                </Grid>     
            <Button onClick={handleClick}>Submit</Button>
            { ready !== '' && ready }
            </Paper>
        </Form>
    )
}

export default Modificar
