"use client";

import * as React from "react";
import {
  AppBar,
  Button,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface NavBarProps {
  user?: {
    name?: string;
  };
  items: {
    key: string;
    label: string;
    href: string;
    children?: { label: string; href: string }[];
  }[];
  activeKey: string;
}

const NavBar = ({
  user,
  items,
  activeKey,
}: NavBarProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openKey, setOpenKey] = React.useState<string | null>(null);
  const router = useRouter();

  const handleOpen = (event: React.MouseEvent<HTMLElement>, key: string) => {
    setAnchorEl(event.currentTarget);
    setOpenKey(key);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenKey(null);
  };

  const activeItem = items.find((item) => item.key === openKey);

  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Toolbar sx={{ px: 3, gap: 1 }}>
        <Link href="/" style={{ display: "inline-flex" }}>
          <img
            src="/logo.png"
            alt="logo"
            style={{ height: 32, cursor: "pointer", display: "block" }}
          />
        </Link>

        <Stack direction="row" spacing={2} sx={{ ml: "auto", alignItems: "center" }}>
          <Stack direction="row" spacing={1}>
            {items.map((item) => (
              <Button
                key={item.key}
                color="primary"
                variant={activeKey === item.key ? "contained" : "text"}
                sx={{ textTransform: "none", fontWeight: 600 }}
                onClick={(e) => handleOpen(e, item.key)}
              >
                {item.label}
              </Button>
            ))}
          </Stack>

          {user?.name ? (
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, whiteSpace: "nowrap", color: "text.secondary" }}
            >
              {user.name}님 어서오세요!
            </Typography>
          ) : null}
        </Stack>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          {activeItem?.children?.map((child) => (
            <MenuItem
              key={child?.href}
              component={Link}
              href={child?.href}
              onClick={handleClose}
            >
              {child.label}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
