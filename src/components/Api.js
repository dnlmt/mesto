class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }

    _safeResponse(res) {
        if(res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
            .then((res) => this._safeResponse(res))
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }

    setUserInfo(info) {
       return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: info.name,
                about: info.about
            })
        })
           .then((res) => this._safeResponse(res))
           .catch((err) => {
               console.log(err); // выведем ошибку в консоль
           });
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers
        })
            .then((res) => this._safeResponse(res))
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }

    addCard(card) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(card)
        })
            .then((res) => this._safeResponse(res))
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then((res) => this._safeResponse(res))
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }

    like(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
            .then((res) => this._safeResponse(res))
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }
    unlike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then((res) => this._safeResponse(res))
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }
}

export default Api;