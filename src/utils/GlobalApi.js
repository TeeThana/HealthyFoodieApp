import axios from "axios";

const BASE_URL = "https://places.googleapis.com/v1/places:searchNearby";
const API_KEY = "AIzaSyCNJgXSKjkQshhZQZFE0S491H-T9mRYb3Q";

const config = {
    headers: {
        'content-type': 'application/json',
        'X-Goog-Api-Key': API_KEY,
        'X-Goog-FieldMask': [
            'places.displayName', 
            'places.formattedAddress', 
            'places.shortFormattedAddress', 
            'places.photos', 
            'places.location']
    }
}

const NewNearByPlace = (data) => axios.post(BASE_URL, data, config);

export default {
    NewNearByPlace,
    API_KEY
}