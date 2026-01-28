"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Box, Toolbar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import NavBar from "./NavBar";
import SideBar, { type NavGroup } from "./SideBar";

const TOP_MENU = [
  {
    key: "employees",
    label: "직원",
    href: "/employees",
    children: [
      { label: "목록", href: "/employees" },
      { label: "등록", href: "/employees/register" },
    ],
  },
  {
    key: "staff",
    label: "의료진",
    href: "/medical-staff",
    children: [
      { label: "목록", href: "/medical-staff" },
      { label: "부서 및 직책 관리", href: "/medical-staff/settings" },
    ],
  },
];

const NAV_GROUPS: NavGroup[] = [
  {
    key: "employees",
    title: "직원",
    icon: <GroupsOutlinedIcon fontSize="small" />,
    items: [
      {
        href: "/employees",
        label: "직원 목록",
        icon: <GroupOutlinedIcon fontSize="small" />,
      },
      {
        href: "/employees/register",
        label: "직원 등록",
        icon: <PersonAddAltOutlinedIcon fontSize="small" />,
      },
    ],
  },
  {
    key: "staff",
    title: "의료진",
    icon: <PeopleAltOutlinedIcon fontSize="small" />,
    items: [
      {
        href: "/medical-staff",
        label: "목록",
        icon: <ListAltOutlinedIcon fontSize="small" />,
      },
      {
        href: "/medical-staff/settings",
        label: "부서 및 직책 관리",
        icon: <SettingsOutlinedIcon fontSize="small" />,
      },
    ],
  },
];

interface AppShellProps {
  children: React.ReactNode;
}

const SIDEBAR_COLLAPSED_STORAGE_KEY = "appShell.sidebarCollapsed";

const AppShell = ({ children }: AppShellProps) => {
  const pathname = usePathname();
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const [mounted, setMounted] = React.useState(false);
  const [openGroups, setOpenGroups] = React.useState<Record<string, boolean>>({});
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    try {
      const saved = window.localStorage.getItem(SIDEBAR_COLLAPSED_STORAGE_KEY);
      if (saved === "1") setSidebarCollapsed(true);
    } catch {
      // ignore
    }
  }, []);

  const activeTopMenu = React.useMemo(() => {
    return pathname.startsWith("/medical-staff") ? "staff" : "employees";
  }, [pathname]);

  React.useEffect(() => {
    setOpenGroups({ [activeTopMenu]: true });
  }, [activeTopMenu]);

  const toggleGroup = (key: string) => {
    setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleSidebarCollapsed = () => {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(
          SIDEBAR_COLLAPSED_STORAGE_KEY,
          next ? "1" : "0"
        );
      } catch {
        // ignore
      }
      return next;
    });
  };

  const filteredGroups = NAV_GROUPS.filter((group) => group.key === activeTopMenu);

  // Responsive rule:
  // - On small screens (sm and down): always collapse.
  // - On large screens: respect user's setting.
  const effectiveSidebarCollapsed = isSmDown ? true : sidebarCollapsed;

  if (!mounted) return null;

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <NavBar
        user={{ name: "홍길동" }}
        items={TOP_MENU}
        activeKey={activeTopMenu}
      />

      <Toolbar />

      <Box
        sx={{
          display: "flex",
          px: { xs: 1.5, sm: 2, md: 3 },
          py: { xs: 1.5, sm: 2, md: 3 },
          gap: { xs: 1.5, md: 3 },
        }}
      >
        <SideBar
          groups={filteredGroups}
          openGroups={openGroups}
          onToggle={toggleGroup}
          activePath={pathname}
          collapsed={effectiveSidebarCollapsed}
          onToggleSidebar={toggleSidebarCollapsed}
        />

        <Box
          component="main"
          sx={{
            flex: 1,
            bgcolor: "background.paper",
            borderRadius: 2,
            p: { xs: 1.5, sm: 2, md: 3 },
            boxShadow: (t) => t.shadows[1],
            border: (t) => `1px solid ${t.palette.divider}`,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AppShell;
