import { FormControl, Grid, MenuItem, Paper, Select, TextField } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import CancelIcon from "@material-ui/icons/Cancel";
import React, { useContext } from "react";
import { ReportContext } from "../contexts/report-context";
import { Receipt } from "../models/receipt";

const ReceiptForm: React.FC<any> = ({ currency, amount, description, updateReceipt, deleteReceipt }) => {
  const { report, currencies, exchangeRates } = useContext(ReportContext);
  const receiptData: Receipt = {
    description,
    currency,
    amount
  }

  const onChange = (event: React.ChangeEvent<any>) => {
    if (event.currentTarget.nodeName === "LI") {
      receiptData.currency = event.currentTarget.textContent;
    } else {
      const field: string = event.currentTarget.name;
      // @ts-ignore
      receiptData[field as keyof Receipt] = field === "amount" ? parseFloat(event.currentTarget.value) : event.currentTarget.value;
    }

    updateReceipt(receiptData);
    event.currentTarget.focus();
  }

  const deleteMe = () => {
    if (window.confirm("Are you sure you want to delete this receipt?")) {
      deleteReceipt();
    }
  }

  const inputStyle: CSSProperties = {
    width: "100%"
  }

  const cancelIconStyle: CSSProperties = {
    position: "absolute",
    top: "-25px",
    left: "-25px",
    cursor: "pointer"
  }

  const baseCurrencyStyle: CSSProperties = {
    padding: "2px",
    fontSize: "18px",
    position: "absolute",
    backgroundColor: "#ffffff",
    margin: "-30px 0px",
    left: "20px",
    color: "#339c56"
  }

  const convertedRateStyle: CSSProperties = {
    position: "relative",
    border: "1px solid #999",
    fontWeight: "bold",
    borderRadius: "3px",
    padding: "15px 5px 0px 5px",
    height: "100%",
    width: "100%",
    textAlign: "center",
    fontSize: "18px"
  }

  return (
    <Paper elevation={2} style={{ marginTop: 20, padding: 15 }}>
      <form noValidate autoComplete="off" style={{ position: "relative" }}>
        {deleteReceipt ?
          (<div style={cancelIconStyle} onClick={deleteMe}>
            <CancelIcon color="error" />
          </div>) : null
        }
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <FormControl style={inputStyle}>
              <TextField
                size="small"
                value={description}
                onChange={onChange}
                name="description"
                label="Description"
                type="text"
                variant="outlined"
                style={inputStyle} />
            </FormControl>
          </Grid>
          <Grid item md={2} xs={12}>
            <FormControl size="small" style={inputStyle}>
              <Select name="currency" value={currency} variant="outlined" onChange={onChange}>
                {currencies.map((currency) =>
                  <MenuItem key={currency} value={currency}>{currency}</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={2} xs={12}>
            <FormControl style={inputStyle}>
              <TextField
                size="small"
                value={amount}
                onChange={onChange}
                name="amount"
                label="Amount"
                type="number"
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item md={2} xs={12}>
            <FormControl style={inputStyle}>
              <div style={convertedRateStyle}>
                <div style={baseCurrencyStyle}>{report.company.baseCurrency}</div>
                <div>{(amount / (exchangeRates[currency] ? exchangeRates[currency] : 1)).toFixed(2)}</div>
              </div>
            </FormControl>
          </Grid>
        </Grid>

      </form>
    </Paper>
  )
}

export default ReceiptForm;