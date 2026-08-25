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

// Konverze se měří bez jakýchkoli osobních údajů. Hashovaný e-mail a telefon
// jsou z pohledu GDPR stále osobní údaj a do reklamních systémů je nepředáváme.
export const trackPurchase = (transactionId: string, services: ServiceItemType[], totalValue: number) => {
	window?.gtag?.('event', 'purchase', {
		transaction_id: transactionId,
		value: totalValue,
		currency: "CZK",
		items: services.map(serviceToGtagItem)
	})
}

export const trackConversion = (transactionId: string, totalValue: number) => {
	window?.gtag?.('event', 'conversion', {
		send_to: 'AW-16896849982/-Ec6COOX3aMaEL7whfk-',
		transaction_id: transactionId,
		value: totalValue,
		currency: "CZK"
	})
}
