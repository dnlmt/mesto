import {profileAvatar} from "../utils/constants";

class UserInfo {
    constructor({ name, about, avatar }) {
        this._name = document.querySelector(name);
        this._about = document.querySelector(about);
        this._avatar = document.querySelector(avatar);
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

    setAvatar(newAvatar) {
        this._avatar.style.backgroundImage = `url(${newAvatar})`;
    }
}

export default UserInfo;