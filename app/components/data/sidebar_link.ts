// sidebarItems.ts or sidebarItems.js
import {
  FiHome,
  FiSearch,
  FiCompass,
  FiFilm,
  FiMessageCircle,
  FiHeart,
  FiPlusCircle,
  FiUser,
  FiMenu,
} from "react-icons/fi";

export const sidebarItems = [
  {
    label: "Home",
    icon: FiHome,
    path: "/home",
    active: true,
  },
  {
    label: "Search",
    icon: FiSearch,
    path: "/search",
  },
  {
    label: "Notifications",
    icon: FiHeart,
    path: "/notifications",
    badge: true,
  },
  {
    label: "Create",
    icon: FiPlusCircle,
    path: "/create-post",
  },
  {
    label: "Profile",
    icon: FiUser,
    path: "/profile",
  }
];
