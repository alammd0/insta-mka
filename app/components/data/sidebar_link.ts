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
    path: "/",
    active: true,
  },
  {
    label: "Search",
    icon: FiSearch,
    path: "/search",
  },
  {
    label: "Explore",
    icon: FiCompass,
    path: "/explore",
  },
  {
    label: "Reels",
    icon: FiFilm,
    path: "/reels",
  },
  {
    label: "Messages",
    icon: FiMessageCircle,
    path: "/messages",
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
    path: "/create",
  },
  {
    label: "Profile",
    icon: FiUser,
    path: "/profile",
  },
  {
    label: "More",
    icon: FiMenu,
    path: "/more",
    isBottom: true,
  },
];
