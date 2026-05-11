import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./routes/ProtectedRoute";
import ChatBot from "./components/chat_bot/ChatBot";
import ErrorBoundary from "./components/ErrorBoundary";

// Helper function to load pages lazily with retry if they fail to load
// This improves app performance by loading pages only when needed
const lazyWithRetry = (importFunc) => {
  return lazy(() =>
    importFunc().catch(() => {
      // If page fails to load, wait 1 second and try again
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(importFunc());
        }, 1000);
      });
    }),
  );
};

const Signup = lazyWithRetry(() => import("./pages/Signup"));
const Login = lazyWithRetry(() => import("./pages/Login"));
const StudentDashboard = lazyWithRetry(
  () => import("./pages/dashboards/StudentDashboard"),
);
const InstructorDashboard = lazyWithRetry(
  () => import("./pages/dashboards/InstructorDashboard"),
);
const AdminDashboard = lazyWithRetry(
  () => import("./pages/dashboards/AdminDashboard"),
);
const Profile = lazyWithRetry(() => import("./pages/Profile"));
const InstructorProfile = lazyWithRetry(
  () => import("./pages/InstructorProfile"),
);
const Home = lazyWithRetry(() => import("./pages/Home"));

// Main App component that manages all routes and pages
export default function App() {
  return (
    <BrowserRouter>
      <ChatBot />
      <ErrorBoundary>
        {/* Show "Loading..." while pages are being loaded */}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Home page - public, anyone can visit */}
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            {/* Profile page - only logged in users can access */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute roles={["student", "instructor", "admin"]}>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Instructor profile - only instructors and admins can access */}
            <Route
              path="/instructor-profile"
              element={
                <ProtectedRoute roles={["instructor", "admin"]}>
                  <InstructorProfile />
                </ProtectedRoute>
              }
            />

            {/* Dashboard routes - each role has its own dashboard */}
            <Route
              path="/dashboard/student"
              element={
                <ProtectedRoute roles={["student"]}>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard/instructor"
              element={
                <ProtectedRoute roles={["instructor"]}>
                  <InstructorDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard/admin"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            {/* If user visits unknown page, send them to home page */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
