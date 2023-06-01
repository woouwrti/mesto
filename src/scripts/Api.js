export default class Api {

  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfo() {
    const url = `${this._baseUrl}/users/me`;

    return fetch(url, {
      method: 'GET',
      headers: this._headers,
    })
      .then(res => {
        if (res.ok) return res.json();
        return res.json()
          .then(res => {
            throw new Error(res.message);
          });
      });
  }

  setUserInfo({ name, desc }) {
    const url = `${this._baseUrl}/users/me`;

    return fetch(url, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about: desc
      })
    })
      .then(res => {
        if (res.ok) return res.json();
        return res.json()
          .then(res => {
            throw new Error(res.message);
          });
      });
  }

  setAvatar(link) {
    const url = `${this._baseUrl}/users/me/avatar`;

    return fetch(url, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(res => {
        if (res.ok) return res.json();
        return res.json()
          .then(res => {
            throw new Error(res.message);
          });
      });
  }

  getInitialCards() {
    const url = `${this._baseUrl}/cards`;

    return fetch(url, {
      method: 'GET',
      headers: this._headers,
    })
      .then(res => {
        if (res.ok) return res.json();
        return res.json()
          .then(res => {
            throw new Error(res.message);
          });
      });
  }

  addNewCard({ name, link }) {
    const url = `${this._baseUrl}/cards`;

    return fetch(url, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(res => {
        if (res.ok) return res.json();
        return res.json()
          .then(res => {
            throw new Error(res.message);
          });
      });
  }

  deleteCard(cardId) {
    const url = `${this._baseUrl}/cards/${cardId}`;

    return fetch(url, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => {
        if (res.ok) return Promise.resolve();
        return res.json()
          .then(res => {
            throw new Error(res.message);
          });
      });
  }

  _addLike(cardId) {
    const url = `${this._baseUrl}/cards/${cardId}/likes`;

    return fetch(url, {
      method: 'PUT',
      headers: this._headers
    })
      .then(res => {
        if (res.ok) return res.json();
        return res.json()
          .then(res => {
            throw new Error(res.message);
          });
      })
      .then(res => {
        return res;
      });
  }

  _removeLike(cardId) {
    const url = `${this._baseUrl}/cards/${cardId}/likes`;

    return fetch(url, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => {
        if (res.ok) return res.json();
        return res.json()
          .then(res => {
            throw new Error(res.message);
          });
      })
      .then(res => {
        return res;
      });
  }

  toggleLike(cardId, isLiked) {
    if (isLiked) {
      return this._removeLike(cardId);
    } else {
      return this._addLike(cardId);
    }
  }

}
