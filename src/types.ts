export type SyncFunction<Parameters extends unknown[], Result> = (...args: Parameters) => Result
export type AsyncFunction<Parameters extends unknown[], Result> = (...args: Parameters) => Promise<Result>
export type MaybePromise<P extends unknown[], T> = SyncFunction<P, T> | AsyncFunction<P, T>

export type IUser = {
	email: string
	name: string
}

export type IDevice = {
	id: number
	model: string
	brand: string
}