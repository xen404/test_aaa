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
    axios
      .get<Team[]>("https://public.allaboutapps.at/hiring/clubs.json", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const fetchedData: Team[] = response.data;

        fetchedData.sort((obj1, obj2) => {
          if (obj1.name > obj2.name) {
            return 1;
          }

          if (obj1.name < obj2.name) {
            return -1;
          }

          return 0;
        });

        setTeams(fetchedData);
        setLoading(false);
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

  React.useEffect(() => {}, [sortByValue]);

  const onChangeSort = () => {
    let val: boolean = !sortByValue;
    setSortByValue(val);
    sortTeams();
  };

  const sortTeams = (teamsParam: Team[] = teams) => {
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
    }
    setTeams(sorted);
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
