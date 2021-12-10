import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Favorites, Home } from "pages";
import { ThemeProvider } from "theme";
import NavBar from "components/NavBar";
import { useLocalStorage } from "hooks";

const AppRouter = () => {
  const favorites = useLocalStorage('favorites')
  return (
    <ThemeProvider>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/favorites" render={() => <Favorites favorites={favorites} />} />
          <Route exact path="/" render={() => <Home favorites={favorites} />} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default AppRouter;
