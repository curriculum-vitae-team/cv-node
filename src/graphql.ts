
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

export interface CreateCvInput {
    name: string;
    description: string;
    userId: string;
    projectsIds?: Nullable<string[]>;
}

export interface UpdateCvInput {
    id: string;
    name: string;
}

export interface CreateLanguageInput {
    iso2: string;
    name: string;
}

export interface LanguageProficiencyInput {
    languageId: string;
    proficiency: string;
}

export interface CreateProjectInput {
    name: string;
    internal_name?: Nullable<string>;
    description: string;
    domain: string;
    start_date: string;
    end_date?: Nullable<string>;
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
    cvsIds?: Nullable<string[]>;
}

export interface UpdateUserInput {
    id: string;
    first_name?: Nullable<string>;
    last_name?: Nullable<string>;
}

export interface DeleteOutput {
    affected: number;
}

export interface LoginOutput {
    user?: Nullable<User>;
    access_token: string;
}

export interface IQuery {
    login(loginInput: LoginInput): LoginOutput | Promise<LoginOutput>;
    cvs(): Cv[] | Promise<Cv[]>;
    cv(id: string): Cv | Promise<Cv>;
    languages(): Nullable<Language>[] | Promise<Nullable<Language>[]>;
    projects(): Project[] | Promise<Project[]>;
    project(id: string): Project | Promise<Project>;
    users(): User[] | Promise<User[]>;
    user(id: string): User | Promise<User>;
}

export interface IMutation {
    signup(signupInput: SignupInput): LoginOutput | Promise<LoginOutput>;
    createCv(createCvInput: CreateCvInput): Cv | Promise<Cv>;
    updateCv(createCvInput: UpdateCvInput): Cv | Promise<Cv>;
    deleteCv(id: string): DeleteOutput | Promise<DeleteOutput>;
    createLanguage(createLanguageInput: CreateLanguageInput): Language | Promise<Language>;
    deleteLanguage(id: string): DeleteOutput | Promise<DeleteOutput>;
    createProject(createProjectInput: CreateProjectInput): Project | Promise<Project>;
    updateProject(updateProjectInput: UpdateProjectInput): Project | Promise<Project>;
    deleteProject(id: string): DeleteOutput | Promise<DeleteOutput>;
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
    updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;
    deleteUser(id: string): DeleteOutput | Promise<DeleteOutput>;
}

export interface Cv {
    id: string;
    created_at: string;
    name: string;
    description: string;
    user?: Nullable<User>;
    projects?: Nullable<Project[]>;
}

export interface Language {
    id: string;
    created_at: string;
    iso2: string;
    name: string;
}

export interface LanguageProficiency {
    language: Language;
    proficiency: string;
}

export interface Project {
    id: string;
    created_at: string;
    name: string;
    internal_name?: Nullable<string>;
    description: string;
    domain: string;
    start_date: string;
    end_date?: Nullable<string>;
}

export interface User {
    id: string;
    created_at: string;
    email: string;
    first_name?: Nullable<string>;
    last_name?: Nullable<string>;
    cvs?: Nullable<Cv[]>;
}

type Nullable<T> = T | null;
