class UserInfo {
    constructor({ name, spec }) {
        this._name = name;
        this._spec = spec;
    }

    getUserInfo() {
        const inputName = this._name.textContent;
        const inputSpec = this._spec.textContent;
        return { inputName, inputSpec }
    }

    setUserInfo({ name, spec }) {
        this._name.textContent = name;
        this._spec.textContent = spec;
    }
}

export default UserInfo;