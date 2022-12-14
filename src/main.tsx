import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./Home";
import {
  Location,
  Router,
  Outlet,
  ReactLocation,
  Route,
  DefaultGenerics,
  Link,
} from "@tanstack/react-location";
import "./index.css";
import ComboboxPage from "./Combobox/page";

const routes: Route<DefaultGenerics>[] = [
  { path: "/", element: <Home /> },
  { path: "/combobox", element: <ComboboxPage /> },
];

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router location={new ReactLocation()} routes={routes}>
      <nav className="p-4">
        <ul className="flex justify-center gap-4">
          {routes.map((route) => (
            <li>
              <Link className="px-2 py-1" to={route.path}>
                {route.path}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex-col flex items-center mt-[20vh]">
        <Outlet />
      </div>
    </Router>
  </React.StrictMode>
);
