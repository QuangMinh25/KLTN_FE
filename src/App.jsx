import React from "react";
import Routers from "./Routers"
import SuspenseWithChunkError from './components/SuspenseWithChunkError'


const App = () => {
  return (
    <>
      <SuspenseWithChunkError fallback={<></>}>
        <Routers />
      </SuspenseWithChunkError>
    </>
  );
}

export default App;
