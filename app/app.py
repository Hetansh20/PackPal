from flask import Flask, request, jsonify, render_template_string # type: ignore
from flask_cors import CORS  # type: ignore # Import Flask-CORS
import folium # type: ignore
import aiohttp # type: ignore
import asyncio

app = Flask(_name_)
# Enable CORS for all routes
CORS(app, resources={r"/": {"origins": ""}})

TOMTOM_API_KEY = 'WPglpwBsq3RAlGQqJ8t4TkpRihGrspCI'

class RouteTracker:
    async def get_coordinates(self, place_name):
        geocode_url = f"https://api.tomtom.com/search/2/geocode/{place_name}.json"
        async with aiohttp.ClientSession() as session:
            params = {'key': TOMTOM_API_KEY}
            async with session.get(geocode_url, params=params) as response:
                data = await response.json()
                if data.get("results"):
                    position = data["results"][0]["position"]
                    return {
                        "lat": position["lat"],
                        "lon": position["lon"],
                        "address": data["results"][0].get("address", {}).get("freeformAddress", place_name)
                    }
                return None

    async def get_route_details(self, start_coords, end_coords):
        async with aiohttp.ClientSession() as session:
            url = f"https://api.tomtom.com/routing/1/calculateRoute/{start_coords['lat']},{start_coords['lon']}:{end_coords['lat']},{end_coords['lon']}/json"
            params = {
                'key': TOMTOM_API_KEY,
                'traffic': 'true',
                'computeTravelTimeFor': 'all'
            }
            async with session.get(url, params=params) as response:
                data = await response.json()
                if not data.get("routes"):
                    return None

                route = data["routes"][0]
                return {
                    "segments": self._process_route_segments(route),
                    "summary": {
                        "distance": route["summary"]["lengthInMeters"] / 1000,
                        "time": route["summary"]["travelTimeInSeconds"] / 60,
                        "traffic_delay": route["summary"].get("trafficDelayInSeconds", 0) / 60
                    }
                }

    def _process_route_segments(self, route):
        segments = []
        for leg in route["legs"]:
            for i in range(len(leg["points"]) - 1):
                start = leg["points"][i]
                end = leg["points"][i + 1]
                segments.append({
                    "start": (start["latitude"], start["longitude"]),
                    "end": (end["latitude"], end["longitude"])
                })
        return segments

    def generate_map(self, start_info, end_info, route_data):
        m = folium.Map(location=[start_info["lat"], start_info["lon"]], zoom_start=10)
        folium.Marker(
            [start_info["lat"], start_info["lon"]],
            popup=f"Start: {start_info['address']}",
            icon=folium.Icon(color='green')
        ).add_to(m)
        folium.Marker(
            [end_info["lat"], end_info["lon"]],
            popup=f"End: {end_info['address']}",
            icon=folium.Icon(color='red')
        ).add_to(m)
        for segment in route_data["segments"]:
            folium.PolyLine([segment["start"], segment["end"]], color='blue', weight=4).add_to(m)
        return m.repr_html()

route_tracker = RouteTracker()

@app.route("/", methods=["GET"])
def index():
    return render_template_string('''
        <h2>Route Tracker</h2>
        <form method="post" action="/track">
            Start Location: <input type="text" name="start" required><br>
            End Location: <input type="text" name="end" required><br>
            <input type="submit" value="Track">
        </form>
    ''')

@app.route("/track", methods=["POST"])
def track():
    start_location = request.form.get("start")
    end_location = request.form.get("end")

    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    start_info = loop.run_until_complete(route_tracker.get_coordinates(start_location))
    end_info = loop.run_until_complete(route_tracker.get_coordinates(end_location))

    if not start_info or not end_info:
        return "Invalid location input"

    route_data = loop.run_until_complete(route_tracker.get_route_details(start_info, end_info))
    if not route_data:
        return "Could not calculate route"

    map_html = route_tracker.generate_map(start_info, end_info, route_data)
    print("this is my map_html working need to elaborate",map_html)
    return render_template_string(f'''
        <h2>Route from {start_info["address"]} to {end_info["address"]}</h2>
        <p><strong>Distance:</strong> {route_data["summary"]["distance"]:.2f} km</p>
        <p><strong>Time:</strong> {route_data["summary"]["time"]:.2f} min</p>
        <p><strong>Traffic Delay:</strong> {route_data["summary"]["traffic_delay"]:.2f} min</p>
        {map_html}
        <br><a href="/">Track Another Route</a>
    ''')

# Add a route for calculate_route if that's what your frontend is calling
@app.route("/calculate_route", methods=["POST", "OPTIONS"])
def calculate_route():
    # Handle preflight OPTIONS request
    if request.method == "OPTIONS":
        response = jsonify({"status": "success"})
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        response.headers.add("Access-Control-Allow-Methods", "POST")
        return response
        
    # Handle actual POST request
    data = request.json
    start_location = data.get("start")
    end_location = data.get("end")
    
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    start_info = loop.run_until_complete(route_tracker.get_coordinates(start_location))
    end_info = loop.run_until_complete(route_tracker.get_coordinates(end_location))
    
    if not start_info or not end_info:
        return jsonify({"error": "Invalid location input"})
    
    route_data = loop.run_until_complete(route_tracker.get_route_details(start_info, end_info))
    if not route_data:
        return jsonify({"error": "Could not calculate route"})
    
    return jsonify({
        "start": start_info,
        "end": end_info,
        "route": route_data
    })

if _name_ == "_main_":
    app.run(debug=True, port=5000)