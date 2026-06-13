import { createHashRouter } from "react-router";
import { Home } from "./pages/home";
import { ProjectDetail } from "./pages/project_template";
import { TetrisBot } from "./pages/tetris_bot";

export const router = createHashRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/projects/tetrisBot",
    Component: TetrisBot,
  },
  {
    path: "/projects/:projectId",
    Component: ProjectDetail,
  },
]);