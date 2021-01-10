import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import SortIcon from "@material-ui/icons/Sort";
import FormGroup from "@material-ui/core/FormGroup";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useHistory, useLocation } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      justifyContent: "flex-end",
      paddingBottom: "50px",
      backgroundColor: "green",
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  })
);

interface AppBarSortProps {
  ClickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ElevateAppBar(Props: AppBarSortProps) {
  const classes = useStyles();
  let history = useHistory();
  let location = useLocation();

  return (
    <div className={classes.root}>
      <FormGroup></FormGroup>
      <CssBaseline />
      <AppBar className="AppBarCustom">
        {location.pathname !== "/" ? (
          <Toolbar className={classes.toolbar}>
            <IconButton color="inherit" onClick={() => history.goBack()}>
              {" "}
              <ArrowBackIcon />{" "}
            </IconButton>
          </Toolbar>
        ) : (
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6">all about teams</Typography>
            <IconButton
              style={{ position: "absolute", right: "10px" }}
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={Props.ClickHandler}
              color="inherit"
            >
              <SortIcon />
            </IconButton>
          </Toolbar>
        )}
      </AppBar>
    </div>
  );
}
