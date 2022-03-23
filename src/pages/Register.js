import React, { useState } from 'react';
// import styled from 'styled-components';
import '../css/Auth.css';
import AuthSocial from '../components/AuthSocial';

export default function Register() {

  return (
    <div>

      <div id="content" class="ts__container auth-container	">
        <div class="auth__form col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
          <div class="auth__form__wrap">
            <div class="auth__form__title">Register</div>
            <form id="sign-up" method="post" action="/user/auth/?register=yes" name="bform" novalidate="novalidate">
                <input type="hidden" name="AUTH_FORM" value="Y" />
                <input type="hidden" name="TYPE" value="REGISTRATION" />

                <input class="auth__form__input" autocomplete="username" type="email" placeholder="Email" name="USER_EMAIL" />
                <input class="auth__form__input" autocomplete="new-password" type="password" placeholder="Password" name="USER_PASSWORD" />

                <button type="submit" class="button-dark-blue button-global auth__button">
                  <span>Register</span>
                </button>

                <a href="/user/auth/?login=yes" class="auth__form__link sign__up" rel="nofollow">Authorization</a>
            </form>

            <AuthSocial login={false}/>
          </div>
        </div>
			</div>
    </div>
  );
}