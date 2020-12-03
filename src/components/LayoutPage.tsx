import {
  AppBar,
  Button,
  Container,
  CssBaseline,
  Grid,
  LinearProgress,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@material-ui/core'

import React, { useContext } from 'react'
import { ReportContext } from '../contexts/report-context';

const LayoutPage: React.FC<any> = ({ children }) => {
  const { report, setReport, currencies, loading } = useContext(ReportContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const { name, baseCurrency } = report.company;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const setBaseCurrency = (event: React.MouseEvent<HTMLElement>) => {
    const newReport = { ...report }
    report.company.baseCurrency = event.currentTarget.textContent as string
    setReport(newReport);
    handleClose();
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <header>
        <div>
          <AppBar position="static">
            <Toolbar>
              <Grid
                container
                justify="space-between"
              >
                <Grid item>
                  <Typography variant="h5">{name} Expense Report</Typography>
                </Grid>
                <Grid item>
                  <div style={{ display: "flex", flexWrap: "nowrap" }}>
                    <Typography variant="h5">Base Currency: </Typography>
                    <Button color="secondary" onClick={handleClick} variant="contained">{baseCurrency}</Button>
                    <Menu
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      {currencies?.map((curr: string) =>
                        <MenuItem key={curr} value={curr} onClick={setBaseCurrency}>{curr}</MenuItem>
                      )}
                    </Menu>
                  </div>
                </Grid>
              </Grid>

            </Toolbar>
          </AppBar>
        </div>
      </header>
      <Container maxWidth="lg">
        {loading && <LinearProgress />}
        {children}
      </Container>
    </React.Fragment>
  )
}

export default LayoutPage;