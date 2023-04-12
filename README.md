# internal-node-chart
This project is responsible for generating charts for daily and weekly attendance report in SnapSuite Teams meeting


#Takes a json in the following format:
```json
{
"id":"guid...",
"meeting":"Developer Meeting",    
"attendance":
      {
            "DwainBrowne": "true",
            "JohnPerez": "true",
            "LeoDiaz": "false",
            "MarkBustria": "true",
            "ParmSingh": "true",
            "PavithraPackiyanathan": "true",
            "RedmondParez": "true"
        }
}
```

#Returns
```json
{
  "id":"guid...",
  "meeting": "Developer Meeting",
  "attendance": [
    {
      "name": "DwainBrowne",
      "datetime": "2023-04-12T05:29:52.299-04:00",
      "attended": true
    },
    {
      "name": "JohnPerez",
      "datetime": "2023-04-11T05:29:52.299-04:00",
      "attended": true
    },
    {
      "name": "LeoDiaz",
      "datetime": "2023-04-10T05:29:52.299-04:00",
      "attended": false
    },
    {
      "name": "MarkBustria",
      "datetime": "2023-04-09T05:29:52.299-04:00",
      "attended": true
    },
    {
      "name": "ParmSingh",
      "datetime": "2023-04-08T05:29:52.299-04:00",
      "attended": true
    },
    {
      "name": "PavithraPackiyanathan",
      "datetime": "2023-04-07T05:29:52.299-04:00",
      "attended": true
    },
    {
      "name": "RedmondParez",
      "datetime": "2023-04-06T05:29:52.299-04:00",
      "attended": true
    }
  ]
}
```