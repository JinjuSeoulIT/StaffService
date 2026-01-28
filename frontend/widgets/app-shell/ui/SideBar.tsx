"use client";

import * as React from "react";
import Link from "next/link";
import {
  Box,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";

export interface NavGroup {
  key: string;
  title: string;
  icon?: React.ReactNode;
  items: { href: string; label: string; icon: React.ReactNode }[];
}

interface SideBarProps {
  groups: NavGroup[];
  openGroups: Record<string, boolean>;
  onToggle: (key: string) => void;
  activePath: string;
  collapsed: boolean;
  onToggleSidebar?: () => void;
}

const SideBar = ({
  groups,
  openGroups,
  onToggle,
  activePath,
  collapsed,
  onToggleSidebar,
}: SideBarProps) => {
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  // Hide toggle on small screens where sidebar is forced-collapsed
  const showToggle = !isSmDown && onToggleSidebar;

  return (
    <Box
      sx={(t) => ({
        width: collapsed ? 72 : 240,
        flexShrink: 0,
        bgcolor: "background.paper",
        borderRadius: 2,
        overflow: "visible",
        position: "sticky",
        top: 88,
        alignSelf: "flex-start",
        boxShadow: t.shadows[2],
        border: `1px solid ${t.palette.divider}`,
        transition: t.transitions.create("width", {
          duration: t.transitions.duration.shortest,
        }),
      })}
    >
      {/* Devias-like toggle handle on right edge */}
      {showToggle && (
        <IconButton
          onClick={onToggleSidebar}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          sx={{
            position: "absolute",
            right: -12,
            top: "50%",
            transform: "translateY(-50%)",
            width: 24,
            height: 24,
            minWidth: 24,
            minHeight: 24,
            borderRadius: 1,
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            boxShadow: theme.shadows[2],
            zIndex: 1,
            color: "text.primary",
            "&:hover": {
              bgcolor: "action.hover",
              boxShadow: theme.shadows[4],
            },
            "&:focus-visible": {
              outline: "2px solid",
              outlineColor: "primary.main",
              outlineOffset: 2,
            },
            "& .MuiSvgIcon-root": {
              fontSize: 16,
            },
          }}
        >
          {collapsed ? <MenuIcon /> : <MenuOpenIcon />}
        </IconButton>
      )}

      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: collapsed ? "center" : "flex-start",
        }}
      >
        {collapsed ? (
          <Tooltip title="주요 메뉴" placement="right">
            <Box component="span" sx={{ display: "inline-flex" }}>
              <AppsRoundedIcon fontSize="small" />
            </Box>
          </Tooltip>
        ) : (
          <Typography
            fontWeight={700}
            fontSize="1rem"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            주요 메뉴
          </Typography>
        )}
      </Box>

      <Divider />

      <List dense disablePadding>
        {groups.map((group) => {
          const groupIcon =
            group.icon ??
            (group.key === "employees" ? (
              <GroupsOutlinedIcon fontSize="small" />
            ) : group.key === "staff" ? (
              <PeopleAltOutlinedIcon fontSize="small" />
            ) : (
              <FiberManualRecordIcon fontSize="small" />
            ));

          return (
            <Box key={group.key}>
              <ListItemButton
                onClick={() => onToggle(group.key)}
                sx={{
                  px: 2,
                  justifyContent: collapsed ? "center" : "flex-start",
                  "&:hover": { bgcolor: "action.hover" },
                }}
              >
                {collapsed ? (
                  <Tooltip title={group.title} placement="right">
                    <Box component="span" sx={{ display: "inline-flex" }}>
                      {groupIcon}
                    </Box>
                  </Tooltip>
                ) : (
                  <ListItemText primary={group.title} />
                )}
              </ListItemButton>

              <Collapse in={!!openGroups[group.key]} timeout="auto" unmountOnExit>
                <List disablePadding>
                  {group.items.map((item) => {
                    const active = activePath === item.href;
                    const icon = item.icon ?? (
                      <FiberManualRecordIcon fontSize="small" />
                    );

                    const content = (
                      <ListItemButton
                        key={item.href}
                        component={Link}
                        href={item.href}
                        selected={active}
                        sx={{
                          pl: collapsed ? 0 : 5,
                          justifyContent: collapsed ? "center" : "flex-start",
                          "&.Mui-selected": {
                            bgcolor: "action.selected",
                            "&:hover": { bgcolor: "action.selected" },
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: collapsed ? 0 : 28,
                            mr: collapsed ? 0 : 1,
                            color: "inherit",
                            justifyContent: "center",
                          }}
                        >
                          {icon}
                        </ListItemIcon>

                        {collapsed ? null : <ListItemText primary={item.label} />}
                      </ListItemButton>
                    );

                    return collapsed ? (
                      <Tooltip key={item.href} title={item.label} placement="right">
                        <Box>{content}</Box>
                      </Tooltip>
                    ) : (
                      content
                    );
                  })}
                </List>
              </Collapse>

              <Divider />
            </Box>
          );
        })}
      </List>
    </Box>
  );
};

export default SideBar;
