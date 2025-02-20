import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import PrivateRoute from "./guard/PrivateGuard";
import PublicGuard from "./guard/PublicGuard";

const AuthPage = lazy(()=> import("../pages/AuthPage"));
const ErrorPage = lazy(()=> import("../pages/ErrorPage"));
const FormPage = lazy(()=> import("../pages/FormPage"));
const ConfirmedPage = lazy(()=> import("../pages/ConfirmedPage"));

export default function RoutesList() {
    return useRoutes([
        {
            path: '/session/:sessionId',
            element: <AuthPage />
        },
        {
            path: '/form',
            element: 
            <PrivateRoute>
              <FormPage />  
            </PrivateRoute>
        },
        {
            path: '/confirmed',
            element: <PrivateRoute>
                <ConfirmedPage />
            </PrivateRoute>
        },
        {
            path: '/error',
            element: <PublicGuard>
                <ErrorPage />
            </PublicGuard>
        },
        {
            path: '*',
            element: <Navigate to="/error" replace />
        }
    ])
}