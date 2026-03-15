import { AppShell } from './components/layout/AppShell'
import { HomeScreen } from './components/home/HomeScreen'
import { useUiStore } from './store/uiStore'

export default function App() {
  const currentView = useUiStore((s) => s.currentView)
  return currentView === 'home' ? <HomeScreen /> : <AppShell />
}
