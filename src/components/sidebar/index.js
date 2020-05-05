import React, { useState } from "react";

import Sidebar from "@xcritical/sidebar";

const SidebarWrapper = ({ children, ...props }) => {
  const storageParams = sessionStorage.getItem("sidebar-params");
  const [params, setParams] = useState(
    storageParams
      ? JSON.parse(storageParams)
      : {
          collapsed: false,
          width: 300,
        }
  );

  const onChangeState = (newParams) => {
    sessionStorage.setItem("sidebar-params", JSON.stringify(newParams));
    setParams(newParams);
  };

  return (
    <Sidebar
      showScrollbar="auto"
      width={params.width}
      collapsed={params.collapsed}
      onChangeState={onChangeState}
      navWidth={0}
      minWidth={100}
      minimizedWidth={5}
      maxWidth={300}
    >
      {children}
    </Sidebar>
  );
};

export { SidebarWrapper as Sidebar };
