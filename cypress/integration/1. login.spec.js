/// <reference types="cypress" />

import { login } from "../functions/functions";

let email = "antiquetest0@mail.ru";
let password = "Seekunique15@";

describe('Should sign in', () => {
    it('Should Sign-in using given credentials', () => {
        login(email, password)
    });
});

