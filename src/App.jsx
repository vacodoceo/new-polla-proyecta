import { BrowserRouter, Switch, Route } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';

import { Landing, SignIn, SignUp } from './pages';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Header />
      <main>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/sign-up" exact component={SignUp} />
          <Route path="/sign-in" exact component={SignIn} />
        </Switch>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
