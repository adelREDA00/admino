import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import AddCatPage from './pages/AddCatPage';
import AddClubPage from './pages/AddClubPage';
import AddHomePage from './pages/AddHomePage';
import AddLeaguePage from './pages/AddLeaguePage';
import AddCountryPage from './pages/AddCountryPage';
import AddPlayer from './pages/AddPlayer';
import AddTagPage from './pages/AddTagPage';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';


// ----------------------------------------------------------------------
export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <LoginPage />,
    },
    {
      path: '/register',
      element: <RegisterPage />,
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/addHome" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'addHome', element: <AddHomePage /> },
        { path: 'addCat', element: <AddCatPage /> },
        { path: 'addClub', element: <AddClubPage /> },
        { path: 'addLeague', element: <AddLeaguePage /> },
        { path: 'AddCountry', element: <AddCountryPage /> },
        { path: 'Addtag', element: <AddTagPage /> },
        { path: 'AddPlayer', element: <AddPlayer /> },
        { path: 'edit', element: <EditPost /> },
        { path: 'create', element: <CreatePost /> },


      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}