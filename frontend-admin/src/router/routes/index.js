// ** React Imports
import { Fragment, lazy } from "react";
import { Navigate } from "react-router-dom";
// ** Layouts
import BlankLayout from "@layouts/BlankLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";
import HorizontalLayout from "@src/layouts/HorizontalLayout";
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper";

// ** Route Components
import PublicRoute from "@components/routes/PublicRoute";
import PrivateRoute from '@components/routes/PrivateRoute'

// ** Utils
import { isObjEmpty } from "@utils";
import PagesService from "../../services/pages.service";

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />,
};

// ** Document title
const TemplateTitle = "%s - BRIN";

// ** Default Route
const DefaultRoute = "/admin/home";

const Home = lazy(() => import("../../views/Home"));
const Login = lazy(() => import("../../views/Login"));
const NotAuthorized = lazy(() => import("../../views/NotAuthorized"));
const ForgotPassword = lazy(() => import("../../views/ForgotPassword"));
const Error = lazy(() => import("../../views/Error"));
const Profile = lazy(() => import("../../views/Profile/index"));
const KategoriLab = lazy(() => import("../../views/KategoriLab/KategoriLab"));
const Lokasi = lazy(() => import("../../views/Lokasi/Lokasi"));
const LokasiCreate = lazy(() => import("../../views/Lokasi/LokasiCreate"));
const LokasiUpdate = lazy(() => import("../../views/Lokasi/LokasiUpdate"));
const Laboratorium = lazy(() => import("../../views/Laboratorium/Laboratorium"));
const LaboratoriumView = lazy(() => import("../../views/Laboratorium/LabView"));
const LaboratoriumCreate = lazy(() => import("../../views/Laboratorium/LabCreate"));
const LaboratoriumUpdate = lazy(() => import("../../views/Laboratorium/LabUpdate"));
const ProfileLab = lazy(() => import("../../views/Laboratorium/ProfileLab"));
const Alat = lazy(() => import("../../views/Alat/Alat"));
const AlatCreate = lazy(() => import("../../views/Alat/AlatCreate"));
const AlatUpdate = lazy(() => import("../../views/Alat/AlatUpdate"));
const AlatView = lazy(() => import("../../views/Alat/AlatView"));
const Pages = lazy(() => import("../../views/Pages/Pages"));
const PagesCreate = lazy(() => import("../../views/Pages/PagesCreate"));
const PagesUpdate = lazy(() => import("../../views/Pages/PagesUpdate"));
const PagesView = lazy(() => import("../../views/Pages/PagesView"));
const User = lazy(() => import("../../views/User/User"));
const UserCreate = lazy(() => import("../../views/User/UserCreate"));
const UserUpdate = lazy(() => import("../../views/User/UserUpdate"));
const UserView = lazy(() => import("../../views/User/UserView"));

// ** Merge Routes
const Routes = [
  {
    path: "/admin",
    index: true,
    element: <Navigate replace to={DefaultRoute} />,
  },
  {
    path: "/admin/home",
    element: <Home />,
    meta: {
      action: 'read',
      resource: 'home'
    }
  },
  {
    path: "/admin/home/koordinator",
    element: <Home />,
    meta: {
      action: 'read',
      resource: 'home'
    }
  },
  {
    path: "/admin/logbook-alat",
    element: <NotAuthorized />,
  },
    {
    path: "/admin/maintenance",
    element: <NotAuthorized />,
  },
  {
    path: "/admin/kalibrasi",
    element: <NotAuthorized />,
  },
  {
    path: "/admin/kategori-lab",
    element: <KategoriLab />,
    meta: {
      action: 'read',
      resource: 'kategori'
    }
  },
  {
    path: "/admin/profile",
    element: <Profile />,
    meta: {
      action: 'read',
      resource: 'profile'
    }
  },
  {
    path: "/admin/lokasi",
    element: <Lokasi />,
    meta: {
      action: 'read',
      resource: 'lokasi'
    }
  },
  {
    path: "/admin/lokasi/add",
    element: <LokasiCreate />,
    meta: {
      action: 'add',
      resource: 'user'
    }
  },
  {
    path: "/admin/lokasi/edit/:code",
    element: <LokasiUpdate />,
    meta: {
      action: 'update',
      resource: 'user'
    }
  },
  {
    path: "/admin/laboratorium",
    element: <Laboratorium />,
    meta: {
      action: 'read',
      resource: 'laboratorium'
    }
  },
  {
    path: "/admin/profilelab",
    element: <ProfileLab />,
    meta: {
      action: 'read',
      resource: 'profilelab'
    }
  },
  {
    path: "/admin/laboratorium/view/:code",
    element: <LaboratoriumView />,
    meta: {
      action: 'read',
      resource: 'laboratorium'
    }
  },
  {
    path: "/admin/laboratorium/add",
    element: <LaboratoriumCreate />,
    meta: {
      action: 'add',
      resource: 'laboratorium'
    }
  },
  {
    path: "/admin/laboratorium/edit/:code",
    element: <LaboratoriumUpdate />,
    meta: {
      action: 'update',
      resource: 'laboratorium'
    }
  },
  {
    path: "/admin/profilelab/edit/:code",
    element: <LaboratoriumUpdate />,
    meta: {
      action: 'update',
      resource: 'laboratorium'
    }
  },
  {
    path: "/admin/alat",
    element: <Alat />,
    meta: {
      action: 'read',
      resource: 'alat'
    }
  },
  {
    path: "/admin/alat/add",
    element: <AlatCreate />,
    meta: {
      action: 'add',
      resource: 'alat'
    }
  },
  {
    path: "/admin/alat/edit/:code",
    element: <AlatUpdate />,
    meta: {
      action: 'update',
      resource: 'alat'
    }
  },
  {
    path: "/admin/alat/view/:code",
    element: <AlatView />,
    meta: {
      action: 'view',
      resource: 'alat'
    }
  },
  {
    path: "/admin/pages",
    element: <Pages />,
    meta: {
      action: 'read',
      resource: 'pages'
    }
  },
  {
    path: "/admin/pages/add",
    element: <PagesCreate />,
    meta: {
      action: 'add',
      resource: 'pages'
    }
  },
  {
    path: "/admin/pages/edit/:code",
    element: <PagesUpdate />,
    meta: {
      action: 'edit',
      resource: 'pages'
    }
  },
  {
    path: "/admin/pages/view/:code",
    element: <PagesView />,
    meta: {
      action: 'view',
      resource: 'pages'
    }
  },
  {
    path: "/admin/user",
    element: <User />,
    meta: {
      action: 'read',
      resource: 'user'
    }
  },
  {
    path: "/admin/user/add",
    element: <UserCreate />,
    meta: {
      action: 'add',
      resource: 'user'
    }
  },
  {
    path: "/admin/user/edit/:code",
    element: <UserUpdate />,
    meta: {
      action: 'update',
      resource: 'user'
    }
  },
  {
    path: "/admin/user/view/:code",
    element: <UserView />,
    meta: {
      action: 'view',
      resource: 'user'
    }
  },/* 
  /* 
  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: true
    }
  },
  {
    path: "/register",
    element: <Register />,
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: true
    }
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: true
    }
  },
  {
    path: "/error",
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: true
    }
  }, */
];

const getRouteMeta = route => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta }
    } else {
      return {}
    }
  }
}

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = []

  if (Routes) {
    Routes.filter(route => {
      let isBlank = false
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) && defaultLayout === layout)
      ) {
        let RouteTag = PrivateRoute

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === 'blank' ? (isBlank = true) : (isBlank = false)
          RouteTag = route.meta.publicRoute ? PublicRoute : PrivateRoute
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
                LayoutWrapper
              : Fragment

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          )
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route)
      }
      return LayoutRoutes
    })
  }
  return LayoutRoutes
}

const getRoutes = layout => {
  const defaultLayout = layout || 'vertical'
  const layouts = ['vertical', 'horizontal', 'blank']

  const AllRoutes = []

  layouts.forEach(layoutItem => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout)

    AllRoutes.push({
      path: '/',
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes
    })
  })
  return AllRoutes
}

export { DefaultRoute, TemplateTitle, Routes, getRoutes }