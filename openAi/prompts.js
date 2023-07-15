const generatePlacesPrompt = (days, country, state) => {
    return `
    user wants to know all the names of tourist/travel destinations that can be traveled in ${days} days from the country ${country} ${state ? `and state ${state}` : ""}
    Include all the travel/tourist places including the most famous and least famous ones
    do not repeat the places name in the response array
    Example response json of array of some tourist/travel places in India(maharashtra):
    generated response should be strickly in the form of structured json as shown in the below example

    {
        "data":["Taj-mahal(Agra)","lal-killa(Delhi)","Rajgad(raigad)"]
    }
    `
}

const generateItineraryPromt = ( startDate, endDate, days, country, state, place ) => {
    return `
            User wants to travel to location ${place}
            Of Country: ${country} ${state ? `State: ${state}` : ""}
            Start date: ${startDate} 
            End date:${endDate}
            The itinerary will be ${days} days long.
            Give itinerary for each day.
            Suggest places to visit.
            Include the method of transportation between places.
            Format the entire response in JSON string - important.
            keep the description of the place medium.
            Include coordinates of the places.
            also provide the departure activity inside the last day of activities.
            Make one array that includes all itinerary days in the response json 
            Example response array for day1 itinerary:
            
            [{
                "date": "2023-06-29",
                "day": "Day 1",
                "activities": [
                    {
                        "morning": {
                            "activity": "Morning Sightseeing",
                            "description": "Start your day by exploring the scenic beauty of Ulhasnagar. Visit the picturesque Ulhas River and enjoy a leisurely walk along its banks. Experience the tranquility of nature and capture some beautiful photographs.",
                            "transportation":"taxi",
                            "coordinates": {
                                "latitude": 52.358468,
                                "longitude": 4.881119
                            }
                        }
                    },
                    {
                        "afternoon": {
                            "activity": "Shopping at Ulhasnagar Market",
                            "description": "Start your day by exploring the scenic beauty of Ulhasnagar. Visit the picturesque Ulhas River and enjoy a leisurely walk along its banks. Experience the tranquility of nature and capture some beautiful photographs.",
                            "transportation":"walk",
                            "coordinates": {
                                "latitude": 89.358468,
                                "longitude": 3.881119
                            }
                        }
                    },
                    {
                        "evening": {
                            "activity": "Shopping at Ulhasnagar Market",
                            "description": "Start your day by exploring the scenic beauty of Ulhasnagar. Visit the picturesque Ulhas River and enjoy a leisurely walk along its banks. Experience the tranquility of nature and capture some beautiful photographs.",
                            "transportation":"rope way",
                            "coordinates": {
                                "latitude": 92.000468,
                                "longitude": 12.881119
                            }
                        }
                    },
                    {
                        "night": {
                            "activity": "Shopping at Ulhasnagar Market",
                            "description": "Start your day by exploring the scenic beauty of Ulhasnagar. Visit the picturesque Ulhas River and enjoy a leisurely walk along its banks. Experience the tranquility of nature and capture some beautiful photographs.",
                            "transportation":"bus",
                            "coordinates": {
                                "latitude": 52.358468,
                                "longitude": 4.881119
                            }
                        }
                    }
                ],
                "dine_options": [
                    {
                        "place": "Ai mahara: Seafood restaurant with an aquarium dining room",
                        "address": "Near dubai palace root no 16 vashim"
                    },
                    {
                        "place": "Cavali Club: Italian restaurant with a glamorous atmosphere",
                        "address": "Near dubai airport kolivada root 19"
                    }
                ]
            }]`
}

module.exports = { generateItineraryPromt, generatePlacesPrompt }