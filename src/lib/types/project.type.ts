export type TProject = {
    name: string,
    path: string,
    jestConfigTs: string,
    projectJson: {
        prefix?: string,
        name: string,
        sourceRoot: string,
        projectType: string,
        targets: {},
        tags: string[]
    },
    tsconfigJson: Record<string, any>,
};