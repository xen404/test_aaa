import React from "react";
import Team from "../team-model";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",

      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: "inline",
    },
  })
);

interface TeamListProps {
   teams: Team[];
  }

export default function TeamList(props: TeamListProps) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {props.teams.map((team) => {
        return (
          <div key={team.id}>
            <ListItem
              alignItems="flex-start"
              button
              component={Link}
              to={"/team/" + team.id}
            >
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={team.image} />
              </ListItemAvatar>
              <ListItemText
                primary={<b>{team.name}</b>}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {team.country}
                    </Typography>
                    &nbsp; {team.value} Millions Euro
                  </React.Fragment>
                }
              />
            </ListItem>

            <Divider />
          </div>
        );
      })}
    </List>
  );
}
