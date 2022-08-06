
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
    description: string;
    languages?: Nullable<LanguageProficiencyInput[]>;
    userId: string;
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

export interface AuthOutput {
    user?: Nullable<User>;
    access_token: string;
}

export interface IQuery {
    login(loginInput?: Nullable<AuthInput>): Nullable<AuthOutput> | Promise<Nullable<AuthOutput>>;
    cvs(): Cv[] | Promise<Cv[]>;
    cv(id: string): Cv | Promise<Cv>;
    languages(): Nullable<Language>[] | Promise<Nullable<Language>[]>;
    projects(): Nullable<Project>[] | Promise<Nullable<Project>[]>;
    project(id: string): Nullable<Project> | Promise<Nullable<Project>>;
    skills(): Nullable<Skill>[] | Promise<Nullable<Skill>[]>;
    users(): User[] | Promise<User[]>;
    user(id: string): User | Promise<User>;
}

export interface IMutation {
    signup(signupInput?: Nullable<AuthInput>): Nullable<AuthOutput> | Promise<Nullable<AuthOutput>>;
    createCv(createCvInput: CreateCvInput): Cv | Promise<Cv>;
    updateCv(createCvInput: UpdateCvInput): Cv | Promise<Cv>;
    deleteCv(id: string): DeleteOutput | Promise<DeleteOutput>;
    createLanguage(createLanguageInput?: Nullable<CreateLanguageInput>): Nullable<Language> | Promise<Nullable<Language>>;
    deleteLanguage(id: string): Nullable<DeleteOutput> | Promise<Nullable<DeleteOutput>>;
    createProject(createProjectInput?: Nullable<CreateProjectInput>): Nullable<Project> | Promise<Nullable<Project>>;
    updateProject(updateProjectInput?: Nullable<UpdateProjectInput>): Nullable<Project> | Promise<Nullable<Project>>;
    deleteProject(id: string): Nullable<boolean> | Promise<Nullable<boolean>>;
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
    updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;
    deleteUser(id: string): DeleteOutput | Promise<DeleteOutput>;
}

export interface Cv {
    id: string;
    created_at: string;
    name: string;
    description: string;
    projects: Project[];
    languages: LanguageProficiency[];
    skills: SkillMastery[];
    user?: Nullable<User>;
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
    name: string;
    internal_name?: Nullable<string>;
    description: string;
    domain: string;
    from: string;
    to: string;
    skills: Nullable<Skill>[];
}

export interface Skill {
    id: string;
    name: string;
}

export interface SkillMastery {
    skill: Skill;
    mastery: string;
}

export interface User {
    id: string;
    created_at: string;
    email: string;
    first_name?: Nullable<string>;
    last_name?: Nullable<string>;
    cvs: Cv[];
}

type Nullable<T> = T | null;
