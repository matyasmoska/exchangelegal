const API_URL = "https://www.sanctionsmap.eu/api/v1/regime?lang=en&search_type=1&search=";
const AUTOCOMPLETE_URL = "https://www.sanctionsmap.eu/api/v1/autocomplete/search?lang=en&search_type=1&limit=10&search=";

export async function fetchSearch(query: string) {
    const response = await fetch(API_URL + query);
    const data = await response.json();

    return data;
}

export async function fetchAutocomplete(query: string) {
    const response = await fetch(AUTOCOMPLETE_URL + query);
    const data = await response.json();

    return data;
} 
