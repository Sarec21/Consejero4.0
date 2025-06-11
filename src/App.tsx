import { BrowserRouter, Route, Routes } from 'react-router-dom'
import StartScreen from './screens/StartScreen'
import PresentationScreen from './screens/PresentationScreen'
import TurnScreen from './screens/TurnScreen'
import ReactionScreen from './screens/ReactionScreen'
import FinalScreen from './screens/FinalScreen'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/presentation" element={<PresentationScreen />} />
        <Route path="/turn" element={<TurnScreen />} />
        <Route path="/reaction" element={<ReactionScreen />} />
        <Route path="/final" element={<FinalScreen />} />
      </Routes>
    </BrowserRouter>
  )
}
