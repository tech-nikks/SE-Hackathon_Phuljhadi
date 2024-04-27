import React, { useState } from 'react';

import AppDownload from '../../components/AppDownload/AppDownload';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import Header from '../../components/Header/Header';
import Plan from '../../components/Plan/Plan';
import Preferences from '../../components/Preferences/Preferences';

const Home = () => {

  const [category,setCategory] = useState("All")

  return (
    <>
      <Header/>
      <ExploreMenu setCategory={setCategory} category={category}/>
      <Preferences/>
      <Plan/>
      <AppDownload/>
    </>
  )
}

export default Home
