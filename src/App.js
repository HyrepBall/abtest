import React from 'react';
// import { FirestoreCollection, FirestoreDocument } from "@react-firebase/firestore";
import EditableTable from './components/EditableTable';
import Chart from './components/Chart';

function App () {
  return (

    <div className="App">
      <h2>Тестовое abtest</h2>

      <EditableTable />
      <Chart />
    </div>
  );
}

export default App;
