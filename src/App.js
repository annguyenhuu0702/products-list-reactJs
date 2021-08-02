import './App.css';
import Menu from './components/Menu/Menu';
import routes from './routes';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  const showContentMenus = (routes) => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        );
      });
    }
    return <Switch>{result}</Switch>
  }
  return (
    <Router>
      <div>
        <Menu />
        <div className="container">
          <div className="row">
            {showContentMenus(routes)}
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
