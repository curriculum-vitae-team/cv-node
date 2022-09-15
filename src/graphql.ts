
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

export interface CvInput {
    name: string;
    description: string;
    userId?: Nullable<string>;
    projectsIds: string[];
    skills: SkillMasteryInput[];
    languages: LanguageProficiencyInput[];
    is_template: boolean;
}

export interface DepartmentInput {
    name: string;
}

export interface LanguageInput {
    iso2: string;
    name: string;
}

export interface LanguageProficiencyInput {
    language_name: string;
    proficiency: string;
}

export interface PositionInput {
    name: string;
}

export interface ProfileInput {
    first_name?: Nullable<string>;
    last_name?: Nullable<string>;
    skills: SkillMasteryInput[];
    languages: LanguageProficiencyInput[];
}

export interface ProjectInput {
    name: string;
    internal_name?: Nullable<string>;
    description: string;
    domain: string;
    start_date: string;
    end_date?: Nullable<string>;
    team_size: number;
    skillsIds: string[];
}

export interface SkillInput {
    name: string;
}

export interface SkillMasteryInput {
    skill_name: string;
    mastery: string;
}

export interface CreateUserInput {
    auth: AuthInput;
    profile: ProfileInput;
    cvsIds: string[];
    departmentId?: Nullable<string>;
    positionId?: Nullable<string>;
    role: string;
}

export interface UpdateUserInput {
    profile: ProfileInput;
    cvsIds: string[];
    departmentId?: Nullable<string>;
    positionId?: Nullable<string>;
}

export interface DeleteResult {
    affected: number;
}

export interface AuthResult {
    user: User;
    access_token: string;
}

export interface IQuery {
    login(auth: AuthInput): AuthResult | Promise<AuthResult>;
    cvs(): Cv[] | Promise<Cv[]>;
    cv(id: string): Cv | Promise<Cv>;
    departments(): Department[] | Promise<Department[]>;
    languages(): Nullable<Language>[] | Promise<Nullable<Language>[]>;
    positions(): Position[] | Promise<Position[]>;
    position(id: string): Position | Promise<Position>;
    projects(): Project[] | Promise<Project[]>;
    project(id: string): Project | Promise<Project>;
    skills(): Skill[] | Promise<Skill[]>;
    users(): User[] | Promise<User[]>;
    user(id: string): User | Promise<User>;
}

export interface IMutation {
    signup(auth: AuthInput): AuthResult | Promise<AuthResult>;
    createCv(cv: CvInput): Cv | Promise<Cv>;
    updateCv(id: string, cv: CvInput): Cv | Promise<Cv>;
    deleteCv(id: string): DeleteResult | Promise<DeleteResult>;
    unbindCv(id: string): Cv | Promise<Cv>;
    createDepartment(department: DepartmentInput): Department | Promise<Department>;
    updateDepartment(id: string, department: DepartmentInput): Department | Promise<Department>;
    deleteDepartment(id: string): DeleteResult | Promise<DeleteResult>;
    createLanguage(language: LanguageInput): Language | Promise<Language>;
    updateLanguage(id: string, language: LanguageInput): Language | Promise<Language>;
    deleteLanguage(id: string): DeleteResult | Promise<DeleteResult>;
    createPosition(position: PositionInput): Position | Promise<Position>;
    updatePosition(id: string, position: PositionInput): Position | Promise<Position>;
    deletePosition(id: string): DeleteResult | Promise<DeleteResult>;
    uploadAvatar(id: string, avatar: Upload): string | Promise<string>;
    createProject(project: ProjectInput): Project | Promise<Project>;
    updateProject(id: string, project: ProjectInput): Project | Promise<Project>;
    deleteProject(id: string): DeleteResult | Promise<DeleteResult>;
    createSkill(skill: SkillInput): Skill | Promise<Skill>;
    updateSkill(id: string, skill: SkillInput): Skill | Promise<Skill>;
    deleteSkill(id: string): DeleteResult | Promise<DeleteResult>;
    createUser(user: CreateUserInput): User | Promise<User>;
    updateUser(id: string, user: UpdateUserInput): User | Promise<User>;
    deleteUser(id: string): DeleteResult | Promise<DeleteResult>;
}

export interface Cv {
    id: string;
    created_at: string;
    name: string;
    description: string;
    user?: Nullable<User>;
    projects?: Nullable<Project[]>;
    skills: SkillMastery[];
    languages: LanguageProficiency[];
    is_template: boolean;
}

export interface Department {
    id: string;
    created_at: string;
    name: string;
}

export interface Language {
    id: string;
    created_at: string;
    iso2: string;
    name: string;
}

export interface LanguageProficiency {
    language_name: string;
    proficiency: string;
}

export interface Position {
    id: string;
    created_at: string;
    name: string;
}

export interface Profile {
    id: string;
    created_at: string;
    first_name?: Nullable<string>;
    last_name?: Nullable<string>;
    full_name?: Nullable<string>;
    avatar?: Nullable<string>;
    skills: SkillMastery[];
    languages: LanguageProficiency[];
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
    team_size: number;
    tech_stack?: Nullable<Skill[]>;
}

export interface Skill {
    id: string;
    created_at: string;
    name: string;
}

export interface SkillMastery {
    skill_name: string;
    mastery: string;
}

export interface User {
    id: string;
    created_at: string;
    email: string;
    profile: Profile;
    cvs?: Nullable<Cv[]>;
    department?: Nullable<Department>;
    department_name?: Nullable<string>;
    position?: Nullable<Position>;
    position_name?: Nullable<string>;
    role: string;
}

export type Upload = any;
type Nullable<T> = T | null;
