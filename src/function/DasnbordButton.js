import $ from "jquery";
import'../App.css';
export function SideBarCall(e){
    e.preventDefault();
    $('.SideBar').toggleClass('dashbord_active');
    $('.Content').toggleClass('Content_active');
}
