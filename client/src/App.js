import Signup from "./Pages/Signup";
import HomePage from "./Pages/HomePage/HomePage";
import Header from "./Components/Header";
import Write from "./Pages/Write/WritePage";
import Login from "./Pages/Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import About from "./Pages/About";
import SinglePost from "./Pages/SinglePost";
import { useContext } from "react";
import { Context } from "./context/Context";
import MyPosts from "./Pages/MyPosts";
export default function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/write">
          <Write />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/post/:postId">
          <SinglePost />
        </Route>
        <Route path="/myposts">
          <MyPosts/>
        </Route>
      </Switch>
    </Router>
  );
}
