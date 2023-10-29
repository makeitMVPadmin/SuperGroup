
import "./Sidebar.scss"
import { useState } from "react";
// import SidebarItems from "../SidebarItems/SidebarItems";
// import SidebarItemsComponent from "../SidebarItems/SidebarItems";

function Sidebar({defaultActive}) {
    // const [activeIndex, setActiveIndex] = useState(defaultActive || 1);
    return (
        <>
            <div className="SidebarParent">
                {/* {
                    SidebarItemsComponent.map((item, index)=> {
                        return (
                            <SidebarItemsComponent key={item.name} active={index === activeIndex}>
                                <p>{item.name}</p>
                            </SidebarItemsComponent>
                        );
                    })
                } */}
                <p className="SidebarParent__title">Settings</p>
            </div>
        </>
    );
}

export default Sidebar;