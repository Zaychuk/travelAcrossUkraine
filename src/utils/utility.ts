export const getBaseUrl = (): string => {
    return process.env.REACT_APP_ENV_VARIABLE as string
}
