import requests
import tkinter as tk
from tkinter import messagebox

API_KEY = '7d0814494f1b0ada3dabfe307fcd9e88'
API_URL = 'http://api.openweathermap.org/data/2.5/weather?q={}&units=metric&appid={}'


def fetch_weather(city):
    try:
        response = requests.get(API_URL.format(city, API_KEY))
        data = response.json()
        if data['cod'] == 200:
            return data
        else:
            return None
    except Exception as e:
        print(f"Error fetching data: {e}")
        return None


# def display_weather(data):
#     try:
#         city = data['name']
#         country = data['sys']['country']
#         temp = data['main']['temp']
#         desc = data['weather'][0]['description']

#         weather_str = f"City: {city}, {country}\nTemperature: {temp}°C\nDescription: {desc}"

#         messagebox.showinfo("Weather Information", weather_str)
#     except Exception as e:
#         print(f"Error displaying data: {e}")
#         messagebox.showerror("Error", "Could not retrieve weather data")


# def get_weather():
#     city = city_entry.get()
#     if city:
#         weather_data = fetch_weather(city)
#         if weather_data:
#             display_weather(weather_data)
#     else:
#         messagebox.showwarning("Warning", "Please enter a city name")




# Run the main loop
if __name__ == '__main__':
    city = input("Enter City: ")
    if city:
        weather_data = fetch_weather(city)
        if weather_data:
            print(f"Weather for {city}:")
            print(f"Temperature: {weather_data['main']['temp']}°C")
            print(f"Description: {weather_data['weather'][0]['description']}")
            print(f"Humidity: {weather_data['main']['humidity']}%")
            print(f"Wind Speed: {weather_data['wind']['speed']} m/s")
    else:
        print("Please enter a city name")