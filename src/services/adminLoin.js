import fetch from '../utils/request';

export function GET_admin(payload = {}, token) {
  return fetch('GET', '/admin', payload, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export function POST_admin(payload = {}, token) {
  return fetch('POST', '/admin', payload, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export function Get_admin(adminId, token) {
  return fetch(
    'GET',
    `/adminLoin/${adminId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}

export function PATCH_admin(adminId, payload = {}, token) {
  return fetch('PATCH', `/adminLoin/${adminId}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export function DELETE_admin(adminId, token) {
  return fetch(
    'DELETE',
    `/adminLoin/${adminId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}
