import React from "react";

//import './homepage.scss';
import { HomePageContainer } from './homepage-styled';

import Directory from "../../components/directory/directory";

const HomePage = () => {
  return (
    <HomePageContainer>
      <Directory />
    </HomePageContainer>
  );
};

export default HomePage;