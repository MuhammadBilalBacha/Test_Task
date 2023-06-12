import CharactersDetails from "@/Components/CharactersDetails/CharactersDetails";
import React, { Fragment } from "react";

interface propsType {
  params: { character_details: string };
}

const LocationDetailPage: React.FC<propsType> = ({ params }) => {
  return (
    <Fragment>
      <CharactersDetails id={params.character_details} />
    </Fragment>
  );
};

export default LocationDetailPage;
