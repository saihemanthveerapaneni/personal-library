const API_URL = 'http://localhost:8000';

const getHeaders = (isJson = false) => {
  const headers = {
    'Authorization': 'Bearer reader-token'
  };
  if (isJson) {
    headers['Content-Type'] = 'application/json';
  }
  return headers;
};

export const getBooks = () => fetch(`${API_URL}/books`, {
  headers: getHeaders()
}).then(res => res.json());

export const uploadBook = (formData, onProgress) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${API_URL}/books/upload`);
    xhr.setRequestHeader('Authorization', 'Bearer reader-token');

    if (xhr.upload && onProgress) {
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          onProgress(percent);
        }
      };
    }

    xhr.onload = () => {
      try {
        const data = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(data);
        } else {
          reject(new Error(data.detail || 'Upload failed'));
        }
      } catch (err) {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({ success: true });
        } else {
          reject(new Error(`Server error (${xhr.status})`));
        }
      }
    };

    xhr.onerror = () => reject(new Error('Network connection error'));
    xhr.send(formData);
  });
};

export const createBook = uploadBook;

export const updateBook = (id, book) => fetch(`${API_URL}/books/${id}`, {
  method: 'PUT',
  headers: getHeaders(true),
  body: JSON.stringify(book)
}).then(res => res.json());

export const deleteBook = (id) => fetch(`${API_URL}/books/${id}`, { 
  method: 'DELETE',
  headers: getHeaders()
}).then(res => {
  if (!res.ok) {
    return res.json().then(e => { throw new Error(e.detail || 'Delete failed') });
  }
  return res.json();
});

export const getBookText = (id) => fetch(`${API_URL}/books/${id}/text`, {
  headers: getHeaders()
}).then(res => res.json());

export const getBookFileUrl = (id) => `${API_URL}/books/${id}/file`;

export const getWishlist = () => fetch(`${API_URL}/api/wishlist`, { headers: getHeaders() }).then(res => res.json());
export const createWishlist = (item) => fetch(`${API_URL}/api/wishlist`, {
  method: 'POST',
  headers: getHeaders(true),
  body: JSON.stringify(item)
}).then(res => res.json());

export const deleteWishlist = (id) => fetch(`${API_URL}/api/wishlist/${id}`, { 
  method: 'DELETE',
  headers: getHeaders()
});

export const getHighlights = () => fetch(`${API_URL}/api/highlights`, { headers: getHeaders() }).then(res => res.json());
export const getSeries = () => fetch(`${API_URL}/api/series`, { headers: getHeaders() }).then(res => res.json());
