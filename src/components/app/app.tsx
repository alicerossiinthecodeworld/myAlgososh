import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { FibonacciPage } from '../fibonacci-page/fibonacci-page';
import { MainPage } from '../main-page/main-page';
import { QueuePage } from '../queue-page/queue-page';
import { StringComponent } from '../string/string';
import { SortingPage } from '../sorting-page/sorting-page';
import { StackPage } from '../stack-page/stack-page';
import './app.module.css';
import { ListPage } from '../list-page/list-page';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/recursion" element={<StringComponent />} />
          <Route path="/fibonacci" element={<FibonacciPage />} />
          <Route path="/sorting" element={<SortingPage />} />
          <Route path="/stack" element={<StackPage />} />
          <Route path="/queue" element={<QueuePage />} />
          <Route path="/list" element={<ListPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
