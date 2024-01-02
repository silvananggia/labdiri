import { Settings,BookOpen,Tool,Monitor,Trello,Circle, Home ,FileText, Users} from "react-feather";

export default [
  {
    id: "home",
    title: "Home",
    action: 'read',
    resource: 'home',
    icon: <Home size={20} />,
    navLink: "/admin/home",
  },
  {
    id: "alat",
    action: 'read',
    resource: 'alat',
    title: "Alat Lab",
    icon: <Tool size={20} />,
    navLink: "/admin/alat",
  },
/*   {
    id: "logbookAlat",
    title: "Logbook Alat",
    icon: <BookOpen size={20} />,
    navLink: "/logbook-alat",
  },
  {
    id: "maintenance",
    title: "Maintenance Alat",
    icon: <Monitor size={20} />,
    navLink: "/maintenance",
  }, */
/*   {
    id: "kalibrasi",
    title: "Kalibrasi Alat",
    icon: <Trello size={20} />,
    navLink: "/kalibrasi",
  }, */
  
  {
    id: "user",
    title: "User",
    action: 'read',
    resource: 'user',
    icon: <Users size={12}/>,
    navLink: "/admin/user",
  },
  {
    id: "profilelab",
    title: "Profil Laboratorium",
    action: 'read',
    resource: 'profilelab',
    icon: <FileText size={12}/>,
    navLink: "/admin/profilelab",
  },
  {
    id: 'setting',
    title: 'Master Data',
    action: 'read',
    resource: 'setting',
    icon: <Settings size={20} />,
    children: [
    /*   {
        id: "kategori",
        title: "Kategori Lab",
        action: 'read',
        resource: 'kategori',
        icon: <Circle size={12}/>,
        navLink: "/admin/kategori-lab",
      },
      {
        id: "lokasi",
        title: "Lokasi",
        action: 'read',
        resource: 'lokasi',
        icon: <Circle size={12}/>,
        navLink: "/admin/lokasi",
      }, */
      {
        id: "laboratorium",
        title: "Laboratorium",
        action: 'read',
        resource: 'laboratorium',
        icon: <Circle size={12}/>,
        navLink: "/admin/laboratorium",
      },
      {
        id: "pages",
        title: "Pages",
        action: 'read',
        resource: 'pages',
        icon: <Circle size={12}/>,
        navLink: "/admin/pages",
      },
     


    ]
  },
  
];
