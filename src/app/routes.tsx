import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { Atlas } from "./components/Atlas";
import { ARTimeMachine } from "./components/ARTimeMachine";
import { ARHistoryScanner } from "./components/ARHistoryScanner";
import { PossumProtocol } from "./components/PossumProtocol";
import { AR360Panorama } from "./components/AR360Panorama";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "atlas", Component: Atlas },
      { path: "ar", Component: ARTimeMachine },
      { path: "ar-scanner", Component: ARHistoryScanner },
      { path: "survival", Component: PossumProtocol },
      { path: "ar-360/:mode", Component: AR360Panorama },
    ],
  },
]);