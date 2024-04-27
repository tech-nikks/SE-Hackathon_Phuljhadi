import React, { useState } from 'react';

import Chatbot from '../../components/Chatbot/Chatbot.jsx';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import Header from '../../components/Header/Header';
import Plan from '../../components/Plan/Plan';
import Preferences from '../../components/Preferences/Preferences';
import ImageUploader from '../../components/uploadImage/upload.jsx';

const Home = () => {

  const [category,setCategory] = useState("All")

  return (
    <>
      <Header/>
      <ExploreMenu setCategory={setCategory} category={category}/>
      <Preferences/>
      <Plan/>
      <ImageUploader/>
      <Chatbot/>
      
    </>
  )
}

export default Home
