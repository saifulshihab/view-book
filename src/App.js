import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Main from './Components/Main';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './Redux/ConfigureStore';
const store = ConfigureStore();
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Main />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
