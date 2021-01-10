interface Team {
  id: string;
  name: string;
  country: string;
  value: number;
  image: string;
  european_titles: number;
  stadium: Stadium;
  location: Location;
}

interface Stadium {
  size: number;
  name: string;
}

interface Location {
  lat: number;
  lng: number;
}

export default Team;
