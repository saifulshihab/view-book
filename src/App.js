import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Home from './Components/Home';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './Redux/ConfigureStore';
const store = ConfigureStore();
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Home />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
