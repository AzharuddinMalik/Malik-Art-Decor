# Use an official Python runtime as a parent image
FROM python:3.9-slim-buster

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container at /app
COPY requirements.txt .

# Install any needed packages specified in requirements.txt
# Ensure you've corrected your requirements.txt as discussed previously
# flask, flask-cors, google-generativeai, gunicorn
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container at /app
COPY . .

# Expose the port your app will run on
# Render will automatically map this to its assigned port
EXPOSE 8000

# Define environment variable for Gunicorn to use Render's dynamic port
ENV PORT 8000

# Command to run the application using Gunicorn
# 'app:app' refers to the Flask instance named 'app' in 'app.py'
CMD ["gunicorn", "--bind", "0.0.0.0:${PORT}", "app:app"]