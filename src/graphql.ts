
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface AuthInput {
    email: string;
    password: string;
}

export interface CreateUserInput {
    email: string;
    password: string;
    first_name?: Nullable<string>;
    last_name?: Nullable<string>;
}

export interface AuthOutput {
    user?: Nullable<User>;
    access_token: string;
}

export interface IQuery {
    login(loginInput?: Nullable<AuthInput>): Nullable<AuthOutput> | Promise<Nullable<AuthOutput>>;
    users(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    signup(signupInput?: Nullable<AuthInput>): Nullable<AuthOutput> | Promise<Nullable<AuthOutput>>;
    createUser(createUserInput?: Nullable<CreateUserInput>): Nullable<User> | Promise<Nullable<User>>;
}

export interface User {
    id: number;
    created_at: string;
    email: string;
    first_name?: Nullable<string>;
    last_name?: Nullable<string>;
}

type Nullable<T> = T | null;
