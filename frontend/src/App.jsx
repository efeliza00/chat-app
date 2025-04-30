import { useEffect } from "react"
import { Toaster } from "react-hot-toast"
import { Navigate, Route, Routes } from "react-router-dom"
import Navbar from "./components/navbar"
import HomePage from "./pages/home-page"
import LoginPage from "./pages/login-page"
import ProfilePage from "./pages/profile-page"
import SettingsPage from "./pages/settings-page"
import SignupPage from "./pages/signup-page"
import { useAuthStore } from "./store/use-auth-store"
import { useThemeStore } from "./store/use-theme-store"

function App() {
    const { theme } = useThemeStore()
    const { checkAuth, authUser, isCheckingAuth } = useAuthStore()

    useEffect(() => {
        checkAuth()
    }, [checkAuth])

    if (isCheckingAuth && !authUser)
        return (
            <div className="flex items-center justify-center h-screen flex-col">
                <span className="loading loading-spinner loading-xs"></span>
                <p>Wait...</p>
            </div>
        )

    return (
        <div data-theme={theme} className="font-poppins">
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={authUser ? <HomePage /> : <Navigate to="/login" />}
                />
                <Route
                    path="/signup"
                    element={!authUser ? <SignupPage /> : <Navigate to="/" />}
                />
                <Route
                    path="/login"
                    element={!authUser ? <LoginPage /> : <Navigate to="/" />}
                />
                <Route path="/settings" element={<SettingsPage />} />
                <Route
                    path="/profile"
                    element={
                        authUser ? <ProfilePage /> : <Navigate to="/login" />
                    }
                />
            </Routes>
            <Toaster position="top-right" reverseOrder={false} />
        </div>
    )
}

export default App
