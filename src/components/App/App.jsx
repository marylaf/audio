import { Routes, Route, BrowserRouter } from 'react-router-dom'
import TrackList from '../TrackList/TrackList';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<TrackList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
