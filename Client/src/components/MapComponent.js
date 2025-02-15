import { GoogleMap, LoadScript } from "@react-google-maps/api";

const MapComponent = () => {
  const mapContainerStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
  };

  const center = {
    lat:18.488509959658792,
    lng: 73.81422622263479, 
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10} />
    </LoadScript>
  );
};

export default MapComponent;
