import React, { FC, useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import { Coordinate } from "../../types/Neighborhood";
import { smallIcon } from "./icons";
import { LatLng } from "../../types/Neighborhood";


interface Props {
  showMarker?: boolean;
}

const Location: FC<Props> = ({ showMarker }) => {
  const [position, setPosition] = useState<LatLng | undefined>();
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position && showMarker ? (
    <Marker position={position} icon={smallIcon} />
  ) : null;
};

export default Location;
