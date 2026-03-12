import { RouterProvider } from "react-router";
import { router } from "./routes";

export default function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-200 p-0 sm:p-4">
      <div className="w-full h-[100dvh] sm:h-[844px] sm:max-w-[390px] bg-slate-50 sm:rounded-[3rem] shadow-2xl overflow-hidden relative border-0 sm:border-[8px] sm:border-slate-800 flex flex-col font-sans">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}
