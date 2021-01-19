import { InjectionToken } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

export const API_URL = new InjectionToken<string>('apiUrl');

export const APICONFIG = {
  BASEPOINT: environment.apiUrl,
  AUTH: {
    LOGIN: '/app/auth/login',
    SIGNUP: `/app/auth/signup`,
    TYPE_OF_USER: `/app/auth/users/profile`,
    RESET_PASSWORD_EMAIL: `/app/reset_password/send_code`,
    CHECK_CODE_RESET: `/app/reset_password/check_code`,
    RESET_PASSWORD: `/app/reset_password/reset_password`,

  },
  ACCOUNT: {
    PROFILE_USER: `/app/users/profile`,
    UPDATE_NAME: `/app/users/update_profile`,
    UPDATE_PASS: `/app/users/update_password`,
    GETDETAIL: (id) => `/app/users/${id}`,
    EDIT: (id) => `/app/users/${id}`,
    DELETE: (id) => `/app/users/${id}`,
    UPDATE_PREMIUM: (id) => `/app/users/request_upgrade`,
    CONTACT_ADMIN: `/app/interact_email/submit`
  },
  CHABAD: {
    GET: `/app/chabads`,
    GET_DETAIL: id => `/app/chabads/${id}`
  },
  EVENTS: {
    GET: `/app/events`,
    // GET_WITH_CHABAD_ID: id => `app/events/${id}`,
    GET_DETAIL: (id) => `/app/events/${id}`,
    // GET_HISTORY: `/app/history`,
    // CREATE: '/app/orders',
    // EDIT: (id) => `/app/orders${id}`,
    // DELETE: (id) => `/app/orders${id}`
  },
};

