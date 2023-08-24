```mermaid
sequenceDiagram;
  selain->>palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
  note over palvelin: HTML-statuskoodi 200 OK
  palvelin-->>selain: HTML-dokumentti spa
  note over selain: HTML-koodin head osion stylesheet ja javascript <br>-määrittelyt aiheuttavat selaimelle seuraavat <br> HTTP GET pyynnöt

  selain->>palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
  palvelin-->>selain: main.css

  selain->>palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
  palvelin-->>selain: spa.js

  note over selain: selain alkaa suorittaa js-koodia <br>joka pyytää JSON-datan palvelimelta

  selain->>palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
  palvelin-->>selain: [{"content":"hello world","date":"2023-01-11T11:02:42.788Z"}, ...]

  note over selain: selain suorittaa tapahtumankäsittelijän <br>joka renderöi muistiinpanot näytölle
```
