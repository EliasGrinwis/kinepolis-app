import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import {Auth0Provider} from "@auth0/auth0-react";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-kgmc0zmqivx73hkj.us.auth0.com"
      clientId="ZqeneSo4KZM3fZOcL8GGX1HMwFA0zO2v"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}>
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
