import { BrowserRouter, Route, Routes } from 'react-router-dom'
import StartScreen from './screens/logic/StartScreen'
import LevelSelectionScreen from './screens/logic/LevelSelectionScreen'
import PresentationScreen from './screens/logic/PresentationScreen'
import TurnScreen from './screens/logic/TurnScreen'
import ReactionScreen from './screens/logic/ReactionScreen'
import FinalScreen from './screens/logic/FinalScreen'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/level" element={<LevelSelectionScreen />} />
        <Route path="/presentation" element={<PresentationScreen />} />
        <Route path="/turn" element={<TurnScreen />} />
        <Route path="/reaction" element={<ReactionScreen />} />
        <Route path="/final" element={<FinalScreen />} />
      </Routes>
    </BrowserRouter>
  )
}
