import React from "react";
import Team from "../team-model";

interface TeamDetailedViewProps {
  data: Team;
}

export default function TeamDetailedView(props: TeamDetailedViewProps) {
  return (
    <div>
      <div className="BlackContainer" style={{ height: "15px" }}></div>
      <div className="UpperContainer BlackContainer">
        <div className="LogoContainer">
          <div className="Cell TextCell">
            <b className="TeamName">{props.data.country}</b>
          </div>
          <div className="Cell">
            <img src={props.data.image} alt="logo" />
          </div>
          <div className="Cell"> </div>
        </div>
      </div>

      <div className="TextContent">
        <p>
          Der Club <b>{props.data.name}</b> aus {props.data.country} hat einen
          Wert von {props.data.value} Millionen Euro.
        </p>
        <p>
          <b>{props.data.name}</b> konnte bislang {props.data.european_titles}{" "}
          Siege auf europäischer Ebene erreichen.”
        </p>
      </div>
    </div>
  );
}
