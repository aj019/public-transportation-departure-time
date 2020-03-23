This project uses Transport Api (https://www.transportapi.com/) and allows users to 
1. Search For Nearby Bus Stops
2. View Departures and Departure time
3. Select Departure for Bus Stop
4. Show Direction between the origin and destination bus stop

The following libraries have been used in the project
1. react-google-maps
2. react-places-autocomplete
3. react-redux
4. redux-saga
5. styled-components
6. axios

What can be improved ?
1. Testing - Need to write test cases
2. UX - Loading State and Clear Instructions are missing which might confuse a new user
3. Vulnerability - API keys are hardcoded in the project. This can be avoided by adding an authentication mechanism that returns the api key for only authenticated users
