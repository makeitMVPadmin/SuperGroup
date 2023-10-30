
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
                <div className="SidebarParent__item">
                  <p className="SidebarParent__item-content">Setting item 1</p>
                  <p className="SidebarParent__item-content">Setting item 2</p>
                  <p className="SidebarParent__item-content">Setting item 3</p>
                  <p className="SidebarParent__item-content">Setting item 4</p>
                </div>
            </div>
        </>
    );
}

export default Sidebar;