
import './App.css'
import Assignment from './components/Assignment';
import Introduction from './components/Introduction';

function App() {
  return (
    <>
        <div className='main-container'>
          <div className='intro'>
            <Introduction msg="Morningstar Programming Interview Test"/>
          </div>
          <div className='assignment'>
            <Assignment  />
          </div>
        </div>
    </>
  )
}

export default App
