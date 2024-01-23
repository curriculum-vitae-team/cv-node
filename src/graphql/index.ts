
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Proficiency {
    A1 = "A1",
    A2 = "A2",
    B1 = "B1",
    B2 = "B2",
    C1 = "C1",
    C2 = "C2",
    Native = "Native"
}

export enum Mastery {
    Novice = "Novice",
    Advanced = "Advanced",
    Competent = "Competent",
    Proficient = "Proficient",
    Expert = "Expert"
}

export enum UserRole {
    Employee = "Employee",
    Admin = "Admin"
}

export interface AuthInput {
    email: string;
    password: string;
}

export interface CreateCvInput {
    name: string;
    description: string;
    userId?: Nullable<string>;
    projectsIds: string[];
}

export interface UpdateCvInput {
    cvId: string;
    name: string;
    description: string;
    projectsIds: string[];
}

export interface DeleteCvInput {
    cvId: string;
}

export interface AddCvSkillInput {
    cvId: string;
    name: string;
    category?: Nullable<string>;
    mastery: Mastery;
}

export interface UpdateCvSkillInput {
    cvId: string;
    name: string;
    category?: Nullable<string>;
    mastery: Mastery;
}

export interface DeleteCvSkillInput {
    cvId: string;
    name: string[];
}

export interface MarginInput {
    top: string;
    bottom: string;
    left: string;
    right: string;
}

export interface ExportPdfInput {
    html: string;
    margin?: Nullable<MarginInput>;
}

export interface CreateDepartmentInput {
    name: string;
}

export interface UpdateDepartmentInput {
    departmentId: string;
    name: string;
}

export interface DeleteDepartmentInput {
    departmentId: string;
}

export interface CreateLanguageInput {
    iso2: string;
    name: string;
    native_name?: Nullable<string>;
}

export interface UpdateLanguageInput {
    languageId: string;
    iso2: string;
    name: string;
    native_name?: Nullable<string>;
}

export interface DeleteLanguageInput {
    languageId: string;
}

export interface LanguageProficiencyInput {
    name: string;
    proficiency: Proficiency;
}

export interface VerifyMailInput {
    otp: string;
}

export interface CreatePositionInput {
    name: string;
}

export interface UpdatePositionInput {
    positionId: string;
    name: string;
}

export interface DeletePositionInput {
    positionId: string;
}

export interface CreateProfileInput {
    first_name?: Nullable<string>;
    last_name?: Nullable<string>;
}

export interface UpdateProfileInput {
    userId: string;
    first_name?: Nullable<string>;
    last_name?: Nullable<string>;
}

export interface DeleteProfileInput {
    userId: string;
}

export interface AddProfileSkillInput {
    userId: string;
    name: string;
    category?: Nullable<string>;
    mastery: Mastery;
}

export interface UpdateProfileSkillInput {
    userId: string;
    name: string;
    category?: Nullable<string>;
    mastery: Mastery;
}

export interface DeleteProfileSkillInput {
    userId: string;
    name: string[];
}

export interface AddProfileLanguageInput {
    userId: string;
    name: string;
    proficiency: Proficiency;
}

export interface UpdateProfileLanguageInput {
    userId: string;
    name: string;
    proficiency: Proficiency;
}

export interface DeleteProfileLanguageInput {
    userId: string;
    name: string;
}

export interface UploadAvatarInput {
    userId: string;
    base64: string;
    size: number;
    type: string;
}

export interface DeleteAvatarInput {
    userId: string;
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

export interface CreateSkillInput {
    name: string;
    category?: Nullable<string>;
}

export interface UpdateSkillInput {
    skillId: string;
    name: string;
    category?: Nullable<string>;
}

export interface DeleteSkillInput {
    skillId: string;
}

export interface SkillMasteryInput {
    name: string;
    category?: Nullable<string>;
    mastery: Mastery;
}

export interface CreateUserInput {
    auth: AuthInput;
    profile: CreateProfileInput;
    cvsIds: string[];
    departmentId?: Nullable<string>;
    positionId?: Nullable<string>;
    role: UserRole;
}

export interface UpdateUserInput {
    userId: string;
    cvsIds?: Nullable<string[]>;
    departmentId?: Nullable<string>;
    positionId?: Nullable<string>;
    role?: Nullable<UserRole>;
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
    cv(cvId: string): Cv | Promise<Cv>;
    departments(): Department[] | Promise<Department[]>;
    languages(): Nullable<Language>[] | Promise<Nullable<Language>[]>;
    positions(): Position[] | Promise<Position[]>;
    position(id: string): Position | Promise<Position>;
    profile(userId: string): Profile | Promise<Profile>;
    projects(): Project[] | Promise<Project[]>;
    project(id: string): Project | Promise<Project>;
    skills(): Skill[] | Promise<Skill[]>;
    skillCategories(): string[] | Promise<string[]>;
    users(): User[] | Promise<User[]>;
    user(userId: string): User | Promise<User>;
}

export interface IMutation {
    signup(auth: AuthInput): AuthResult | Promise<AuthResult>;
    createCv(cv: CreateCvInput): Cv | Promise<Cv>;
    updateCv(cv: UpdateCvInput): Cv | Promise<Cv>;
    deleteCv(cv: DeleteCvInput): DeleteResult | Promise<DeleteResult>;
    addCvSkill(skill: AddCvSkillInput): Cv | Promise<Cv>;
    updateCvSkill(skill: UpdateCvSkillInput): Cv | Promise<Cv>;
    deleteCvSkill(skill: DeleteCvSkillInput): Cv | Promise<Cv>;
    exportPdf(pdf: ExportPdfInput): string | Promise<string>;
    createDepartment(department: CreateDepartmentInput): Department | Promise<Department>;
    updateDepartment(department: UpdateDepartmentInput): Department | Promise<Department>;
    deleteDepartment(department: DeleteDepartmentInput): DeleteResult | Promise<DeleteResult>;
    createLanguage(language: CreateLanguageInput): Language | Promise<Language>;
    updateLanguage(language: UpdateLanguageInput): Language | Promise<Language>;
    deleteLanguage(language: DeleteLanguageInput): DeleteResult | Promise<DeleteResult>;
    verifyMail(mail: VerifyMailInput): Nullable<Void> | Promise<Nullable<Void>>;
    createPosition(position: CreatePositionInput): Position | Promise<Position>;
    updatePosition(position: UpdatePositionInput): Position | Promise<Position>;
    deletePosition(position: DeletePositionInput): DeleteResult | Promise<DeleteResult>;
    updateProfile(profile: UpdateProfileInput): Profile | Promise<Profile>;
    addProfileSkill(skill: AddProfileSkillInput): Profile | Promise<Profile>;
    updateProfileSkill(skill: UpdateProfileSkillInput): Profile | Promise<Profile>;
    deleteProfileSkill(skill: DeleteProfileSkillInput): Profile | Promise<Profile>;
    addProfileLanguage(language: AddProfileLanguageInput): Profile | Promise<Profile>;
    updateProfileLanguage(language: UpdateProfileLanguageInput): Profile | Promise<Profile>;
    deleteProfileLanguage(language: DeleteProfileLanguageInput): Profile | Promise<Profile>;
    uploadAvatar(avatar: UploadAvatarInput): string | Promise<string>;
    deleteAvatar(avatar: DeleteAvatarInput): Nullable<Void> | Promise<Nullable<Void>>;
    createProject(project: ProjectInput): Project | Promise<Project>;
    updateProject(id: string, project: ProjectInput): Project | Promise<Project>;
    deleteProject(id: string): DeleteResult | Promise<DeleteResult>;
    createSkill(skill: CreateSkillInput): Skill | Promise<Skill>;
    updateSkill(skill: UpdateSkillInput): Skill | Promise<Skill>;
    deleteSkill(skill: DeleteSkillInput): DeleteResult | Promise<DeleteResult>;
    createUser(user: CreateUserInput): User | Promise<User>;
    updateUser(user: UpdateUserInput): User | Promise<User>;
    deleteUser(userId: string): DeleteResult | Promise<DeleteResult>;
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
    native_name?: Nullable<string>;
}

export interface LanguageProficiency {
    name: string;
    proficiency: Proficiency;
}

export interface Mail {
    id: string;
    created_at: string;
    email: string;
    otp: string;
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
    category?: Nullable<string>;
}

export interface SkillMastery {
    name: string;
    category?: Nullable<string>;
    mastery: Mastery;
}

export interface User {
    id: string;
    created_at: string;
    email: string;
    is_verified: boolean;
    profile: Profile;
    cvs?: Nullable<Cv[]>;
    department?: Nullable<Department>;
    department_name?: Nullable<string>;
    position?: Nullable<Position>;
    position_name?: Nullable<string>;
    role: UserRole;
}

export type Void = any;
type Nullable<T> = T | null;
