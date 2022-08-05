
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface LoginInput {
    email: string;
    password: string;
}

export interface SignupInput {
    email: string;
    password: string;
}

export interface CreateUserInput {
    email: string;
    password: string;
    first_name?: Nullable<string>;
    last_name?: Nullable<string>;
}

export interface IQuery {
    login(loginInput?: Nullable<LoginInput>): Nullable<User> | Promise<Nullable<User>>;
    users(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    signup(signupInput?: Nullable<SignupInput>): Nullable<User> | Promise<Nullable<User>>;
    createUser(createUserInput?: Nullable<CreateUserInput>): Nullable<User> | Promise<Nullable<User>>;
}

export interface User {
    id: number;
    created_at: string;
    email: string;
    password: string;
    first_name?: Nullable<string>;
    last_name?: Nullable<string>;
}

type Nullable<T> = T | null;
