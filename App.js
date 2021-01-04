import React from "react";
import { observer } from "mobx-react";
import UserStore from "./Stores/User";
import LoginForm from "./LoginForm";
import SubmitButton from "./SubmitButton";
import "./App.css";

class App extends React.Component {
  async componentDidMount(props) {
    try {
      let res = await fetch("/isLogedIn", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-Type": "application/json",
        },
      });
      let result = await res.json();
      if (result && result.success) {
        UserStore.loading = false;
        UserStore.isLoading = true;
        UserStore.username = result.username;
      } else {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }
    } catch (e) {
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
    }
  }
  async doLogout() {
    try {
      let res = await fetch("/logout", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
      });
      let result = await res.json();
      if (result && result.success) {
        UserStore.isloggedIn = false;
        UserStore.username = "";
      }
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    if (UserStore.loading) {
      return (
        <div className="app">
          <div className="container">Loading, Please wait..</div>
        </div>
      );
    } else {
      if (UserStore.isLoggedIn) {
        return (
          <div className="app">
            <div className="container">
              Welcome {UserStore.username}
              <SubmitButton>
                text : {"log out"}
                disabled={false}
                onClick{() => this.doLogout()}
              </SubmitButton>
            </div>
          </div>
        );
      }
      return (
        <div className="app">
          <div className="container">
            <LoginForm />
          </div>
        </div>
      );
    }
  }
}
export default observer(App);
