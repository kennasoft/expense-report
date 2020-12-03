import React, { useEffect, useState } from 'react';
import { Container, Button, Grid, Paper } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import LayoutPage from './LayoutPage';
import ReceiptForm from './ReceiptForm';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { Receipt } from '../models/receipt';



const ReportView: React.FC<any> = ({
  company,
  receipts,
  setReceipts,
  updateReceipts,
  deleteReceipt,
  exchangeRates
}): any => {

  const [total, setTotal] = useState(0);
  const MAX_VALUE = 1000;
  const MAX_RECEIPTS = 5;

  useEffect(() => {
    setTotal(receipts.reduce((acc: number, curr: Receipt) => {
      const { amount, currency } = curr;
      acc += amount / (exchangeRates[currency] ? exchangeRates[currency] : 1)
      return acc;
    }, 0))
  }, [receipts, exchangeRates])

  const handleClick = () => {
    if (receipts.length < MAX_RECEIPTS) {
      const newReceipts = receipts.slice();
      newReceipts.push({
        amount: 0,
        currency: company?.baseCurrency,
        description: ""
      });
      setReceipts && setReceipts(newReceipts);
    } else {
      window.alert(`You have added the maximum of ${MAX_RECEIPTS} receipts`);
    }
  }

  const addButtonStyle: CSSProperties = {
    position: "absolute",
    bottom: "40px",
    right: "1px"
  }

  const totalStyle: CSSProperties = {
    textAlign: "center",
    paddingRight: "20px",
    fontSize: "26px",
    fontWeight: "bold",
    color: "#cc3326"
  }

  const toolbarStyle: CSSProperties = {
    backgroundColor: "#d0d0fe",
    padding: "16px",
    marginTop: "16px"
  }


  return (
    <LayoutPage>
      <React.Fragment>
        <Container maxWidth="md" style={{ position: "relative" }}>
          {receipts?.map(
            (receipt: Receipt, i: number) => (
              <ReceiptForm
                {...receipt}
                key={`${i}-${receipt.currency}`}
                updateReceipt={updateReceipts(i)}
                deleteReceipt={i > 0 ? deleteReceipt(i) : null} />
            )
          )}
          <Paper style={toolbarStyle}>
            <Grid container>
              <Grid item sm={10} xs={12}>
                <div style={totalStyle}>{company?.baseCurrency} {total.toFixed(2)}</div>
              </Grid>
              <Grid item sm={2} xs={12}>
                <Button
                  onClick={() => console.log(`${company?.baseCurrency} ${total.toFixed(2)}`)}
                  fullWidth
                  disabled={total > MAX_VALUE}
                  color="primary"
                  variant="contained">Submit</Button>
              </Grid>
            </Grid>
          </Paper>
          <Fab variant="round" onClick={handleClick} color="primary" aria-label="add" style={addButtonStyle}>
            <AddIcon />
          </Fab>
        </Container>
      </React.Fragment>
    </LayoutPage>
  )

}

export default ReportView;