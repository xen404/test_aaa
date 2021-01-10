import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Team from "./team-model";
import "./App.css";
import TeamList from "./components/team-list";
import AppBar from "./components/app-nav-bar";
import TeamDetailedView from "./components/team-detailed-view";

function App() {
  const defaultTeams: Team[] = [];

  const [teams, setTeams]: [Team[], (teams: Team[]) => void] = React.useState(
    defaultTeams
  );
  const [loading, setLoading]: [
    boolean,
    (loading: boolean) => void
  ] = React.useState<boolean>(true);

  const [error, setError]: [string, (error: string) => void] = React.useState(
    ""
  );

  const [sortByValue, setSortByValue]: [
    boolean,
    (sortByValue: boolean) => void
  ] = React.useState<boolean>(false);

  React.useEffect(() => {
    console.log("UseEffect INITIAL");
    console.log("SortByValue : " + sortByValue);
    axios
      .get<Team[]>("https://public.allaboutapps.at/hiring/clubs.json", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const arr : Team[] = response.data;
       
        arr.sort((obj1, obj2) => {
          if (obj1.name > obj2.name) {
            return 1;
          }

          if (obj1.name < obj2.name) {
            return -1;
          }

          return 0;
        })
      
      
        setTeams(
          arr);
        setLoading(false);
        //setSortByValue(false);
        console.log("FETCHED DATA");
        console.log(response.data);
      })
      .catch((ex) => {
        const error =
          ex.response.status === 404
            ? "Resource not found"
            : "An unexpected error has occurred";
        setError(error);
        setLoading(false);
      });
  }, []);

  React.useEffect(() => {
    console.log("UseEffect SORT");
    console.log("SortByValue : " + sortByValue);
    //sortTeams();
  }, [sortByValue]);

  const onChangeSort = () => {
    let val: boolean = !sortByValue;
    console.log("OnChange");
    console.log("SortByValue : " + sortByValue);
    setSortByValue(val);
    console.log("SortByValue : " + sortByValue);
    sortTeams();
  };


  const sortTeams = (teamsParam: Team[] = teams) => {
    console.log("sorting ...");
    let sorted: Team[];
    if (!sortByValue) {
      sorted = teams.sort((obj1, obj2) => {
        if (obj1.value > obj2.value) {
          return -1;
        }

        if (obj1.value < obj2.value) {
          return 1;
        }

        return 0;
        
      });
      console.log("Data was sorted by value");
    } else {
      sorted = teams.sort((obj1, obj2) => {
        if (obj1.name > obj2.name) {
          return 1;
        }

        if (obj1.name < obj2.name) {
          return -1;
        }

        return 0;
      });
      console.log("Data was sorted by name");
    }
    setTeams(sorted);

    console.log(sorted);
  };

  return (
    <Router>
      <Route
        path="/"
        component={() => <AppBar ClickHandler={onChangeSort} />}
      />
      <Route exact path="/" component={() => <TeamList teams={teams} />} />
      <Route
        exact
        path="/team/:id"
        render={(props) => {
          const id = props.match.params.id;
          const data = teams.find((team) => team.id === id);
          if (data) {
            return <TeamDetailedView data={data} />;
          }
        }}
      />

      {error && <p className="Error">Unexpected Error!</p>}
      {loading && <CircularProgress className="Loading" />}
    </Router>
  );
}

export default App;
