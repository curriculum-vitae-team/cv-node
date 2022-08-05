
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

export interface CreateCvInput {
    name: string;
}

export interface UpdateCvInput {
    id: string;
    name: string;
}

export interface CreateProjectInput {
    name: string;
}

export interface UpdateProjectInput {
    id: string;
    name: string;
}

export interface CreateUserInput {
    email: string;
    password: string;
    first_name?: Nullable<string>;
    last_name?: Nullable<string>;
}

export interface UpdateUserInput {
    id: string;
    first_name?: Nullable<string>;
    last_name?: Nullable<string>;
}

export interface AuthOutput {
    user?: Nullable<User>;
    access_token: string;
}

export interface IQuery {
    login(loginInput?: Nullable<AuthInput>): Nullable<AuthOutput> | Promise<Nullable<AuthOutput>>;
    cvs(): Nullable<Nullable<Cv>[]> | Promise<Nullable<Nullable<Cv>[]>>;
    cv(id: string): Nullable<Cv> | Promise<Nullable<Cv>>;
    projects(): Nullable<Nullable<Project>[]> | Promise<Nullable<Nullable<Project>[]>>;
    project(id: string): Nullable<User> | Promise<Nullable<User>>;
    users(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    signup(signupInput?: Nullable<AuthInput>): Nullable<AuthOutput> | Promise<Nullable<AuthOutput>>;
    createCv(createCvInput?: Nullable<CreateCvInput>): Nullable<Cv> | Promise<Nullable<Cv>>;
    updateCv(createCvInput?: Nullable<UpdateCvInput>): Nullable<Cv> | Promise<Nullable<Cv>>;
    deleteCv(id: string): Nullable<boolean> | Promise<Nullable<boolean>>;
    createProject(createProjectInput?: Nullable<CreateProjectInput>): Nullable<Project> | Promise<Nullable<Project>>;
    updateProject(updateProjectInput?: Nullable<UpdateProjectInput>): Nullable<Project> | Promise<Nullable<Project>>;
    deleteProject(id: string): Nullable<boolean> | Promise<Nullable<boolean>>;
    createUser(createUserInput?: Nullable<CreateUserInput>): Nullable<User> | Promise<Nullable<User>>;
    updateUser(updateUserInput?: Nullable<UpdateUserInput>): Nullable<User> | Promise<Nullable<User>>;
    deleteUser(id: string): Nullable<boolean> | Promise<Nullable<boolean>>;
}

export interface Cv {
    id: string;
    name: string;
}

export interface Project {
    id: string;
    name: string;
}

export interface User {
    id: string;
    created_at: string;
    email: string;
    first_name?: Nullable<string>;
    last_name?: Nullable<string>;
}

type Nullable<T> = T | null;
