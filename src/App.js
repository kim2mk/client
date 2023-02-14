import './App.css';
import {
  Routes,
  Route
} from "react-router-dom";
import AllPets from './components/AllPets';
import Form from './components/Form';
import EditPet from './components/EditPet';
import OnePet from './components/OnePet';


function App() {

  return (
    <div className="App container">
      <h1>Pet Shelter</h1>
      <Routes>
        <Route exact path="/" element={<AllPets/>}></Route>
        <Route exact path="/pets/new" element={<Form/>}></Route>
        <Route exact path="/pets/edit/:id" element={<EditPet/>}></Route>
        <Route exact path="/pets/:id" element={<OnePet/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
