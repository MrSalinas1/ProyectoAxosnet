import React, { useRef, useState, useEffect } from 'react'

import { Button, Form, FormGroup, Label,Input } from 'reactstrap';
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


const Agregar = () => {

     const classes = useStyles();
    const provider = useRef()
    const amount = useRef()
    const comment = useRef()
    const emission = useRef()
    const [currency, setCurrency] = useState('EUR');
    const [ready, setReady] = useState("")
    const [currencyList, setCurrencyList] = useState([]);

    const handleClick = async (e) => {
        e.preventDefault();
        await axios.post(`https://cors-anywhere.herokuapp.com/https://devapi.axosnet.com/am/v2/api_receipts_beta/api/receipt/insert?provider=${provider.current.value}&amount=${amount.current.value}&comment=${comment.current.value}&emission_date=${emission.current.value}&currency_code=${currency}`)
        setReady('SE AGREGO RECIBO')
    }

    async function fetchData() {
        const res = await fetch("https://cors-anywhere.herokuapp.com/https://devapi.axosnet.com/am/v2/api_receipts_beta/api/currency/getall");
        res.json().then(res => setCurrencyList(JSON.parse(res)));
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
                        <input className="form-control" type="text" name="provider" id="exampleProvider" placeholder="Provider..." ref={provider}/>
                    </FormGroup>
                    </Grid>

                    <Grid item xs={6}>
                    <FormGroup>
                        <Label for="exampleAmount">Amount</Label>
                        <input className="form-control" type="text" name="amount" id="exampleAmount" placeholder="Amount..." ref={amount}/>
                    </FormGroup>
                    </Grid>

                    <Grid item xs={6}>
                    <FormGroup>
                        <Label for="exampleComment">Comment</Label>
                        <input className="form-control" type="text" name="comment" id="exampleComment" placeholder="Comment..." ref={comment}/>
                    </FormGroup>
                    </Grid>

                    <Grid item xs={6}>
                   
                    <FormGroup>
                        <Label for="exampleEmision">Emission</Label>
                        <input className="form-control" type="text" name="emision" id="exampleEmision" placeholder="Emission..." ref={emission}/>
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

                   {/* <Grid item xs={6}>
                   
                   </Grid> */}


                </Grid>
            
          
            
            
            <Button color="primary" onClick={handleClick}>Submit</Button>
            { ready !== '' && ready }
        </Paper>
        </Form>
    )
}

export default Agregar;