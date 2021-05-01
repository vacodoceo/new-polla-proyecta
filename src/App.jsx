import { BrowserRouter, Switch, Route } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';

import { PrivateRoute, PublicRoute } from './components/Routes';
import { Bet, Landing, SignIn, SignUp } from './pages';
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
          <PublicRoute path="/sign-up" exact component={SignUp} />
          <PublicRoute path="/sign-in" exact component={SignIn} />
          <PrivateRoute path="/bet" component={Bet} />
        </Switch>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
