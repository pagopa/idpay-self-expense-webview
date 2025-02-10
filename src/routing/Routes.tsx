import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

const AuthPage = lazy(()=> import("../pages/AuthPage"));
const ErrorPage = lazy(()=> import("../pages/ErrorPage"));
const FormPage = lazy(()=> import("../pages/FormPage"));
const ConfirmedPage = lazy(()=> import("../pages/ConfirmedPage"));

export default function RoutesList() {
    return useRoutes([
        {
            path: '/',
            element: <AuthPage />
        },
        {
            path: 'form',
            element: <FormPage />
        },
        {
            path: 'error',
            element: <ErrorPage />
        },
        {
            path: 'confirmed',
            element: <ConfirmedPage />
        },
        {
            path: '*',
            element: <Navigate to="/" replace />
        }
    ])
}