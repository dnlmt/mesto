import {profileAvatar} from "../utils/constants";

class UserInfo {
    constructor({ name, about }) {
        this._name = document.querySelector(name);
        this._about = document.querySelector(about);
    }

    getUserInfo() {
        const name = this._name.textContent;
        const about = this._about.textContent;
        return { name, about }
    }

    setUserInfo({ name, about }) {
        this._name.textContent = name;
        this._about.textContent = about;
    }

    setAvatar(selector, avatar) {
        selector.style.backgroundImage = `url(${avatar})`;
    }
}

export default UserInfo;