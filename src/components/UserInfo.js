class UserInfo {
    constructor({ name, about, avatar }) {
        this._name = document.querySelector(name);
        this._about = document.querySelector(about);
        this._avatar = document.querySelector(avatar);
    }

    getUserInfo() {
        const userName = this._name.textContent;
        const userSpec = this._about.textContent;
        return { userName, userSpec }
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