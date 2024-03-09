export type TProjectParams = {
    prefix?: string,
    projectType?: 'application' | 'library',
    name: string,
    directory: string,
    framework: 'angular' | 'nest',
    outputPath?: string,
};
