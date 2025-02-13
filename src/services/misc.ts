import clsx, { ClassValue } from "clsx";

export const getDateFormat = function (date: Date) {
	return `${date.getDate()}. ${date.getMonth() + 1}. ${date.getFullYear()}`
}

export const dateStringToDateFormat = function (dateString: string, locale: string | undefined) {
	let date = new Date( dateString )
	return date.toLocaleDateString(locale)
}

export function emailIsValid (email: string) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function numberWithSpaces(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function getElementY(query: string) {
	return window.pageYOffset + document.querySelector(query)!.getBoundingClientRect()?.top
}
  
export function doScrolling(element: string, duration: number, offset: number = 0) {
	var startingY = window.pageYOffset
	var elementY = getElementY(element)
	// If element is close to page's bottom then window will scroll only to some position above the element.
	var targetY = document.body.scrollHeight - elementY < window.innerHeight ? document.body.scrollHeight - window.innerHeight : elementY
	var diff = targetY - startingY - offset
	// Easing function: easeInOutCubic
	// From: https://gist.github.com/gre/1650294
	var easing = function (t: number) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 }
	var start: number

  	if (!diff) return

	// Bootstrap our animation - it will get called right before next frame shall be rendered.
	window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp
    // Elapsed miliseconds since start of scrolling.
    var time = timestamp - start
		// Get percent of completion in range [0, 1].
    var percent = Math.min(time / duration, 1)
    // Apply the easing.
    // It can cause bad-looking slow frames in browser performance tool, so be careful.
    percent = easing(percent)

    window.scrollTo(0, startingY + diff * percent)

		// Proceed with animation as long as we wanted it to.
    if (time < duration) {
      window.requestAnimationFrame(step)
    }
  })
}

const parseMessage = (message: string) => {
	try {
	  return JSON.parse(message)
	} catch (error) {
	  return { message }
	}
}

export const fetcher = (input: RequestInfo, init?: RequestInit) =>
  fetch(input, init).then((res) =>
    (res.ok ? res.json() : res.text()).then((data) => {
      if (res.ok) return data
      else throw parseMessage(data)
    })
  )

export const c = (...args: ClassValue[]) => clsx(...args)