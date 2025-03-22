import { ServiceItemType } from './ServiceItem'

const serviceToGtagItem = (service: ServiceItemType): Gtag.Item => ({
	item_name: typeof service.name === "string" ? service.name : service.name?.cs,
	item_id: service.id,
	price: service.price.toFixed(2),
	currency: "CZK",
	quantity: 1
})

// Funkce pro sledování zobrazení produktů
export const trackViewItems = (services: ServiceItemType[]) => {
	window?.gtag?.('event', 'view_item', { items: services.map(serviceToGtagItem) })
}

// Funkce pro sledování přidání produktů do košíku
export const trackAddToCart = (services: ServiceItemType[]) => {
	window?.gtag?.('event', 'add_to_cart', { items: services.map(serviceToGtagItem) })
}

// Funkce pro sledování nákupu s více produkty a rozšířenými konverzemi
export const trackPurchase = (transactionId: string, services: ServiceItemType[], totalValue: number, hashedEmail: string, hashedPhone: string) => {
	window?.gtag?.('event', 'purchase', {
		transaction_id: transactionId,
		value: totalValue,
		currency: "CZK",
		items: services.map(serviceToGtagItem),
		user_data: {
			email: hashedEmail, // Hashovaný e-mail (SHA256)
			phone_number: hashedPhone // Hashované telefonní číslo (SHA256)
		}
	})
}

export const trackConversion = (transactionId: string, totalValue: number, hashedEmail: string, hashedPhone: string) => {
	window?.gtag?.('event', 'conversion', {
		send_to: 'AW-16896849982/-Ec6COOX3aMaEL7whfk-',
		transaction_id: transactionId,
		value: totalValue,
		currency: "CZK",
		user_data: {
			email: hashedEmail, // Hashovaný e-mail (SHA256)
			phone_number: hashedPhone // Hashované telefonní číslo (SHA256)
		}
	})
}
