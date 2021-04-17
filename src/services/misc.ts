import clsx, { ClassValue } from "clsx";

export const getDateFormat = function (date: Date) {
	return `${date.getDate()}. ${date.getMonth() + 1}. ${date.getFullYear()}`
}

export const dateStringToDateFormat = function (dateString: string) {
	let date = new Date( dateString )
	return `${date.getDate()}. ${date.getMonth() + 1}. ${date.getFullYear()}`
}

export const c = (...args: ClassValue[]) => clsx(...args)